# Enviar coleções ao Supabase

Configure o destino e acompanhe entregas com repetição automática.

## Preparar o projeto

Baixe o SQL abaixo e execute uma vez no SQL Editor do projeto Supabase de destino. Ele cria deepsfetch_documents, a view deepsfetch_active_documents e a função deepsfetch_apply_document. O script habilita RLS e restringe o acesso à service_role. Confira o script antes de aplicá-lo ao seu projeto.

- [/collections-supabase.sql](https://deepsfetch.com/collections-supabase.sql)


## Conectar a coleção

No painel Coleções, informe a URL HTTPS do projeto Supabase e a chave de servidor com permissão para a tabela e função criadas. Essa chave é diferente da chave DeepSFetch. O servidor verifica o destino e salva a chave criptografada. A origem do destino fica vinculada à coleção; destination_locked indica tentativa de trocar essa origem. A chave do mesmo destino pode ser atualizada.

- [/app/collections](https://deepsfetch.com/app/collections?lang=pt-BR)


## Entrega e repetição

Uma outbox registra a versão a entregar. Falhas ficam em retrying com tentativas e próximo horário; a espera cresce até uma hora. A função SQL só aplica versões mais novas, tornando reenvios da mesma versão inofensivos. A outbox mantém a versão mais recente por documento; não é um log de todas as versões. Consulte o feed de mudanças para esse histórico.


## Verificar e recuperar

Leia deepsfetch_active_documents para excluir tombstones dos resultados. Compare collection_id, document_id e version com o painel. Em destination_unavailable ou destination_http_401/403, confira URL, chave e permissões; confira também se executou o SQL. Salvar novamente a conexão reabre entregas para tentativa. Pausar a coleção também pausa entregas. Markdown e chunks são enviados; embeddings e sincronização com um índice vetorial são responsabilidade do seu fluxo.

```text
select collection_id, document_id, version, url
from public.deepsfetch_active_documents
order by updated_at desc
limit 20;
```


## Passo a passo: confirmar a entrega

A criação da conexão não significa que todos os documentos já chegaram ao destino.

1. Baixe o SQL de Coleções e execute no projeto Supabase pretendido. Confira tabelas deepsfetch_documents/deepsfetch_chunks e permissões de acesso.
2. Na coleção, informe a origem https://SEU_PROJETO.supabase.co e uma chave autorizada para o destino. Não use a chave DeepSFetch como chave Supabase.
3. Salve. A configuração testa a tabela de documentos; confirme também os dados/chunks após uma execução. O destino da coleção fica vinculado à origem configurada.
4. Execute/aguarde a coleção e consulte outbox: pending, delivered ou falha com attempts/next_attempt.
5. No Supabase confira document_id, versão e chunks, incluindo remoções. Se falhar, corrija tabela/chave/permissão e acompanhe as tentativas; não apague documentos válidos para destravar uma entrega.

- [/collections-supabase.sql](https://deepsfetch.com/collections-supabase.sql)

## Continue a integração

- [Coleções com atualização automática](https://deepsfetch.com/docs/collections?lang=pt-BR)
- [Feeds de documentos e mudanças](https://deepsfetch.com/docs/collection-feeds?lang=pt-BR)
- [Integrações e sua chave de IA — BYOK](https://deepsfetch.com/docs/byok?lang=pt-BR)
