# Extração validada de campos

Defina campos, confira evidências e exporte somente valores sustentados pela página.

## Executar no painel

Abra Extração estruturada e informe uma URL pública. A tela atual usa a sessão para executar, sem pedir uma chave DeepSFetch no formulário. Escolha Dados da página para JSON-LD/CSS, IA gerenciada ou BYOK configurado em Chaves API. A coleta usa créditos mesmo se um campo não for validado. Trata uma página HTML sem JavaScript; a origem da prévia é limitada a 2 MB.

- [/app/extract](https://deepsfetch.com/app/extract?lang=pt-BR)


## Configurar de 1 a 20 campos

Use nomes únicos com até 48 caracteres, começando por letra e contendo apenas letras, números e _. Tipos: string, number e boolean. Em JSON-LD, informe um caminho como offers.price; em CSS, um seletor como h1 e, se necessário, um atributo como content. A descrição orienta somente o modo IA. Marcar obrigatório faz o resultado exigir esse campo validado.

```text
[
  {
    "name": "title",
    "type": "string",
    "required": true,
    "source": "css",
    "path": "h1"
  },
  {
    "name": "price",
    "type": "number",
    "required": true,
    "source": "jsonld",
    "path": "offers.price"
  }
]
```


## Interpretar a validação

Confira cada campo e a evidência antes de usar JSON ou CSV. Números ambíguos por separador decimal podem ser recusados; refine a origem em vez de adivinhar. A evidência confirma correspondência com o conteúdo coletado, não a veracidade da afirmação do site. Valores não sustentados são exportados como null.

| Campo / estado | Comportamento |
| --- | --- |
| supported | Valor do tipo esperado sustentado pela origem. |
| missing | Nenhum valor utilizável encontrado. |
| ambiguous | Mais de um valor: refine o seletor/caminho. |
| invalid_type | O valor não corresponde ao tipo solicitado. |
| unverified | A evidência da IA não foi verificada. |


## Histórico, exportação e integração

Use Continuar no histórico para retomar uma execução salva. Baixe JSON pela ação disponível para preservar os campos e evidências; CSV depende da tela ou conversão no consumidor. BYOK é persistido separadamente e a tela atual usa a sessão de execução. Para repetir os três modelos em máquina, use Começar/n8n. /v2/extract é outro contrato e não cria automaticamente este relatório.


## Passo a passo: produto com evidências

O painel atual oferece IA gerenciada, Dados da página e BYOK. Usa a sessão para obter acesso de execução; a chave BYOK é configurada separadamente em Chaves API.

1. Abra Extração estruturada e escolha Produto ou Personalizado; informe uma URL pública que publique os campos desejados.
2. Para começar sem IA, escolha Dados da página. Defina title/string via CSS h1 e price/number via JSON-LD offers.price. Só marque obrigatório se o campo tiver de existir.
3. Se o valor depender de interpretação, escolha IA gerenciada ou configure BYOK. Descreva cada campo; não reutilize mapeamento CSS como promessa de extração em páginas JavaScript.
4. Confira a estimativa e o teto. Execute uma vez; acompanhe fetching/extracting/completed e use Continuar no histórico após interrupção.
5. Leia status/evidence de cada campo. required missing/ambiguous/unverified invalida o resultado; valores não sustentados ficam null.
6. Exporte pelo botão disponível. Se precisar de CSV e a tela atual oferecer somente JSON, transforme o JSON no seu consumidor ou use os modelos validados apropriados.

```text
{
  "data": {
    "title": "Example Domain",
    "price": null
  },
  "fields": [
    {
      "name": "title",
      "status": "supported",
      "value": "Example Domain",
      "evidence": {
        "kind": "css",
        "selector": "h1"
      }
    },
    {
      "name": "price",
      "status": "missing",
      "value": null,
      "evidence": null
    }
  ],
  "validation": {
    "valid": false,
    "supported": 1,
    "total": 2
  }
}
```

## Continue a integração

- [Extract: JSON a partir de uma coleta](https://deepsfetch.com/docs/extract?lang=pt-BR)
- [Integrações e sua chave de IA — BYOK](https://deepsfetch.com/docs/byok?lang=pt-BR)
- [Contrato HTTP dos modelos n8n](https://deepsfetch.com/docs/n8n-api?lang=pt-BR)
- [Créditos, estimativa, cache e limites](https://deepsfetch.com/docs/costs?lang=pt-BR)
