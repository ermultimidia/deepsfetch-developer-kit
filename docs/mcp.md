[Português](mcp.md) | [English](mcp.en.md)

# Conecte o servidor MCP hospedado

O DeepSFetch documenta o endereço MCP remoto `https://mcp.deepsfetch.com/mcp`, com transporte Streamable HTTP e autenticação Bearer por chave do espaço de trabalho. A implementação do servidor não está incluída neste kit.

## Configuração no VS Code

Em uma versão que aceite HTTP remoto e cabeçalhos, salve este conteúdo em `.vscode/mcp.json` no seu projeto. A solicitação de senha evita gravar a chave no arquivo:

```json
{
  "inputs": [
    {
      "type": "promptString",
      "id": "deepsfetch-api-key",
      "description": "Chave de API do seu espaço de trabalho DeepSFetch",
      "password": true
    }
  ],
  "servers": {
    "deepsfetch": {
      "type": "http",
      "url": "https://mcp.deepsfetch.com/mcp",
      "headers": {
        "Authorization": "Bearer ${input:deepsfetch-api-key}"
      }
    }
  }
}
```

Outros clientes usam formatos diferentes de configuração. Consulte https://deepsfetch.com/docs/mcp?lang=pt-BR e a documentação do seu cliente antes de adaptar o exemplo.

## Primeiro uso

1. Conecte e liste as ferramentas para obter seus esquemas atuais.
2. Solicite a coleta de uma página HTML pública com um limite conservador de créditos aceito pelo esquema.
3. Se o resultado estiver pendente, siga o fluxo documentado de consulta à tarefa.
4. Confira o resultado concluído antes de usá-lo como contexto para o agente.

A documentação publicada lista `scrape`, `extract`, `search`, `map`, `crawl`, `interact`, `watch`, `job_status` e `cancel_job`. Em 11/10/2026 foram validados initialize, tools/list e scrape → job_status no serviço real. Isso não representa validação de todas as ferramentas ou interfaces de clientes.

## Extração e acompanhamento simplificados

O MCP 2.0.1 aceita o ID público `job_` de uma coleta scrape concluída em `source.jobId`. Ele resolve a origem automaticamente e envia a extração pela API V2, retornando outra tarefa que pode ser consultada por `job_status`. IDs internos `fetch_` continuam aceitos. A conversão de IDs e o bloqueio de origens pendentes passaram em testes locais com serviços simulados; a extração com IA não foi executada neste teste em produção.

`plannedLane` e `costControl` agora são preservados pelo schema MCP. Para um scrape inicial, use:

```json
{"url":"https://example.com","formats":["markdown"],"plannedLane":"http_basic","async":true,"costControl":{"maxCredits":3,"allowFallback":false,"cacheMode":"fresh"}}
```

Consulte o schema da ferramenta antes de enviar opções: search, interact e watch não oferecem o mesmo suporte a limites de créditos. A coleta pode retornar referências de artefatos em vez de Markdown inline; confira o conteúdo disponível e use as exportações do painel quando necessário.

## Registro oficial

Publicado como [io.github.ermultimidia/deepsfetch, versão 2.0.1](https://registry.modelcontextprotocol.io/v0.1/servers/io.github.ermultimidia%2Fdeepsfetch/versions/2.0.1). Os metadados de conexão ficam em [server.json](../server.json). O endpoint remoto exige uma chave do espaço de trabalho. Presença no registro não representa parceria ou certificação por todos os clientes.
