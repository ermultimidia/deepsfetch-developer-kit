# Feeds de documentos e mudanças

Integre coleções ao n8n, bancos e agentes usando cursores persistentes.

## Endpoint e autenticação

Use o domínio do painel, o UUID da coleção exibido no painel e Bearer com uma chave ativa do mesmo workspace. Os feeds são somente leitura. Criação, agenda e destino são gerenciados no painel autenticado. Substitua COLLECTION_ID; não use o ID de um job.

```text
curl https://deepsfetch.com/collection-feed/COLLECTION_ID/documents \
  -H "Authorization: Bearer $DEEPSFETCH_API_KEY"
```


## Fotografia dos documentos atuais

GET /collection-feed/{collectionId}/documents retorna até 10 documentos ativos e nextCursor. Quando nextCursor não for null, envie-o como after na próxima consulta. Esse cursor é um ID de documento, não um horário. A listagem não é uma fotografia transacional: documentos podem mudar durante a paginação.

```text
{
  "documents": [
    {
      "id": "DOCUMENT_ID",
      "collectionId": "COLLECTION_ID",
      "url": "https://example.com/docs",
      "title": "Example",
      "version": 1,
      "deleted": false,
      "markdown": "# Example",
      "chunks": []
    }
  ],
  "nextCursor": null
}
```


## Sincronização incremental confiável

GET /collection-feed/{collectionId}/changes?after=0 retorna até 10 mudanças, cursor numérico e hasMore. Para uma primeira sincronização que inclua remoções, processe as mudanças desde 0. Aplique cada documento por (collectionId,id), aceitando apenas versões mais novas. Persista o cursor somente depois de gravar todo o lote; se falhar, repita com o cursor anterior. Continue enquanto hasMore=true e depois consulte periodicamente a partir do cursor salvo.

```text
{
  "changes": [
    {
      "sequence": 42,
      "kind": "removed",
      "document": {
        "id": "DOCUMENT_ID",
        "collectionId": "COLLECTION_ID",
        "version": 3,
        "deleted": true,
        "markdown": null,
        "chunks": []
      }
    }
  ],
  "cursor": 42,
  "hasMore": false
}
```


## Dados, exclusões e falhas

Os exemplos mostram apenas parte dos campos. Preserve URL, datas e hash quando presentes. Um tombstone tem deleted=true, markdown=null e chunks vazios: remova-o do índice de consulta ou marque-o como excluído. Não troque o cursor numérico de mudanças pelo nextCursor de documentos. invalid_cursor exige corrigir o tipo; 401 exige revisar a chave; 404 exige conferir coleção e workspace. Não há prazo de retenção garantido documentado: mantenha seu checkpoint e backups.


## Passo a passo: carga inicial e atualização

Faça upsert por documento e controle a versão; as duas paginações usam cursores diferentes.

1. Copie o UUID da coleção e use uma chave do mesmo workspace no domínio deepsfetch.com.
2. Consulte documents sem after. Grave os documentos por id e siga nextCursor como after, codificado na URL.
3. Depois de concluir a carga inicial, consulte changes?after=0 ou seu cursor salvo. Processe as alterações na ordem sequence.
4. Faça upsert em added/updated; marque/remova o documento em removed/deleted. Só então persista cursor.
5. Se hasMore=true, continue imediatamente; se false, espere antes de consultar. Repita após falha usando o último cursor confirmado e aceite eventos repetidos sem duplicar dados.

```text
GET /collection-feed/COLLECTION_UUID/documents
GET /collection-feed/COLLECTION_UUID/documents?after=DOCUMENT_ID
GET /collection-feed/COLLECTION_UUID/changes?after=0

// Illustrative response
{
  "changes": [
    {
      "sequence": 1,
      "kind": "added",
      "document": {
        "id": "DOCUMENT_ID",
        "version": 1,
        "deleted": false,
        "markdown": "# Example",
        "chunks": []
      }
    }
  ],
  "cursor": 1,
  "hasMore": false
}
```

## Continue a integração

- [Coleções com atualização automática](https://deepsfetch.com/docs/collections?lang=pt-BR)
- [Enviar coleções ao Supabase](https://deepsfetch.com/docs/supabase?lang=pt-BR)
- [Contrato HTTP dos modelos n8n](https://deepsfetch.com/docs/n8n-api?lang=pt-BR)
