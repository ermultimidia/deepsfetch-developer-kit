# Scrape: URL to content

Collect one page. Explicitly choose the current automatic engine or the legacy path.

## 1. Prepare

Have an active key, balance and a simple public URL. The example uses the automatic engine with a one-credit cap.

- [Start here: account → key → first result](https://deepsfetch.com/docs/getting-started)
- [Account, workspace and keys](https://deepsfetch.com/docs/authentication)


## 2. Execute step by step

Follow the sequence and check each step’s outcome.

1. Set collectionEngine=auto. engineStrategy=auto uses HTML with an included browser attempt; basic uses direct HTML; enhanced uses browser.
2. Choose only needed formats. Submit once with a unique idempotency key and save the public id.
3. Poll to a terminal state. Auto engine returns requested result.markdown, result.html or result.links and result.billing.
4. Check final URL, content and quality. An engine failure may return premiumOffer; an offer does not execute or authorize premium.


## 3. Submit the request

Bash/macOS/Linux. For PowerShell, use the getting-started curl.exe and JSON-file example. Change the run identifier before starting new work.

```text
curl --fail-with-body "https://api.deepsfetch.com/v2/scrape" \
  -H "Authorization: Bearer $DEEPSFETCH_API_KEY" \
  -H "Content-Type: application/json" \
  -H "Idempotency-Key: REPLACE_WITH_UNIQUE_RUN_ID" \
  --data '{
  "url": "https://example.com",
  "collectionEngine": "auto",
  "engineStrategy": "auto",
  "formats": [
    "markdown"
  ],
  "costControl": {
    "maxCredits": 1,
    "allowFallback": false,
    "cacheMode": "fresh"
  },
  "async": true
}'
```


## Fields and nested options

Child fields are required only when their parent object is present. Legacy fields and incompatibilities are marked; schema acceptance does not imply implementation on every path.

| Field / status | Behavior |
| --- | --- |
| async | Optional; boolean. default=false Requests asynchronous execution. Save id before retrieving results. |
| webhook | Optional; union.  Terminal notification; secret and signature in /docs/webhooks. |
| webhook.url | Required; string.  Public URL; network policy rejects internal targets and embedded credentials. |
| webhook.secret | Required; string. minLength=16 See this service’s example and limits. |
| webhook.metadata | Optional; object.  Legacy: not included in delivered events. |
| geo | Optional; object.  Legacy; no effect on the current HTML adapter/runtime. |
| geo.country | Optional; string.  See this service’s example and limits. |
| geo.region | Optional; string.  See this service’s example and limits. |
| geo.city | Optional; string.  See this service’s example and limits. |
| geo.language | Optional; string.  See this service’s example and limits. |
| session | Optional; object.  Legacy: does not create a persistent browser session. |
| session.id | Required; string.  See this service’s example and limits. |
| session.ttlSeconds | Optional; integer. minimum=60; maximum=86400 See this service’s example and limits. |
| device | Optional; enum. values: desktop, mobile, tablet Legacy; device customization is not implemented. |
| render | Optional; union.  Selects browser on legacy scrape. With auto engine use engineStrategy; nested options do not configure runtime. |
| render[2].waitMs | Optional; integer.  See this service’s example and limits. |
| render[2].waitFor | Optional; string.  See this service’s example and limits. |
| render[2].timeoutMs | Optional; integer.  Legacy runtime option; rejected by auto engine. Separate from HTTP client timeout. |
| costControl | Optional; object.  Additional cap; check path compatibility in /docs/costs. |
| costControl.maxCredits | Optional; integer. minimum=0; maximum=1000000000 DeepSFetch credit cap, separate from external BYOK costs. |
| costControl.cacheMode | Optional; enum. values: fresh, prefer fresh collects again; prefer allows eligible reuse. Auto engine uses fresh. |
| costControl.maxAgeSeconds | Optional; integer. minimum=0; maximum=86400 Desired maximum age; subject to cache eligibility. |
| costControl.allowFallback | Optional; boolean.  false prevents cost escalation on supported paths. |
| costControl.taskId | Optional; string. minLength=1; maxLength=160; pattern="^[a-zA-Z0-9:_-]+$" Groups workspace budget; use a new ID per logical run. This is not an idempotency key. |
| url | Required; string.  Public URL; network policy rejects internal targets and embedded credentials. |
| formats | Optional; array. items=markdown, html, links, screenshot, json Auto engine: html, markdown, links, screenshot. Legacy HTML: html/markdown. json does not produce structured JSON. |
| jsonSchema | Optional; object.  Legacy; not processed by scrape. Use extract or validated extraction. |
| plannedLane | Optional; enum. values: http_basic, cf_browser, unlocker_http, managed_browser; default="http_basic" Legacy lane: http_basic, cf_browser, unlocker_http or managed_browser. |
| timeoutMs | Optional; integer. minimum=1000; maximum=60000; default=30000 Legacy runtime option; rejected by auto engine. Separate from HTTP client timeout. |
| waitUntil | Optional; enum. values: domcontentloaded, load, networkidle0, networkidle2; default="domcontentloaded" Legacy runtime navigation condition; rejected by auto engine. |
| fullPage | Optional; boolean. default=true Path-specific screenshot setting; auto engine rejects fullPage=true. |
| collectionEngine | Optional; enum. values: auto, premium auto: one-credit engine per valid page. premium: requires a previous offer and 12-credit consent. |
| engineStrategy | Optional; enum. values: auto, basic, enhanced; default="auto" auto tries HTML/browser; basic restricts to HTML; enhanced selects browser. |
| premiumSourceJobId | Optional; string.  Public failed scrape ID containing the premium offer. |
| premiumConsent | Optional; object.  Explicit consent; credits must equal 12. |
| premiumConsent.credits | Required; const. value: 12 See this service’s example and limits. |


## 4. Retrieve and interpret

Auto engine returns inline content in result and provider=collection_engine. The legacy path may return result.result with r2:// markdownArtifactKey/htmlArtifactKey. These shapes are not interchangeable. JSON examples are illustrative; IDs and content vary.

```text
curl --fail-with-body "https://api.deepsfetch.com/v2/jobs/JOB_ID" \
  -H "Authorization: Bearer $DEEPSFETCH_API_KEY"
```

- [Jobs: track, resume and cancel](https://deepsfetch.com/docs/jobs)
- [API responses, artifacts and errors](https://deepsfetch.com/docs/api-results)


## Limits and cost

Auto engine: HTML up to 512 KiB; result up to 850,000 bytes; up to 500 links. Rejects actions, headers, cookies, object render, timeoutMs, waitUntil, jsonSchema and fullPage=true. Uses fresh collection without cache. Structured JSON requires extract. Premium requires a valid offer for the same URL/formats and 12-credit consent.

- [Credits, estimates, cache and caps](https://deepsfetch.com/docs/costs)


## Failures and recovery

engine_unsupported_options: remove incompatible settings or choose the appropriate path. page_too_large/unsupported_content_type: narrow the target or use the file reader. premium_offer_invalid: check source job, URL and formats. Network failures do not justify a new charge without checking the job.

## Continue your integration

- [Common options and actual compatibility](https://deepsfetch.com/docs/common-options)
- [Webhooks: signing and delivery](https://deepsfetch.com/docs/webhooks)
- [Playground, history and export](https://deepsfetch.com/docs/playground)
