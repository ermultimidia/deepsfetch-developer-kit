# Search: Web, News, Images and categories

Find URLs and metadata. Collecting each destination’s content is a separate step.

## 1. Prepare

Choose sources and cap before running. Limit is 1–20 results per source, default 10. Search requires Brave or Tavily configured by the operator.

- [Start here: account → key → first result](https://deepsfetch.com/docs/getting-started)
- [Account, workspace and keys](https://deepsfetch.com/docs/authentication)


## 2. Execute step by step

Follow the sequence and check each step’s outcome.

1. Set query and distinct sources: web, news, images, developer and research. Use sources to combine them.
2. Estimate /v2/cost/estimate with kind=search and identical sources. Web, News and Images each represent 30-credit units; Developer/Research share the Web unit.
3. Submit with scrapeResults=false and save id. Poll the job; inspect returned results, sourceResults and billing.
4. Select relevant URLs and collect them with separate scrape jobs. Images may link to the file and, when available, pageUrl.


## 3. Submit the request

Bash/macOS/Linux. For PowerShell, use the getting-started curl.exe and JSON-file example. Change the run identifier before starting new work.

```text
curl --fail-with-body "https://api.deepsfetch.com/v2/search" \
  -H "Authorization: Bearer $DEEPSFETCH_API_KEY" \
  -H "Content-Type: application/json" \
  -H "Idempotency-Key: REPLACE_WITH_UNIQUE_RUN_ID" \
  --data '{
  "query": "documentação de APIs",
  "sources": [
    "web",
    "developer",
    "research"
  ],
  "limit": 5,
  "scrapeResults": false,
  "costControl": {
    "maxCredits": 30
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
| query | Required; string.  Nonempty query; up to 1,000 characters on the current provider. |
| limit | Optional; integer. minimum=1; maximum=20; default=10 See this service’s example and limits. |
| scrapeResults | Optional; boolean. values: false Only false. Destination collection requires a separate /v2/scrape. |
| source | Optional; web, news or images; default web. Single-search compatibility. sources enables combinations. |
| category | Optional; enum. values: general, developer, research; default="general" Single-search compatibility. developer/research filter Web domains; news/images require general. |
| sources | Optional; array. minItems=1; maxItems=5; items=web, news, images, developer, research Select distinct sources. Web, News and Images are billed per source; Developer/Research share the Web unit. |


## 4. Retrieve and interpret

Web results include url/title/description/source; News may include publishedAt; Images includes imageUrl/thumbnailUrl and pageUrl when available. Developer and Research use domain filters, not a specialized academic index or a ranking guarantee.

```text
curl --fail-with-body "https://api.deepsfetch.com/v2/jobs/JOB_ID" \
  -H "Authorization: Bearer $DEEPSFETCH_API_KEY"
```

- [Jobs: track, resume and cancel](https://deepsfetch.com/docs/jobs)
- [API responses, artifacts and errors](https://deepsfetch.com/docs/api-results)


## Limits and cost

A successful search with no matches is still billed. All requested sources must complete. web+developer+research uses one Web unit (30); news+research uses News+Web (60); all five sources cost 90. category/source support single-source compatibility; news/images require category=general.

- [Credits, estimates, cache and caps](https://deepsfetch.com/docs/costs)


## Failures and recovery

invalid_search_sources: check values/duplicates. invalid_search_limit: use 1–20. search_scraping_separate: use false and separate scrape. task_limit_exceeded: estimate all selected sources. Provider failure is not a completed search.

## Continue your integration

- [Common options and actual compatibility](https://deepsfetch.com/docs/common-options)
- [Webhooks: signing and delivery](https://deepsfetch.com/docs/webhooks)
- [Playground, history and export](https://deepsfetch.com/docs/playground)
