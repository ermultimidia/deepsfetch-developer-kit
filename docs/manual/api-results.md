# Respostas, artefatos e erros da API

Diferencie aceitação, conclusão e qualidade do conteúdo.

## Envelope do job

As respostas de jobs usam id, kind, status, result, error e datas. result pode ser null enquanto o trabalho está pendente. error do job contém code e message; um erro de requisição usa error.code, error.message e error.requestId. O exemplo é ilustrativo, com campos reduzidos.

```text
{
  "id": "job_EXAMPLE",
  "kind": "scrape",
  "status": "completed",
  "result": {
    "provider": "deepsfetch-v1",
    "operation": "scrape",
    "providerJobId": "FETCH_JOB_ID",
    "status": "completed",
    "result": {}
  },
  "error": null,
  "createdAt": "2026-09-08T00:00:00Z"
}
```


## Resultados por operação

No adaptador V1, result contém provider, operation, providerJobId, status, statusUrl, result e meta; o conteúdo específico do provedor fica no result interno. O runtime de navegador tem outro formato. Não suponha uma propriedade universal result.markdown. A conclusão externa também pode representar completed_partial do provedor: inspecione o estado interno, erros e quantidade de páginas.

| Campo / estado | Comportamento |
| --- | --- |
| scrape | Confira URL, formatos e referências de conteúdo efetivamente retornados. |
| extract | Use providerJobId de fetch como origem e confira o JSON extraído. |
| map / crawl | Map descobre URLs; crawl coleta páginas. Confira quantidade e falhas. |
| search | Confira os resultados e, se solicitado, a coleta de cada destino. |
| interact | Confira o resultado das ações e os formatos do runtime. |
| watch | A criação do monitor não prova que uma verificação recorrente ocorreu. |


## Artefatos e integração de conteúdo

Uma referência r2:// ou chave de armazenamento não é uma URL pública para download. Não construa links de download a partir dessas chaves. Use URLs retornadas quando forem utilizáveis ou exportação do painel. Para conteúdo pronto para máquina, prefira /integration/n8n/result nos três modelos ou os feeds de coleções, que devolvem dados/chunks. A API genérica não promete um endpoint público universal de download de artefatos.


## Tratar erros sem duplicar trabalho

400: corrija entrada, esquema ou limite do provedor. 401/403: revise acesso. 404: confira ID e workspace. 409: conflito de idempotência, limite de créditos ou operação incompatível; examine o código. 429: reduza frequência e respeite Retry-After quando presente. 502/503: inspecione o job e disponibilidade do provedor antes de reenviar. Preserve o ID e a chave de idempotência após timeout. Os adaptadores do painel/n8n/feeds podem retornar error como string; não aplique o envelope V2 cegamente.


## Motor auto: exemplo de resultado inline

Formato ilustrativo reduzido do motor automático, diferente do adaptador legado. Leia apenas o formato escolhido; billing confirma o consumo registrado, e engine.attempts ajuda no diagnóstico.

```text
{
  "id": "job_EXAMPLE",
  "kind": "scrape",
  "status": "completed",
  "result": {
    "operation": "scrape",
    "providerJobId": "fetch_engine_EXAMPLE",
    "url": "https://example.com/",
    "markdown": "# Example Domain",
    "engine": {
      "mode": "basic",
      "attempts": []
    },
    "billing": {
      "credits": 1,
      "currency": "credits"
    }
  },
  "error": null
}
```


## Passo a passo: decidir se pode consumir

Não use só HTTP 200 como sinal de qualidade.

1. Confira status terminal e error. Enquanto queued/running, result pode ser null.
2. Identifique provider e o formato: motor auto inline, adaptador legado aninhado ou runtime distinto.
3. Confira URL final, páginas esperadas, estado interno parcial, campos e warnings. Referência r2:// não é um link público.
4. Valide o schema do seu consumidor e preserve o JSON original para diagnóstico sem segredos.
5. Use somente conteúdo verificado; para documentos/chunks com atualização, prefira feeds de Coleções.

## Continue a integração

- [Jobs: acompanhar, retomar e cancelar](https://deepsfetch.com/docs/jobs?lang=pt-BR)
- [Contrato HTTP dos modelos n8n](https://deepsfetch.com/docs/n8n-api?lang=pt-BR)
- [Feeds de documentos e mudanças](https://deepsfetch.com/docs/collection-feeds?lang=pt-BR)
- [Créditos, estimativa, cache e limites](https://deepsfetch.com/docs/costs?lang=pt-BR)
