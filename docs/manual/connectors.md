# Conectores sociais, planilhas e destinos

Configure somente integrações que o produto realmente oferece.

## X e Reddit: consultar um post

Abra Documentos e conectores, escolha X ou Reddit, informe ID do post e token Bearer da API oficial, depois consulte. X usa ID numérico; Reddit aceita ID base36 com ou sem t3_. Confira data/errors; permissões da rede podem limitar o resultado. Não é busca livre, feed completo ou acesso a contas privadas.

1. Abra Documentos e conectores no workspace e escolha a rede X ou Reddit.
2. Obtenha um token autorizado na API oficial da rede. A chave DeepSFetch não substitui esse token.
3. Copie o ID do post, informe ID/token e clique Consultar post uma vez.
4. Confira provider e data/errors. Em acesso negado revise permissões; em 429 aguarde antes de repetir.
5. Use Baixar resultado quando disponível e remova o token antes de compartilhar. A consulta não acompanha novos posts automaticamente.

- [/app/data-tools](https://deepsfetch.com/app/data-tools?lang=pt-BR)


## Custos, limites e erros externos

O conector não cobra créditos DeepSFetch; a rede aplica acesso, quotas e possíveis custos. Limite compartilhado OCR/social: seis chamadas por minuto por workspace. Tokens não são salvos. provider_access_denied pede revisar token/permissões; provider_rate_limited pede reduzir frequência. Instagram não está disponível.


## Google Sheets via fluxo disponível

Baixe o modelo Google Sheets na tela de conectores, importe no seu n8n, configure as credenciais DeepSFetch e Google e escolha documento/aba. Revise o mapeamento das colunas e mantenha o workflow inativo até conferir o destino. A integração é um workflow, não uma sincronização nativa automática da conta. O caso n8n já existente continua documentado; não é necessário recriá-lo.

- [/downloads/deepsfetch-sheets.json](https://deepsfetch.com/downloads/deepsfetch-sheets.json)
- [/docs/n8n](https://deepsfetch.com/docs/n8n?lang=pt-BR)
- [Contrato HTTP dos modelos n8n](https://deepsfetch.com/docs/n8n-api?lang=pt-BR)


## Supabase para coleções

Prepare as tabelas SQL, configure o destino na coleção e acompanhe a outbox. Use chave de serviço somente no destino seguro. Para outro banco, consuma os feeds autenticados e persista cursores; não presuma conector nativo só porque uma API externa existe.

- [Enviar coleções ao Supabase](https://deepsfetch.com/docs/supabase?lang=pt-BR)
- [Feeds de documentos e mudanças](https://deepsfetch.com/docs/collection-feeds?lang=pt-BR)

## Continue a integração

- [Ler PDF, DOCX, XLSX e arquivos de texto](https://deepsfetch.com/docs/files?lang=pt-BR)
- [Integrações e sua chave de IA — BYOK](https://deepsfetch.com/docs/byok?lang=pt-BR)
- [JavaScript SDK: instalar, executar e retomar](https://deepsfetch.com/docs/sdk-javascript?lang=pt-BR)
- [Python SDK: instalar e consultar jobs](https://deepsfetch.com/docs/sdk-python?lang=pt-BR)
