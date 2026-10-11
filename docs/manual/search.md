# Search: Web, Notícias, Imagens e categorias

Encontre URLs e metadados. A coleta do conteúdo de cada destino é uma etapa separada.

## 1. Preparar

Escolha fontes e teto antes da execução. O limite é de 1 a 20 resultados por fonte, padrão 10. A busca depende de Brave ou Tavily configurado pelo operador.

- [Comece aqui: conta → chave → primeiro resultado](https://deepsfetch.com/docs/getting-started?lang=pt-BR)
- [Conta, workspace e chaves](https://deepsfetch.com/docs/authentication?lang=pt-BR)


## 2. Executar passo a passo

Siga a sequência e confira o resultado de cada etapa.

1. Defina query e sources sem duplicatas: web, news, images, developer e research. Use sources para combinar fontes.
2. Estime o custo em /v2/cost/estimate com kind=search e as mesmas sources. Web, News e Images representam unidades de 30 créditos; Developer/Research compartilham a unidade Web.
3. Envie com scrapeResults=false e salve o id. Consulte o job; confira results, sourceResults e billing no conteúdo retornado.
4. Selecione URLs relevantes e colete-as com scrape em jobs separados. Imagens podem apontar para o arquivo e, quando disponível, para pageUrl.


## 3. Enviar a requisição

Bash/macOS/Linux. No PowerShell, use o guia de início com curl.exe e arquivo JSON. Troque o identificador de execução antes de iniciar um novo trabalho.

```text
curl --fail-with-body "https://api.deepsfetch.com/v2/search" \
  -H "Authorization: Bearer $DEEPSFETCH_API_KEY" \
  -H "Content-Type: application/json" \
  -H "Idempotency-Key: REPLACE_WITH_UNIQUE_RUN_ID" \
  --data '{
  "query": "documentação de APIs",
  "sources": [
    "web",
    "developer",
    "research"
  ],
  "limit": 5,
  "scrapeResults": false,
  "costControl": {
    "maxCredits": 30
  },
  "async": true
}'
```


## Campos e opções aninhadas

A obrigatoriedade de campos filhos é condicional à presença do objeto pai. Campos legados e incompatibilidades estão indicados; aceitação pelo schema não significa implementação em todos os caminhos.

| Campo / estado | Comportamento |
| --- | --- |
| async | Opcional; boolean. default=false Solicita processamento assíncrono. Grave o id antes de consultar o resultado. |
| webhook | Opcional; union.  Notificação de término; segredo e assinatura em /docs/webhooks. |
| webhook.url | Obrigatório; string.  URL pública; políticas de rede recusam destinos internos e credenciais embutidas. |
| webhook.secret | Obrigatório; string. minLength=16 Consulte o exemplo e os limites deste serviço. |
| webhook.metadata | Opcional; object.  Legado: não é incluído no evento entregue. |
| geo | Opcional; object.  Legado sem efeito no adaptador HTML/runtime atual. |
| geo.country | Opcional; string.  Consulte o exemplo e os limites deste serviço. |
| geo.region | Opcional; string.  Consulte o exemplo e os limites deste serviço. |
| geo.city | Opcional; string.  Consulte o exemplo e os limites deste serviço. |
| geo.language | Opcional; string.  Consulte o exemplo e os limites deste serviço. |
| session | Opcional; object.  Legado: não cria uma sessão persistente de navegador. |
| session.id | Obrigatório; string.  Consulte o exemplo e os limites deste serviço. |
| session.ttlSeconds | Opcional; integer. minimum=60; maximum=86400 Consulte o exemplo e os limites deste serviço. |
| device | Opcional; enum. valores: desktop, mobile, tablet Legado sem personalização de dispositivo implementada. |
| render | Opcional; union.  No caminho legado de scrape seleciona navegador. No motor auto, use engineStrategy; opções aninhadas não configuram o runtime. |
| render[2].waitMs | Opcional; integer.  Consulte o exemplo e os limites deste serviço. |
| render[2].waitFor | Opcional; string.  Consulte o exemplo e os limites deste serviço. |
| render[2].timeoutMs | Opcional; integer.  Opção do runtime legado; o motor auto recusa esta opção. Não é timeout do cliente HTTP. |
| costControl | Opcional; object.  Teto adicional; confira a compatibilidade por caminho em /docs/costs. |
| costControl.maxCredits | Opcional; integer. minimum=0; maximum=1000000000 Teto de créditos DeepSFetch, separado dos custos BYOK externos. |
| costControl.cacheMode | Opcional; enum. valores: fresh, prefer fresh faz nova coleta; prefer permite reutilização elegível. Motor auto usa fresh. |
| costControl.maxAgeSeconds | Opcional; integer. minimum=0; maximum=86400 Idade máxima desejada; depende de elegibilidade do cache. |
| costControl.allowFallback | Opcional; boolean.  false impede escalada de custo nos caminhos compatíveis. |
| costControl.taskId | Opcional; string. minLength=1; maxLength=160; pattern="^[a-zA-Z0-9:_-]+$" Agrupa orçamento no workspace; use um ID novo por execução lógica. Não é chave de idempotência. |
| query | Obrigatório; string.  Consulta não vazia; até 1.000 caracteres no provedor atual. |
| limit | Opcional; integer. minimum=1; maximum=20; default=10 Consulte o exemplo e os limites deste serviço. |
| scrapeResults | Opcional; boolean. valores: false Somente false. Coleta dos destinos exige /v2/scrape separado. |
| source | Opcional; web, news ou images; padrão web. Compatibilidade de busca única. sources permite combinação. |
| category | Opcional; enum. valores: general, developer, research; default="general" Compatibilidade de busca única. developer/research filtram domínios Web; news/images exigem general. |
| sources | Opcional; array. minItems=1; maxItems=5; items=web, news, images, developer, research Selecione fontes sem duplicatas. Web, Notícias e Imagens têm cobrança por fonte; Desenvolvimento/Pesquisa compartilham a unidade Web. |


## 4. Consultar e interpretar

Resultados Web trazem url/title/description/source; News pode incluir publishedAt; Images inclui imageUrl/thumbnailUrl e pageUrl quando disponível. Developer e Research são filtros de domínios, sem índice acadêmico especializado ou garantia de posição.

```text
curl --fail-with-body "https://api.deepsfetch.com/v2/jobs/JOB_ID" \
  -H "Authorization: Bearer $DEEPSFETCH_API_KEY"
```

- [Jobs: acompanhar, retomar e cancelar](https://deepsfetch.com/docs/jobs?lang=pt-BR)
- [Respostas, artefatos e erros da API](https://deepsfetch.com/docs/api-results?lang=pt-BR)


## Limites e custo

Uma busca bem-sucedida sem resultados também é cobrada. Todos os provedores/fontes solicitados precisam concluir. web+developer+research custa uma unidade Web (30); news+research custa News+Web (60); todas as cinco fontes custam 90. category/source são compatibilidade de fonte única; news/images exigem category=general.

- [Créditos, estimativa, cache e limites](https://deepsfetch.com/docs/costs?lang=pt-BR)


## Falhas e recuperação

invalid_search_sources: confira valores/duplicatas. invalid_search_limit: use 1–20. search_scraping_separate: use false e faça scrape separado. task_limit_exceeded: estime o conjunto completo. Falha do provedor não é uma busca concluída.

## Continue a integração

- [Opções comuns e compatibilidade real](https://deepsfetch.com/docs/common-options?lang=pt-BR)
- [Webhooks: assinatura e entrega](https://deepsfetch.com/docs/webhooks?lang=pt-BR)
- [Playground, histórico e exportação](https://deepsfetch.com/docs/playground?lang=pt-BR)
