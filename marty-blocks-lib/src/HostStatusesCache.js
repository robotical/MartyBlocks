const BOOTSTRAP_FLAG = "__martyNetworkBootstrapped";
if (!window[BOOTSTRAP_FLAG]) {
    window[BOOTSTRAP_FLAG] = true;

    const TIMEOUT_MS = 10000; 

    const makeAlertMessage = (url, timeoutMs) => `Whoops — the request to \`${url}\` took longer than ${timeoutMs / 1000} seconds and timed out.\n\n` +
                    `That usually means your connection dropped or a firewall is blocking access. ` +
                    `Please check your network and try again. Read more: https://userguides.robotical.io/martyv2/support_faqs/firewall_issues`;

    ; (function () {
        // ──────────────────────────────────────────────────────────────
        // 1) FETCH WITH TIMEOUT
        // ──────────────────────────────────────────────────────────────
        const _fetch = window.fetch;
        window.fetch = function (input, init = {}) {
            const url = (input && input.url) || input;
            console.log("[fetch] →", url);

            const timeoutMs = TIMEOUT_MS;
            const controller = new AbortController();
            const timeoutId = setTimeout(() => {
                controller.abort();
                console.error(`[fetch timeout] → ${url}`);
                alert(makeAlertMessage(url, timeoutMs));
            }, timeoutMs);

            // If caller passed a signal, chain it
            if (init.signal) {
                init.signal.addEventListener("abort", () => controller.abort());
            }

            return _fetch(input, { ...init, signal: controller.signal })
                .finally(() => clearTimeout(timeoutId));
        };

        // ──────────────────────────────────────────────────────────────
        // 2) XHR WITH TIMEOUT
        // ──────────────────────────────────────────────────────────────
        const origOpen = XMLHttpRequest.prototype.open;
        const origSend = XMLHttpRequest.prototype.send;

        XMLHttpRequest.prototype.open = function (method, url, async, user, pass) {
            this._xhrUrl = url;
            return origOpen.call(this, method, url, async, user, pass);
        };

        XMLHttpRequest.prototype.send = function (body) {
            console.log(`[xhr] →`, this._xhrUrl);

            const timeoutMs = TIMEOUT_MS;
            // start a timer that will abort() the request
            this._timeoutId = setTimeout(() => {
                this.abort();
                console.error(`[xhr timeout] → ${this._xhrUrl}`);
                alert(makeAlertMessage(url, timeoutMs));
            }, timeoutMs);

            // clear the timeout once the request finishes (success, error, or abort)
            this.addEventListener("loadend", () => {
                clearTimeout(this._timeoutId);
            });

            return origSend.call(this, body);
        };
    })();


    class HostStatusesCache {
        constructor(requiredHosts, timeout = 2000) {
            this.requiredHosts = requiredHosts;
            this.timeout = timeout;
            this.hostStatusCache = {};
        }

        async checkHosts() {
            const status = {};
            await Promise.all(
                this.requiredHosts.map(async (host) => {
                    const controller = new AbortController();
                    const id = setTimeout(() => controller.abort(), this.timeout);

                    try {
                        const res = await fetch(host, {
                            method: "HEAD",
                            signal: controller.signal,
                        });
                        status[host] = true;
                    } catch (err) {
                        if (err.name === "AbortError") {
                            // True hang: firewall/drop/etc.
                            status[host] = false;
                        } else {
                            // Any other error means we reached something (CORS, DNS failure, RST, etc.)
                            status[host] = true;
                        }
                    } finally {
                        clearTimeout(id);
                    }
                })
            );
            this.hostStatusCache = status;
            return status;
        }

        getHostStatusCache() {
            return this.hostStatusCache;
        }

        showAlertForUnreachableHosts() {
            const unreachableHosts = Object.entries(this.hostStatusCache)
                .filter(([_, status]) => !status)
                .map(([host]) => host);

            if (unreachableHosts.length > 0) {
                const list = unreachableHosts.map(h => `• ${h}`).join("\n");
                alert(
                    `Uh-oh! We tried to talk to these services but they didn’t respond:\n\n${list}\n\n` +
                    `Please check your internet connection or firewall settings, then try again.`
                );
            }
        }
    }

    const requiredHosts = [
        "https://stretch3.github.io/",
        "https://updates.robotical.io/",
        "https://martyblocks-projects-default-rtdb.europe-west1.firebasedatabase.app/",
        "https://synthesis-service.scratch.mit.edu/",
        "https://translate-service.scratch.mit.edu/",
        "https://marty-webapp.web.app/",
        "https://assets.scratch.mit.edu/internalapi/asset/84c5e22b4303c7c1fb707125706c9aaa.png/get/",
        "https://storage.googleapis.com/",

    ];

    // Attach the singleton to window so you can import it elsewhere if needed
    window.__hostStatusesCache = new HostStatusesCache(requiredHosts, 2000);

    // // Run the initial check exactly once
    // window.__hostStatusesCache
    //     .checkHosts()
    //     .then(() => window.__hostStatusesCache.showAlertForUnreachableHosts());
}

module.exports = window.__hostStatusesCache;