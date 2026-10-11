# Coleta em lote por CSV

Importe URLs, acompanhe falhas individuais e exporte o lote.

## 1. Preparar o CSV

Use até 500 linhas de URLs HTTPS públicas, em arquivo de até 1 MiB. Cabeçalhos reconhecidos: url, link, website ou site; sem cabeçalho, a primeira coluna é usada. Vírgula e ponto e vírgula são reconhecidos. URLs repetidas são removidas após normalização.

```text
url
https://example.com/
https://example.org/
```


## 2. Conferir URLs e estimativa

Abra Coleta em lote, importe/cole o CSV e use Conferir URLs e estimativa. Corrija cada linha inválida antes de iniciar. Endereços internos, IP literal, portas customizadas e credenciais na URL são recusados.

- [/app/batches](https://deepsfetch.com/app/batches?lang=pt-BR)


## 3. Iniciar com orçamento

Informe nome, chave ativa do workspace e teto inteiro de pelo menos 3 créditos por URL única. Esse fluxo usa o caminho HTML legado, separado do motor auto de 1 crédito. A estimativa e a política mensal ainda podem bloquear o lote. Até 10 lotes queued/running/paused por workspace.


## 4. Acompanhar, pausar e recuperar

Abra o lote e confira position/url/status/job/error por item. Pausar impede avanço futuro; chamadas já enviadas podem continuar. Retome o mesmo lote após revisar o erro. Não recrie o CSV inteiro só porque uma URL falhou.


## 5. Exportar JSON ou CSV

Baixe o resultado pela tela. O JSON inclui estado e resultados; CSV inclui url, status, error e markdown. Valores de planilha potencialmente interpretados como fórmula recebem proteção na exportação. Confira falhas por linha. A criação do lote usa sessão do painel; não há endpoint público /v2/batch/scrape.


## Diagnóstico

csv_too_large/too_many_urls: divida o arquivo. invalid_csv_urls: corrija as linhas da prévia. insufficient_batch_cap: reveja 3×URLs únicas. active_batch_limit: conclua ou retome os lotes existentes. encryption_unavailable requer o operador.

## Continue a integração

- [Playground, histórico e exportação](https://deepsfetch.com/docs/playground?lang=pt-BR)
- [Créditos, estimativa, cache e limites](https://deepsfetch.com/docs/costs?lang=pt-BR)
- [Respostas, artefatos e erros da API](https://deepsfetch.com/docs/api-results?lang=pt-BR)
