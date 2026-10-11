# Common options and actual compatibility

Understand which settings work on each path.

## Choose the path

Automatic engine is opt-in over HTTP and current default in Playground. Requests without collectionEngine continue through the legacy adapter. Do not apply one path’s limits to another.

| Field / status | Behavior |
| --- | --- |
| collectionEngine=auto | One credit per valid page; inline content; browser included; fresh; supports caps. |
| collectionEngine=premium | 12 credits; valid prior offer and consent; no screenshot. |
| legado HTML / plannedLane | HTTP 3 / CF browser 8 / Unlocker 12 / managed 18; output may reference artifacts. |
| legado render / interact | Separate runtime; does not support credit caps. |
| search | 30 per Web/News/Images unit; supports costControl.maxCredits. |
| watch V2 | Legacy creation; request cap unsupported; recurring cost separate. |


## Headers and idempotency

Use Authorization: Bearer, Content-Type: application/json for JSON bodies and Idempotency-Key for V2 creations. Preserve body/key when retrying the same operation. A new intent needs a new key. Never put secrets in URLs. n8n adapters receive body idempotencyKey.


## Accepted fields without effect

geo, session and device are not forwarded by the HTML adapter or supported runtime configuration. scrape json/jsonSchema do not implement structured extraction. render.waitMs/waitFor/timeoutMs do not replace top-level legacy runtime timeoutMs/waitUntil. watch.changeThreshold and webhook.metadata do not implement the behavior their names suggest.


## Cache, sessions and budget

Cache prefer means eligible reuse, not a hit guarantee. Auto engine uses fresh. taskId groups budget; Idempotency-Key avoids duplicate intent. Legacy session.id does not create persistent sessions. Check cap support by path and account for BYOK external costs separately.

## Continue your integration

- [Scrape: URL to content](https://deepsfetch.com/docs/scrape)
- [Interact: run browser actions](https://deepsfetch.com/docs/interact)
- [Credits, estimates, cache and caps](https://deepsfetch.com/docs/costs)
