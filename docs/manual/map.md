# Map: descobrir URLs

Monte uma lista de endereços antes de coletar conteúdo.

## 1. Preparar

Escolha uma raiz pública específica e comece com cinco URLs. include/exclude são padrões glob.

- [Comece aqui: conta → chave → primeiro resultado](https://deepsfetch.com/docs/getting-started?lang=pt-BR)
- [Conta, workspace e chaves](https://deepsfetch.com/docs/authentication?lang=pt-BR)


## 2. Executar passo a passo

Siga a sequência e confira o resultado de cada etapa.

1. Informe url e limit. Use /docs/* para inclusão e /login* para exclusão, adaptando ao alvo.
2. Defina orçamento, envie com async=true e salve o id. Consulte /v2/jobs/{jobId}.
3. Confira URLs, host, caminho e quantidade descobertos. A lista não comprova que o conteúdo de cada página foi coletado.
4. Passe as URLs selecionadas para scrape, use crawl para coleta do site ou crie uma Coleção para atualização recorrente.


## 3. Enviar a requisição

Bash/macOS/Linux. No PowerShell, use o guia de início com curl.exe e arquivo JSON. Troque o identificador de execução antes de iniciar um novo trabalho.

```text
curl --fail-with-body "https://api.deepsfetch.com/v2/map" \
  -H "Authorization: Bearer $DEEPSFETCH_API_KEY" \
  -H "Content-Type: application/json" \
  -H "Idempotency-Key: REPLACE_WITH_UNIQUE_RUN_ID" \
  --data '{
  "url": "https://example.com",
  "limit": 5,
  "include": [
    "/*"
  ],
  "exclude": [
    "/login*"
  ],
  "costControl": {
    "maxCredits": 5,
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
| limit | Opcional; integer. minimum=1; maximum=500 Consulte o exemplo e os limites deste serviço. |
| include | Opcional; array.  Padrões glob de descoberta; use caminhos como /docs/*. |
| exclude | Opcional; array.  Padrões glob excluídos da descoberta. |
| maxDepth | Opcional; integer. minimum=0; maximum=10 Profundidade de links. Configure antes de aumentar o lote. |
| includeSubdomains | Opcional; boolean.  Permite subdomínios na descoberta, sujeito às políticas do provedor. |
| respectRobots | Opcional; boolean.  Respeita robots.txt na descoberta. |
| useSitemap | Opcional; boolean.  Habilita uso de sitemap na descoberta. |


## 4. Consultar e interpretar

O resultado contém a descoberta do provedor no envelope result. Inspecione a lista e o estado interno. O máximo limita a execução; não garante encontrar essa quantidade.

```text
curl --fail-with-body "https://api.deepsfetch.com/v2/jobs/JOB_ID" \
  -H "Authorization: Bearer $DEEPSFETCH_API_KEY"
```

- [Jobs: acompanhar, retomar e cancelar](https://deepsfetch.com/docs/jobs?lang=pt-BR)
- [Respostas, artefatos e erros da API](https://deepsfetch.com/docs/api-results?lang=pt-BR)


## Limites e custo

Limite efetivo 1–500. Profundidade, subdomínios, robots e sitemap são encaminhados ao adaptador; confira opções avançadas. Descoberta não inclui captura de tela nem extração por IA.

- [Créditos, estimativa, cache e limites](https://deepsfetch.com/docs/costs?lang=pt-BR)


## Falhas e recuperação

provider_limit_exceeded: reduza limit para até 500. Lista vazia: confira escopo, filtros e links/sitemap do alvo. Não aumente o lote antes de corrigir filtros que excluem tudo.

## Continue a integração

- [Opções comuns e compatibilidade real](https://deepsfetch.com/docs/common-options?lang=pt-BR)
- [Webhooks: assinatura e entrega](https://deepsfetch.com/docs/webhooks?lang=pt-BR)
- [Playground, histórico e exportação](https://deepsfetch.com/docs/playground?lang=pt-BR)
