# Catálogo de funcionalidades e limites

Escolha o serviço disponível e abra seu passo a passo.

## Funcionalidades documentadas

Este inventário cobre a API pública V2, nove ferramentas MCP e os serviços de usuário identificados no código publicado nesta revisão. API, painel e MCP são superfícies diferentes. A revisão não prova sucesso em todos os sites/provedores.

| Campo / estado | Comportamento |
| --- | --- |
| scrape | Motor auto e adaptador legado; HTML, Markdown, links e captura conforme o caminho. Guia: /docs/scrape |
| extract | IA sobre fetch concluído; HTTP usa ID interno; MCP resolve ID público. Guia: /docs/extract |
| validated-fields | Painel: dados da página, IA gerenciada e BYOK com evidências. Guia: /docs/validated-extraction |
| search | Web/News/Images/Developer/Research; coleta separada. Guia: /docs/search |
| map | Descoberta de URLs com filtros e máximo de 500. Guia: /docs/map |
| crawl | Coleta assíncrona de até 500 páginas planejadas; conferir parciais. Guia: /docs/crawl |
| interact | Seis tipos de ação e até 20 passos; runtime legado. Guia: /docs/interact |
| watch | Criação legada por intervalo; sem CRUD público completo. Guia: /docs/watch |
| price-monitors | Painel: preços/estoque, histórico, pausa/retomada e alertas webhook. Guia: /docs/price-monitors |
| collections | Painel: agenda, documentos versionados, chunks e outbox. Guia: /docs/collections |
| feeds | API autenticada de documentos/mudanças com cursores. Guia: /docs/collection-feeds |
| supabase | Destino de coleção com SQL e entrega por outbox. Guia: /docs/supabase |
| batch-csv | Painel: até 500 URLs, pausa, histórico e JSON/CSV. Guia: /docs/batches |
| parse-local | Leitura local de oito famílias de arquivos; OCR Mistral separado. Guia: /docs/files |
| social | X/Reddit por API oficial; Sheets via workflow existente. Guia: /docs/connectors |
| mcp | Servidor remoto registrado, nove ferramentas; schema real define opções. Guia: /docs/mcp |
| n8n | Três modelos validados e contrato de conexão/start/result/estimate. Guia: /docs/n8n-api |
| sdk-js | Cliente publicado no npm, jobs e estimativa. Guia: /docs/sdk-javascript |
| sdk-python | Cliente via developer kit; publicação PyPI ainda não confirmada. Guia: /docs/sdk-python |
| cli | CLI no npm, corpos JSON, consulta/espera e idempotência. Guia: /docs/cli |
| account-keys | Conta/workspace/chaves, permissões e rotação. Guia: /docs/authentication |
| billing | Catálogo, checkout e portal; valores reais consultados no sistema. Guia: /docs/billing |
| costs | Estimativa, política, consumo e reservas, separados por caminho. Guia: /docs/costs |
| webhooks | Jobs terminais com HMAC; sem retry automático V2. Guia: /docs/webhooks |
| byok | Sete provedores aceitos; modelo/acesso/custos externos dependem da conta. Guia: /docs/byok |
| playground | Interface, código, resultados, histórico e exportação. Guia: /docs/playground |
| jobs | Consulta, retomada, estados e cancelamento público. Guia: /docs/jobs |
| support | Triagem com código/ID e relato sem segredos. Guia: /docs/troubleshooting |

