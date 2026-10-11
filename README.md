[Português](README.md) | [English](README.en.md)

# Kit de desenvolvimento DeepSFetch

**[Manual completo: 33 guias passo a passo](docs/manual/README.md)** — API, MCP, SDKs, CLI, coleções, monitores, arquivos, integrações e cobrança.

**Colete conteúdo da web para agentes de IA e automações com limites explícitos de créditos.**

Este kit reúne clientes JavaScript e Python de código aberto, uma ferramenta de linha de comando (CLI) e a integração n8n para a [API hospedada do DeepSFetch](https://deepsfetch.com/?lang=pt-BR). Comece com uma página HTML pública, confira o resultado e conecte aos seus projetos.

O kit contém ferramentas de acesso à API. O motor de coleta e o serviço hospedado não estão incluídos. Para executar os exemplos, você precisa de uma conta e de uma chave de API; as coletas consomem créditos do seu espaço de trabalho. Confira os [planos atuais](https://deepsfetch.com/pricing?lang=pt-BR).

## Obtenha seu primeiro resultado

Requer Node.js 22 ou superior. Crie uma chave em [Chaves de API](https://deepsfetch.com/app/api-keys?lang=pt-BR). Na pasta principal do kit, configure a chave para a sessão atual do terminal e execute o exemplo sem dependências:

PowerShell:

```powershell
$env:DEEPSFETCH_API_KEY = 'SUA_CHAVE_DEEPSFETCH'
node examples/scrape.mjs https://example.com
```

macOS / Linux:

```sh
export DEEPSFETCH_API_KEY='SUA_CHAVE_DEEPSFETCH'
node examples/scrape.mjs https://example.com
```

O exemplo envia uma coleta de HTML por HTTP com limite de 3 créditos e troca automática para navegador desativada. Depois acompanha a mesma tarefa até o resultado e imprime o JSON. Esse limite não garante gratuidade nem sucesso da coleta. Páginas que dependem de JavaScript precisam de outra configuração. Consulte [primeiros passos](docs/getting-started.md) para tratar erros e retomar uma tarefa.

## Escolha sua integração

| Ferramenta | Instalação ou guia | O que está incluído |
| --- | --- | --- |
| SDK JavaScript | `npm install @deepsfetch/sdk` | Cliente da API v2 e acompanhamento de tarefas |
| CLI | `npm install -g @deepsfetch/cli` | Comandos de coleta, tarefas e estimativas |
| SDK Python | `python -m pip install ./packages/deepsfetch-sdk-python` | Instalação pelo código-fonte; publicação no PyPI pendente |
| MCP | [Guia de conexão remota](docs/mcp.md) | Configuração para o servidor MCP hospedado |
| n8n | [Modelos de fluxo e node comunitário](docs/n8n.md) | Código do node publicado no npm |

A implementação do servidor MCP remoto não está incluída. O node n8n ainda não é verificado pelo n8n. O MCP remoto está no registro oficial. Este kit não anuncia parceria nativa nem motor de coleta para hospedagem própria.

## Primeiro uso pela CLI

Depois de instalar a CLI e configurar a chave como mostrado acima:

```sh
deepsfetch scrape --file examples/scrape-request.json --wait
```

A CLI informa a chave de idempotência na saída de diagnóstico. Essa chave identifica a operação para evitar duplicação. Se o resultado do envio for desconhecido, repita a mesma requisição com `--idempotency-key A_MESMA_CHAVE`. Se já recebeu o ID da tarefa, use `deepsfetch job ID_DA_TAREFA --wait` para consultar a tarefa existente.

## Ferramentas abertas e serviço hospedado

| Recurso | Neste kit | DeepSFetch hospedado |
| --- | --- | --- |
| SDK JavaScript, SDK Python e CLI | Código e testes | Conexão à API v2 |
| Node comunitário n8n | Implementação em JavaScript | Acesso à integração de coleta |
| MCP | Guia de conexão | Servidor remoto |
| Motor de coleta e infraestrutura de navegadores | Não incluídos | Gerenciados pelo DeepSFetch |
| Contas, créditos, cobrança e painel | Não incluídos | Gerenciados pelo DeepSFetch |

## Desenvolvimento local

```sh
npm install --ignore-scripts
npm test
npm run check
```

Para executar os testes Python a partir da pasta principal:

```sh
python -m pip install ./packages/deepsfetch-sdk-python
python -m unittest discover -s packages/deepsfetch-sdk-python/tests
```

Os testes usam dados de exemplo e um servidor HTTP local; não enviam coletas pagas. Veja como [contribuir](CONTRIBUTING.md), [relatar problemas de segurança](SECURITY.md) e acompanhar as [próximas etapas](ROADMAP.md).

## Links úteis

- [Documentação da API](https://deepsfetch.com/docs?lang=pt-BR)
- [Playground](https://deepsfetch.com/playground?lang=pt-BR)
- [Configuração n8n](https://deepsfetch.com/docs/n8n?lang=pt-BR)
- [Suporte](https://deepsfetch.com/support?lang=pt-BR)

As ferramentas deste kit usam a licença MIT. O serviço hospedado tem seus próprios termos de uso e limites de créditos.

## Teste e participe

Veja o [tutorial de primeira coleta](docs/first-collection.md), a [verificação operacional reproduzível](docs/benchmark.md) e [relate seu primeiro uso](https://github.com/ermultimidia/deepsfetch-developer-kit/issues/new?template=first-run.yml).

A [comparação autenticada com o Firecrawl](docs/comparison.md) inclui resultados, limitações e código reproduzível. O [tutorial publicado no DEV](https://dev.to/rafael_souza_2f0438f4d82e/from-a-url-to-markdown-a-first-collection-and-mcp-setup-with-deepsfetch-4jdn) acompanha cadastro, primeira coleta e MCP. Encontre também a [listagem no Smithery](https://smithery.ai/servers/ermultimidia/deepsfetch), com instruções e limites no [guia MCP](docs/mcp.md).
