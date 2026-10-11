# Opções comuns e compatibilidade real

Entenda quais parâmetros funcionam em cada caminho.

## Escolher o caminho

O motor automático é opt-in no HTTP e padrão atual no Playground. Pedidos sem collectionEngine continuam no adaptador legado. Não aplique os limites de um caminho ao outro.

| Campo / estado | Comportamento |
| --- | --- |
| collectionEngine=auto | 1 crédito por página válida; conteúdo inline; navegador incluído; fresh; aceita teto. |
| collectionEngine=premium | 12 créditos; oferta anterior válida e consentimento; sem screenshot. |
| legado HTML / plannedLane | HTTP 3 / CF browser 8 / Unlocker 12 / managed 18; resultado pode referenciar artefatos. |
| legado render / interact | Runtime distinto; não suporta teto de créditos. |
| search | 30 por unidade Web/News/Images; supports costControl.maxCredits. |
| watch V2 | Criação legada; teto do pedido não suportado; custo recorrente separado. |


## Cabeçalhos e idempotência

Use Authorization: Bearer, Content-Type: application/json para corpos JSON e Idempotency-Key para criações V2. Preserve corpo e chave ao repetir a mesma operação. Uma nova intenção exige chave nova. Nunca envie segredos na URL. Adaptadores n8n recebem idempotencyKey no corpo.


## Campos aceitos sem efeito

geo, session e device não são repassados no adaptador HTML e não configuram o runtime atual. json/jsonSchema no scrape não implementam extração estruturada. render.waitMs/waitFor/timeoutMs não substituem timeoutMs/waitUntil superiores do runtime legado. watch.changeThreshold e webhook.metadata não têm o comportamento que seus nomes sugerem.


## Cache, sessões e orçamento

Cache prefer significa reutilização elegível, não garantia de hit. Motor auto usa fresh. taskId agrega orçamento; Idempotency-Key evita duplicar uma intenção. session.id legado não cria uma sessão persistente. Confira suporte de teto por caminho e mantenha o custo BYOK externo separado.

## Continue a integração

- [Scrape: da URL ao conteúdo](https://deepsfetch.com/docs/scrape?lang=pt-BR)
- [Interact: executar ações de navegador](https://deepsfetch.com/docs/interact?lang=pt-BR)
- [Créditos, estimativa, cache e limites](https://deepsfetch.com/docs/costs?lang=pt-BR)
