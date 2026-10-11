[Português](n8n.md) | [English](n8n.en.md)

# Crie uma automação com n8n

Comece pela [documentação da configuração guiada e dos modelos de fluxo](https://deepsfetch.com/docs/n8n?lang=pt-BR).

O pacote publicado no npm é `n8n-nodes-deepsfetch`. Ele é um node comunitário para n8n hospedado por você e ainda não é verificado pelo n8n. No n8n Cloud, use os modelos documentados com nós padrão.

## Primeiro exemplo recomendado: monitoramento de preços

1. Abra https://deepsfetch.com/app/start?lang=pt-BR.
2. Escolha uma página pública de produto, execute a prévia e confira os campos extraídos. A prévia consome créditos.
3. Baixe o fluxo configurado e importe no seu n8n.
4. Crie a credencial de API descrita no guia. Guarde a chave nas credenciais, nunca nos parâmetros do fluxo nem em um JSON exportado.
5. Teste a coleta e conecte o destino do seu alerta.
6. Confira a frequência e o fuso horário antes de ativar o fluxo.

A primeira execução automática bem-sucedida salva o preço de referência. Testes manuais não persistem o histórico de comparação. O exemplo compara preços na mesma moeda; nenhum alerta será enviado até você conectar um nó de envio.

## Código do node incluído

`packages/n8n-nodes-deepsfetch/dist` contém a implementação JavaScript distribuída no npm, incluindo a definição de credenciais e o ícone. O node permite iniciar uma coleta, obter o resultado e estimar créditos. A espera é feita pelo nó Wait do n8n.

O fluxo de HTML trata uma URL por execução. A extração de catálogo aceita até 100 produtos nessa página, sem paginação automática. Páginas dependentes de JavaScript ficam fora desse fluxo. Campos ausentes ou ambíguos exigem revisão. Custos de n8n, e-mail, armazenamento e IA são separados dos créditos DeepSFetch.

Uma parceria nativa ou entrada em catálogo verificado é uma etapa futura de distribuição.
