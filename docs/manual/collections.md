# Coleções com atualização automática

Mantenha um conjunto de páginas versionadas e acompanhe o que mudou.

## Criar e executar

Abra Coleções como proprietário do workspace ou administrador. Informe nome, URL inicial, uma chave ativa do workspace, frequência e limite de páginas. São até 10 coleções por workspace e de 1 a 100 páginas por execução. Escolha atualização a cada 1, 24 ou 168 horas. Salve e use Executar agora; acompanhe a execução e os documentos antes de conectar um destino.

- [/app/collections](https://deepsfetch.com/app/collections?lang=pt-BR)


## Escopo e agenda

A descoberta respeita host e caminho da URL inicial, com profundidade de links limitada a 3. Use uma raiz específica como /docs para evitar conteúdo irrelevante. A coleta é HTML, sem JavaScript. A agenda é por intervalo, não por horário comercial ou expressão cron. O processamento acontece em segundo plano; nextRunAt indica previsão e não garantia de conclusão naquele instante.


## Versões e remoções

Conteúdo novo gera added; mudança gera updated; conteúdo idêntico mantém a versão. Uma ausência na descoberta não apaga o documento. A remoção exige duas respostas 404/410 confirmadas, separadas por pelo menos uma hora, e gera removed com deleted=true. Falhas transitórias preservam o conteúdo anterior. Inspecione warning, error e as tarefas de uma execução partial; completed não substitui a conferência dos documentos esperados.


## Pausar e recuperar

Pausar impede o avanço agendado da coleção e de suas entregas; requisições já enviadas podem continuar no provedor. Ao retomar, confira a execução pendente antes de disparar outra. Atualize a chave nas configurações após rotação. Em erro de limite, consulte reservas e custo disponível. Estados usuais da execução: queued, mapping, collecting, completed, partial e failed.


## Consumir o conteúdo

Use o feed autenticado para ler documentos e mudanças ou configure Supabase no painel. Os documentos têm identificador estável, versão, origem, Markdown e chunks. Coleções não criam embeddings, banco vetorial ou chatbot automaticamente. A coleta e descoberta consomem créditos; o limite de páginas reduz o máximo planejado, não garante a quantidade encontrada.


## Passo a passo: base documental atualizada

Uma coleção deve ser validada antes de ligar seu consumidor a ela.

1. Entre como proprietário, abra Coleções e escolha uma raiz específica, por exemplo https://seu-site.example/docs.
2. Informe nome, chave ativa, máximo pequeno (por exemplo 5) e intervalo de 24 horas. Configure teto compatível e confirme a estimativa.
3. Salve e use Executar agora quando habilitado. Confira execução, tarefas, warning/error e documentos reais.
4. Abra um documento e confira URL, título, Markdown, versão e chunks; não trate chunk como embedding.
5. Consuma primeiro o feed documents até nextCursor=null. Depois acompanhe changes com cursor persistente; registre o cursor somente após gravar os dados.
6. Conecte Supabase se necessário, confira entregas e só então mantenha a agenda ativa. Pause para manutenção e atualize a chave salva quando rotacionar.

## Continue a integração

- [Feeds de documentos e mudanças](https://deepsfetch.com/docs/collection-feeds?lang=pt-BR)
- [Enviar coleções ao Supabase](https://deepsfetch.com/docs/supabase?lang=pt-BR)
- [Créditos, estimativa, cache e limites](https://deepsfetch.com/docs/costs?lang=pt-BR)
- [Watch: monitoramento legado de uma URL](https://deepsfetch.com/docs/watch?lang=pt-BR)
