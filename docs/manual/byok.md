# Integrações e sua chave de IA — BYOK

Conecte um provedor e diferencie as credenciais de cada serviço.

## Conectar IA

Configure IA própria em Chaves API como proprietário ou administrador. Provedores aceitos atualmente: OpenAI, Google, DeepSeek, Kimi, Qwen, Anthropic e OpenRouter. Informe chave/modelo, salve e confira as ações de teste disponíveis. Use BYOK em Extração estruturada. Salvar não comprova saldo/disponibilidade.

- [/app/extract](https://deepsfetch.com/app/extract?lang=pt-BR)
- [/app/integrations](https://deepsfetch.com/app/integrations?lang=pt-BR)


## Armazenamento e substituição

A conexão de IA é criptografada no servidor. Ao substituir a conexão, a anterior ativa desse fluxo é desativada. Essa chave é diferente da chave DeepSFetch usada pela API e da chave Supabase de destino. Atualize após rotação; integração legada de outro tipo não garante compatibilidade com extração estruturada.


## Custos e falhas

BYOK usa sua conta do provedor; custos externos não entram no teto de créditos DeepSFetch. byok_not_configured pede uma conexão ativa; owner_required pede um usuário autorizado; encryption_unavailable exige configuração pelo operador. Erros de autenticação, quota ou modelo devem ser conferidos no provedor. O modo Dados da página funciona com JSON-LD/CSS sem IA; não é fallback automático para uma execução de IA que falhou.


## Passo a passo: conectar e verificar IA

A configuração atual aceita OpenAI, Google, DeepSeek, Kimi, Qwen, Anthropic e OpenRouter; disponibilidade de modelos depende da conexão e das permissões do provedor.

1. Abra Chaves API e a seção de IA própria, como proprietário do workspace. Escolha o provedor, informe chave e modelo e salve/teste conforme as ações disponíveis.
2. Confirme que a conexão está ativa e que o modelo existe e está permitido na sua conta. Salvar um segredo não comprova saldo nem uma extração real.
3. Abra Extração estruturada, escolha BYOK, defina poucos campos e confira a estimativa de coleta.
4. Execute uma vez e confira o relatório de evidências. Revise erros de quota/autenticação/modelo no provedor antes de repetir.
5. Após rotação, atualize a conexão; verifique o consumidor. Custos cobrados na sua conta de IA não são limitados por maxCredits da plataforma.

- [/app/api-keys](https://deepsfetch.com/app/api-keys?lang=pt-BR)
- [/app/extract](https://deepsfetch.com/app/extract?lang=pt-BR)

## Continue a integração

- [Extração validada de campos](https://deepsfetch.com/docs/validated-extraction?lang=pt-BR)
- [Extract: JSON a partir de uma coleta](https://deepsfetch.com/docs/extract?lang=pt-BR)
- [Créditos, estimativa, cache e limites](https://deepsfetch.com/docs/costs?lang=pt-BR)
- [Enviar coleções ao Supabase](https://deepsfetch.com/docs/supabase?lang=pt-BR)
