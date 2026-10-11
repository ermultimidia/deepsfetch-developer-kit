# Monitorar preços e estoque

Configure verificações, valide o primeiro retrato e acompanhe alertas.

## 1. Escolher produto e campos

Use uma página HTTPS com Product/Offer em JSON-LD. Campos padrão: name, price e currency obrigatórios, availability opcional. Em Preços e estoque, campos avançados permitem CSS/JSON-LD. Valores devem representar um único produto; moeda com três letras e preço numérico não negativo.


## 2. Criar e confirmar o estado

Abra Monitores da web ou Preços e estoque. Informe nome, URL, frequência de 1/24/168 horas e teto por verificação (mínimo 3). Monitores da web usa a sessão e cria ativo; a tela legada Preços e estoque pede chave e salva pausado. Confira o estado após salvar e pause se quiser validar antes da agenda. Até 100 monitores por workspace.

- [/app/watch](https://deepsfetch.com/app/watch?lang=pt-BR)
- [/app/price-monitors](https://deepsfetch.com/app/price-monitors?lang=pt-BR)


## 3. Verificar agora e validar

Execute Verificar agora e abra Histórico. A primeira verificação válida cria uma referência e não envia alerta de mudança. Confira preço, moeda e disponibilidade. Resultado inválido não deve substituir uma referência válida.


## 4. Interpretar mudanças

Preço diferente gera mudança; disponibilidade só é comparada quando ambos os valores são reconhecidos. Moeda diferente exige revisão e não gera comparação de preço. Estados normalizados: in_stock, out_of_stock e preorder. Revise failed/review e os dados da origem.


## 5. Configurar e confirmar alertas

Informe webhook público e segredo de 16–256 caracteres antes de criar, quando necessário. Eventos product.changed incluem monitorId, changes e snapshot; use verificação HMAC de /docs/webhooks. Esta cadeia de alertas tem até seis tentativas, distinta dos webhooks V2 sem reenvio. Confira delivered/pending/exhausted no histórico disponível e deduplique pelo evento.


## 6. Pausar e manter

Pausar interrompe verificações/entregas futuras; trabalho em andamento pode terminar. Revise teto mensal e saldo antes de retomar. Não confunda este serviço com watch V2, monitoramento de todo o site, busca recorrente ou alertas por e-mail/Slack: estes últimos não fazem parte deste fluxo.

## Continue a integração

- [Watch: monitoramento legado de uma URL](https://deepsfetch.com/docs/watch?lang=pt-BR)
- [Extração validada de campos](https://deepsfetch.com/docs/validated-extraction?lang=pt-BR)
- [Webhooks: assinatura e entrega](https://deepsfetch.com/docs/webhooks?lang=pt-BR)
- [Créditos, estimativa, cache e limites](https://deepsfetch.com/docs/costs?lang=pt-BR)
