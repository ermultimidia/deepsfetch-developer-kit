# Integrations and your AI key — BYOK

Connect a provider and distinguish each service’s credentials.

## Connect AI

Configure own AI in API Keys as owner or administrator. Current accepted providers: OpenAI, Google, DeepSeek, Kimi, Qwen, Anthropic and OpenRouter. Enter key/model, save and review available test actions. Use BYOK in Structured extraction. Saving proves neither balance nor availability.

- [/app/extract](https://deepsfetch.com/app/extract)
- [/app/integrations](https://deepsfetch.com/app/integrations)


## Storage and replacement

AI connection is encrypted server-side. Replacing it deactivates the prior active connection for this workflow. Its key differs from the API DeepSFetch key and destination Supabase key. Update after rotation; another legacy integration type does not guarantee structured-extraction compatibility.


## Costs and failures

BYOK uses your provider account; external costs are not included in the DeepSFetch credit cap. byok_not_configured requires an active connection; owner_required requires an authorized user; encryption_unavailable requires operator configuration. Check authentication, quota or model errors with the provider. Page data mode uses JSON-LD/CSS without AI; it is not an automatic fallback for a failed AI run.


## Step by step: connect and verify AI

Current configuration accepts OpenAI, Google, DeepSeek, Kimi, Qwen, Anthropic and OpenRouter; model availability depends on connection and provider permissions.

1. Open API Keys and the own-AI section as workspace owner. Choose provider, enter key/model and save/test through available actions.
2. Confirm active connection and permitted model. Saving a secret proves neither balance nor successful extraction.
3. Open Structured extraction, select BYOK, define a few fields and review collection estimate.
4. Run once and inspect evidence report. Review provider quota/authentication/model errors before retrying.
5. After rotation update the connection and verify its consumer. Your AI account charges are outside platform maxCredits.

- [/app/api-keys](https://deepsfetch.com/app/api-keys)
- [/app/extract](https://deepsfetch.com/app/extract)

## Continue your integration

- [Validated field extraction](https://deepsfetch.com/docs/validated-extraction)
- [Extract: JSON from a completed fetch](https://deepsfetch.com/docs/extract)
- [Credits, estimates, cache and caps](https://deepsfetch.com/docs/costs)
- [Send collections to Supabase](https://deepsfetch.com/docs/supabase)
