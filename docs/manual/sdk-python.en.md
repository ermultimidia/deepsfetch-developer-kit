# Python SDK: install and retrieve jobs

Install from the published kit and preserve IDs between runs.

## 1. Install from the repository

Requires Python 3.10+. The package was not found on PyPI in this review; use developer-kit source. Clone, enter its folder and install the subdirectory below in a virtual environment. Do not rely on pip install deepsfetch-sdk until publication is confirmed.

```text
git clone https://github.com/ermultimidia/deepsfetch-developer-kit.git
cd deepsfetch-developer-kit
python -m venv .venv
# PowerShell: .venv\Scripts\Activate.ps1
# Bash: source .venv/bin/activate
python -m pip install ./packages/deepsfetch-sdk-python
```


## 2. Execute and check completion

Set DEEPSFETCH_API_KEY, save as collect.py and run python collect.py. SDK returns dictionaries; inspect status before consuming result.

```text
import os, json, uuid
from deepsfetch_sdk import DeepSFetchClient
client = DeepSFetchClient(os.environ['DEEPSFETCH_API_KEY'])
job = client.scrape(json.loads('''{
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
}'''), idempotency_key=str(uuid.uuid4()))
print('jobId:', job['id'], flush=True)  # Save before waiting.
done = client.wait_for_job(job['id'])
if done['status'] != 'completed':
    raise RuntimeError(done.get('error') or done['status'])
print(json.dumps(done['result'], ensure_ascii=False, indent=2))
```


## 3. Retrieve and recover

Save job["id"]. Use get_job(id) or wait_for_job(id) after power loss. Methods: scrape/extract/search/map/crawl/interact/watch, estimate_cost, get_job, cancel_job, wait_for_job. DeepSFetchError exposes status/code/details/request_id. POST is not automatically retried.

## Continue your integration

- [JavaScript SDK: install, execute and resume](https://deepsfetch.com/docs/sdk-javascript)
- [Jobs: track, resume and cancel](https://deepsfetch.com/docs/jobs)
- [API responses, artifacts and errors](https://deepsfetch.com/docs/api-results)
