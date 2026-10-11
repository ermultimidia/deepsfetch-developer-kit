# CLI: comandos, arquivos e recuperação

Execute a API pelo terminal sem perder o controle do job.

## 1. Instalar e configurar

Requer Node.js 20.3+. Instale a CLI publicada, confira --help e configure DEEPSFETCH_API_KEY no terminal. Instalar não consome créditos. A chave BYOK não autentica a CLI.

```text
npm install -g @deepsfetch/cli
deepsfetch --help
```


## 2. Executar o corpo do serviço

Salve o JSON de /docs/scrape em request.json e use --file para evitar diferenças de escape entre terminais. O atalho scrape URL usa HTTP básico legado; para o motor auto passe o corpo completo. --wait aguarda jobs e retorna erro em failed/cancelled/timeout.

```text
deepsfetch scrape --file request.json --idempotency-key EXECUCAO_UNICA_20261011 --wait > result.json
```


## 3. Consultar, cancelar e estimar

Os comandos map, crawl, search, extract, interact e watch aceitam --file. estimate lê o corpo do estimador. job consulta; job --wait retoma. cancel altera o estado público e não comprova que o provedor parou.

```text
deepsfetch job JOB_ID
deepsfetch job JOB_ID --wait
deepsfetch cancel JOB_ID
deepsfetch estimate --file estimate.json
```


## 4. Saída, falhas e retentativas

JSON vai para stdout; diagnósticos e chave de idempotência gerada vão para stderr. Código de saída 1 indica falha, cancelamento ou timeout. Preserve a chave registrada e repita o mesmo corpo somente quando necessário; consultar um job existente não exige criar outro. --timeout-ms padrão 30000; --max-wait-ms padrão 900000.

## Continue a integração

- [Comece aqui: conta → chave → primeiro resultado](https://deepsfetch.com/docs/getting-started?lang=pt-BR)
- [Jobs: acompanhar, retomar e cancelar](https://deepsfetch.com/docs/jobs?lang=pt-BR)
- [Créditos, estimativa, cache e limites](https://deepsfetch.com/docs/costs?lang=pt-BR)
