# Auditoria de cobertura e profundidade — Firecrawl e DeepSFetch

Revisão: 2026-10-11T18:43:18.292Z.

Escopo fechado: 221 páginas do índice inglês/v2 do Firecrawl, mais 6 páginas de capacidades, MCP e referências legadas encontradas por links; 57 operações HTTP no OpenAPI v2. O código publicado do DeepSFetch, seus contratos e serviços de usuário foram comparados. Não foi auditado o código privado do Firecrawl nem executado todo provedor/site possível.


Achado concreto: GET /scrape/{jobId} possui contrato no OpenAPI e menção na tabela de recuperação da página Activity, mas não foi encontrada uma página dedicada de consulta no índice/links examinados. Quatro referências legadas de Extract/token usage também ficaram fora do índice v2, embora acessíveis. As operações POST dos índices Developer/Gov estão documentadas por exemplos na página da operação GET.
**Cobertura de referência Firecrawl: 56/57 operações com uma página que declara método/caminho.** Isso mede presença no contrato, não a profundidade de cada guia. A documentação técnica principal é aprofundada; quickstarts/integrações podem ser curtos e depender da referência da operação. Não há base para afirmar “absolutamente tudo da empresa” só pelo OpenAPI.

A página [Capabilities](https://docs.firecrawl.dev/capabilities) e o inventário MCP não estavam no índice de versão usado. Foram incluídos pela navegação cruzada. Portanto, um índice isolado não é uma garantia de cobertura total.

## Profundidade por família

| Família | Avaliação | Fonte |
| --- | --- | --- |
| Coleta e formatos | Profundo: exemplos/retornos, metadata, JSON, branding, produto, áudio/vídeo, perguntas, highlights, PII, ações, localização, cache e ZDR. DeepSFetch cobre subset; JSON scrape legado não funciona como extração. | [Guia oficial](https://docs.firecrawl.dev/features/scrape) |
| Busca e índices | Profundo: fontes/categorias, filtros, busca+coleta, localização/tempo, custos, ZDR e feedback. DeepSFetch busca por fontes e filtros de domínio; não equivale aos índices especializados. | [Guia oficial](https://docs.firecrawl.dev/features/search) |
| Map e Crawl | Profundo: início/consulta/cancelamento, contadores, parciais, paginação, escopo, webhooks e configuração. O DeepSFetch precisa enfatizar id público, artefatos e limites efetivos. | [Guia oficial](https://docs.firecrawl.dev/features/crawl) |
| Navegador e Interact | Profundo: prompting/código, CDP/live view, TTL e perfis persistentes. DeepSFetch oferece ações delimitadas; não oferece essa sessão persistente. | [Guia oficial](https://docs.firecrawl.dev/features/interact) |
| Monitoramento | Profundo: alvos, objetivos, cron/fuso, diffs, notificações, verificações puladas/pausa e preço. DeepSFetch tem watch legado, monitores de preço e Coleções distintos. | [Guia oficial](https://docs.firecrawl.dev/features/monitoring) |
| Parse | Profundo: upload, formatos, Markdown por página, blocos de layout, JSON e limites. DeepSFetch possui leitor local e OCR separado, não API /v2/parse. | [Guia oficial](https://docs.firecrawl.dev/features/parse) |
| Agent | Profundo: tarefas, execução/trace/snapshots, orçamento, modelos, continuidade e aprovação de provedores pagos. Sem equivalência no DeepSFetch. | [Guia oficial](https://docs.firecrawl.dev/features/agent) |
| Alexandria | Explica busca/uso de ferramentas externas, integração com Agent e acesso/preço. Não confundir com feed de uma coleção de páginas. | [Guia oficial](https://docs.firecrawl.dev/features/alexandria) |
| Autenticação e segurança | A matriz distingue Cloud/self-host, MCP, sessão, API auth e credenciais do alvo. Há páginas específicas de restrições de chave/IP, PII, threat protection, SSO/SCIM e SIEM; não implica cobertura pública dos mecanismos internos. | [Guia oficial](https://docs.firecrawl.dev/capabilities) |
| SDKs/MCP/CLI/integrações | Cobertura ampla de linguagens, quickstarts e frameworks. Algumas páginas de integração são instruções curtas que dependem dos guias da operação; existência da página não comprova teste naquela versão. | [Guia oficial](https://docs.firecrawl.dev/sdks/overview) |
| Webhooks, cobrança e operação | Guias separados de eventos, assinatura, testes/diagnóstico, limites e cobrança. No DeepSFetch as cadeias V2, produto e Supabase têm regras de entrega diferentes. | [Guia oficial](https://docs.firecrawl.dev/webhooks/overview) |
| Self-hosting | Distingue recursos Cloud e stack aberta e suas dependências. Developer kit DeepSFetch é cliente, não uma distribuição self-hosted do SaaS. | [Guia oficial](https://docs.firecrawl.dev/contributing/self-host) |

## Cobertura de cada operação Firecrawl

| Método | Caminho | Referência |
| --- | --- | --- |
| POST | /monitor | [Referência](https://docs.firecrawl.dev/api-reference/endpoint/monitor-create) |
| GET | /monitor | [Referência](https://docs.firecrawl.dev/api-reference/endpoint/monitor-list) |
| GET | /monitor/{monitorId} | [Referência](https://docs.firecrawl.dev/api-reference/endpoint/monitor-get) |
| PATCH | /monitor/{monitorId} | [Referência](https://docs.firecrawl.dev/api-reference/endpoint/monitor-update) |
| DELETE | /monitor/{monitorId} | [Referência](https://docs.firecrawl.dev/api-reference/endpoint/monitor-delete) |
| POST | /monitor/{monitorId}/run | [Referência](https://docs.firecrawl.dev/api-reference/endpoint/monitor-run) |
| GET | /monitor/{monitorId}/checks | [Referência](https://docs.firecrawl.dev/api-reference/endpoint/monitor-checks-list) |
| GET | /monitor/{monitorId}/checks/{checkId} | [Referência](https://docs.firecrawl.dev/api-reference/endpoint/monitor-check-get) |
| POST | /scrape | [Referência](https://docs.firecrawl.dev/advanced-scraping-guide), [Referência](https://docs.firecrawl.dev/ai-onboarding), [Referência](https://docs.firecrawl.dev/api-reference/endpoint/scrape), [Referência](https://docs.firecrawl.dev/developer-guides/usage-guides/choosing-the-data-extractor), [Referência](https://docs.firecrawl.dev/features/agent), [Referência](https://docs.firecrawl.dev/features/enhanced-mode), [Referência](https://docs.firecrawl.dev/features/llm-extract), [Referência](https://docs.firecrawl.dev/features/lockdown), [Referência](https://docs.firecrawl.dev/features/pii-redaction), [Referência](https://docs.firecrawl.dev/features/scrape) |
| POST | /scrape/{jobId}/interact | [Referência](https://docs.firecrawl.dev/api-reference/endpoint/scrape-execute) |
| DELETE | /scrape/{jobId}/interact | [Referência](https://docs.firecrawl.dev/api-reference/endpoint/scrape-browser-delete) |
| POST | /parse | [Referência](https://docs.firecrawl.dev/api-reference/endpoint/parse), [Referência](https://docs.firecrawl.dev/features/parse) |
| GET | /parse/formats | [Referência](https://docs.firecrawl.dev/api-reference/endpoint/parse-formats) |
| POST | /batch/scrape | [Referência](https://docs.firecrawl.dev/api-reference/endpoint/batch-scrape), [Referência](https://docs.firecrawl.dev/features/batch-scrape), [Referência](https://docs.firecrawl.dev/webhooks/overview) |
| GET | /batch/scrape/{id} | [Referência](https://docs.firecrawl.dev/api-reference/endpoint/batch-scrape-get) |
| DELETE | /batch/scrape/{id} | [Referência](https://docs.firecrawl.dev/api-reference/endpoint/batch-scrape-delete) |
| GET | /batch/scrape/{id}/errors | [Referência](https://docs.firecrawl.dev/api-reference/endpoint/batch-scrape-get-errors) |
| GET | /crawl/{id} | [Referência](https://docs.firecrawl.dev/api-reference/endpoint/crawl-get) |
| DELETE | /crawl/{id} | [Referência](https://docs.firecrawl.dev/api-reference/endpoint/crawl-delete) |
| GET | /crawl/{id}/errors | [Referência](https://docs.firecrawl.dev/api-reference/endpoint/crawl-get-errors) |
| POST | /crawl | [Referência](https://docs.firecrawl.dev/advanced-scraping-guide), [Referência](https://docs.firecrawl.dev/ai-onboarding), [Referência](https://docs.firecrawl.dev/api-reference/endpoint/crawl-post), [Referência](https://docs.firecrawl.dev/features/crawl), [Referência](https://docs.firecrawl.dev/features/fast-scraping), [Referência](https://docs.firecrawl.dev/webhooks/overview) |
| POST | /crawl/params-preview | [Referência](https://docs.firecrawl.dev/advanced-scraping-guide), [Referência](https://docs.firecrawl.dev/api-reference/endpoint/crawl-params-preview) |
| POST | /map | [Referência](https://docs.firecrawl.dev/advanced-scraping-guide), [Referência](https://docs.firecrawl.dev/ai-onboarding), [Referência](https://docs.firecrawl.dev/api-reference/endpoint/map), [Referência](https://docs.firecrawl.dev/features/map) |
| POST | /extract | [Referência](https://docs.firecrawl.dev/api-reference/endpoint/extract) |
| GET | /extract/{id} | [Referência](https://docs.firecrawl.dev/api-reference/endpoint/extract-get) |
| GET | /agent | [Referência](https://docs.firecrawl.dev/api-reference/endpoint/agent-list) |
| POST | /agent | [Referência](https://docs.firecrawl.dev/advanced-scraping-guide), [Referência](https://docs.firecrawl.dev/api-reference/endpoint/agent), [Referência](https://docs.firecrawl.dev/features/agent) |
| GET | /agent/{jobId} | [Referência](https://docs.firecrawl.dev/api-reference/endpoint/agent-get) |
| DELETE | /agent/{jobId} | [Referência](https://docs.firecrawl.dev/api-reference/endpoint/agent-delete) |
| GET | /agent/{jobId}/trace | [Referência](https://docs.firecrawl.dev/api-reference/endpoint/agent-trace) |
| GET | /agent/{jobId}/snapshots/{snapshotId} | [Referência](https://docs.firecrawl.dev/api-reference/endpoint/agent-snapshot) |
| GET | /crawl/active | [Referência](https://docs.firecrawl.dev/api-reference/endpoint/crawl-active) |
| GET | /team/credit-usage | [Referência](https://docs.firecrawl.dev/api-reference/endpoint/credit-usage) |
| GET | /team/credit-usage/historical | [Referência](https://docs.firecrawl.dev/api-reference/endpoint/credit-usage-historical) |
| GET | /team/token-usage | [Referência](https://docs.firecrawl.dev/api-reference/endpoint/token-usage) |
| GET | /team/token-usage/historical | [Referência](https://docs.firecrawl.dev/api-reference/endpoint/token-usage-historical) |
| GET | /team/queue-status | [Referência](https://docs.firecrawl.dev/api-reference/endpoint/queue-status) |
| GET | /team/activity | [Referência](https://docs.firecrawl.dev/api-reference/endpoint/activity) |
| POST | /search | [Referência](https://docs.firecrawl.dev/ai-onboarding), [Referência](https://docs.firecrawl.dev/api-reference/endpoint/search), [Referência](https://docs.firecrawl.dev/features/developer), [Referência](https://docs.firecrawl.dev/features/search-highlights), [Referência](https://docs.firecrawl.dev/features/search) |
| POST | /interact | [Referência](https://docs.firecrawl.dev/api-reference/endpoint/browser-create) |
| GET | /interact | [Referência](https://docs.firecrawl.dev/api-reference/endpoint/browser-list) |
| POST | /interact/{sessionId}/execute | [Referência](https://docs.firecrawl.dev/api-reference/endpoint/browser-execute) |
| DELETE | /interact/{sessionId} | [Referência](https://docs.firecrawl.dev/api-reference/endpoint/browser-delete) |
| GET | /scrape/{jobId} | Contrato no OpenAPI e menção em Activity; página dedicada não encontrada no escopo auditado |
| POST | /search/{jobId}/feedback | [Referência](https://docs.firecrawl.dev/api-reference/endpoint/search-feedback) |
| POST | /support/ask | [Referência](https://docs.firecrawl.dev/ai-onboarding), [Referência](https://docs.firecrawl.dev/api-reference/endpoint/ask), [Referência](https://docs.firecrawl.dev/features/agent), [Referência](https://docs.firecrawl.dev/features/ask) |
| POST | /support/docs-search | [Referência](https://docs.firecrawl.dev/api-reference/endpoint/docs-search), [Referência](https://docs.firecrawl.dev/features/ask) |
| GET | /search/research/papers | [Referência](https://docs.firecrawl.dev/api-reference/endpoint/research-search-papers) |
| GET | /search/research/papers/{id} | [Referência](https://docs.firecrawl.dev/api-reference/endpoint/research-paper) |
| GET | /search/research/papers/{id}/similar | [Referência](https://docs.firecrawl.dev/api-reference/endpoint/research-related-papers) |
| GET | /search/developer | [Referência](https://docs.firecrawl.dev/api-reference/endpoint/developer-search) |
| POST | /search/developer | [Referência](https://docs.firecrawl.dev/api-reference/endpoint/developer-search), [Referência](https://docs.firecrawl.dev/features/developer) |
| GET | /search/gov | [Referência](https://docs.firecrawl.dev/api-reference/endpoint/gov-search) |
| POST | /search/gov | [Referência](https://docs.firecrawl.dev/api-reference/endpoint/gov-search), [Referência](https://docs.firecrawl.dev/features/gov) |
| POST | /feedback | [Referência](https://docs.firecrawl.dev/api-reference/endpoint/feedback) |
| GET | /team/threat-protection | [Referência](https://docs.firecrawl.dev/api-reference/endpoint/threat-protection) |
| PUT | /team/threat-protection | [Referência](https://docs.firecrawl.dev/api-reference/endpoint/threat-protection-update) |

## DeepSFetch: cobertura pública

| Método | Caminho | Guia |
| --- | --- | --- |
| POST | /v2/scrape | [Passo a passo](https://deepsfetch.com/docs/scrape?lang=pt-BR) |
| POST | /v2/extract | [Passo a passo](https://deepsfetch.com/docs/extract?lang=pt-BR) |
| POST | /v2/search | [Passo a passo](https://deepsfetch.com/docs/search?lang=pt-BR) |
| POST | /v2/map | [Passo a passo](https://deepsfetch.com/docs/map?lang=pt-BR) |
| POST | /v2/crawl | [Passo a passo](https://deepsfetch.com/docs/crawl?lang=pt-BR) |
| POST | /v2/interact | [Passo a passo](https://deepsfetch.com/docs/interact?lang=pt-BR) |
| POST | /v2/watch | [Passo a passo](https://deepsfetch.com/docs/watch?lang=pt-BR) |
| GET | /v2/jobs/{jobId} | [Passo a passo](https://deepsfetch.com/docs/jobs?lang=pt-BR) |
| POST | /v2/jobs/{jobId}/cancel | [Passo a passo](https://deepsfetch.com/docs/jobs?lang=pt-BR) |
| POST | /v2/cost/estimate | [Passo a passo](https://deepsfetch.com/docs/costs?lang=pt-BR) |
| GET | /integration/n8n/connection | [Passo a passo](https://deepsfetch.com/docs/authentication?lang=pt-BR) |
| POST | /integration/n8n/start | [Passo a passo](https://deepsfetch.com/docs/n8n-api?lang=pt-BR) |
| POST | /integration/n8n/result | [Passo a passo](https://deepsfetch.com/docs/n8n-api?lang=pt-BR) |
| POST | /integration/n8n/estimate | [Passo a passo](https://deepsfetch.com/docs/n8n-api?lang=pt-BR) |
| GET | /collection-feed/{collectionId}/documents | [Passo a passo](https://deepsfetch.com/docs/collection-feeds?lang=pt-BR) |
| GET | /collection-feed/{collectionId}/changes | [Passo a passo](https://deepsfetch.com/docs/collection-feeds?lang=pt-BR) |

## Serviços de usuário identificados

| Serviço | Escopo atual | Guia |
| --- | --- | --- |
| scrape | Motor auto e adaptador legado; HTML, Markdown, links e captura conforme o caminho. | [Guia](https://deepsfetch.com/docs/scrape?lang=pt-BR) |
| extract | IA sobre fetch concluído; HTTP usa ID interno; MCP resolve ID público. | [Guia](https://deepsfetch.com/docs/extract?lang=pt-BR) |
| validated-fields | Painel: dados da página, IA gerenciada e BYOK com evidências. | [Guia](https://deepsfetch.com/docs/validated-extraction?lang=pt-BR) |
| search | Web/News/Images/Developer/Research; coleta separada. | [Guia](https://deepsfetch.com/docs/search?lang=pt-BR) |
| map | Descoberta de URLs com filtros e máximo de 500. | [Guia](https://deepsfetch.com/docs/map?lang=pt-BR) |
| crawl | Coleta assíncrona de até 500 páginas planejadas; conferir parciais. | [Guia](https://deepsfetch.com/docs/crawl?lang=pt-BR) |
| interact | Seis tipos de ação e até 20 passos; runtime legado. | [Guia](https://deepsfetch.com/docs/interact?lang=pt-BR) |
| watch | Criação legada por intervalo; sem CRUD público completo. | [Guia](https://deepsfetch.com/docs/watch?lang=pt-BR) |
| price-monitors | Painel: preços/estoque, histórico, pausa/retomada e alertas webhook. | [Guia](https://deepsfetch.com/docs/price-monitors?lang=pt-BR) |
| collections | Painel: agenda, documentos versionados, chunks e outbox. | [Guia](https://deepsfetch.com/docs/collections?lang=pt-BR) |
| feeds | API autenticada de documentos/mudanças com cursores. | [Guia](https://deepsfetch.com/docs/collection-feeds?lang=pt-BR) |
| supabase | Destino de coleção com SQL e entrega por outbox. | [Guia](https://deepsfetch.com/docs/supabase?lang=pt-BR) |
| batch-csv | Painel: até 500 URLs, pausa, histórico e JSON/CSV. | [Guia](https://deepsfetch.com/docs/batches?lang=pt-BR) |
| parse-local | Leitura local de oito famílias de arquivos; OCR Mistral separado. | [Guia](https://deepsfetch.com/docs/files?lang=pt-BR) |
| social | X/Reddit por API oficial; Sheets via workflow existente. | [Guia](https://deepsfetch.com/docs/connectors?lang=pt-BR) |
| mcp | Servidor remoto registrado, nove ferramentas; schema real define opções. | [Guia](https://deepsfetch.com/docs/mcp?lang=pt-BR) |
| n8n | Três modelos validados e contrato de conexão/start/result/estimate. | [Guia](https://deepsfetch.com/docs/n8n-api?lang=pt-BR) |
| sdk-js | Cliente publicado no npm, jobs e estimativa. | [Guia](https://deepsfetch.com/docs/sdk-javascript?lang=pt-BR) |
| sdk-python | Cliente via developer kit; publicação PyPI ainda não confirmada. | [Guia](https://deepsfetch.com/docs/sdk-python?lang=pt-BR) |
| cli | CLI no npm, corpos JSON, consulta/espera e idempotência. | [Guia](https://deepsfetch.com/docs/cli?lang=pt-BR) |
| account-keys | Conta/workspace/chaves, permissões e rotação. | [Guia](https://deepsfetch.com/docs/authentication?lang=pt-BR) |
| billing | Catálogo, checkout e portal; valores reais consultados no sistema. | [Guia](https://deepsfetch.com/docs/billing?lang=pt-BR) |
| costs | Estimativa, política, consumo e reservas, separados por caminho. | [Guia](https://deepsfetch.com/docs/costs?lang=pt-BR) |
| webhooks | Jobs terminais com HMAC; sem retry automático V2. | [Guia](https://deepsfetch.com/docs/webhooks?lang=pt-BR) |
| byok | Sete provedores aceitos; modelo/acesso/custos externos dependem da conta. | [Guia](https://deepsfetch.com/docs/byok?lang=pt-BR) |
| playground | Interface, código, resultados, histórico e exportação. | [Guia](https://deepsfetch.com/docs/playground?lang=pt-BR) |
| jobs | Consulta, retomada, estados e cancelamento público. | [Guia](https://deepsfetch.com/docs/jobs?lang=pt-BR) |
| support | Triagem com código/ID e relato sem segredos. | [Guia](https://deepsfetch.com/docs/troubleshooting?lang=pt-BR) |

## Correções feitas

- O OpenAPI público omitia collectionEngine e a combinação de fontes da busca
- Os controles de custo da busca estavam incorretamente descritos como indisponíveis
- A lista antiga de BYOK omitia quatro provedores aceitos
- A instalação Python pelo PyPI não estava disponível; agora é indicada a instalação pelo código-fonte
- Campos legados aceitos pelo contrato não tinham efeito no fluxo
- Exemplos curl continham caracteres de edição indevidos
- As instruções de sessão, chaves e exportação do painel estavam desatualizadas

Também foi corrigido o exemplo de intervalo do Watch: use `60m`. O parser atual recusa `every 60 minutes`, apesar de mensagens legadas sugerirem essa forma.

## Critério de profundidade

Cada serviço tem preparação, passos de execução, parâmetros ou configuração da interface, reconhecimento do resultado, limites/custos e recuperação. Exemplos ilustrativos são identificados e não usados como evidência de execução. Campos legados sem efeito são explicitamente marcados. Links/IDs/paginação e formatos diferentes são explicados.

Validação de contratos, schemas e páginas públicas. Não foi executada uma nova matriz paga de provedores nem repetido o caso n8n já validado.

As páginas do Firecrawl foram usadas como fonte para comparação; seu conteúdo integral não será redistribuído no kit.

## Índice completo das páginas examinadas

- [Advanced Scraping Guide](https://docs.firecrawl.dev/advanced-scraping-guide)
- [Build with AI](https://docs.firecrawl.dev/ai-onboarding)
- [Agent Auth (WorkOS ID-JAG)](https://docs.firecrawl.dev/ai-onboarding/agent-auth)
- [Activity](https://docs.firecrawl.dev/api-reference/endpoint/activity)
- [Cancel Agent](https://docs.firecrawl.dev/api-reference/endpoint/agent-delete)
- [Get Agent Status](https://docs.firecrawl.dev/api-reference/endpoint/agent-get)
- [List Agent Runs](https://docs.firecrawl.dev/api-reference/endpoint/agent-list)
- [Get Agent Snapshot](https://docs.firecrawl.dev/api-reference/endpoint/agent-snapshot)
- [Get Agent Trace](https://docs.firecrawl.dev/api-reference/endpoint/agent-trace)
- [Agent](https://docs.firecrawl.dev/api-reference/endpoint/agent)
- [Ask](https://docs.firecrawl.dev/api-reference/endpoint/ask)
- [Cancel Batch Scrape](https://docs.firecrawl.dev/api-reference/endpoint/batch-scrape-delete)
- [Get Batch Scrape Errors](https://docs.firecrawl.dev/api-reference/endpoint/batch-scrape-get-errors)
- [Get Batch Scrape Status](https://docs.firecrawl.dev/api-reference/endpoint/batch-scrape-get)
- [Batch Scrape](https://docs.firecrawl.dev/api-reference/endpoint/batch-scrape)
- [Create Interact Session](https://docs.firecrawl.dev/api-reference/endpoint/browser-create)
- [Delete Interact Session](https://docs.firecrawl.dev/api-reference/endpoint/browser-delete)
- [Execute Code in a Session](https://docs.firecrawl.dev/api-reference/endpoint/browser-execute)
- [List Interact Sessions](https://docs.firecrawl.dev/api-reference/endpoint/browser-list)
- [Get Active Crawls](https://docs.firecrawl.dev/api-reference/endpoint/crawl-active)
- [Cancel Crawl](https://docs.firecrawl.dev/api-reference/endpoint/crawl-delete)
- [Get Crawl Errors](https://docs.firecrawl.dev/api-reference/endpoint/crawl-get-errors)
- [Get Crawl Status](https://docs.firecrawl.dev/api-reference/endpoint/crawl-get)
- [Crawl Params Preview](https://docs.firecrawl.dev/api-reference/endpoint/crawl-params-preview)
- [Crawl](https://docs.firecrawl.dev/api-reference/endpoint/crawl-post)
- [Historical Credit Usage](https://docs.firecrawl.dev/api-reference/endpoint/credit-usage-historical)
- [Credit Usage](https://docs.firecrawl.dev/api-reference/endpoint/credit-usage)
- [Search the Developer Index](https://docs.firecrawl.dev/api-reference/endpoint/developer-search)
- [Docs Search](https://docs.firecrawl.dev/api-reference/endpoint/docs-search)
- [Get Extract Status](https://docs.firecrawl.dev/api-reference/endpoint/extract-get) — encontrada fora do índice v2
- [Extract](https://docs.firecrawl.dev/api-reference/endpoint/extract) — encontrada fora do índice v2
- [Endpoint Feedback](https://docs.firecrawl.dev/api-reference/endpoint/feedback)
- [Search the Government Index](https://docs.firecrawl.dev/api-reference/endpoint/gov-search)
- [Map](https://docs.firecrawl.dev/api-reference/endpoint/map)
- [Get Monitor Check](https://docs.firecrawl.dev/api-reference/endpoint/monitor-check-get)
- [List Monitor Checks](https://docs.firecrawl.dev/api-reference/endpoint/monitor-checks-list)
- [Create Monitor](https://docs.firecrawl.dev/api-reference/endpoint/monitor-create)
- [Delete Monitor](https://docs.firecrawl.dev/api-reference/endpoint/monitor-delete)
- [Get Monitor](https://docs.firecrawl.dev/api-reference/endpoint/monitor-get)
- [List Monitors](https://docs.firecrawl.dev/api-reference/endpoint/monitor-list)
- [Run Monitor](https://docs.firecrawl.dev/api-reference/endpoint/monitor-run)
- [Update Monitor](https://docs.firecrawl.dev/api-reference/endpoint/monitor-update)
- [Parse Formats](https://docs.firecrawl.dev/api-reference/endpoint/parse-formats)
- [Parse](https://docs.firecrawl.dev/api-reference/endpoint/parse)
- [Queue Status](https://docs.firecrawl.dev/api-reference/endpoint/queue-status)
- [Inspect or Read Paper](https://docs.firecrawl.dev/api-reference/endpoint/research-paper)
- [Find Related Papers](https://docs.firecrawl.dev/api-reference/endpoint/research-related-papers)
- [Search Papers](https://docs.firecrawl.dev/api-reference/endpoint/research-search-papers)
- [Stop Interacting](https://docs.firecrawl.dev/api-reference/endpoint/scrape-browser-delete)
- [Interact with a Scraped Page](https://docs.firecrawl.dev/api-reference/endpoint/scrape-execute)
- [Scrape](https://docs.firecrawl.dev/api-reference/endpoint/scrape)
- [Search Feedback](https://docs.firecrawl.dev/api-reference/endpoint/search-feedback)
- [Search](https://docs.firecrawl.dev/api-reference/endpoint/search)
- [Update Threat Protection Policy](https://docs.firecrawl.dev/api-reference/endpoint/threat-protection-update)
- [Get Threat Protection Policy](https://docs.firecrawl.dev/api-reference/endpoint/threat-protection)
- [Historical Token Usage](https://docs.firecrawl.dev/api-reference/endpoint/token-usage-historical) — encontrada fora do índice v2
- [Token Usage](https://docs.firecrawl.dev/api-reference/endpoint/token-usage) — encontrada fora do índice v2
- [Agent Action](https://docs.firecrawl.dev/api-reference/endpoint/webhook-agent-action)
- [Agent Cancelled](https://docs.firecrawl.dev/api-reference/endpoint/webhook-agent-cancelled)
- [Agent Completed](https://docs.firecrawl.dev/api-reference/endpoint/webhook-agent-completed)
- [Agent Failed](https://docs.firecrawl.dev/api-reference/endpoint/webhook-agent-failed)
- [Agent Started](https://docs.firecrawl.dev/api-reference/endpoint/webhook-agent-started)
- [Batch Scrape Completed](https://docs.firecrawl.dev/api-reference/endpoint/webhook-batch-scrape-completed)
- [Batch Scrape Page](https://docs.firecrawl.dev/api-reference/endpoint/webhook-batch-scrape-page)
- [Batch Scrape Started](https://docs.firecrawl.dev/api-reference/endpoint/webhook-batch-scrape-started)
- [Crawl Completed](https://docs.firecrawl.dev/api-reference/endpoint/webhook-crawl-completed)
- [Crawl Page](https://docs.firecrawl.dev/api-reference/endpoint/webhook-crawl-page)
- [Crawl Started](https://docs.firecrawl.dev/api-reference/endpoint/webhook-crawl-started)
- [Monitor Check Completed](https://docs.firecrawl.dev/api-reference/endpoint/webhook-monitor-check-completed)
- [Monitor Page](https://docs.firecrawl.dev/api-reference/endpoint/webhook-monitor-page)
- [Errors](https://docs.firecrawl.dev/api-reference/errors)
- [Introduction](https://docs.firecrawl.dev/api-reference/v2-introduction)
- [Billing](https://docs.firecrawl.dev/billing)
- [Capabilities](https://docs.firecrawl.dev/capabilities) — encontrada fora do índice v2
- [Contributor setup for Firecrawl](https://docs.firecrawl.dev/contributing/guide)
- [Open source or Firecrawl Cloud](https://docs.firecrawl.dev/contributing/open-source-or-cloud)
- [Self-hosting Firecrawl](https://docs.firecrawl.dev/contributing/self-host)
- [Overview](https://docs.firecrawl.dev/dashboard)
- [Building an AI Research Assistant with Firecrawl and AI SDK](https://docs.firecrawl.dev/developer-guides/cookbooks/ai-research-assistant-cookbook)
- [Building a Brand Style Guide Generator with Firecrawl](https://docs.firecrawl.dev/developer-guides/cookbooks/brand-style-guide-generator-cookbook)
- [Full-Stack Templates](https://docs.firecrawl.dev/developer-guides/examples)
- [Anthropic](https://docs.firecrawl.dev/developer-guides/llm-sdks-and-frameworks/anthropic)
- [ElevenAgents](https://docs.firecrawl.dev/developer-guides/llm-sdks-and-frameworks/elevenagents)
- [Gemini](https://docs.firecrawl.dev/developer-guides/llm-sdks-and-frameworks/gemini)
- [Agent Development Kit (ADK)](https://docs.firecrawl.dev/developer-guides/llm-sdks-and-frameworks/google-adk)
- [Jev](https://docs.firecrawl.dev/developer-guides/llm-sdks-and-frameworks/jev)
- [LangChain](https://docs.firecrawl.dev/developer-guides/llm-sdks-and-frameworks/langchain)
- [LangGraph](https://docs.firecrawl.dev/developer-guides/llm-sdks-and-frameworks/langgraph)
- [LlamaIndex](https://docs.firecrawl.dev/developer-guides/llm-sdks-and-frameworks/llamaindex)
- [Mastra](https://docs.firecrawl.dev/developer-guides/llm-sdks-and-frameworks/mastra)
- [OpenAI](https://docs.firecrawl.dev/developer-guides/llm-sdks-and-frameworks/openai)
- [Vercel AI SDK](https://docs.firecrawl.dev/developer-guides/llm-sdks-and-frameworks/vercel-ai-sdk)
- [Choosing the Data Extractor](https://docs.firecrawl.dev/developer-guides/usage-guides/choosing-the-data-extractor)
- [Verifying Freshness and Liveness](https://docs.firecrawl.dev/developer-guides/usage-guides/verifying-freshness-and-liveness)
- [Enterprise](https://docs.firecrawl.dev/enterprise)
- [Agent](https://docs.firecrawl.dev/features/agent)
- [Alexandria](https://docs.firecrawl.dev/features/alexandria)
- [Debug Firecrawl with Ask](https://docs.firecrawl.dev/features/ask)
- [Batch Scrape](https://docs.firecrawl.dev/features/batch-scrape)
- [Browser Sandbox](https://docs.firecrawl.dev/features/browser)
- [Change Tracking](https://docs.firecrawl.dev/features/change-tracking)
- [Crawl](https://docs.firecrawl.dev/features/crawl)
- [Developer Index](https://docs.firecrawl.dev/features/developer)
- [Document Parsing](https://docs.firecrawl.dev/features/document-parsing)
- [Enhanced Mode](https://docs.firecrawl.dev/features/enhanced-mode)
- [Faster Scraping](https://docs.firecrawl.dev/features/fast-scraping)
- [Firecrawl Government Index](https://docs.firecrawl.dev/features/gov)
- [Interact after scraping](https://docs.firecrawl.dev/features/interact)
- [IP Restrictions](https://docs.firecrawl.dev/features/ip-restrictions)
- [Key Restrictions](https://docs.firecrawl.dev/features/key-restrictions)
- [JSON mode - Structured result](https://docs.firecrawl.dev/features/llm-extract)
- [Lockdown Mode](https://docs.firecrawl.dev/features/lockdown)
- [Map](https://docs.firecrawl.dev/features/map)
- [Page monitoring](https://docs.firecrawl.dev/features/monitoring-page)
- [Entire web-scale monitoring](https://docs.firecrawl.dev/features/monitoring-web-scale)
- [Website monitoring](https://docs.firecrawl.dev/features/monitoring-website)
- [Monitoring](https://docs.firecrawl.dev/features/monitoring)
- [Parse](https://docs.firecrawl.dev/features/parse)
- [PII Redaction](https://docs.firecrawl.dev/features/pii-redaction)
- [Proxies](https://docs.firecrawl.dev/features/proxies)
- [Research Index](https://docs.firecrawl.dev/features/research)
- [Scrape](https://docs.firecrawl.dev/features/scrape)
- [Search Highlights](https://docs.firecrawl.dev/features/search-highlights)
- [Search](https://docs.firecrawl.dev/features/search)
- [SIEM Audit Logging](https://docs.firecrawl.dev/features/siem)
- [SSO and SCIM](https://docs.firecrawl.dev/features/sso)
- [Threat Protection](https://docs.firecrawl.dev/features/threat-protection)
- [Firecrawl for Platforms](https://docs.firecrawl.dev/firecrawl-for-platforms)
- [Camel AI](https://docs.firecrawl.dev/integrations/camelai)
- [Firecrawl in ChatGPT & Codex](https://docs.firecrawl.dev/integrations/chatgpt-codex)
- [Composio](https://docs.firecrawl.dev/integrations/composio)
- [CrewAI](https://docs.firecrawl.dev/integrations/crewai)
- [Dify](https://docs.firecrawl.dev/integrations/dify)
- [Flowise](https://docs.firecrawl.dev/integrations/flowise)
- [Hermes Agent](https://docs.firecrawl.dev/integrations/hermes)
- [LangChain](https://docs.firecrawl.dev/integrations/langchain)
- [Langflow](https://docs.firecrawl.dev/integrations/langflow)
- [LlamaIndex](https://docs.firecrawl.dev/integrations/llamaindex)
- [Lovable](https://docs.firecrawl.dev/integrations/lovable)
- [Make](https://docs.firecrawl.dev/integrations/make)
- [n8n](https://docs.firecrawl.dev/integrations/n8n)
- [Neuron AI](https://docs.firecrawl.dev/integrations/neuron-ai)
- [Pipedream](https://docs.firecrawl.dev/integrations/pipedream)
- [Praison AI](https://docs.firecrawl.dev/integrations/praison)
- [Replit](https://docs.firecrawl.dev/integrations/replit)
- [SourceSync.ai](https://docs.firecrawl.dev/integrations/sourcesyncai)
- [Stripe Projects](https://docs.firecrawl.dev/integrations/stripe-projects)
- [Zapier](https://docs.firecrawl.dev/integrations/zapier)
- [Introduction](https://docs.firecrawl.dev/introduction)
- [Get Started](https://docs.firecrawl.dev/mcp-server)
- [For Agents](https://docs.firecrawl.dev/mcp-server/keyless)
- [For Humans](https://docs.firecrawl.dev/mcp-server/oauth)
- [Firecrawl MCP tools](https://docs.firecrawl.dev/mcp-server/tools) — encontrada fora do índice v2
- [Partner Credits](https://docs.firecrawl.dev/partner-credits)
- [MCP Web Search & Scrape in Amp](https://docs.firecrawl.dev/quickstarts/amp)
- [MCP Web Search & Scrape in Antigravity](https://docs.firecrawl.dev/quickstarts/antigravity)
- [ASP.NET Core](https://docs.firecrawl.dev/quickstarts/aspnet-core)
- [Astro](https://docs.firecrawl.dev/quickstarts/astro)
- [AutoGen](https://docs.firecrawl.dev/quickstarts/autogen)
- [AWS Lambda](https://docs.firecrawl.dev/quickstarts/aws-lambda)
- [Bun](https://docs.firecrawl.dev/quickstarts/bun)
- [Firecrawl in Claude & Claude Code](https://docs.firecrawl.dev/quickstarts/claude-code)
- [Cloudflare Workers](https://docs.firecrawl.dev/quickstarts/cloudflare-workers)
- [MCP Web Search & Scrape in Codex CLI](https://docs.firecrawl.dev/quickstarts/codex-cli)
- [MCP Web Search & Scrape in Cursor](https://docs.firecrawl.dev/quickstarts/cursor)
- [Deno Deploy](https://docs.firecrawl.dev/quickstarts/deno-deploy)
- [Django](https://docs.firecrawl.dev/quickstarts/django)
- [.NET](https://docs.firecrawl.dev/quickstarts/dotnet)
- [Elixir](https://docs.firecrawl.dev/quickstarts/elixir)
- [Express](https://docs.firecrawl.dev/quickstarts/express)
- [FastAPI](https://docs.firecrawl.dev/quickstarts/fastapi)
- [Fastify](https://docs.firecrawl.dev/quickstarts/fastify)
- [Flask](https://docs.firecrawl.dev/quickstarts/flask)
- [MCP Web Search & Scrape in Gemini CLI](https://docs.firecrawl.dev/quickstarts/gemini-cli)
- [Go](https://docs.firecrawl.dev/quickstarts/go)
- [Hono](https://docs.firecrawl.dev/quickstarts/hono)
- [Java](https://docs.firecrawl.dev/quickstarts/java)
- [Laravel](https://docs.firecrawl.dev/quickstarts/laravel)
- [Mastra](https://docs.firecrawl.dev/quickstarts/mastra)
- [NestJS](https://docs.firecrawl.dev/quickstarts/nestjs)
- [Next.js](https://docs.firecrawl.dev/quickstarts/nextjs)
- [Node.js](https://docs.firecrawl.dev/quickstarts/nodejs)
- [Nous Research](https://docs.firecrawl.dev/quickstarts/nous-research)
- [Nuxt](https://docs.firecrawl.dev/quickstarts/nuxt)
- [OpenClaw](https://docs.firecrawl.dev/quickstarts/openclaw)
- [MCP Web Search & Scrape in OpenCode](https://docs.firecrawl.dev/quickstarts/opencode)
- [OpenRouter](https://docs.firecrawl.dev/quickstarts/openrouter)
- [PHP](https://docs.firecrawl.dev/quickstarts/php)
- [Python](https://docs.firecrawl.dev/quickstarts/python)
- [Rails](https://docs.firecrawl.dev/quickstarts/rails)
- [Remix](https://docs.firecrawl.dev/quickstarts/remix)
- [Ruby](https://docs.firecrawl.dev/quickstarts/ruby)
- [Rust](https://docs.firecrawl.dev/quickstarts/rust)
- [Spring Boot](https://docs.firecrawl.dev/quickstarts/spring-boot)
- [Supabase Edge Functions](https://docs.firecrawl.dev/quickstarts/supabase-edge-functions)
- [SvelteKit](https://docs.firecrawl.dev/quickstarts/sveltekit)
- [Vercel Functions](https://docs.firecrawl.dev/quickstarts/vercel-functions)
- [Vercel Marketplace](https://docs.firecrawl.dev/quickstarts/vercel-marketplace)
- [MCP Web Search & Scrape in Windsurf](https://docs.firecrawl.dev/quickstarts/windsurf)
- [Rate Limits](https://docs.firecrawl.dev/rate-limits)
- [CLI](https://docs.firecrawl.dev/sdks/cli)
- [.NET](https://docs.firecrawl.dev/sdks/dotnet)
- [Elixir](https://docs.firecrawl.dev/sdks/elixir)
- [Go](https://docs.firecrawl.dev/sdks/go)
- [Java](https://docs.firecrawl.dev/sdks/java)
- [Node](https://docs.firecrawl.dev/sdks/node)
- [Overview](https://docs.firecrawl.dev/sdks/overview)
- [PHP](https://docs.firecrawl.dev/sdks/php)
- [Python](https://docs.firecrawl.dev/sdks/python)
- [Ruby](https://docs.firecrawl.dev/sdks/ruby)
- [Rust](https://docs.firecrawl.dev/sdks/rust)
- [AI Platforms](https://docs.firecrawl.dev/use-cases/ai-platforms)
- [Competitive Intelligence](https://docs.firecrawl.dev/use-cases/competitive-intelligence)
- [Content Generation](https://docs.firecrawl.dev/use-cases/content-generation)
- [Data Migration](https://docs.firecrawl.dev/use-cases/data-migration)
- [Deep Research](https://docs.firecrawl.dev/use-cases/deep-research)
- [Developers & MCP](https://docs.firecrawl.dev/use-cases/developers-mcp)
- [Investment & Finance](https://docs.firecrawl.dev/use-cases/investment-finance)
- [Lead Enrichment](https://docs.firecrawl.dev/use-cases/lead-enrichment)
- [Observability & Monitoring](https://docs.firecrawl.dev/use-cases/observability)
- [Use Cases](https://docs.firecrawl.dev/use-cases/overview)
- [Product & E-commerce](https://docs.firecrawl.dev/use-cases/product-ecommerce)
- [SEO Platforms](https://docs.firecrawl.dev/use-cases/seo-platforms)
- [Event Types](https://docs.firecrawl.dev/webhooks/events)
- [Overview](https://docs.firecrawl.dev/webhooks/overview)
- [Security](https://docs.firecrawl.dev/webhooks/security)
- [Testing](https://docs.firecrawl.dev/webhooks/testing)
