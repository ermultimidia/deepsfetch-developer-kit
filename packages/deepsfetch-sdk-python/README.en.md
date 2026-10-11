[Português](README.md) | [English](README.en.md)

# DeepSFetch Python SDK

Dependency-free Python 3.10+ client for the hosted DeepSFetch API v2.

The PyPI release is pending. From the developer kit repository root, install the included source:

```sh
python -m pip install ./packages/deepsfetch-sdk-python
```

```python
import os
import uuid
from deepsfetch_sdk import DeepSFetchClient

client = DeepSFetchClient(os.environ["DEEPSFETCH_API_KEY"])
job = client.scrape(
    {"url": "https://example.com/", "formats": ["markdown"], "plannedLane": "http_basic",
     "async": True, "costControl": {"maxCredits": 3, "allowFallback": False}},
    idempotency_key=str(uuid.uuid4()),
)
print("Job ID:", job["id"])
result = job if job["status"] in ("completed", "failed", "cancelled") else client.wait_for_job(job["id"])
if result["status"] != "completed":
    raise RuntimeError("Collection did not complete; inspect the same job ID")
print(result["result"])
```

Collection consumes DeepSFetch workspace credits. This example is for public HTML pages, without browser fallback. Keep the returned job ID to resume polling rather than creating another collection.

The client also provides `extract`, `search`, `map`, `crawl`, `interact`, `watch`, `estimate_cost`, `get_job`, `cancel_job`, and `wait_for_job`. POST calls are not retried automatically. Preserve the same idempotency key when retrying the same submission. Errors are `DeepSFetchError` instances with `status`, `code`, `details`, and `request_id`.
