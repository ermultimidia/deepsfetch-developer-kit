[Português](getting-started.md) | [English](getting-started.en.md)

# Sua primeira coleta

1. Crie uma conta no DeepSFetch e confira o plano gratuito e seus limites em https://deepsfetch.com/pricing?lang=pt-BR.
2. Crie uma chave do seu espaço de trabalho em https://deepsfetch.com/app/api-keys?lang=pt-BR. Ela é diferente da chave de um provedor de IA usada em BYOK.
3. Configure `DEEPSFETCH_API_KEY` no terminal conforme o README principal.
4. Execute `node examples/scrape.mjs https://example.com` na pasta principal do kit. Requer Node.js 22 ou superior.
5. Confira se o JSON informa `status: "completed"` e examine `result`. Uma resposta de tarefa na fila ainda não é uma coleta concluída.

## O que o exemplo faz

A requisição usa `http_basic`, saída Markdown, execução assíncrona, `maxCredits: 3` e `allowFallback: false`. É uma configuração inicial para páginas HTML públicas. Ela não executa navegador nem modelo de IA. Algumas páginas podem falhar ou retornar pouco conteúdo com essa configuração.

O exemplo informa a chave de idempotência e o ID da tarefa na saída de diagnóstico. Ele não imprime a chave de API nem repete automaticamente o envio de uma coleta paga. Aguarda até 15 minutos e encerra com código de erro em caso de falha, cancelamento, erro de requisição ou tempo esgotado.

## Retome uma tarefa sem enviar outra coleta

Se você já recebeu um ID de tarefa, use esse ID para retomar a consulta:

```powershell
$env:DEEPSFETCH_JOB_ID = 'job_ID_DA_SUA_TAREFA'
node examples/scrape.mjs
Remove-Item Env:DEEPSFETCH_JOB_ID
```

```sh
DEEPSFETCH_JOB_ID='job_ID_DA_SUA_TAREFA' node examples/scrape.mjs
```

Se a conexão falhou durante o envio e você ainda não recebeu um ID, reutilize a chave de idempotência informada para aquela mesma operação:

```powershell
$env:DEEPSFETCH_IDEMPOTENCY_KEY = 'A_CHAVE_ANTERIOR'
node examples/scrape.mjs https://example.com
Remove-Item Env:DEEPSFETCH_IDEMPOTENCY_KEY
```

```sh
DEEPSFETCH_IDEMPOTENCY_KEY='A_CHAVE_ANTERIOR' node examples/scrape.mjs https://example.com
```

Mantenha a mesma URL e o mesmo conteúdo da requisição ao reutilizar uma chave. Limpe essas variáveis antes de iniciar uma nova coleta de propósito. Os limites de retenção da idempotência da API continuam valendo; consulte a documentação.

## Problemas comuns

| Problema | O que fazer |
| --- | --- |
| Variável de ambiente ausente | Configure a chave de API na mesma sessão do terminal |
| HTTP 401 | Confira se a chave está ativa e pertence ao espaço de trabalho correto |
| Erro de limite ou saldo | Confira a estimativa, o saldo e os limites da operação |
| Conteúdo HTML incompleto | Verifique se o site depende de JavaScript antes de escolher outro modo de coleta |
| Tempo esgotado depois de receber o ID | Consulte a mesma tarefa; não envie outra coleta apenas para conferir o andamento |

Conteúdo coletado de sites é entrada externa. Confira antes de repassar a um agente. Não publique chaves nem respostas brutas de clientes em relatos de problemas.
