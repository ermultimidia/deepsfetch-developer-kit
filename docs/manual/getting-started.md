# Comece aqui: conta → chave → primeiro resultado

Execute uma coleta pequena e saiba reconhecer sua conclusão.

## 1. Criar conta e conferir workspace

Cadastre-se, entre e conclua o onboarding. No painel, confira o workspace selecionado e o saldo. O cadastro gratuito não elimina a necessidade de chave para API/MCP.

- [/login?tab=signup](https://deepsfetch.com/login?tab=signup)
- [/app/playground](https://deepsfetch.com/app/playground?lang=pt-BR)


## 2. Criar e guardar a chave

Abra Chaves API, crie uma chave, copie o valor completo quando exibido e guarde-o em uma variável de ambiente. A chave identifica o workspace; não é a senha da conta nem a chave BYOK.

```text
# PowerShell — somente o terminal atual
$env:DEEPSFETCH_API_KEY = "SUA_CHAVE"

# Bash — somente o terminal atual
export DEEPSFETCH_API_KEY="SUA_CHAVE"
```

- [/app/api-keys](https://deepsfetch.com/app/api-keys?lang=pt-BR)


## 3. PowerShell: enviar com arquivo JSON

Salve o corpo abaixo como request.json em UTF-8. curl.exe evita o alias curl do Windows PowerShell. Troque a chave de idempotência ao começar uma execução nova; em retentativa preserve corpo e chave.

```text
{
  "url": "https://example.com",
  "collectionEngine": "auto",
  "engineStrategy": "auto",
  "formats": [
    "markdown"
  ],
  "costControl": {
    "maxCredits": 1,
    "allowFallback": false,
    "cacheMode": "fresh"
  },
  "async": true
}

# PowerShell
curl.exe --fail-with-body "https://api.deepsfetch.com/v2/scrape" `
  -H "Authorization: Bearer $env:DEEPSFETCH_API_KEY" `
  -H "Content-Type: application/json" `
  -H "Idempotency-Key: PRIMEIRA_COLETA_ID_UNICO" `
  --data-binary "@request.json"
```


## 3. Bash: alternativa de envio

Escolha a versão correspondente ao seu terminal; executar as duas versões cria duas coletas se os identificadores forem diferentes.

```text
curl --fail-with-body "https://api.deepsfetch.com/v2/scrape" \
  -H "Authorization: Bearer $DEEPSFETCH_API_KEY" \
  -H "Content-Type: application/json" \
  -H "Idempotency-Key: REPLACE_WITH_UNIQUE_RUN_ID" \
  --data '{
  "url": "https://example.com",
  "collectionEngine": "auto",
  "engineStrategy": "auto",
  "formats": [
    "markdown"
  ],
  "costControl": {
    "maxCredits": 1,
    "allowFallback": false,
    "cacheMode": "fresh"
  },
  "async": true
}'
```


## 4. Guardar o id e consultar

HTTP 202 significa aceito. Substitua JOB_ID pelo id público retornado. Aguarde cerca de dois segundos entre consultas. Pare em completed, failed ou cancelled; não envie outra coleta para conferir progresso.

```text
curl.exe --fail-with-body "https://api.deepsfetch.com/v2/jobs/JOB_ID" -H "Authorization: Bearer $env:DEEPSFETCH_API_KEY"
```

- [Jobs: acompanhar, retomar e cancelar](https://deepsfetch.com/docs/jobs?lang=pt-BR)


## 5. Confirmar conteúdo e consumo

No motor automático, confira status=completed, result.markdown, URL final e result.billing. No adaptador legado, confira result.result e referências de artefatos. Um job concluído sem conteúdo útil não encerra sua validação. Consulte o consumo no workspace.

- [Scrape: da URL ao conteúdo](https://deepsfetch.com/docs/scrape?lang=pt-BR)
- [Respostas, artefatos e erros da API](https://deepsfetch.com/docs/api-results?lang=pt-BR)
- [Créditos, estimativa, cache e limites](https://deepsfetch.com/docs/costs?lang=pt-BR)


## 6. Escolher o próximo caminho

Use SDK/CLI para sua aplicação, MCP para agentes, extração validada para campos, Coleções para documentos recorrentes e Monitores da web para preços. Comece com um alvo antes de ampliar o volume.

- [JavaScript SDK: instalar, executar e retomar](https://deepsfetch.com/docs/sdk-javascript?lang=pt-BR)
- [Python SDK: instalar e consultar jobs](https://deepsfetch.com/docs/sdk-python?lang=pt-BR)
- [CLI: comandos, arquivos e recuperação](https://deepsfetch.com/docs/cli?lang=pt-BR)
- [MCP para agentes de IA](https://deepsfetch.com/docs/mcp?lang=pt-BR)
- [Coleções com atualização automática](https://deepsfetch.com/docs/collections?lang=pt-BR)
- [Monitorar preços e estoque](https://deepsfetch.com/docs/price-monitors?lang=pt-BR)

## Continue a integração

- [Conta, workspace e chaves](https://deepsfetch.com/docs/authentication?lang=pt-BR)
- [Diagnóstico e recuperação](https://deepsfetch.com/docs/troubleshooting?lang=pt-BR)
