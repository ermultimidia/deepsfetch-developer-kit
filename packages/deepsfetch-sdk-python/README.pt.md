[English](README.md) | [Português](README.pt.md)

# SDK Python do DeepSFetch

Cliente sem dependências para Python 3.10 ou superior, conectado à API v2 hospedada do DeepSFetch.

A publicação no PyPI está pendente. Na pasta principal deste kit, instale pelo código-fonte:

```sh
python -m pip install ./packages/deepsfetch-sdk-python
```

```python
import os
import uuid
from deepsfetch_sdk import DeepSFetchClient

client = DeepSFetchClient(os.environ["DEEPSFETCH_API_KEY"])
job = client.scrape(
    {"url": "https://example.com/", "formats": ["markdown"], "plannedLane": "http_basic",
     "async": True, "costControl": {"maxCredits": 3, "allowFallback": False}},
    idempotency_key=str(uuid.uuid4()),
)
print("ID da tarefa:", job["id"])
result = job if job["status"] in ("completed", "failed", "cancelled") else client.wait_for_job(job["id"])
if result["status"] != "completed":
    raise RuntimeError("A coleta não foi concluída; consulte o mesmo ID de tarefa")
print(result["result"])
```

Coletas consomem créditos do seu espaço de trabalho. Este exemplo coleta páginas HTML públicas, sem troca automática para navegador. Guarde o ID recebido para retomar a consulta sem criar outra coleta.

O cliente também oferece `extract`, `search`, `map`, `crawl`, `interact`, `watch`, `estimate_cost`, `get_job`, `cancel_job` e `wait_for_job`. Requisições POST não são repetidas automaticamente. Reutilize a mesma chave de idempotência ao repetir o envio da mesma operação. Os erros são instâncias de `DeepSFetchError` com `status`, `code`, `details` e `request_id`.
