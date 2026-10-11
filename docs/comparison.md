[Português](comparison.md) | [English](comparison.en.md)

# DeepSFetch e Firecrawl: comparação pequena e reproduzível

Em 11/10/2026, testamos cinco páginas públicas duas vezes em cada serviço, com chaves próprias, Markdown novo, chamadas sequenciais e alternância de quem começava em cada rodada. Estes resultados são anteriores à correção da detecção de document.write. Eles mostram o que precisamos melhorar.

| Medida | DeepSFetch | Firecrawl |
| --- | --- | --- |
| Solicitações concluídas | 10/10 | 10/10 |
| Trechos esperados encontrados no conjunto das respostas | 22/30 | 30/30 |
| Tempo mediano até o resultado | 10,46 s | 1,49 s |
| Créditos informados | 10 créditos DeepSFetch | 10 créditos Firecrawl |

Cada serviço tem sua unidade de créditos: os números não comparam preços em dinheiro. Uma tarefa concluída não comprova conteúdo útil. Encontrar trinta trechos não equivale a medir precisão ou confiabilidade geral.

## Reproduzir com suas chaves

Defina DEEPSFETCH_API_KEY e FIRECRAWL_API_KEY no ambiente do terminal. Execute:

```sh
node examples/compare.mjs comparison-local.json
```

O script faz no máximo dez solicitações de coleta em cada serviço. No DeepSFetch, usa collectionEngine=auto, coleta nova e limite de um crédito por solicitação. No Firecrawl, usa /v2/scrape, Markdown e maxAge=0. Para diante de erros de autenticação/conta no Firecrawl, salva resultados parciais após cada solicitação e recusa sobrescrever um relatório existente. Não repete chamadas nem autoriza serviços premium.

As páginas e os trechos esperados estão em [compare.mjs](../examples/compare.mjs). O [relatório autenticado anterior à correção](../benchmarks/comparison-authenticated-20261011.json) registra tempo, falhas, hashes, tamanhos, trechos e créditos por solicitação. Não inclui credenciais ou conteúdo integral das páginas. Um teste preliminar sem chave não compõe esses resultados.

## Diferenças encontradas

- A página de citações em JavaScript concluiu sem nenhum dos três autores esperados nas duas rodadas. A navegação parecia válida, mas document.write criava o conteúdo.
- O catálogo apresentou dois dos três títulos esperados. Um título completo estava em um atributo HTML, enquanto o texto visível era abreviado. Nossa conversão não o recuperou.
- Fila e processamento aumentaram o tempo total do DeepSFetch. A medição inclui consultas de status a cada 500 ms.
- As duas solicitações pedem conteúdo principal, mas o motor automático do DeepSFetch atualmente ignora onlyMainContent e converte o HTML completo. É uma diferença de extração conhecida.

## Correção validada depois da comparação

O motor automático reconhece document.write/document.writeln em scripts inline durante a tentativa HTTP e usa o navegador. A estratégia basic recusa esse conteúdo ainda não executado. A presença do script original no HTML renderizado não invalida o resultado.

O [teste posterior em produção](../benchmarks/parser-write-fix-20261011.json) encontrou os três autores com a estratégia de navegador e cobrança de um crédito confirmada no registro de uso. Foi uma única coleta DeepSFetch, concluída em 16,70 segundos. Não chamamos novamente o Firecrawl nem alteramos a tabela anterior para aparentar uma comparação completa nova.

Ainda precisamos ampliar a detecção JavaScript, melhorar Markdown e seleção do conteúdo principal, reduzir a demora e testar um conjunto independente maior. Esta amostra não comprova desempenho em escala ou equivalência de todas as funcionalidades.

## Compartilhar seu teste

Use o [formulário de primeiro uso](https://github.com/ermultimidia/deepsfetch-developer-kit/issues/new?template=first-run.yml), sem chaves ou conteúdo privado. Contas de QA não entram na contagem de usuários independentes.
