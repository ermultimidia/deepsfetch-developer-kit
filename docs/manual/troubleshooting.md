# Diagnóstico e recuperação

Identifique a etapa que falhou antes de repetir uma operação.

## 1. Registrar a execução

Guarde horário UTC, workspace, endpoint/ferramenta, id público, ID interno quando houver, estado e error.code/message/requestId. Remova Authorization, chaves BYOK e dados privados antes de relatar.


## 2. Recuperar após interrupção

Se já tem id, consulte-o; não inicie uma segunda coleta. Se não recebeu id mas guardou Idempotency-Key, repita o mesmo corpo/chave. Se não tem nenhum dos dois, confira Histórico e consumo antes de enviar outra intenção. Não trate timeout local como falha terminal do servidor.


## 3. Corrigir pelo código

O código específico é mais útil que o status HTTP sozinho. Erros de entrada/permissão exigem correção; limites exigem rever orçamento/frequência; provedor exige diagnóstico.

| Campo / estado | Comportamento |
| --- | --- |
| 400 | Confira tipos, campos, URL e limites do caminho; não repita sem corrigir. |
| 401 / 403 | Confira chave/workspace ativos e autorização do proprietário. |
| 404 | Confira domínio, caminho, ID e workspace; /v2/parse não existe. |
| 409 | Leia o código: idempotência, teto, saldo, oferta premium ou operação incompatível. |
| 429 | Respeite Retry-After quando presente e aumente a espera; use concorrência menor. |
| 502 / 503 | Confira job existente, disponibilidade/configuração e erro do provedor. |
| completed sem dados úteis | Confira estado interno parcial, campos, seleção do alvo e artefatos. |


## 4. Relatar com evidência

Inclua exemplo mínimo sem segredo, resultado esperado/obtido e identificadores. Use Ajuda ou issues do kit público para dúvidas reproduzíveis. Não publique conteúdo privado. Não existe promessa automática de SLA para um relato.

- [/support](https://deepsfetch.com/support?lang=pt-BR)

## Continue a integração

- [Jobs: acompanhar, retomar e cancelar](https://deepsfetch.com/docs/jobs?lang=pt-BR)
- [Respostas, artefatos e erros da API](https://deepsfetch.com/docs/api-results?lang=pt-BR)
- [Conta, workspace e chaves](https://deepsfetch.com/docs/authentication?lang=pt-BR)
- [Créditos, estimativa, cache e limites](https://deepsfetch.com/docs/costs?lang=pt-BR)
