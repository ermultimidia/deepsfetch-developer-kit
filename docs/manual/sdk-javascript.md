# JavaScript SDK: instalar, executar e retomar

Integre a API no servidor com tratamento explícito de conclusão e erros.

## 1. Instalar e configurar

Requer Node.js 20+; use 20.3+ quando combinar sinais AbortSignal. Instale @deepsfetch/sdk, configure DEEPSFETCH_API_KEY e salve o exemplo como collect.mjs. Execute node collect.mjs. Não exponha a chave em um bundle público de navegador.

```text
npm install @deepsfetch/sdk
```


## 2. Executar e validar

Use uma chave de idempotência nova por coleta. waitForJob retorna qualquer estado terminal, inclusive failed/cancelled; o código precisa verificá-lo. Timeout de consulta não cancela o servidor.

```text
import { DeepSFetchClient } from '@deepsfetch/sdk';
import { randomUUID } from 'node:crypto';
const client = new DeepSFetchClient({ apiKey: process.env.DEEPSFETCH_API_KEY });
const job = await client.scrape({
  "url": "https://example.com",
  "collectionEngine": "auto",
  "engineStrategy": "auto",
  "formats": [
    "markdown"
  ],
  "costControl": {
    "maxCredits": 1,
    "allowFallback": false,
    "cacheMode": "fresh"
  },
  "async": true
}, { idempotencyKey: randomUUID() });
console.error('jobId:', job.id); // Save before waiting.
const done = await client.waitForJob(job.id);
if (done.status !== 'completed') throw new Error(JSON.stringify(done.error || done.status));
console.log(JSON.stringify(done.result, null, 2));
```


## 3. Retomar sem coletar novamente

Guarde o id da submissão antes de aguardar. Após interrupção execute client.getJob(id) ou client.waitForJob(id). O timeoutMs padrão por requisição é 30.000; waitForJob usa intervalo padrão de 2.000 e prazo de 900.000 ms. Se esgotar, preserve o id.


## 4. Outros serviços e erros

Métodos: scrape, extract, search, map, crawl, interact, watch, estimateCost, getJob, cancelJob e waitForJob. Os sete primeiros recebem o corpo HTTP de seus guias. estimateCost não coleta. DeepSFetchError inclui status/code/details/requestId. Não há repetição automática de POST; baseUrl personalizado recebe sua chave, use somente um servidor confiável.

## Continue a integração

- [Scrape: da URL ao conteúdo](https://deepsfetch.com/docs/scrape?lang=pt-BR)
- [Jobs: acompanhar, retomar e cancelar](https://deepsfetch.com/docs/jobs?lang=pt-BR)
- [Python SDK: instalar e consultar jobs](https://deepsfetch.com/docs/sdk-python?lang=pt-BR)
- [CLI: comandos, arquivos e recuperação](https://deepsfetch.com/docs/cli?lang=pt-BR)
