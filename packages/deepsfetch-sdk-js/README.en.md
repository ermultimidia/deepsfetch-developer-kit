[English](README.md) | [Português](README.pt.md)

# DeepSFetch JavaScript SDK

Official JavaScript client for DeepSFetch API v2. It uses the built-in `fetch` API and has no runtime dependencies. Node.js 20 or newer is required.

```sh
npm install @deepsfetch/sdk
```

```js
import { DeepSFetchClient } from "@deepsfetch/sdk";

const client = new DeepSFetchClient({ apiKey: process.env.DEEPSFETCH_API_KEY });
const job = await client.scrape(
  { url: "https://example.com/", formats: ["markdown"], plannedLane: "http_basic", async: true },
  { idempotencyKey: "example-domain-check-2026-01" },
);
const result = job.status === "completed" ? job : await client.waitForJob(job.id);
console.log(result.result);
```

The client also provides `extract`, `search`, `map`, `crawl`, `interact`, `watch`, `estimateCost`, `getJob`, `cancelJob`, and `waitForJob`. POST requests are not retried automatically; pass an idempotency key when retrying a billable operation. Errors are `DeepSFetchError` instances with `status`, `code`, `details`, and `requestId`.

Set `baseUrl` to use another compatible API host and `timeoutMs` to change the per-request timeout. A custom `fetch` implementation can be injected for tests or nonstandard runtimes.
