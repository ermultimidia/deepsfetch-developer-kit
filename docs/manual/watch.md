# Watch: monitoramento legado de uma URL

Registre monitoramento por intervalo em minutos. Para preços ou documentos, escolha os fluxos próprios do painel.

## 1. Preparar

Defina o que precisa acompanhar: texto/HTML via watch, preços/estoque no painel ou documentos versionados em Coleções. São serviços diferentes.

- [Comece aqui: conta → chave → primeiro resultado](https://deepsfetch.com/docs/getting-started?lang=pt-BR)
- [Conta, workspace e chaves](https://deepsfetch.com/docs/authentication?lang=pt-BR)


## 2. Executar passo a passo

Siga a sequência e confira o resultado de cada etapa.

1. Informe url e schedule, como 60m. Para um dígito, use 1min. Não use cron.
2. Envie com async=true e salve o id do job de criação. Consulte a conclusão e os dados do monitor retornado.
3. Confira o monitor e as execuções reais no fluxo disponível. completed do job confirma a criação, não uma comparação recorrente concluída.
4. Para pausar/retomar e inspecionar alertas de produtos use Monitores da web. Para feeds/versionamento de conteúdo use Coleções. Cancelar o job de criação não é uma API de exclusão do monitor.


## 3. Enviar a requisição

Bash/macOS/Linux. No PowerShell, use o guia de início com curl.exe e arquivo JSON. Troque o identificador de execução antes de iniciar um novo trabalho.

```text
curl --fail-with-body "https://api.deepsfetch.com/v2/watch" \
  -H "Authorization: Bearer $DEEPSFETCH_API_KEY" \
  -H "Content-Type: application/json" \
  -H "Idempotency-Key: REPLACE_WITH_UNIQUE_RUN_ID" \
  --data '{
  "url": "https://example.com",
  "schedule": "60m",
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
| schedule | Obrigatório; string. minLength=3; maxLength=128 Intervalo em minutos; não aceita cron. Ex.: 15m, 1min, 60m. |
| changeThreshold | Opcional; number. minimum=0; maximum=1 Legado aceito e ignorado pelo adaptador atual. |


## 4. Consultar e interpretar

O retorno representa a criação de monitor no provedor. A API pública V2 não tem CRUD completo de monitores nem listagem pública universal de verificações.

```text
curl --fail-with-body "https://api.deepsfetch.com/v2/jobs/JOB_ID" \
  -H "Authorization: Bearer $DEEPSFETCH_API_KEY"
```

- [Jobs: acompanhar, retomar e cancelar](https://deepsfetch.com/docs/jobs?lang=pt-BR)
- [Respostas, artefatos e erros da API](https://deepsfetch.com/docs/api-results?lang=pt-BR)


## Limites e custo

Intervalo 1–525.600 minutos. changeThreshold é aceito e ignorado; texto/HTML usam política fixa. costControl no pedido de criação V2 não é suportado; custos recorrentes são distintos.

- [Créditos, estimativa, cache e limites](https://deepsfetch.com/docs/costs?lang=pt-BR)


## Falhas e recuperação

Agendamento inválido: use os exemplos de intervalo, não cron. Provider indisponível: confira configuração. Para controlar custo e recorrência pelo painel, prefira o monitor de preços ou Coleções.


## Sintaxe verificada do intervalo

Use 60m, 15m ou 1min. A implementação atual não aceita espaço entre o número e o sufixo; a mensagem legada de erro pode mostrar um exemplo com esse espaço. A documentação usa os exemplos aceitos pelo parser, não essa mensagem antiga.

## Continue a integração

- [Opções comuns e compatibilidade real](https://deepsfetch.com/docs/common-options?lang=pt-BR)
- [Webhooks: assinatura e entrega](https://deepsfetch.com/docs/webhooks?lang=pt-BR)
- [Playground, histórico e exportação](https://deepsfetch.com/docs/playground?lang=pt-BR)
