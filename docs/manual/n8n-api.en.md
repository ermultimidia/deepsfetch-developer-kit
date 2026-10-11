# n8n template HTTP contract

Start, query and estimate collection for the three templates without a dashboard session.

## Connection and operations

Use https://deepsfetch.com/integration/n8n and Bearer with the workspace key. GET /connection checks credentials and returns connected and workspaceId. POST /start, /result and /estimate require JSON. These routes belong to the dashboard domain, not the api domain. The custom node offers Start Collection, Get Result and Estimate Credits.

```text
curl https://deepsfetch.com/integration/n8n/connection \
  -H "Authorization: Bearer $DEEPSFETCH_API_KEY"
```


## Configuration

config requires template (price, documentation or catalog) and url. fields is optional and defaults to template fields. Fields follow the validated extraction contract. maxItems ranges from 1 to 100 (default 50); itemSelector enables CSS catalogs with relative field selectors. Each run handles one URL without pagination or JavaScript. The flow forces allowFallback=false.

```text
{
  "config": {
    "template": "documentation",
    "url": "https://example.com",
    "fields": [
      {
        "name": "title",
        "type": "string",
        "required": true,
        "source": "css",
        "path": "h1"
      },
      {
        "name": "content",
        "type": "string",
        "required": true,
        "source": "css",
        "path": "body"
      }
    ],
    "costControl": {
      "maxCredits": 3,
      "cacheMode": "fresh",
      "allowFallback": false
    }
  },
  "idempotencyKey": "example-run-0001"
}
```


## Start and poll

Send the example to POST /start with Content-Type: application/json. idempotencyKey accepts 8–160 characters: letters, digits, :, _ and -. Preserve it when retrying the same run. The 202 response contains id, status and normalized config. Send {id,config} to POST /result, preserving the returned configuration. Wait between polls; queued/running are not ready results. failed/cancelled require stopping consumption. For completed, check result.valid and fields before writing to the destination.


## Preview, reprocessing and errors

POST /estimate takes {config} and does not start a fetch. POST /result reads the completed job source and allows field review on the same fetch; the URL must match the source. source_mismatch means a different URL; source_too_large means source over 2 MB; invalid_selector requires CSS review. Templates wait between polls and have a 15-minute timeout. n8n timeout does not stop the internal job: continue with the same ID before starting another.


## Installation and activation in n8n

Use the n8n guide to import a workflow and configure credentials. Package n8n-nodes-deepsfetch 0.1.0 is published on npm for self-hosted n8n. It is not verified by n8n. The HTTP-node workflow avoids this dependency. There is no certified n8n version matrix: test your version before activation. Manual tests do not persist comparison state; the first automatic run sets the baseline. Avoid overlapping runs or use a durable database. Connect your alert or AI destination node: email, embeddings and chatbots are not provisioned automatically.

- [/docs/n8n](https://deepsfetch.com/docs/n8n)
- [/app/start](https://deepsfetch.com/app/start)
- [/downloads/n8n-nodes-deepsfetch-0.1.0.tgz](https://deepsfetch.com/downloads/n8n-nodes-deepsfetch-0.1.0.tgz)


## Step by step for the existing contract

The n8n workflow was previously validated. This section documents usage without starting another test or use case.

1. Configure Bearer credentials and verify GET /integration/n8n/connection on deepsfetch.com.
2. Choose price/documentation/catalog and set URL/fields/maxItems/itemSelector according to the contract.
3. Estimate with POST /estimate and config. POST /start using identical config and a unique idempotencyKey.
4. Save id and poll POST /result with id and the same config. Do not call /start again for updates.
5. Inspect result.valid, items[].validation/data, warnings and truncated before storing; null is not a confirmed extracted value.

## Continue your integration

- [Validated field extraction](https://deepsfetch.com/docs/validated-extraction)
- [Credits, estimates, cache and caps](https://deepsfetch.com/docs/costs)
- [Automatically updated collections](https://deepsfetch.com/docs/collections)
- [/support](https://deepsfetch.com/support)
