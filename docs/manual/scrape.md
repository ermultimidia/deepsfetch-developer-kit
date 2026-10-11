# Scrape: da URL ao conteúdo

Colete uma página. Escolha explicitamente entre o motor automático atual e o caminho legado.

## 1. Preparar

Tenha uma chave ativa, saldo e uma URL pública simples. O exemplo usa o motor automático com teto de 1 crédito.

- [Comece aqui: conta → chave → primeiro resultado](https://deepsfetch.com/docs/getting-started?lang=pt-BR)
- [Conta, workspace e chaves](https://deepsfetch.com/docs/authentication?lang=pt-BR)


## 2. Executar passo a passo

Siga a sequência e confira o resultado de cada etapa.

1. Defina collectionEngine=auto. Use engineStrategy=auto para HTML com tentativa de navegador incluída; basic para HTML direto; enhanced para navegador.
2. Escolha somente os formatos necessários. Envie uma vez, com uma chave de idempotência exclusiva, e salve o id público.
3. Consulte o job até um estado terminal. No motor automático, confira result.markdown, result.html ou result.links conforme o pedido e result.billing.
4. Confirme a URL final, conteúdo e qualidade. Falha do motor pode trazer premiumOffer; uma oferta não executa nem autoriza o premium.


## 3. Enviar a requisição

Bash/macOS/Linux. No PowerShell, use o guia de início com curl.exe e arquivo JSON. Troque o identificador de execução antes de iniciar um novo trabalho.

```text
curl --fail-with-body "https://api.deepsfetch.com/v2/scrape" \
  -H "Authorization: Bearer $DEEPSFETCH_API_KEY" \
  -H "Content-Type: application/json" \
  -H "Idempotency-Key: REPLACE_WITH_UNIQUE_RUN_ID" \
  --data '{
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
| url | Obrigatório; string.  URL pública; políticas de rede recusam destinos internos e credenciais embutidas. |
| formats | Opcional; array. items=markdown, html, links, screenshot, json Motor auto: html, markdown, links, screenshot. Legado HTML: html/markdown. json não gera JSON estruturado. |
| jsonSchema | Opcional; object.  Legado sem processamento no scrape. Use extract ou extração validada. |
| plannedLane | Opcional; enum. valores: http_basic, cf_browser, unlocker_http, managed_browser; default="http_basic" Caminho legado: http_basic, cf_browser, unlocker_http ou managed_browser. |
| timeoutMs | Opcional; integer. minimum=1000; maximum=60000; default=30000 Opção do runtime legado; o motor auto recusa esta opção. Não é timeout do cliente HTTP. |
| waitUntil | Opcional; enum. valores: domcontentloaded, load, networkidle0, networkidle2; default="domcontentloaded" Condição de navegação no runtime legado; recusada pelo motor auto. |
| fullPage | Opcional; boolean. default=true Captura conforme o caminho; motor auto recusa fullPage=true. |
| collectionEngine | Opcional; enum. valores: auto, premium auto: motor de 1 crédito por página válida. premium: oferta anterior e consentimento de 12 créditos. |
| engineStrategy | Opcional; enum. valores: auto, basic, enhanced; default="auto" auto tenta HTML/navegador; basic restringe HTML; enhanced escolhe navegador. |
| premiumSourceJobId | Opcional; string.  ID público do scrape falho que contém a oferta premium. |
| premiumConsent | Opcional; object.  Consentimento explícito; credits deve ser 12. |
| premiumConsent.credits | Obrigatório; const. valor: 12 Consulte o exemplo e os limites deste serviço. |


## 4. Consultar e interpretar

Motor auto retorna conteúdo inline em result e provider=collection_engine. O caminho legado pode retornar result.result com markdownArtifactKey/htmlArtifactKey r2://. Estes formatos não são intercambiáveis. Exemplos de JSON são ilustrativos; IDs e conteúdo variam.

```text
curl --fail-with-body "https://api.deepsfetch.com/v2/jobs/JOB_ID" \
  -H "Authorization: Bearer $DEEPSFETCH_API_KEY"
```

- [Jobs: acompanhar, retomar e cancelar](https://deepsfetch.com/docs/jobs?lang=pt-BR)
- [Respostas, artefatos e erros da API](https://deepsfetch.com/docs/api-results?lang=pt-BR)


## Limites e custo

Motor auto: HTML até 512 KiB; resultado até 850.000 bytes; links até 500. Rejeita actions, headers, cookies, opções render em objeto, timeoutMs, waitUntil, jsonSchema e fullPage=true. Usa coleta nova, sem cache. JSON estruturado exige extract. Premium só após uma oferta válida para a mesma URL/formatos e consentimento de 12 créditos.

- [Créditos, estimativa, cache e limites](https://deepsfetch.com/docs/costs?lang=pt-BR)


## Falhas e recuperação

engine_unsupported_options: remova opções incompatíveis ou escolha o caminho correto. page_too_large/unsupported_content_type: reduza o alvo ou use o leitor de arquivos. premium_offer_invalid: confira o job de origem, a URL e os formatos. Falhas de rede não justificam iniciar outra cobrança sem consultar o job.

## Continue a integração

- [Opções comuns e compatibilidade real](https://deepsfetch.com/docs/common-options?lang=pt-BR)
- [Webhooks: assinatura e entrega](https://deepsfetch.com/docs/webhooks?lang=pt-BR)
- [Playground, histórico e exportação](https://deepsfetch.com/docs/playground?lang=pt-BR)
