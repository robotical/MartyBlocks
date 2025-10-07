// deleteMissingLastAccessed.js
// Node 18+: fetch + fs are built-in (no deps)

import fs from "fs";

const BASE = "https://martyblocks-projects-default-rtdb.europe-west1.firebasedatabase.app";
const DRY_RUN = true;              // <-- set to false to actually delete
const SAMPLE_SIZE = 1000;
const BACKFILL_CONCURRENCY = 100;  // parallel fetches for lastAccessed
const DELETE_CHUNK_SIZE = 200;     // how many deletes per PATCH
const AUTH = "";                   // e.g. `?auth=YOUR_TOKEN` (include leading ?), else ""

function withAuth(path) {
  // If AUTH is not empty and path already has ?, use & instead
  if (!AUTH) return path;
  return path.includes("?") ? `${path}&${AUTH.slice(1)}` : `${path}${AUTH}`;
}

async function fetchJson(url) {
  const res = await fetch(url);
  const txt = await res.text().catch(() => "");
  if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText} – ${txt}`);
  try { return JSON.parse(txt); } catch { return null; }
}

// 1) Get all project ids (tiny)
async function getAllIdsShallow() {
  const data = await fetchJson(withAuth(`${BASE}/projects.json?shallow=true`));
  return Object.keys(data || {});
}

// 2) For a list of ids, get only lastAccessed
async function getLastAccessedForIds(ids, concurrency = BACKFILL_CONCURRENCY) {
  const results = [];
  let done = 0;

  for (let i = 0; i < ids.length; i += concurrency) {
    const chunk = ids.slice(i, i + concurrency);
    const promises = chunk.map(async (id) => {
      try {
        const ts = await fetchJson(withAuth(`${BASE}/projects/${id}/lastAccessed.json`));
        return { id, lastAccessed: ts };
      } catch {
        return { id, lastAccessed: undefined };
      }
    });
    const out = await Promise.all(promises);
    results.push(...out);
    done += chunk.length;
    console.log(`Checked lastAccessed: ${done}/${ids.length}`);
  }
  return results;
}

// 3) Randomly pick N ids
function sampleIds(ids, n) {
  const arr = ids.slice();
  // Fisher–Yates shuffle (partial)
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, n);
}

// 4) Delete via PATCH with { "<id>": null } (chunked)
async function deleteIdsChunked(ids, chunkSize = DELETE_CHUNK_SIZE) {
  let deleted = 0;
  for (let i = 0; i < ids.length; i += chunkSize) {
    const chunk = ids.slice(i, i + chunkSize);
    const body = {};
    for (const id of chunk) body[id] = null; // setting to null deletes the child
    const res = await fetch(withAuth(`${BASE}/projects.json`), {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      throw new Error(`Delete PATCH failed: ${res.status} ${txt}`);
    }
    deleted += chunk.length;
    console.log(`Deleted ${deleted}/${ids.length}`);
  }
}

(async () => {
  try {
    console.log("Fetching all project IDs (shallow)...");
    const allIds = await getAllIdsShallow();
    console.log(`Total projects: ${allIds.length}`);

    console.log("Checking lastAccessed for all IDs (lightweight)...");
    const meta = await getLastAccessedForIds(allIds);

    // Candidates = missing or non-numeric lastAccessed
    const candidates = meta
      .filter(m => !(typeof m.lastAccessed === "number" && Number.isFinite(m.lastAccessed)))
      .map(m => m.id);

    console.log(`Candidates without valid lastAccessed: ${candidates.length}`);

    if (candidates.length === 0) {
      console.log("Nothing to delete. Exiting.");
      return;
    }

    const toDelete = sampleIds(candidates, Math.min(SAMPLE_SIZE, candidates.length));
    console.log(`Randomly selected ${toDelete.length} IDs to delete.`);

    // Save list for audit
    fs.writeFileSync("deletedIds.json", JSON.stringify(toDelete, null, 2), "utf-8");
    console.log("Saved IDs to delete in deletedIds.json");

    if (DRY_RUN) {
      console.log("DRY_RUN=true → No deletions performed. Set DRY_RUN=false to proceed.");
      return;
    }

    console.log("Deleting (chunked PATCH)...");
    await deleteIdsChunked(toDelete);
    console.log("✅ Done.");

  } catch (e) {
    console.error("❌ Error:", e.message);
  }
})();