# Read PDF, DOCX, XLSX and text files

Extract text locally and recognize when OCR is needed.

## 1. Open the local reader

Choose Parse a file in Playground. Select one file at a time: PDF, DOCX, XLSX, TXT, Markdown, JSON, CSV or HTML/HTM. Limit 5 MiB. This reader processes in the browser without content upload or DeepSFetch credits.

- [/app/playground?tool=parse](https://deepsfetch.com/app/playground?tool=parse)


## 2. Review format-specific output

PDF requires selectable text and up to 50 pages. DOCX extracts text; XLSX reads existing values without recalculating formulas, up to 100,000 cells. JSON must be valid; CSV needs valid fields/quotes. HTML is converted to text. Layout, images, styling and formulas are not preserved as in an editor.


## 3. Copy and download

Review counts, samples and text order. Use Copy text or Download text before leaving. Session history stores name/status/count by workspace; reopening content requires selecting the file again. This is not Collection document storage.


## Limits and failures

DOCX/XLSX: up to 20 MiB expanded and 1,000 internal entries. file_too_large: split the file; pdf_no_text: use OCR; invalid_document: check corruption/protection; too_many_cells/pages: reduce the document. Current public contract has no /v2/parse.


## Optional Mistral OCR

In Documents and connectors select PDF, enter your Mistral key and 1–5 initial pages. Confirm transfer consent and run OCR. This sends the file to the provider, which bills your account; no DeepSFetch credits are deducted. Inspect pages[].markdown and usage. This connector does not persist tokens/documents or automatically retry failures.

- [/app/data-tools](https://deepsfetch.com/app/data-tools)

## Continue your integration

- [Social connectors, spreadsheets and destinations](https://deepsfetch.com/docs/connectors)
- [Automatically updated collections](https://deepsfetch.com/docs/collections)
