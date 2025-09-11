
/* Steps to use this: 
1. copy the contents of the lesson object to a draft.js so we can replace all instances of ` with " e.g., {
    'type-lesson-marty-blocks-coding-8': {
        id: "type-lesson-marty-blocks-coding-8",
        name: "Lists Pt.2 - Marty's Shopping List",
        type: "lesson",
        urlId: "lists-2",....

2. once clean, copy the contents of the draft.js to the lessonsSrc variable below
3. remove all lines that have BUCKET_URL references
4. run `node extractFormattedMessages.js` in this directory
5. copy the output JSON to the appropriate locale file, e.g., en.json
*/
const lessonsSrc = ``;
// ---- Core: find each <FormattedMessage ...> opening tag safely ----
function* findFormattedMessageStartTags(src) {
    const needle = "<FormattedMessage";
    let i = 0;
    while (true) {
        const start = src.indexOf(needle, i);
        if (start === -1) break;

        let j = start + needle.length;
        let braceDepth = 0;   // depth for {...} expressions in attributes
        let inQuote = null;   // '"', "'", or '`'
        while (j < src.length) {
            const c = src[j];

            // If we're inside a {...} expression, we IGNORE quotes entirely and just balance braces.
            if (braceDepth > 0) {
                if (c === "{") { braceDepth++; j++; continue; }
                if (c === "}") { braceDepth--; j++; continue; }
                j++;
                continue;
            }

            // Not inside {...}: normal attribute parsing
            if (inQuote) {
                if (c === "\\") { j += 2; continue; }  // skip escaped char
                if (c === inQuote) { inQuote = null; j++; continue; }
                j++; continue;
            }

            if (c === '"' || c === "'" || c === "`") { inQuote = c; j++; continue; }
            if (c === "{") { braceDepth = 1; j++; continue; }

            // End of opening tag ONLY when not in quotes nor braces
            if (c === ">") {
                const attrs = src.slice(start + needle.length, j).trim();
                yield attrs;
                break;
            }
            j++;
        }
        i = j + 1;
    }
}

// ---- Attribute reader that handles name=VALUE with VALUE in {…} or quoted ----
function readAttr(attrs, name) {
    // Find name=
    const nameIdx = attrs.search(new RegExp(`\\b${name}\\s*=`));
    if (nameIdx === -1) return null;

    let i = nameIdx;
    // move to after '='
    i = attrs.indexOf("=", i);
    if (i === -1) return null;
    i++;
    // skip spaces
    while (i < attrs.length && /\s/.test(attrs[i])) i++;

    if (i >= attrs.length) return null;

    const c = attrs[i];

    // Case 1: braced expression: { ... }
    if (c === "{") {
        let depth = 1;
        let j = i + 1;
        // Inside braces: DO NOT do quote parsing; just balance braces
        while (j < attrs.length && depth > 0) {
            const ch = attrs[j];
            if (ch === "{") depth++;
            else if (ch === "}") depth--;
            j++;
        }
        if (depth !== 0) return null; // unbalanced; bail
        const inner = attrs.slice(i + 1, j - 1).trim();
        // If inner itself is a quoted string/backticks, strip them
        const q = inner[0];
        if ((q === `"` || q === "'" || q === "`") && inner[inner.length - 1] === q) {
            return inner.slice(1, -1);
        }
        return inner;
    }

    // Case 2: quoted value: "..." or '...' or `...`
    if (c === `"` || c === "'" || c === "`") {
        const quote = c;
        let j = i + 1;
        while (j < attrs.length) {
            const ch = attrs[j];
            if (ch === "\\") { j += 2; continue; }
            if (ch === quote) { return attrs.slice(i + 1, j); }
            j++;
        }
        return null; // no closing quote
    }

    // Case 3: bare value (rare in JSX, but handle)
    let j = i;
    while (j < attrs.length && !/\s|>/.test(attrs[j])) j++;
    return attrs.slice(i, j);
}

function clean(s) {
    return (s || "").replace(/\r\n?/g, "\n").trim();
}

function extractAllMessages(src) {
    const out = {};
    for (const attrs of findFormattedMessageStartTags(src)) {
        const id = readAttr(attrs, "id");
        const dm = readAttr(attrs, "defaultMessage");
        if (id && dm) {
            out[clean(id)] = clean(dm);
        }
    }
    return out;
}

const messages = extractAllMessages(lessonsSrc);
console.log(JSON.stringify(messages, null, 2));