[Português](mcp.md) | [English](mcp.en.md)

# Connect the hosted MCP server

DeepSFetch documents a remote MCP endpoint at `https://mcp.deepsfetch.com/mcp` using Streamable HTTP and a Bearer workspace API key. The server implementation is not included in this client toolkit.

## VS Code configuration

For a client version supporting remote HTTP and headers, save this as `.vscode/mcp.json` in your own project. The password prompt avoids putting the key in the file:

```json
{
  "inputs": [
    {
      "type": "promptString",
      "id": "deepsfetch-api-key",
      "description": "DeepSFetch workspace API key",
      "password": true
    }
  ],
  "servers": {
    "deepsfetch": {
      "type": "http",
      "url": "https://mcp.deepsfetch.com/mcp",
      "headers": {
        "Authorization": "Bearer ${input:deepsfetch-api-key}"
      }
    }
  }
}
```

Other clients use different configuration formats. Do not copy this file unchanged into every client. Consult https://deepsfetch.com/docs/mcp?lang=en and your client's documentation.

## First use

1. Connect and list tools to obtain the live schemas.
2. Request a scrape of a public HTML page with conservative credit limits supported by that schema.
3. If the result is pending, follow its documented job status flow.
4. Inspect the completed result before using it as agent context.

The published documentation lists `scrape`, `extract`, `search`, `map`, `crawl`, `interact`, `watch`, `job_status`, and `cancel_job`. On October 11, 2026 we verified initialize, tools/list and scrape → job_status against the live service. This does not validate every tool or client interface.

## Simpler extraction and polling

MCP 2.0.1 accepts the public `job_` ID of a completed scrape in `source.jobId`. It resolves the source automatically and submits extraction through API V2, returning another job queryable with `job_status`. Legacy internal `fetch_` IDs remain accepted. ID resolution and pending-source rejection passed local service-mock tests; this production run did not execute AI extraction.

The MCP schema now preserves `plannedLane` and `costControl`. For your first scrape:

```json
{"url":"https://example.com","formats":["markdown"],"plannedLane":"http_basic","async":true,"costControl":{"maxCredits":3,"allowFallback":false,"cacheMode":"fresh"}}
```

Inspect each tool's schema: search, interact and watch do not offer the same credit-cap support. A result may contain artifact references instead of inline Markdown. Inspect available content and use dashboard exports where needed.

## Official registry

Published as [io.github.ermultimidia/deepsfetch, version 2.0.1](https://registry.modelcontextprotocol.io/v0.1/servers/io.github.ermultimidia%2Fdeepsfetch/versions/2.0.1). Connection metadata is in [server.json](../server.json). The hosted endpoint requires a workspace API key. Registry presence does not imply a partnership or certification by every client.
