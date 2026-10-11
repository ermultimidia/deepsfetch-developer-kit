# Ler PDF, DOCX, XLSX e arquivos de texto

Extraia texto localmente e entenda quando precisa de OCR.

## 1. Abrir o leitor local

No Playground, escolha Ler um arquivo. Selecione um arquivo por vez: PDF, DOCX, XLSX, TXT, Markdown, JSON, CSV ou HTML/HTM. Limite de 5 MiB. Este leitor processa no navegador, sem upload do conteúdo e sem créditos DeepSFetch.

- [/app/playground?tool=parse](https://deepsfetch.com/app/playground?tool=parse)


## 2. Conferir o resultado por formato

PDF exige texto selecionável e até 50 páginas. DOCX extrai texto; XLSX lê valores existentes, sem recalcular fórmulas, até 100.000 células. JSON precisa ser válido; CSV precisa ter campos/aspas válidos. HTML é convertido para texto. Layout, imagens, estilos e fórmulas não são preservados como em um editor.


## 3. Copiar e baixar

Confira contagens, amostra e ordem do texto. Use Copiar texto ou Baixar texto antes de sair. O histórico da sessão mantém nome/status/contagem, separado por workspace; reabrir o conteúdo exige selecionar o arquivo novamente. Não equivale a armazenamento de documentos em Coleções.


## Limites e falhas

DOCX/XLSX: até 20 MiB descompactados e 1.000 entradas internas. file_too_large: divida o arquivo; pdf_no_text: use OCR; invalid_document: revise corrupção/proteção; too_many_cells/pages: reduza o documento. Não há /v2/parse público no contrato atual.


## OCR opcional com Mistral

Na tela Documentos e conectores, selecione PDF, informe sua chave Mistral e de 1 a 5 primeiras páginas. Marque a autorização de envio e execute OCR. Aqui o arquivo é enviado ao provedor, que cobra na sua conta; não há débito de créditos DeepSFetch. Confira pages[].markdown e usage. Tokens/documentos não são persistidos por esse conector; ele não repete automaticamente após falha.

- [/app/data-tools](https://deepsfetch.com/app/data-tools?lang=pt-BR)

## Continue a integração

- [Conectores sociais, planilhas e destinos](https://deepsfetch.com/docs/connectors?lang=pt-BR)
- [Coleções com atualização automática](https://deepsfetch.com/docs/collections?lang=pt-BR)
