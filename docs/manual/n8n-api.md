# Contrato HTTP dos modelos n8n

Inicie, consulte e estime a coleta dos três modelos sem depender de sessão do painel.

## Conexão e operações

Use https://deepsfetch.com/integration/n8n e Bearer com a chave do workspace. GET /connection verifica a credencial e retorna connected e workspaceId. POST /start, /result e /estimate exigem JSON. Essas rotas pertencem ao domínio do painel, não ao domínio api. O nó próprio oferece Start Collection, Get Result e Estimate Credits.

```text
curl https://deepsfetch.com/integration/n8n/connection \
  -H "Authorization: Bearer $DEEPSFETCH_API_KEY"
```


## Configuração

config exige template (price, documentation ou catalog) e url. fields é opcional e usa os campos do modelo quando omitido. Campos seguem o contrato de extração validada. maxItems vai de 1 a 100 (padrão 50); itemSelector permite catálogo CSS com seletores de campos relativos. Há uma URL por execução, sem paginação e sem JavaScript. O fluxo força allowFallback=false.

```text
{
  "config": {
    "template": "documentation",
    "url": "https://example.com",
    "fields": [
      {
        "name": "title",
        "type": "string",
        "required": true,
        "source": "css",
        "path": "h1"
      },
      {
        "name": "content",
        "type": "string",
        "required": true,
        "source": "css",
        "path": "body"
      }
    ],
    "costControl": {
      "maxCredits": 3,
      "cacheMode": "fresh",
      "allowFallback": false
    }
  },
  "idempotencyKey": "example-run-0001"
}
```


## Iniciar e consultar

Envie o exemplo para POST /start com Content-Type: application/json. idempotencyKey aceita 8–160 caracteres: letras, números, :, _ e -. Preserve-o para reenviar a mesma execução. A resposta 202 contém id, status e config normalizada. Envie {id,config} para POST /result, mantendo a configuração retornada. Aguarde entre consultas; queued/running não são resultados prontos. failed/cancelled exigem interromper o consumo. Em completed, confira result.valid e os campos antes de gravar no destino.


## Prévia, reprocessamento e erros

POST /estimate recebe {config} e não inicia coleta. POST /result lê a origem do job concluído e permite revisar campos na mesma coleta; a URL deve corresponder à origem. source_mismatch indica URL diferente; source_too_large indica origem acima de 2 MB; invalid_selector pede revisão CSS. Os modelos esperam entre consultas e têm timeout de 15 minutos. Expirar o n8n não interrompe o job interno: continue com o mesmo ID antes de iniciar outro.


## Instalação e ativação no n8n

Use o guia n8n para importar o fluxo e configurar a credencial. O pacote n8n-nodes-deepsfetch 0.1.0 está publicado no npm para n8n hospedado por você. Não é verificado pelo n8n. O fluxo com nós HTTP evita essa dependência. Não há matriz de versões de n8n certificadas: teste em sua versão antes de ativar. Testes manuais não persistem o estado de comparação; a primeira execução automática define a referência. Evite sobreposição ou use banco durável. Conecte seu nó de aviso ou destino de IA: e-mail, embeddings e chatbot não são criados automaticamente.

- [/docs/n8n](https://deepsfetch.com/docs/n8n?lang=pt-BR)
- [/app/start](https://deepsfetch.com/app/start?lang=pt-BR)
- [/downloads/n8n-nodes-deepsfetch-0.1.0.tgz](https://deepsfetch.com/downloads/n8n-nodes-deepsfetch-0.1.0.tgz)


## Passo a passo do contrato já existente

O fluxo n8n já foi validado anteriormente. Esta seção documenta seu uso; não inicia um novo teste nem um novo caso de uso.

1. Configure uma credencial Bearer e valide GET /integration/n8n/connection no domínio deepsfetch.com.
2. Escolha template price/documentation/catalog e defina URL/fields/maxItems/itemSelector conforme o contrato.
3. Estime via POST /estimate com config. Envie POST /start com a mesma config e idempotencyKey única.
4. Salve id e consulte POST /result com id e a mesma config até término. Não envie /start novamente para atualizar.
5. Confira result.valid, items[].validation/data, warnings e truncated antes de gravar no destino; null não é um valor extraído confirmado.

## Continue a integração

- [Extração validada de campos](https://deepsfetch.com/docs/validated-extraction?lang=pt-BR)
- [Créditos, estimativa, cache e limites](https://deepsfetch.com/docs/costs?lang=pt-BR)
- [Coleções com atualização automática](https://deepsfetch.com/docs/collections?lang=pt-BR)
- [/support](https://deepsfetch.com/support?lang=pt-BR)
