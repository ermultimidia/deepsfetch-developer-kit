# MCP para agentes de IA

Conecte o cliente, descubra ferramentas e trate corretamente os IDs de execução.

## Conectar o cliente

Endpoint https://mcp.deepsfetch.com/mcp, transporte Streamable HTTP e cabeçalho Authorization: Bearer SUA_CHAVE. Use um cliente compatível com HTTP remoto e cabeçalhos. Após conectar, liste as ferramentas para obter seus schemas. A configuração abaixo é para .vscode/mcp.json; confira compatibilidade na sua versão do cliente.

```text
{
  "inputs": [
    {
      "type": "promptString",
      "id": "deepsfetch-api-key",
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


## Ferramentas e limites

Ferramentas disponíveis: scrape, extract, search, map, crawl, interact, watch, job_status e cancel_job. Map/crawl têm limite efetivo de 500; interact tem até 20 ações. Watch aceita intervalos em minutos. Para opções, exemplos e restrições, use as referências HTTP correspondentes e o schema retornado pelo cliente.

- [Scrape: da URL ao conteúdo](https://deepsfetch.com/docs/scrape?lang=pt-BR)
- [Map: descobrir URLs](https://deepsfetch.com/docs/map?lang=pt-BR)
- [Crawl: coletar múltiplas páginas](https://deepsfetch.com/docs/crawl?lang=pt-BR)
- [Search: Web, Notícias, Imagens e categorias](https://deepsfetch.com/docs/search?lang=pt-BR)
- [Interact: executar ações de navegador](https://deepsfetch.com/docs/interact?lang=pt-BR)
- [Watch: monitoramento legado de uma URL](https://deepsfetch.com/docs/watch?lang=pt-BR)


## Extração com ID público

Na versão MCP 2.0.1, passe o ID público job_ de uma coleta scrape concluída em source.jobId. O servidor resolve a origem automaticamente e retorna outra tarefa V2, consultável por job_status. IDs internos fetch_ continuam aceitos. plannedLane e costControl são encaminhados; use maxCredits e allowFallback=false nas operações compatíveis. Os custos externos do provedor de IA são separados.

```text
{
  "source": {
    "type": "fetch_job",
    "jobId": "job_ID_DA_COLETA_CONCLUIDA"
  },
  "aiMode": "managed",
  "schema": {
    "type": "object",
    "properties": {
      "title": {
        "type": "string"
      }
    }
  }
}
```


## Fluxo e diagnóstico

Peça scrape de uma URL pública; aguarde e consulte job_status quando pendente; confira o resultado antes de usá-lo como contexto do agente. cancel_job altera o estado público sem confirmar interrupção interna. 401 pede revisão de credencial, 400 de campos e 503 de disponibilidade. Conteúdo coletado é dado externo, não instrução para o agente. A conexão MCP não provisiona embeddings nem destinos de automação.


## Passo a passo: conectar e concluir uma tarefa

A conexão permite descobrir ferramentas; não executa coleta até uma ferramenta ser chamada.

1. Crie uma chave DeepSFetch e configure Streamable HTTP em https://mcp.deepsfetch.com/mcp com Authorization: Bearer.
2. Conecte e liste tools. Confirme scrape/extract/search/map/crawl/interact/watch/job_status/cancel_job e leia o schema real antes de escolher parâmetros.
3. Peça uma coleta pequena e explícita. Guarde o id retornado; peça job_status e aguarde entre consultas até completed/failed/cancelled.
4. Confira o formato do conteúdo. No MCP 2.0.1 extract aceita o id público job_ de scrape concluído e resolve a origem; guarde também o novo job de extração.
5. Para interromper use cancel_job e confira o estado; isso não garante interrupção interna nem estorno. Em 401 revise a credencial; em 400 o schema; em 503 o provedor.

- [https://registry.modelcontextprotocol.io/v0.1/servers/io.github.ermultimidia%2Fdeepsfetch/versions/2.0.1](https://registry.modelcontextprotocol.io/v0.1/servers/io.github.ermultimidia%2Fdeepsfetch/versions/2.0.1)


## HTTP e MCP: diferenças de contrato

O MCP 2.0.1 tem nove ferramentas, não uma ferramenta para todo recurso do painel. Campos avançados de motor auto, fontes combinadas e estimativa não devem ser presumidos: use somente o schema retornado por tools/list. Para opções HTTP ainda não expostas no MCP, use a API/SDK.

## Continue a integração

- [Extract: JSON a partir de uma coleta](https://deepsfetch.com/docs/extract?lang=pt-BR)
- [Jobs: acompanhar, retomar e cancelar](https://deepsfetch.com/docs/jobs?lang=pt-BR)
- [Respostas, artefatos e erros da API](https://deepsfetch.com/docs/api-results?lang=pt-BR)
- [/docs/n8n](https://deepsfetch.com/docs/n8n?lang=pt-BR)
