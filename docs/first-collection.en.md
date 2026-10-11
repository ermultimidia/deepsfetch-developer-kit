[Português](first-collection.md) | [English](first-collection.en.md)

# From a free account to your first completed collection

Create an account at [Sign up](https://deepsfetch.com/signup?lang=en), then create a [workspace API key](https://deepsfetch.com/app/api-keys?lang=en). The free plan automatically granted 1,000 credits in our October 11, 2026 test. Check current plans before relying on that allowance.

Clone or download this kit and run from its root directory:

```sh
export DEEPSFETCH_API_KEY='YOUR_KEY'
node examples/scrape.mjs https://example.com
```

The example caps the HTTP collection at three credits and polls the same job until `completed`. Keep the printed idempotency key and job ID. See [getting started](getting-started.en.md) for resuming interrupted requests.

The published example completed in approximately 23 seconds on a newly created account. This measures job submission and polling, excluding form entry and account setup time. It is one test observation, not a performance guarantee.

## Inspect the available result

Our `example.com` result contained its title, URL, `markdownArtifactKey` and `htmlArtifactKey`. An `r2://` reference identifies a stored artifact; it is not a public download URL. Inspect results and exports in the dashboard. This example prints job JSON and does not automatically download Markdown.

For agents, use the [MCP guide](mcp.en.md). The existing n8n integration is covered by the [n8n guide](n8n.en.md).

## Help improve onboarding

[Share your first-run experience](https://github.com/ermultimidia/deepsfetch-developer-kit/issues/new?template=first-run.yml): integration, last completed step, time to first result and blocker. Never share API keys or customer data. A second real use helps us understand whether the product solves a recurring need.
