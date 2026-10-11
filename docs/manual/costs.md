# Créditos, estimativa, cache e limites

Entenda o máximo planejado, as reservas e o consumo registrado.

## Configurar limites

Abra Controle de custos. O proprietário ou administrador pode definir limite mensal, limite por tarefa, modo de cache e idade máxima. O mês de consumo usa UTC. Disponível considera consumo e reservas ativas; uma reserva não é cobrança final. O limite efetivo é o menor entre as políticas aplicáveis. Um limite de créditos não é o saldo financeiro da assinatura.

- [/app/costs](https://deepsfetch.com/app/costs?lang=pt-BR)
- [/pricing](https://deepsfetch.com/pricing?lang=pt-BR)


## Estimar sem executar

POST /v2/cost/estimate autentica com Bearer e não inicia coleta. kind aceita fetch, scrape, map, crawl, collection, structured, extract e search. Inclua collectionEngine/engineStrategy para o motor auto e sources/source/category para busca. Confira min/max, allowed/reason, components e monthly. max é teto estimado, não promessa de cobrança.

```text
curl https://api.deepsfetch.com/v2/cost/estimate \
  -H "Authorization: Bearer $DEEPSFETCH_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "kind": "scrape",
  "plannedLane": "http_basic",
  "costControl": {
    "maxCredits": 3,
    "cacheMode": "fresh",
    "allowFallback": false
  }
}'
```


## Campos de costControl

O quickstart força allowFallback=false. No estimador geral, omitir allowFallback permite considerar fallback até o caminho mais caro; informe false quando quiser restringir isso. taskId agrupa etapas da mesma tarefa no workspace: use um ID novo por execução lógica para evitar acumular orçamento entre dias. A idempotência é separada desse agrupamento.

| Campo / estado | Comportamento |
| --- | --- |
| maxCredits | Inteiro de 0 a 1.000.000.000; teto adicional da tarefa. |
| cacheMode | fresh solicita coleta nova; prefer permite reutilização elegível. |
| maxAgeSeconds | Inteiro de 0 a 86.400. Cache depende de elegibilidade e disponibilidade. |
| allowFallback | Booleano; false restringe fallback. |
| taskId | 1–160 caracteres: letras, números, :, _ e -. |


## Onde o teto é suportado

Há suporte nos caminhos compatíveis de scrape/fetch, map, crawl e extract, motor automático, busca atual, quickstart e coleções. Runtime legado de navegador/interact e criação watch V2 não suportam teto do pedido; políticas aplicáveis podem recusar com cost_operation_unsupported. Não retire uma política obrigatória silenciosamente. Monitores de preço e coleta recorrente possuem fluxos de orçamento separados.


## Tarifas de referência e diagnóstico

Motor auto: 1 crédito por página válida, com tentativa de navegador incluída; premium autorizado: 12. Caminhos legados: HTTP 3, cf_browser 8, unlocker_http 12, managed_browser 18, cache elegível 1. Descoberta: 1 por unidade HTTP ou 4 no caminho cf_browser. Search: 30 por unidade Web/News/Images; filtros Developer/Research compartilham Web. IA gerenciada no estimador usa 4–5; BYOK cobra externamente. Confira estimativa e consumo real antes da recorrência.


## Passo a passo: orçamento antes da execução

Search atual e motor auto possuem controle próprio de custos. As restrições do runtime legado não devem ser aplicadas a eles.

1. Escolha o caminho exato e copie seus parâmetros para a estimativa. Para motor auto inclua collectionEngine=auto; para search inclua as mesmas sources.
2. Chame /v2/cost/estimate. Confira allowed/reason, min/max, components, assumptions, saldo e monthly. Nenhuma coleta é iniciada.
3. Defina teto por execução e política mensal conforme seu volume. Para tarefas com várias etapas use taskId novo por intenção, separado da idempotência.
4. Envie a operação e confira consumo/reservas após a conclusão. Estimativa de limite superior não é débito antecipado nem cobrança monetária.
5. Antes de agenda, estime a quantidade de verificações e reserve margem para falhas/descoberta. BYOK externo e conectores com provedor próprio exigem orçamento separado.

```text
curl --fail-with-body "https://api.deepsfetch.com/v2/cost/estimate" \
  -H "Authorization: Bearer $DEEPSFETCH_API_KEY" \
  -H "Content-Type: application/json" \
  -H "Idempotency-Key: REPLACE_WITH_UNIQUE_RUN_ID" \
  --data '{
  "kind": "scrape",
  "collectionEngine": "auto",
  "costControl": {
    "maxCredits": 1,
    "allowFallback": false,
    "cacheMode": "fresh"
  }
}'
```

## Continue a integração

- [Planos, assinatura e cobrança](https://deepsfetch.com/docs/billing?lang=pt-BR)
- [Integrações e sua chave de IA — BYOK](https://deepsfetch.com/docs/byok?lang=pt-BR)
- [/guides/repeatable-workflows](https://deepsfetch.com/guides/repeatable-workflows?lang=pt-BR)