- [Scrape: da URL ao conteúdo](https://deepsfetch.com/docs/scrape?lang=pt-BR)
- [Extract: JSON a partir de uma coleta](https://deepsfetch.com/docs/extract?lang=pt-BR)
- [Extração validada de campos](https://deepsfetch.com/docs/validated-extraction?lang=pt-BR)
- [Search: Web, Notícias, Imagens e categorias](https://deepsfetch.com/docs/search?lang=pt-BR)
- [Map: descobrir URLs](https://deepsfetch.com/docs/map?lang=pt-BR)
- [Crawl: coletar múltiplas páginas](https://deepsfetch.com/docs/crawl?lang=pt-BR)
- [Interact: executar ações de navegador](https://deepsfetch.com/docs/interact?lang=pt-BR)
- [Watch: monitoramento legado de uma URL](https://deepsfetch.com/docs/watch?lang=pt-BR)
- [Monitorar preços e estoque](https://deepsfetch.com/docs/price-monitors?lang=pt-BR)
- [Coleções com atualização automática](https://deepsfetch.com/docs/collections?lang=pt-BR)
- [Feeds de documentos e mudanças](https://deepsfetch.com/docs/collection-feeds?lang=pt-BR)
- [Enviar coleções ao Supabase](https://deepsfetch.com/docs/supabase?lang=pt-BR)
- [Coleta em lote por CSV](https://deepsfetch.com/docs/batches?lang=pt-BR)
- [Ler PDF, DOCX, XLSX e arquivos de texto](https://deepsfetch.com/docs/files?lang=pt-BR)
- [Conectores sociais, planilhas e destinos](https://deepsfetch.com/docs/connectors?lang=pt-BR)
- [MCP para agentes de IA](https://deepsfetch.com/docs/mcp?lang=pt-BR)
- [Contrato HTTP dos modelos n8n](https://deepsfetch.com/docs/n8n-api?lang=pt-BR)
- [JavaScript SDK: instalar, executar e retomar](https://deepsfetch.com/docs/sdk-javascript?lang=pt-BR)
- [Python SDK: instalar e consultar jobs](https://deepsfetch.com/docs/sdk-python?lang=pt-BR)
- [CLI: comandos, arquivos e recuperação](https://deepsfetch.com/docs/cli?lang=pt-BR)
- [Conta, workspace e chaves](https://deepsfetch.com/docs/authentication?lang=pt-BR)
- [Planos, assinatura e cobrança](https://deepsfetch.com/docs/billing?lang=pt-BR)
- [Créditos, estimativa, cache e limites](https://deepsfetch.com/docs/costs?lang=pt-BR)
- [Webhooks: assinatura e entrega](https://deepsfetch.com/docs/webhooks?lang=pt-BR)
- [Integrações e sua chave de IA — BYOK](https://deepsfetch.com/docs/byok?lang=pt-BR)
- [Playground, histórico e exportação](https://deepsfetch.com/docs/playground?lang=pt-BR)
- [Jobs: acompanhar, retomar e cancelar](https://deepsfetch.com/docs/jobs?lang=pt-BR)
- [Diagnóstico e recuperação](https://deepsfetch.com/docs/troubleshooting?lang=pt-BR)


## Recursos sem equivalência atual

O DeepSFetch não oferece Agent autônomo equivalente, Alexandria/marketplace de dados, índices acadêmico/governamental especializados, sessões CDP/live view/perfis persistentes, parse de arquivos por API V2, CRUD público completo de monitor, busca recorrente com objetivos de IA, e-mail/Slack nativos para monitores, extração de branding/produto/áudio/vídeo via formatos scrape, redaction PII generalizada ou documentação de self-hosting do SaaS. O kit aberto é um cliente da API. Não chame estes recursos de suportados porque existem no Firecrawl.


## Como manter a cobertura

Cada endpoint público deve apontar para um guia e cada guia deve ter preparação, sequência de execução, retorno, limites e recuperação. Campos aceitos sem efeito estão identificados em Opções comuns. Novas funcionalidades exigem atualização do inventário, schema e guia antes de divulgação.

- [Opções comuns e compatibilidade real](https://deepsfetch.com/docs/common-options?lang=pt-BR)
- [/openapi.json](https://deepsfetch.com/openapi.json)
- [Comece aqui: conta → chave → primeiro resultado](https://deepsfetch.com/docs/getting-started?lang=pt-BR)

## Continue a integração

- [Comece aqui: conta → chave → primeiro resultado](https://deepsfetch.com/docs/getting-started?lang=pt-BR)
- [Diagnóstico e recuperação](https://deepsfetch.com/docs/troubleshooting?lang=pt-BR)
