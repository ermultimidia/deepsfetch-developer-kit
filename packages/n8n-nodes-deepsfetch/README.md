[Português](README.md) | [English](README.en.md)

# DeepSFetch para n8n

Colete páginas HTML, extraia campos validados e automatize consultas de preço, atualizações de documentação e coleta de catálogos. Comece em https://deepsfetch.com/app/start?lang=pt-BR e importe o fluxo configurado no n8n.

## Instalação

No n8n hospedado por você, abra **Configurações → Community Nodes → Install**, informe `n8n-nodes-deepsfetch` e instale. A instância precisa permitir nós comunitários. O pacote ainda não é verificado pelo n8n; no n8n Cloud, use os fluxos com nós HTTP padrão da configuração guiada.

Para instalação manual, execute `npm install n8n-nodes-deepsfetch` no diretório de nós comunitários (normalmente `~/.n8n/nodes`) e reinicie o n8n. Siga a documentação da sua versão. Crie uma credencial DeepSFetch API com uma chave ativa de https://deepsfetch.com/app/api-keys?lang=pt-BR. A chave fica nas credenciais, nunca nos parâmetros do fluxo. Escolha Português no node para receber mensagens de erro em português.

## Consumo e execução

Instalar o pacote não consome créditos. Sua chave identifica o espaço de trabalho e seu saldo. As coletas usam as mesmas tarifas da API e do painel. Consultar um resultado existente não envia outra coleta. Chaves de IA são credenciais BYOK separadas, e cobranças externas de IA não estão incluídas nos créditos DeepSFetch.

O node oferece iniciar coleta, obter resultado e estimar créditos. Importe os modelos para um fluxo completo de início, espera e resultado. Uma chave estável de idempotência evita duplicação nas tentativas da mesma execução. A espera fica a cargo do nó Wait. O prazo do fluxo é de 15 minutos; consulte o ID recebido antes de reenviar uma coleta lenta.

## Limites e configuração dos destinos

Cada execução trata uma URL. Catálogos aceitam até 100 produtos na página, sem paginação automática. São necessários dados Product em JSON-LD ou seletores CSS relativos. Páginas dependentes de JavaScript ficam fora desse fluxo de HTML. Campos ausentes ou ambíguos interrompem a automação para revisão. Os limites de créditos cobrem a coleta DeepSFetch, não os custos externos de n8n, e-mail ou IA.

A comparação de preços e a detecção de mudanças usam dados persistidos pelo fluxo após execuções automáticas bem-sucedidas; testes manuais não salvam o histórico. Evite execuções sobrepostas e use banco persistente para volumes maiores. A primeira execução automática salva a referência; alterações na mesma moeda chegam à saída final. Conecte seu próprio nó de alerta.

O fluxo de documentação entrega origem, IDs estáveis, hash e trechos do conteúdo. Conecte o destino de IA desejado. E-mail, embeddings e chatbot não são criados automaticamente. O fluxo vem desativado: teste, conecte o destino e confira frequência e fuso horário antes de ativar.
