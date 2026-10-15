[English](README.md) | [Português](README.pt.md)

# SDK JavaScript do DeepSFetch

Cliente oficial JavaScript para a API v2 do DeepSFetch. Usa o `fetch` nativo e não tem dependências de execução. Requer Node.js 20 ou superior; para os exemplos completos deste kit, use Node.js 22 ou superior.

```sh
npm install @deepsfetch/sdk
```

```js
import { DeepSFetchClient } from "@deepsfetch/sdk";
import { randomUUID } from "node:crypto";

const client = new DeepSFetchClient({ apiKey: process.env.DEEPSFETCH_API_KEY });
const job = await client.scrape(
  { url: "https://example.com/", formats: ["markdown"], plannedLane: "http_basic", async: true,
    costControl: { maxCredits: 3, allowFallback: false } },
  { idempotencyKey: randomUUID() },
);
console.log("ID da tarefa:", job.id);
const result = ["completed", "failed", "cancelled"].includes(job.status)
  ? job : await client.waitForJob(job.id);
if (result.status !== "completed") throw new Error("Consulte a tarefa antes de enviar outra coleta");
console.log(result.result);
```

Configure `DEEPSFETCH_API_KEY` com uma chave do seu espaço de trabalho. A coleta consome créditos. Guarde o ID da tarefa para consultar seu andamento sem repetir o envio.

O cliente também oferece `extract`, `search`, `map`, `crawl`, `interact`, `watch`, `estimateCost`, `getJob`, `cancelJob` e `waitForJob`. Requisições POST não são repetidas automaticamente. Para repetir o envio da mesma operação paga, preserve a mesma chave de idempotência. Os erros são instâncias de `DeepSFetchError` com `status`, `code`, `details` e `requestId`.

Use `baseUrl` para outro servidor compatível e `timeoutMs` para alterar o tempo limite por requisição. Uma implementação personalizada de `fetch` pode ser fornecida para testes ou ambientes diferentes.
