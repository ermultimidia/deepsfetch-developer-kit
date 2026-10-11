# Monitor prices and stock

Configure checks, validate the baseline and track alerts.

## 1. Choose product and fields

Use an HTTPS page publishing Product/Offer JSON-LD. Defaults require name, price and currency; availability is optional. Prices and stock advanced fields support CSS/JSON-LD. Values must represent one product; currency uses three letters and price is nonnegative.


## 2. Create and confirm state

Open Web monitors or Prices and stock. Enter name, URL, 1/24/168-hour interval and per-check cap (minimum 3). Web monitors uses the session and creates enabled; legacy Prices and stock requests a key and saves paused. Check saved state and pause to validate before scheduling. Up to 100 monitors per workspace.

- [/app/watch](https://deepsfetch.com/app/watch)
- [/app/price-monitors](https://deepsfetch.com/app/price-monitors)


## 3. Check now and validate

Run Check now and open History. The first valid check creates a baseline and does not alert a change. Inspect price, currency and availability. Invalid data should not replace a valid baseline.


## 4. Interpret changes

Price differences create changes; availability is compared only when both values are recognized. Different currency needs review and does not produce a price comparison. Normalized states: in_stock, out_of_stock and preorder. Inspect failed/review and source data.


## 5. Configure and verify alerts

Provide a public webhook and a 16–256-character secret before creation when needed. product.changed events contain monitorId, changes and snapshot; use /docs/webhooks HMAC verification. This alert chain has up to six attempts, separate from V2 webhooks without retry. Inspect available delivered/pending/exhausted history and deduplicate events.


## 6. Pause and maintain

Pausing stops future checks/deliveries; in-progress work may finish. Review monthly cap and balance before resuming. Do not confuse this service with V2 watch, whole-site monitoring, recurring web search or email/Slack alerts: those are outside this workflow.

## Continue your integration

- [Watch: legacy URL monitoring](https://deepsfetch.com/docs/watch)
- [Validated field extraction](https://deepsfetch.com/docs/validated-extraction)
- [Webhooks: signing and delivery](https://deepsfetch.com/docs/webhooks)
- [Credits, estimates, cache and caps](https://deepsfetch.com/docs/costs)
