[Português](first-collection.md) | [English](first-collection.en.md)

# Da conta gratuita à primeira coleta concluída

Crie uma conta em [Cadastro](https://deepsfetch.com/signup?lang=pt-BR) e uma chave em [Chaves de API](https://deepsfetch.com/app/api-keys?lang=pt-BR). O plano gratuito concedeu automaticamente 1.000 créditos no teste de 11/10/2026. Confira os planos atuais antes de depender desse limite.

Baixe ou clone este kit e, na pasta dele, execute no PowerShell:

```powershell
$env:DEEPSFETCH_API_KEY = 'SUA_CHAVE'
node examples/scrape.mjs https://example.com
```

O exemplo limita a coleta a 3 créditos, usa HTTP e acompanha a mesma tarefa até `completed`. Guarde a chave de idempotência e o ID informados no terminal. Os detalhes de retomada estão no [guia inicial](getting-started.md).

No teste real de uma conta nova, o exemplo publicado concluiu a coleta em aproximadamente 23 segundos. Isso mede o envio e acompanhamento da tarefa, sem incluir o tempo gasto preenchendo o cadastro. É uma amostra de teste, não uma promessa de desempenho.

## Confira o conteúdo disponível

Na resposta atual de `example.com`, o resultado incluiu título, URL e referências `markdownArtifactKey` e `htmlArtifactKey`. Uma referência `r2://` identifica um artefato armazenado; ela não é uma URL pública. Consulte o resultado e as exportações do painel. O exemplo imprime o JSON da tarefa; ele não baixa automaticamente o Markdown.

Para usar um agente, siga o [guia MCP](mcp.md). Para a integração n8n já existente, consulte o [guia n8n](n8n.md).

## Ajude a melhorar o primeiro uso

[Relate seu teste](https://github.com/ermultimidia/deepsfetch-developer-kit/issues/new?template=first-run.yml): ferramenta utilizada, etapa alcançada, tempo até o primeiro resultado e obstáculo. Não envie chaves nem dados de clientes. A segunda utilização é especialmente útil para entender se o produto resolveu uma necessidade real.
