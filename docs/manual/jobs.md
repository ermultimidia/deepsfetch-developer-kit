# Jobs: acompanhar, retomar e cancelar

Guarde o ID público e separe aceitação, conclusão e qualidade.

## 1. Guardar a submissão

Guarde id, kind, horário, corpo enviado e Idempotency-Key. IDs job_ são públicos da fila V2; fetch_ são internos da coleta; UUIDs de coleção/monitor são outros recursos.


## 2. Consultar sem reenviar

Use GET /v2/jobs/{jobId} com a mesma chave/workspace. Espere cerca de dois segundos entre consultas, reduza frequência em 429 e aplique um prazo local. Um prazo local esgotado deixa o job consultável.

```text
curl --fail-with-body "https://api.deepsfetch.com/v2/jobs/JOB_ID" \
  -H "Authorization: Bearer $DEEPSFETCH_API_KEY"
```


## 3. Interpretar os estados

Pare a consulta ativa ao chegar a um estado terminal e valide o conteúdo separadamente.

| Campo / estado | Comportamento |
| --- | --- |
| queued | Aceito e aguardando execução. |
| running | Em execução; result pode estar ausente. |
| completed | Fluxo terminado; confira estado interno parcial e dados. |
| failed | Terminal com erro; registre code/message e preserve id. |
| cancelled | Estado público cancelado; não comprova interrupção do provedor. |


## 4. Retomar depois de interrupção

Após queda de energia, consulte o mesmo id pelo histórico, CLI job --wait ou SDK. Se a submissão perdeu a resposta, use a mesma idempotência e corpo. Uma consulta não deve iniciar uma nova coleta.


## 5. Cancelar um job elegível

POST /v2/jobs/{jobId}/cancel altera queued/running no estado público. Confira o retorno e consulte novamente. Não use esse endpoint para apagar monitores recorrentes, interromper todo provedor ou solicitar estorno. Trabalho iniciado e cobranças já realizadas podem continuar existindo.

```text
curl --fail-with-body -X POST "https://api.deepsfetch.com/v2/jobs/JOB_ID/cancel" -H "Authorization: Bearer $DEEPSFETCH_API_KEY"
```


## Falhas frequentes

404: ID/workspace/domínio incorreto. 409 em nova submissão: corpo diferente com a mesma idempotência ou limite. 429: reduza consultas. 502/503: confira o job existente antes de repetir a criação. Nunca substitua erro por um resultado inventado.

## Continue a integração

- [Respostas, artefatos e erros da API](https://deepsfetch.com/docs/api-results?lang=pt-BR)
- [Diagnóstico e recuperação](https://deepsfetch.com/docs/troubleshooting?lang=pt-BR)
- [Webhooks: assinatura e entrega](https://deepsfetch.com/docs/webhooks?lang=pt-BR)
