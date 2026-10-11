# Interact: executar ações de navegador

Execute uma sequência delimitada de ações sobre uma URL.

## 1. Preparar

Escolha uma página de teste e seletores estáveis. O runtime legado precisa estar disponível e não suporta teto costControl.

- [Comece aqui: conta → chave → primeiro resultado](https://deepsfetch.com/docs/getting-started?lang=pt-BR)
- [Conta, workspace e chaves](https://deepsfetch.com/docs/authentication?lang=pt-BR)


## 2. Executar passo a passo

Siga a sequência e confira o resultado de cada etapa.

1. Defina actions na ordem desejada. Comece com wait, scroll e screenshot, sem ações que alterem dados.
2. Use selector para esperar por um elemento ou milliseconds para espera fixa; type recebe selector e text; press recebe key.
3. Defina timeoutMs no nível superior e formatos. Envie uma vez e acompanhe o id retornado.
4. Confira conteúdo e captura produzidos. Se uma ação falhar, revise o seletor e o estado real da página; não repita compras ou formulários automaticamente.


## 3. Enviar a requisição

Bash/macOS/Linux. No PowerShell, use o guia de início com curl.exe e arquivo JSON. Troque o identificador de execução antes de iniciar um novo trabalho.

```text
curl --fail-with-body "https://api.deepsfetch.com/v2/interact" \
  -H "Authorization: Bearer $DEEPSFETCH_API_KEY" \
  -H "Content-Type: application/json" \
  -H "Idempotency-Key: REPLACE_WITH_UNIQUE_RUN_ID" \
  --data '{
  "url": "https://example.com",
  "actions": [
    {
      "type": "wait",
      "selector": "h1"
    },
    {
      "type": "scroll",
      "y": 300
    },
    {
      "type": "screenshot",
      "fullPage": false
    }
  ],
  "formats": [
    "markdown"
  ],
  "timeoutMs": 30000,
  "waitUntil": "domcontentloaded",
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
| actions | Obrigatório; array. minItems=1; maxItems=20 Sequência de 1 a 20 ações; variantes abaixo. |
| actions[].click.type | Obrigatório; const. valor: click Consulte o exemplo e os limites deste serviço. |
| actions[].click.selector | Obrigatório; string. minLength=1; maxLength=500 Consulte o exemplo e os limites deste serviço. |
| actions[].type.type | Obrigatório; const. valor: type Consulte o exemplo e os limites deste serviço. |
| actions[].type.selector | Obrigatório; string. minLength=1; maxLength=500 Consulte o exemplo e os limites deste serviço. |
| actions[].type.text | Obrigatório; string. maxLength=10000 Consulte o exemplo e os limites deste serviço. |
| actions[].type.clear | Opcional; boolean. default=false Consulte o exemplo e os limites deste serviço. |
| actions[].wait.type | Obrigatório; const. valor: wait Consulte o exemplo e os limites deste serviço. |
| actions[].wait.selector | Opcional; string. minLength=1; maxLength=500 Consulte o exemplo e os limites deste serviço. |
| actions[].wait.milliseconds | Opcional; integer. minimum=0; maximum=10000 Consulte o exemplo e os limites deste serviço. |
| actions[].scroll.type | Obrigatório; const. valor: scroll Consulte o exemplo e os limites deste serviço. |
| actions[].scroll.selector | Opcional; string. minLength=1; maxLength=500 Consulte o exemplo e os limites deste serviço. |
| actions[].scroll.x | Opcional; integer. minimum=-100000; maximum=100000; default=0 Consulte o exemplo e os limites deste serviço. |
| actions[].scroll.y | Obrigatório; integer. minimum=-100000; maximum=100000 Consulte o exemplo e os limites deste serviço. |
| actions[].press.type | Obrigatório; const. valor: press Consulte o exemplo e os limites deste serviço. |
| actions[].press.selector | Opcional; string. minLength=1; maxLength=500 Consulte o exemplo e os limites deste serviço. |
| actions[].press.key | Obrigatório; string. minLength=1; maxLength=40 Consulte o exemplo e os limites deste serviço. |
| actions[].screenshot.type | Obrigatório; const. valor: screenshot Consulte o exemplo e os limites deste serviço. |
| actions[].screenshot.fullPage | Opcional; boolean. default=false Captura conforme o caminho; motor auto recusa fullPage=true. |
| actions[].screenshot.redactSelectors | Opcional; array. maxItems=20 Consulte o exemplo e os limites deste serviço. |
| formats | Opcional; array. minItems=1; maxItems=4; items=html, markdown, links, screenshot Motor auto: html, markdown, links, screenshot. Legado HTML: html/markdown. json não gera JSON estruturado. |
| timeoutMs | Opcional; integer. minimum=1000; maximum=60000; default=30000 Opção do runtime legado; o motor auto recusa esta opção. Não é timeout do cliente HTTP. |
| waitUntil | Opcional; enum. valores: domcontentloaded, load, networkidle0, networkidle2; default="domcontentloaded" Condição de navegação no runtime legado; recusada pelo motor auto. |
| fullPage | Opcional; boolean. default=true Captura conforme o caminho; motor auto recusa fullPage=true. |
| redactSelectors | Opcional; array. maxItems=20 Consulte o exemplo e os limites deste serviço. |


## 4. Consultar e interpretar

O resultado segue o runtime de navegador, distinto do adaptador HTML. Este serviço não oferece sessões CDP persistentes, live view, execução arbitrária de Playwright/Python ou interação por prompt.

```text
curl --fail-with-body "https://api.deepsfetch.com/v2/jobs/JOB_ID" \
  -H "Authorization: Bearer $DEEPSFETCH_API_KEY"
```

- [Jobs: acompanhar, retomar e cancelar](https://deepsfetch.com/docs/jobs?lang=pt-BR)
- [Respostas, artefatos e erros da API](https://deepsfetch.com/docs/api-results?lang=pt-BR)


## Limites e custo

1–20 ações. Seletor até 500 caracteres; type.text até 10.000; wait até 10.000 ms; scroll x/y de -100.000 a 100.000; press.key até 40 caracteres; screenshot até 20 seletores de redação. Timeout 1.000–60.000 ms.

- [Créditos, estimativa, cache e limites](https://deepsfetch.com/docs/costs?lang=pt-BR)


## Falhas e recuperação

400: confira a variante de ação, tipo e campos. Timeout/elemento ausente: teste seletor e condição de navegação. cost_operation_unsupported: este runtime não implementa o teto; não retire uma política obrigatória silenciosamente.

## Continue a integração

- [Opções comuns e compatibilidade real](https://deepsfetch.com/docs/common-options?lang=pt-BR)
- [Webhooks: assinatura e entrega](https://deepsfetch.com/docs/webhooks?lang=pt-BR)
- [Playground, histórico e exportação](https://deepsfetch.com/docs/playground?lang=pt-BR)
