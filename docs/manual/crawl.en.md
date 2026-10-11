# Crawl: collect multiple pages

Discover and collect pages in an asynchronous run.

## 1. Prepare

Start with two pages and a specific root. Estimate discovery plus collection; a page limit alone is not a credit cap.

- [Start here: account → key → first result](https://deepsfetch.com/docs/getting-started)
- [Account, workspace and keys](https://deepsfetch.com/docs/authentication)


## 2. Execute step by step

Follow the sequence and check each step’s outcome.

1. Set url, limit and scope filters. Request async=true and compatible costControl.
2. Save the id from HTTP 202; poll the same job. Do not resubmit to obtain an update.
3. On completed, inspect provider result.status, valid page count and individual failures. completed_partial may appear as outer completed.
4. Validate sample pages and export through the dashboard when results contain artifact references. Use Collections for updates/versioning.


## 3. Submit the request

Bash/macOS/Linux. For PowerShell, use the getting-started curl.exe and JSON-file example. Change the run identifier before starting new work.

```text
curl --fail-with-body "https://api.deepsfetch.com/v2/crawl" \
  -H "Authorization: Bearer $DEEPSFETCH_API_KEY" \
  -H "Content-Type: application/json" \
  -H "Idempotency-Key: REPLACE_WITH_UNIQUE_RUN_ID" \
  --data '{
  "url": "https://example.com",
  "limit": 2,
  "costControl": {
    "maxCredits": 10,
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
| limit | Optional; integer. minimum=1; maximum=500 See this service’s example and limits. |
| include | Optional; array.  Discovery glob patterns; use paths such as /docs/*. |
| exclude | Optional; array.  Glob patterns excluded from discovery. |
| maxDepth | Optional; integer. minimum=0; maximum=10 Link depth. Configure before increasing batch size. |
| includeSubdomains | Optional; boolean.  Allows discovery across subdomains, subject to provider policy. |
| respectRobots | Optional; boolean.  Respects robots.txt during discovery. |
| useSitemap | Optional; boolean.  Enables sitemap discovery. |


## 4. Retrieve and interpret

Content is provider-specific and may include internal page references. V2 provides no universal result pagination or all-content-inline guarantee. Use Collection feeds for machine-consumable content/chunks.

```text
curl --fail-with-body "https://api.deepsfetch.com/v2/jobs/JOB_ID" \
  -H "Authorization: Bearer $DEEPSFETCH_API_KEY"
```

- [Jobs: track, resume and cancel](https://deepsfetch.com/docs/jobs)
- [API responses, artifacts and errors](https://deepsfetch.com/docs/api-results)


## Limits and cost

Effective limit 1–500. Acceptance does not confirm collection; completion does not guarantee all expected pages are valid. Public cancellation does not guarantee internal execution stops.

- [Credits, estimates, cache and caps](https://deepsfetch.com/docs/costs)


## Failures and recovery

provider_limit_exceeded: reduce the batch. partial: inspect failed URLs before retrying; preserve valid results. Credit cap: review budget and reservations in Cost controls.

## Continue your integration

- [Common options and actual compatibility](https://deepsfetch.com/docs/common-options)
- [Webhooks: signing and delivery](https://deepsfetch.com/docs/webhooks)
- [Playground, history and export](https://deepsfetch.com/docs/playground)
