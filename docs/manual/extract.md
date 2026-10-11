# Extract: JSON a partir de uma coleta

Extraia campos por IA de uma origem já coletada. O relatório de evidências do painel é um serviço separado.

## 1. Preparar

Conclua scrape e obtenha result.providerJobId do adaptador ou do motor auto. Esse ID interno fetch_ deve pertencer ao mesmo workspace. Configure IA gerenciada ou BYOK.

- [Comece aqui: conta → chave → primeiro resultado](https://deepsfetch.com/docs/getting-started?lang=pt-BR)
- [Conta, workspace e chaves](https://deepsfetch.com/docs/authentication?lang=pt-BR)


## 2. Executar passo a passo

Siga a sequência e confira o resultado de cada etapa.

1. Consulte o scrape e confirme completed; guarde o ID interno retornado. Não use o id público job_ diretamente no HTTP extract.
2. Defina um schema com tipos e campos obrigatórios. Troque FETCH_JOB_ID_FROM_SCRAPE_RESULT no exemplo.
3. Envie /v2/extract com aiMode e uma nova chave de idempotência. Guarde o novo id de extração e consulte seu estado.
4. Valide o JSON final contra o schema. Confira ausências e valores antes de exportar. Para evidências por campo, use Extração estruturada no painel.


## 3. Enviar a requisição

Bash/macOS/Linux. No PowerShell, use o guia de início com curl.exe e arquivo JSON. Troque o identificador de execução antes de iniciar um novo trabalho.

```text
curl --fail-with-body "https://api.deepsfetch.com/v2/extract" \
  -H "Authorization: Bearer $DEEPSFETCH_API_KEY" \
  -H "Content-Type: application/json" \
  -H "Idempotency-Key: REPLACE_WITH_UNIQUE_RUN_ID" \
  --data '{
  "source": {
    "type": "fetch_job",
    "jobId": "FETCH_JOB_ID_FROM_SCRAPE_RESULT"
  },
  "schema": {
    "type": "object",
    "properties": {
      "title": {
        "type": "string"
      }
    },
    "required": [
      "title"
    ]
  },
  "aiMode": "managed",
  "plannedLane": "http_basic",
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
| source | Obrigatório; object.  Origem de extract: um fetch concluído pertencente ao workspace. |
| source.type | Obrigatório; const. valor: fetch_job Consulte o exemplo e os limites deste serviço. |
| source.jobId | Obrigatório; string. minLength=1 HTTP extract usa ID interno fetch_; no MCP 2.0.1 o ID público job_ é resolvido automaticamente. |
| schema | Opcional; object.  Schema do JSON desejado. Validate o JSON retornado antes de usá-lo. |
| plannedLane | Opcional; enum. valores: http_basic, cf_browser, unlocker_http, managed_browser; default="http_basic" Caminho legado: http_basic, cf_browser, unlocker_http ou managed_browser. |
| aiMode | Opcional; enum. valores: managed, byok; default="managed" managed usa IA da plataforma; byok exige conexão ativa e cobra externamente. |


## 4. Consultar e interpretar

O retorno segue o envelope de jobs. No adaptador, o conteúdo específico está no result interno; não há garantia de relatório validation.fields. HTTP usa fetch_; MCP 2.0.1 aceita job_ público e resolve a origem.

```text
curl --fail-with-body "https://api.deepsfetch.com/v2/jobs/JOB_ID" \
  -H "Authorization: Bearer $DEEPSFETCH_API_KEY"
```

- [Jobs: acompanhar, retomar e cancelar](https://deepsfetch.com/docs/jobs?lang=pt-BR)
- [Respostas, artefatos e erros da API](https://deepsfetch.com/docs/api-results?lang=pt-BR)


## Limites e custo

A coleta e a IA são etapas distintas. BYOK exige conexão ativa; custos externos não entram no teto DeepSFetch. Não há garantia de veracidade porque o JSON corresponde a um schema.

- [Créditos, estimativa, cache e limites](https://deepsfetch.com/docs/costs?lang=pt-BR)


## Falhas e recuperação

Origem inexistente/incompleta: confirme workspace, ID interno e conclusão. byok_not_configured: configure a conexão. provider_unavailable: confira o provedor. JSON inválido: preserve o job e registre o schema e o erro; não complete campos inventando valores.

## Continue a integração

- [Opções comuns e compatibilidade real](https://deepsfetch.com/docs/common-options?lang=pt-BR)
- [Webhooks: assinatura e entrega](https://deepsfetch.com/docs/webhooks?lang=pt-BR)
- [Playground, histórico e exportação](https://deepsfetch.com/docs/playground?lang=pt-BR)
