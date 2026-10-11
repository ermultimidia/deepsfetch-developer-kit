# Playground, histórico e exportação

Use a interface para configurar, acompanhar e reproduzir a coleta.

## 1. Escolher a ferramenta

Entre no workspace e abra Playground. Use Busca, Coleta, Mapeamento ou Rastreamento. Interação, leitura de arquivos, extração e monitoramento têm telas próprias. O Playground usa sua sessão e uma credencial interna; scripts externos exigem uma chave criada em Chaves API.

- [/app/playground](https://deepsfetch.com/app/playground?lang=pt-BR)


## 2. Configurar e conferir custo

Informe URL/consulta, formato e opções. Em Coleta, Automático usa o motor de 1 crédito; HTML direto/navegador mudam a estratégia desse motor. O cache desse motor está desabilitado. Em busca selecione as fontes; em map/crawl ajuste escopo e limite antes de executar. Confira a estimativa e o teto.


## 3. Acompanhar e retomar

Inicie uma vez. Se a tela parar de aguardar, abra Ver resultado nas execuções recentes. Filtre histórico por URL, consulta ou status. Fechar a aba não comprova cancelamento do job. A lista recente é limitada e não representa todo o histórico de consumo.


## 4. Conferir e exportar

Confira o conteúdo e o estado, depois use as opções de cópia/download disponíveis para o formato retornado. JSON preserva o envelope; Markdown serve ao texto; CSV é apropriado para dados tabulares. Um arquivo exportado pode conter resultado parcial; revise os campos e erros antes de alimentar outro sistema.


## 5. Reproduzir fora do painel

Use Ver código para obter o pedido correspondente. Salve sua chave no ambiente, substitua os exemplos e use idempotência. O código exibido é uma receita: confira o retorno real e a compatibilidade dos parâmetros. dashboard_key_revoked exige revisar Chaves API/acesso do Playground.

- [CLI: comandos, arquivos e recuperação](https://deepsfetch.com/docs/cli?lang=pt-BR)
- [JavaScript SDK: instalar, executar e retomar](https://deepsfetch.com/docs/sdk-javascript?lang=pt-BR)

## Continue a integração

- [Jobs: acompanhar, retomar e cancelar](https://deepsfetch.com/docs/jobs?lang=pt-BR)
- [Respostas, artefatos e erros da API](https://deepsfetch.com/docs/api-results?lang=pt-BR)
- [Créditos, estimativa, cache e limites](https://deepsfetch.com/docs/costs?lang=pt-BR)
