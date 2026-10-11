# Batch collection from CSV

Import URLs, track individual failures and export the batch.

## 1. Prepare CSV

Use up to 500 rows of public HTTPS URLs in a file up to 1 MiB. Recognized headers: url, link, website or site; without a header, the first column is used. Comma and semicolon delimiters are detected. Repeated normalized URLs are removed.

```text
url
https://example.com/
https://example.org/
```


## 2. Review URLs and estimate

Open Batch collection, upload/paste CSV and use Review URLs and estimate. Fix every invalid row before starting. Internal targets, IP literals, custom ports and URL credentials are rejected.

- [/app/batches](https://deepsfetch.com/app/batches)


## 3. Start with a budget

Enter name, active workspace key and an integer cap of at least 3 credits per unique URL. This flow uses the legacy HTML path, separate from the one-credit auto engine. Estimate and monthly policy may still block it. Up to 10 queued/running/paused batches per workspace.


## 4. Track, pause and recover

Open the batch and inspect position/url/status/job/error per item. Pausing prevents future advancement; submitted requests may continue. Resume the same batch after reviewing errors. Do not recreate the whole CSV because one URL failed.


## 5. Export JSON or CSV

Download through the view. JSON contains state/results; CSV contains url, status, error and markdown. Potential spreadsheet formula values are protected during export. Inspect row failures. Batch creation uses dashboard session; there is no public /v2/batch/scrape endpoint.


## Troubleshooting

csv_too_large/too_many_urls: split the file. invalid_csv_urls: fix preview rows. insufficient_batch_cap: review 3×unique URLs. active_batch_limit: finish or resume existing batches. encryption_unavailable requires operator action.

## Continue your integration

- [Playground, history and export](https://deepsfetch.com/docs/playground)
- [Credits, estimates, cache and caps](https://deepsfetch.com/docs/costs)
- [API responses, artifacts and errors](https://deepsfetch.com/docs/api-results)
