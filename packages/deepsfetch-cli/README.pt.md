[English](README.md) | [Português](README.pt.md)

# CLI do DeepSFetch

Use a API v2 do DeepSFetch pelo CMD, PowerShell, macOS ou Linux. Requer Node.js 20.3 ou superior; para os exemplos completos deste kit, use Node.js 22 ou superior.

```sh
npm install -g @deepsfetch/cli
deepsfetch --help
```

Crie uma chave em [Chaves de API](https://deepsfetch.com/app/api-keys?lang=pt-BR), salve o valor completo quando ele for exibido e configure no terminal:

```powershell
# PowerShell: vale apenas para a sessão atual
$env:DEEPSFETCH_API_KEY = 'SUA_CHAVE_DEEPSFETCH'
deepsfetch scrape https://example.com --wait
```

```sh
# macOS / Linux
export DEEPSFETCH_API_KEY='SUA_CHAVE_DEEPSFETCH'
deepsfetch scrape https://example.com --wait
```

No CMD, use `set DEEPSFETCH_API_KEY=SUA_CHAVE_DEEPSFETCH`. Não publique nem compartilhe a chave. A chave de um provedor de IA é uma credencial BYOK separada e não autentica a CLI.

## Comandos

```sh
deepsfetch scrape https://example.com --wait
deepsfetch map https://example.com
deepsfetch crawl https://example.com --wait
deepsfetch search "energia renovável"
deepsfetch job ID_DA_TAREFA
deepsfetch job ID_DA_TAREFA --wait
deepsfetch cancel ID_DA_TAREFA
deepsfetch estimate --file estimate.json
deepsfetch extract --file extract.json --wait
```

Para começar com o limite de créditos do exemplo deste kit, execute da pasta principal:

```sh
deepsfetch scrape --file examples/scrape-request.json --wait
```

Use `--file request.json` ou `--data '{"url":"https://example.com"}'` para enviar o corpo completo da requisição. `interact` e `watch` também aceitam essas opções. Consulte os campos na [documentação da API](https://deepsfetch.com/docs?lang=pt-BR). Respostas síncronas podem não conter ID de tarefa; use `--wait` apenas quando houver tarefa para acompanhar.

`scrape URL` usa coleta HTTP básica, saída Markdown e execução assíncrona. Os resultados JSON saem em stdout; os diagnósticos e erros, em stderr. `--wait` retorna código 1 em caso de falha, cancelamento ou tempo esgotado. Erros da API e de validação também retornam código 1.

## Créditos e novas tentativas

Instalar a CLI não consome créditos. As operações usam o saldo e as tarifas do seu espaço de trabalho, como na API e no painel. Em extrações BYOK, a coleta ainda consome créditos DeepSFetch e o provedor de IA cobra separadamente na sua conta.

Cada operação informa sua chave de idempotência. Para repetir a mesma operação após falha de conexão, passe `--idempotency-key A_MESMA_CHAVE`. A CLI não repete automaticamente requisições POST pagas. Se já tem o ID, consulte a tarefa existente com `job ID_DA_TAREFA`.

`--timeout-ms` altera o limite por requisição (padrão: 30000 ms). `--max-wait-ms` altera o prazo total de acompanhamento (padrão: 900000 ms). `--base-url` aceita um servidor HTTPS ou HTTP local para testes. Use apenas servidores confiáveis, pois eles recebem sua chave de API.
