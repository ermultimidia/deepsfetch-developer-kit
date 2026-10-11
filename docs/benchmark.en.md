[Português](benchmark.md) | [English](benchmark.en.md)

# Reproducible operational smoke test

Set your API key as shown in the README, then run:

```sh
node examples/benchmark.mjs > result.json
```

The script collects three public pages sequentially with HTTP, fresh cache, fallback disabled and a three-credit cap per page: up to nine credits total. Use a test account. You may pass up to ten URLs as arguments. Check printed job IDs and idempotency keys before resubmitting an interrupted run.

The report measures completion, time to result and artifact metadata presence. It does not measure Markdown accuracy, JavaScript coverage, AI extraction or reliability at scale. There is one run per page, no statistical distribution, and two-second polling intervals. An `r2://` reference is not a public download URL.

The [initial results](../benchmarks/smoke-20261011.json) cover DeepSFetch only. Firecrawl was not tested. A future comparison needs identical pages and conditions, content-quality measures, failures and costs.
