[Português](comparison.md) | [English](comparison.en.md)

# DeepSFetch and Firecrawl: small reproducible comparison

On October 11, 2026, we ran five public targets twice per service, using workspace/API keys, fresh Markdown requests, sequential calls, and alternating which provider went first in each round. The results below were collected before the parser-write detection fix. They show gaps we need to address, rather than product parity.

| Measurement | DeepSFetch | Firecrawl |
| --- | --- | --- |
| Requests reaching completed | 10/10 | 10/10 |
| Expected strings present across all outputs | 22/30 | 30/30 |
| Median time to result | 10.46 s | 1.49 s |
| Reported credits used | 10 DeepSFetch credits | 10 Firecrawl credits |

Credits are different provider units, not comparable monetary prices. Completion is different from useful content. Thirty matched strings are not a general accuracy or reliability score.

## Reproduce with your own keys

Set `DEEPSFETCH_API_KEY` and `FIRECRAWL_API_KEY` in your terminal environment, then run:

```sh
node examples/compare.mjs comparison-local.json
```

The script makes at most ten collection requests per service. DeepSFetch uses `collectionEngine=auto`, fresh collection and a one-credit cap per request. Firecrawl uses `/v2/scrape`, Markdown and `maxAge=0`. The script stops on Firecrawl authentication/account errors, saves partial results after every request, and refuses to overwrite an existing report. It does not retry or approve premium services.

The target list and expected strings are in [compare.mjs](../examples/compare.mjs). [The authenticated baseline report](../benchmarks/comparison-authenticated-20261011.json) includes per-request timing, failures, hashes, sizes, marker counts and provider-reported credits. It contains no credentials or full scraped content. A separate keyless pilot is not included in these comparison results.

## Where DeepSFetch fell short

- The JavaScript quotes page returned a completed job with none of the three expected author names, in both rounds. HTML navigation looked valid, but its content was created through `document.write`.
- The book catalog contained two of three expected titles. One full title was stored in an HTML attribute while its visible label was truncated. Our Markdown conversion did not recover it.
- Queueing and processing increased DeepSFetch end-to-end latency. Measurements include its 500 ms polling interval.
- Both requests ask for main content, but the DeepSFetch automatic engine currently ignores `onlyMainContent` and converts the full HTML. This is a known extraction difference.

## One verified fix after the baseline

The automatic engine now recognizes inline `document.write`/`document.writeln` during its HTTP attempt and requests browser rendering. Basic-only requests reject this unexecuted content. Rendered output is not rejected merely because its original script remains in the DOM.

[The production follow-up](../benchmarks/parser-write-fix-20261011.json) recovered all three expected authors with the browser strategy, using one credit confirmed in the usage ledger. This was one DeepSFetch follow-up request, taking 16.70 seconds. Firecrawl was not called again; the baseline table has not been rewritten to imply a new full comparison.

The implementation still needs broader JavaScript detection, better Markdown structure and main-content selection, lower delivery latency, and a larger independent dataset. This small convenience sample does not establish performance at scale or equivalence across all services.

## Share your own result

Use the [first-run feedback form](https://github.com/ermultimidia/deepsfetch-developer-kit/issues/new?template=first-run.yml), keeping keys and private content out of your report. QA accounts are excluded from independent-user adoption counts.
