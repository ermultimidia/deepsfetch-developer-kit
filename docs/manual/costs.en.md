# Credits, estimates, cache and caps

Understand planned ceilings, reservations and recorded usage.

## Configure caps

Open Cost controls. The owner or an administrator can set monthly and task caps, cache mode and maximum age. Usage months use UTC. Available budget accounts for spent credits and active reservations; a reservation is not a final charge. The effective cap is the lowest applicable policy. A credit cap is not the subscription’s monetary balance.

- [/app/costs](https://deepsfetch.com/app/costs)
- [/pricing](https://deepsfetch.com/pricing)


## Estimate without executing

POST /v2/cost/estimate uses Bearer and starts no collection. kind supports fetch, scrape, map, crawl, collection, structured, extract and search. Include collectionEngine/engineStrategy for auto engine and sources/source/category for search. Inspect min/max, allowed/reason, components and monthly. max is an estimated cap, not a promised charge.

```text
curl https://api.deepsfetch.com/v2/cost/estimate \
  -H "Authorization: Bearer $DEEPSFETCH_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "kind": "scrape",
  "plannedLane": "http_basic",
  "costControl": {
    "maxCredits": 3,
    "cacheMode": "fresh",
    "allowFallback": false
  }
}'
```


## costControl fields

Quickstart forces allowFallback=false. In the general estimator, omitting allowFallback allows consideration of fallback up to the most expensive lane; set false to restrict this. taskId groups steps of the same task within a workspace: use a new ID per logical run to avoid accumulating budgets across days. Idempotency is separate from this grouping.

| Field / status | Behavior |
| --- | --- |
| maxCredits | Integer 0–1,000,000,000; additional task cap. |
| cacheMode | fresh requests a fresh fetch; prefer allows eligible reuse. |
| maxAgeSeconds | Integer 0–86,400. Cache depends on eligibility and availability. |
| allowFallback | Boolean; false restricts fallback. |
| taskId | 1–160 characters: letters, digits, :, _ and -. |


## Where caps are supported

Compatible scrape/fetch, map, crawl, extract, auto engine, current search, quickstart and collections support controls. Legacy browser/interact runtime and V2 watch creation do not support request caps; applicable policy may reject with cost_operation_unsupported. Do not silently remove a required policy. Price monitors and recurring collection use separate budgeting flows.


## Reference rates and troubleshooting

Auto engine: one credit per valid page including browser attempt; authorized premium: 12. Legacy lanes: HTTP 3, cf_browser 8, unlocker_http 12, managed_browser 18, eligible cache 1. Discovery: one per HTTP unit or four for cf_browser. Search: 30 per Web/News/Images unit; Developer/Research share Web. Managed AI estimator uses 4–5; BYOK charges externally. Review estimate and actual usage before recurrence.


## Step by step: budget before execution

Current Search and auto engine have their own cost controls. Legacy runtime restrictions should not be applied to them.

1. Choose the exact path and copy its parameters into the estimate. Include collectionEngine=auto for auto engine and identical sources for search.
2. Call /v2/cost/estimate. Check allowed/reason, min/max, components, assumptions, balance and monthly. It starts no collection.
3. Set per-run cap and monthly policy for your volume. For multiple steps use a new taskId per intent, separate from idempotency.
4. Submit and inspect usage/reservations after completion. An upper-bound estimate is not an upfront debit or a monetary charge.
5. Before scheduling estimate check frequency and leave margin for discovery/failures. External BYOK and own-provider connectors require separate budgeting.

```text
curl --fail-with-body "https://api.deepsfetch.com/v2/cost/estimate" \
  -H "Authorization: Bearer $DEEPSFETCH_API_KEY" \
  -H "Content-Type: application/json" \
  -H "Idempotency-Key: REPLACE_WITH_UNIQUE_RUN_ID" \
  --data '{
  "kind": "scrape",
  "collectionEngine": "auto",
  "costControl": {
    "maxCredits": 1,
    "allowFallback": false,
    "cacheMode": "fresh"
  }
}'
```

## Continue your integration

- [Plans, subscription and billing](https://deepsfetch.com/docs/billing)
- [Integrations and your AI key — BYOK](https://deepsfetch.com/docs/byok)
- [/guides/repeatable-workflows](https://deepsfetch.com/guides/repeatable-workflows)
