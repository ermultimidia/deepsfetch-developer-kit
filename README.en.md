[Português](README.md) | [English](README.en.md)

# DeepSFetch Developer Kit

**[Complete manual: 33 step-by-step guides](docs/manual/README.en.md)** — API, MCP, SDKs, CLI, collections, monitors, files, integrations and billing.

**Collect web content for AI agents and automation with explicit credit limits.**

Open-source JavaScript and Python clients, a CLI, and n8n integration code for the [hosted DeepSFetch API](https://deepsfetch.com/). Start with one public HTML page, inspect the result, and build from there.

This repository contains client-side tools. The collection engine and hosted service are not included. Running the examples requires a DeepSFetch account and API key; collection consumes workspace credits. See [current plans](https://deepsfetch.com/pricing?lang=en).

## Get your first result

Requires Node.js 22+. Create a key in [API keys](https://deepsfetch.com/app/api-keys). From the repository root, set it for the current terminal session and run the dependency-free example:

PowerShell:

```powershell
$env:DEEPSFETCH_API_KEY = 'YOUR_DEEPSFETCH_API_KEY'
node examples/scrape.mjs https://example.com
```

macOS / Linux:

```sh
export DEEPSFETCH_API_KEY='YOUR_DEEPSFETCH_API_KEY'
node examples/scrape.mjs https://example.com
```

The example submits one HTTP-only collection with a maximum of 3 DeepSFetch credits and browser fallback disabled, then polls the same job. It prints the completed job as JSON. This cap is not a promise of a free or successful collection. JavaScript-dependent pages need another configuration. See [getting started](docs/getting-started.en.md) for failure handling and resuming a job.

## Choose your integration

| Tool | Install or guide | What is included |
| --- | --- | --- |
| JavaScript SDK | `npm install @deepsfetch/sdk` | API v2 client and job polling |
| CLI | `npm install -g @deepsfetch/cli` | Commands for collection, jobs and estimates |
| Python SDK | `python -m pip install ./packages/deepsfetch-sdk-python` | Source installation; PyPI release pending |
| MCP | [Remote connection guide](docs/mcp.en.md) | Configuration for the hosted MCP endpoint |
| n8n | [Templates and community node](docs/n8n.en.md) | Source for the npm-published community node |

The remote MCP server implementation is not included here. The n8n node is not verified by n8n. The remote MCP is listed in the official registry. Native partnerships and a self-hosted collection engine are not claimed by this repository.

## CLI quickstart

After installing the CLI and setting the environment variable above:

```sh
deepsfetch scrape --file examples/scrape-request.json --wait
```

The CLI writes its idempotency key to stderr. If a submission's outcome is unknown, retry the same request with `--idempotency-key THE_SAME_KEY`. Once you have a job ID, use `deepsfetch job JOB_ID --wait` instead of submitting another collection.

## Open tools and hosted service

| Capability | In this repository | Hosted DeepSFetch |
| --- | --- | --- |
| JavaScript SDK, Python SDK, CLI | Source and tests | Connect to API v2 |
| n8n community node | Source distributed as JavaScript | Calls collection integration endpoints |
| MCP | Connection guide | Remote server |
| Collection engine, browser infrastructure | Not included | Managed by DeepSFetch |
| Accounts, credits, billing and dashboard | Not included | Managed by DeepSFetch |

## Develop locally

```sh
npm install --ignore-scripts
npm test
npm run check
```

Run Python tests from the repository root:

```sh
python -m pip install ./packages/deepsfetch-sdk-python
python -m unittest discover -s packages/deepsfetch-sdk-python/tests
```

Tests use fixtures and a local HTTP server; they do not submit paid collections. See [contributing](CONTRIBUTING.en.md), [security](SECURITY.en.md), and the [roadmap](ROADMAP.en.md).

## Resources

- [API documentation](https://deepsfetch.com/docs?lang=en)
- [Playground](https://deepsfetch.com/playground?lang=en)
- [n8n setup](https://deepsfetch.com/docs/n8n?lang=en)
- [Support](https://deepsfetch.com/support?lang=en)

MIT license applies to the tools in this repository. Using the hosted service is subject to its own terms and credit limits.

## Try it and share feedback

Read the [first-collection tutorial](docs/first-collection.en.md), run the [operational smoke test](docs/benchmark.en.md), and [share your first-run experience](https://github.com/ermultimidia/deepsfetch-developer-kit/issues/new?template=first-run.yml).

The [authenticated Firecrawl comparison](docs/comparison.en.md) includes results, limitations and reproducible code. The [published DEV tutorial](https://dev.to/rafael_souza_2f0438f4d82e/from-a-url-to-markdown-a-first-collection-and-mcp-setup-with-deepsfetch-4jdn) walks through signup, first collection and MCP. Also see the [Smithery listing](https://smithery.ai/servers/ermultimidia/deepsfetch), with instructions and limits in the [MCP guide](docs/mcp.en.md).
