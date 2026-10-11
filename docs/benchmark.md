[Português](benchmark.md) | [English](benchmark.en.md)

# Verificação operacional reproduzível

Configure a chave conforme o README e execute:

```sh
node examples/benchmark.mjs > resultado.json
```

O script coleta três páginas públicas, sequencialmente, com HTTP, cache `fresh`, fallback desativado e teto de 3 créditos por página, até 9 créditos no total. Use uma conta de teste. URLs próprias podem ser informadas como argumentos, até dez. Não reenvie uma execução interrompida sem conferir os IDs e chaves de idempotência registrados no terminal.

O relatório mede conclusão, tempo até o resultado e presença de metadados de artefatos. Não mede exatidão do Markdown, cobertura de JavaScript, extração com IA ou estabilidade em escala. São três páginas, uma execução por página, sem distribuição estatística. Os tempos incluem consultas a cada dois segundos. Referências `r2://` não são downloads públicos.

Os [resultados iniciais](../benchmarks/smoke-20261011.json) usam apenas o DeepSFetch. Posteriormente foi concluída uma [comparação autenticada com o Firecrawl](comparison.md), com cinco páginas, duas rodadas e métricas de conteúdo. São relatórios separados: este smoke test continua sendo uma verificação operacional do DeepSFetch.
