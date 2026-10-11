# Python SDK: instalar e consultar jobs

Instale a partir do kit publicado e preserve IDs entre execuções.

## 1. Instalar do repositório

Requer Python 3.10+. O pacote não foi encontrado no PyPI nesta revisão; use o código do developer kit. Clone, entre na pasta e instale o subdiretório abaixo em um ambiente virtual. Não dependa de pip install deepsfetch-sdk até a publicação ser confirmada.

```text
git clone https://github.com/ermultimidia/deepsfetch-developer-kit.git
cd deepsfetch-developer-kit
python -m venv .venv
# PowerShell: .venv\Scripts\Activate.ps1
# Bash: source .venv/bin/activate
python -m pip install ./packages/deepsfetch-sdk-python
```


## 2. Executar e conferir conclusão

Configure DEEPSFETCH_API_KEY, salve como collect.py e execute python collect.py. O SDK retorna dicionários; confira status antes de consumir result.

```text
import os, json, uuid
from deepsfetch_sdk import DeepSFetchClient
client = DeepSFetchClient(os.environ['DEEPSFETCH_API_KEY'])
job = client.scrape(json.loads('''{
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
}'''), idempotency_key=str(uuid.uuid4()))
print('jobId:', job['id'], flush=True)  # Save before waiting.
done = client.wait_for_job(job['id'])
if done['status'] != 'completed':
    raise RuntimeError(done.get('error') or done['status'])
print(json.dumps(done['result'], ensure_ascii=False, indent=2))
```


## 3. Consultar e recuperar

Guarde job["id"]. Use get_job(id) ou wait_for_job(id) depois de queda de energia. Métodos: scrape/extract/search/map/crawl/interact/watch, estimate_cost, get_job, cancel_job, wait_for_job. DeepSFetchError expõe status/code/details/request_id. POST não é repetido automaticamente.

## Continue a integração

- [JavaScript SDK: instalar, executar e retomar](https://deepsfetch.com/docs/sdk-javascript?lang=pt-BR)
- [Jobs: acompanhar, retomar e cancelar](https://deepsfetch.com/docs/jobs?lang=pt-BR)
- [Respostas, artefatos e erros da API](https://deepsfetch.com/docs/api-results?lang=pt-BR)
