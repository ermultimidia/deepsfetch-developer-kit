# Validated field extraction

Define fields, inspect evidence and export values supported by the page.

## Run in the dashboard

Open Structured extraction and enter a public URL. The current view uses the session without requesting a DeepSFetch key in its form. Choose Page data for JSON-LD/CSS, managed AI or BYOK configured in API Keys. Collection uses credits even when a field cannot be validated. It processes one HTML page without JavaScript; preview source is limited to 2 MB.

- [/app/extract](https://deepsfetch.com/app/extract)


## Configure 1–20 fields

Use unique names of up to 48 characters, starting with a letter and containing only letters, digits and _. Types: string, number and boolean. For JSON-LD, use a path such as offers.price; for CSS, a selector such as h1 and an optional attribute such as content. Descriptions guide AI mode only. Marking a field required makes result validation depend on that field.

```text
[
  {
    "name": "title",
    "type": "string",
    "required": true,
    "source": "css",
    "path": "h1"
  },
  {
    "name": "price",
    "type": "number",
    "required": true,
    "source": "jsonld",
    "path": "offers.price"
  }
]
```


## Read validation results

Review each field and its evidence before using JSON or CSV. Numbers with ambiguous decimal separators may be rejected; refine the source instead of guessing. Evidence confirms a match in the collected content, not the truth of the publisher’s claim. Unsupported values are exported as null.

| Field / status | Behavior |
| --- | --- |
| supported | Expected value type supported by the source. |
| missing | No usable value found. |
| ambiguous | Multiple values: refine the selector/path. |
| invalid_type | Value does not match the requested type. |
| unverified | AI evidence was not verified. |


## History, export and integration

Use Resume in history to resume a saved run. Download JSON through the available action to preserve fields/evidence; CSV depends on the view or consumer conversion. BYOK is stored separately and the current view uses execution session. Use Start/n8n for machine execution of the three templates. /v2/extract is a separate contract and does not automatically create this report.


## Step by step: product with evidence

The current dashboard offers managed AI, Page data and BYOK. It uses the session for execution access; BYOK is configured separately in API Keys.

1. Open Structured extraction, choose Product or Custom and provide a public URL publishing the desired fields.
2. Start without AI using Page data. Define title/string from CSS h1 and price/number from JSON-LD offers.price. Mark required only when mandatory.
3. If interpretation is needed choose managed AI or configure BYOK. Describe each field; CSS mapping does not promise JavaScript-page extraction.
4. Review estimate and cap. Execute once; follow fetching/extracting/completed and Resume history after interruption.
5. Inspect status/evidence per field. A required missing/ambiguous/unverified field invalidates the result; unsupported values remain null.
6. Export through the available button. If the current view offers JSON only, transform it to CSV in your consumer or use appropriate validated templates.

```text
{
  "data": {
    "title": "Example Domain",
    "price": null
  },
  "fields": [
    {
      "name": "title",
      "status": "supported",
      "value": "Example Domain",
      "evidence": {
        "kind": "css",
        "selector": "h1"
      }
    },
    {
      "name": "price",
      "status": "missing",
      "value": null,
      "evidence": null
    }
  ],
  "validation": {
    "valid": false,
    "supported": 1,
    "total": 2
  }
}
```

## Continue your integration

- [Extract: JSON from a completed fetch](https://deepsfetch.com/docs/extract)
- [Integrations and your AI key — BYOK](https://deepsfetch.com/docs/byok)
- [n8n template HTTP contract](https://deepsfetch.com/docs/n8n-api)
- [Credits, estimates, cache and caps](https://deepsfetch.com/docs/costs)
