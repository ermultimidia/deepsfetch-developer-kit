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

The published documentation lists `scrape`, `extract`, `search`, `map`, `crawl`, `interact`, `watch`, `job_status`, and `cancel_job`. This document is not a live availability test.

## Current extraction limitation

The documented MCP `extract` flow uses the V1 adapter and an internal fetch ID (`result.providerJobId`). This is different from the outer V2 `job_` ID used by job polling. Use the exact current extraction instructions, or use `/v2/extract` over HTTP when you need V2 job polling. Simplifying this is a roadmap item before broad MCP promotion.

No npm MCP package or registry listing is asserted here. Connecting a client does not create a chatbot, embeddings or automation destinations. Collection operations consume workspace credits; AI-provider charges may be separate.
