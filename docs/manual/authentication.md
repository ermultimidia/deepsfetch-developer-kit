# Conta, workspace e chaves

Prepare o acesso e mantenha suas automações ligadas ao workspace correto.

## Preparar o acesso

Entre na conta, conclua o onboarding e confira o workspace selecionado. Abra Chaves API para criar uma chave ativa do mesmo workspace. Chamadas de máquina usam Bearer; a sessão do painel não substitui a chave externa.

```text
curl https://api.deepsfetch.com/v2/jobs/JOB_ID \
  -H "Authorization: Bearer $DEEPSFETCH_API_KEY"
```

- [/app/settings](https://deepsfetch.com/app/settings?lang=pt-BR)
- [/app/integrations](https://deepsfetch.com/app/integrations?lang=pt-BR)


## Permissões

Coleções, política de custos e conexão de IA exigem o proprietário do workspace ou administrador do sistema para alterações. Uma chave de outro workspace não concede acesso aos seus jobs. As rotas /api do painel dependem de sessão e, nas mutações, verificações de origem; não são uma alternativa à API pública para scripts.


## Criar, substituir e revogar

Copie a chave na criação e guarde-a no gerenciador de segredos ou na credencial do n8n. Para rotacionar: crie a nova chave, atualize os consumidores, teste uma consulta e então revogue a antiga. Atualize também a chave salva nas configurações das coleções. Revogar uma chave interrompe futuras chamadas autenticadas com ela; não comprova cancelamento de trabalhos já enviados.


## Quando o acesso falha

401: confira Bearer, chave ativa, usuário e workspace ativos. 403: confira propriedade e permissões. 404 em job: confira o identificador e o workspace; não presuma que outro usuário pode consultar o mesmo ID. Não coloque chaves na URL, no JSON exportado do workflow ou em relatos de suporte.


## Passo a passo: validar e rotacionar

Faça a troca em uma integração pequena antes de atualizar todos os consumidores.

1. Crie a chave em Chaves API, no workspace correto, e copie-a quando exibida.
2. Configure DEEPSFETCH_API_KEY ou a credencial do cliente. No MCP use o cabeçalho Bearer; no n8n use uma credencial.
3. Valide a conexão gratuitamente com GET https://deepsfetch.com/integration/n8n/connection. connected=true e workspaceId devem corresponder ao esperado.
4. Para rotação, crie a nova chave, atualize scripts/MCP/coleções/monitores e valide cada consumidor.
5. Revogue a antiga somente depois da troca; guarde nome/ID/prefixo para diagnóstico, sem expor a chave completa.

```text
curl --fail-with-body "https://deepsfetch.com/integration/n8n/connection" -H "Authorization: Bearer $DEEPSFETCH_API_KEY"
```

## Continue a integração

- [Jobs: acompanhar, retomar e cancelar](https://deepsfetch.com/docs/jobs?lang=pt-BR)
- [Contrato HTTP dos modelos n8n](https://deepsfetch.com/docs/n8n-api?lang=pt-BR)
- [Planos, assinatura e cobrança](https://deepsfetch.com/docs/billing?lang=pt-BR)
