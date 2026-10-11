const DEFAULT_BASE_URL = "https://api.deepsfetch.com";
const TERMINAL_STATUSES = new Set(["completed", "failed", "cancelled"]);

export class DeepSFetchError extends Error {
  constructor(message, { status = 0, code = "request_failed", details = null, requestId = null, cause } = {}) {
    super(message, { cause });
    this.name = "DeepSFetchError";
    this.status = status;
    this.code = code;
    this.details = details;
    this.requestId = requestId;
  }
}

/** JavaScript client for the DeepSFetch API v2. Requires Node.js 20+ or fetch support. */
export class DeepSFetchClient {
  constructor({ apiKey, baseUrl = DEFAULT_BASE_URL, timeoutMs = 30_000, fetch: fetchImpl = globalThis.fetch } = {}) {
    if (typeof apiKey !== "string" || !apiKey.trim()) throw new TypeError("apiKey is required");
    if (typeof fetchImpl !== "function") throw new TypeError("A fetch implementation is required");
    if (!Number.isInteger(timeoutMs) || timeoutMs < 1) throw new TypeError("timeoutMs must be a positive integer");
    this.apiKey = apiKey.trim();
    this.baseUrl = new URL(baseUrl);
    this.baseUrl.pathname = this.baseUrl.pathname.replace(/\/+$/, "");
    this.timeoutMs = timeoutMs;
    this.fetch = fetchImpl;
  }

  async request(path, { method = "GET", body, idempotencyKey, headers = {}, signal } = {}) {
    const url = new URL(path.replace(/^\/+/, ""), `${this.baseUrl.href.replace(/\/+$/, "")}/`);
    const requestHeaders = new Headers(headers);
    requestHeaders.set("authorization", `Bearer ${this.apiKey}`);
    requestHeaders.set("accept", "application/json");
    if (body !== undefined) requestHeaders.set("content-type", "application/json");
    if (idempotencyKey) requestHeaders.set("idempotency-key", idempotencyKey);

    const timeoutSignal = AbortSignal.timeout(this.timeoutMs);
    const requestSignal = signal ? AbortSignal.any([signal, timeoutSignal]) : timeoutSignal;
    let response;
    try {
      response = await this.fetch(url, {
        method,
        headers: requestHeaders,
        ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
        signal: requestSignal,
      });
    } catch (cause) {
      const timedOut = timeoutSignal.aborted && !signal?.aborted;
      throw new DeepSFetchError(timedOut ? `Request timed out after ${this.timeoutMs}ms` : "Could not reach DeepSFetch", {
        status: timedOut ? 408 : 0,
        code: timedOut ? "request_timeout" : "network_error",
        cause,
      });
    }

    const text = await response.text();
    let data = null;
    if (text) {
      try { data = JSON.parse(text); } catch { data = text; }
    }
    if (!response.ok) {
      const error = data && typeof data === "object" ? data.error : null;
      const nested = error && typeof error === "object" ? error : null;
      const code = nested?.code || (typeof error === "string" ? error : null) || "request_failed";
      const message = nested?.message || data?.message || (typeof data === "string" ? data : null) || `DeepSFetch returned HTTP ${response.status}`;
      throw new DeepSFetchError(message, {
        status: response.status,
        code,
        details: data?.details ?? nested?.details ?? null,
        requestId: response.headers.get("x-request-id") || response.headers.get("cf-ray"),
      });
    }
    return data;
  }

  post(path, body, options = {}) { return this.request(path, { ...options, method: "POST", body }); }
  scrape(body, options) { return this.post("/v2/scrape", body, options); }
  extract(body, options) { return this.post("/v2/extract", body, options); }
  search(body, options) { return this.post("/v2/search", body, options); }
  map(body, options) { return this.post("/v2/map", body, options); }
  crawl(body, options) { return this.post("/v2/crawl", body, options); }
  interact(body, options) { return this.post("/v2/interact", body, options); }
  watch(body, options) { return this.post("/v2/watch", body, options); }
  estimateCost(body, options) { return this.post("/v2/cost/estimate", body, options); }

  getJob(jobId, options) {
    return this.request(`/v2/jobs/${encodeURIComponent(jobId)}`, options);
  }

  cancelJob(jobId, options) {
    return this.post(`/v2/jobs/${encodeURIComponent(jobId)}/cancel`, {}, options);
  }

  async waitForJob(jobId, { intervalMs = 2_000, maxWaitMs = 15 * 60_000, signal } = {}) {
    const started = Date.now();
    while (Date.now() - started <= maxWaitMs) {
      const job = await this.getJob(jobId, { signal });
      if (TERMINAL_STATUSES.has(job?.status)) return job;
      const remaining = maxWaitMs - (Date.now() - started);
      if (remaining <= 0) break;
      await new Promise((resolve, reject) => {
        const timer = setTimeout(resolve, Math.min(intervalMs, remaining));
        if (signal) {
          const abort = () => { clearTimeout(timer); reject(signal.reason || new DOMException("Aborted", "AbortError")); };
          if (signal.aborted) abort();
          else signal.addEventListener("abort", abort, { once: true });
        }
      });
    }
    throw new DeepSFetchError(`Job ${jobId} did not finish within ${maxWaitMs}ms`, { status: 408, code: "job_wait_timeout" });
  }
}
