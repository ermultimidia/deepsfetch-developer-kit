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

A documentação publicada lista `scrape`, `extract`, `search`, `map`, `crawl`, `interact`, `watch`, `job_status` e `cancel_job`. Este guia não representa um teste de disponibilidade em produção.

## Limitação atual da extração

O fluxo documentado da ferramenta MCP `extract` usa o adaptador V1 e um ID interno de coleta (`result.providerJobId`). Esse identificador é diferente do ID externo V2 `job_` usado nas consultas de tarefa. Siga as instruções atuais de extração ou use `/v2/extract` por HTTP quando precisar acompanhar tarefas pela V2. Simplificar esse comportamento é uma das próximas etapas antes da divulgação ampla do MCP.

Este kit não anuncia pacote MCP no npm nem presença em registros. A conexão não cria chatbot, embeddings ou destinos de automação. As coletas consomem créditos do espaço de trabalho; custos de provedores de IA podem ser separados.
