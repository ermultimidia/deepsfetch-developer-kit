# Webhooks: assinatura e entrega

Receba notificações de término e consulte o resultado pela API.

## Configurar na requisição

Inclua webhook ao criar a operação assíncrona. Use uma URL HTTPS pública aceita pela política do serviço e um segredo aleatório de pelo menos 16 caracteres. O destino precisa estar acessível; redirecionamentos não são seguidos. O segredo deve ser compartilhado somente com seu receptor.

```text
{
  "url": "https://example.com",
  "async": true,
  "formats": [
    "markdown"
  ],
  "webhook": {
    "url": "https://your-domain.example/deepsfetch-events",
    "secret": "REPLACE_WITH_RANDOM_SECRET_32_CHARS"
  }
}
```


## Eventos e conteúdo

A cadeia de entrega publica job.completed e job.failed. O corpo contém identificação e estado do job, não seu conteúdo coletado: consulte GET /v2/jobs/{id}. Não dependa de um evento de cancelamento. O campo metadata aceito na configuração não é incluído no payload de entrega atual; mantenha sua correlação pelo jobId. O JSON abaixo é ilustrativo.

```text
{
  "id": "evt_EXAMPLE",
  "type": "job.completed",
  "created": 1788825600,
  "data": {
    "jobId": "job_EXAMPLE",
    "kind": "scrape",
    "status": "completed"
  }
}
```


## Verificar a assinatura — Node.js

Leia x-deepsfetch-timestamp e x-deepsfetch-signature. A assinatura é v1= seguido do HMAC-SHA256 hexadecimal de timestamp + ponto + bytes exatos do corpo. Verifique antes de interpretar JSON. O exemplo aplica tolerância de 5 minutos como política do receptor; mantenha o relógio sincronizado. Depois de validar, grave o evento de forma durável e responda 2xx.

```text
import { createHmac, timingSafeEqual } from 'node:crypto';

// rawBody: Buffer containing the exact HTTP request bytes, before JSON parsing.
export function verifyWebhook(rawBody, timestamp, signature, secret, now = Date.now()) {
  if (!Buffer.isBuffer(rawBody) || !/^\d+$/.test(timestamp || '') ||
      !/^v1=[a-f0-9]{64}$/.test(signature || '')) return false;
  if (Math.abs(now / 1000 - Number(timestamp)) > 300) return false;
  const expected = createHmac('sha256', secret)
    .update(timestamp + '.').update(rawBody).digest();
  const received = Buffer.from(signature.slice(3), 'hex');
  return timingSafeEqual(expected, received);
}
```


## Falhas e recuperação

A implementação registra a falha de entrega, mas não oferece reenvio automático nessa cadeia de webhooks. Mantenha consulta periódica dos jobs como recuperação. Deduplicate pelo ID do evento e torne a aplicação do estado idempotente por jobId. Rejeite assinaturas inválidas. Uma notificação perdida não significa que a coleta falhou. A repetição automática da outbox Supabase é um mecanismo separado.


## Passo a passo: receptor e recuperação

Use a assinatura do corpo original e mantenha consulta de jobs como recuperação.

1. Prepare um receptor HTTPS público. Guarde um segredo aleatório e leia o corpo em bytes antes de qualquer parser JSON.
2. Adicione webhook.url e webhook.secret à operação assíncrona. Salve jobId/idempotência no seu sistema.
3. No receptor, verifique timestamp e HMAC com comparação segura. Rejeite assinatura inválida ou expirada conforme sua política.
4. Grave event.id/jobId de forma durável, deduplique e responda 2xx. Consulte o job autenticado para obter o conteúdo.
5. Se o evento não chegar, consulte o job salvo; a cadeia V2 atual não repete automaticamente. Os alertas product.changed e a outbox Supabase são cadeias separadas com outras regras.

## Continue a integração

- [Jobs: acompanhar, retomar e cancelar](https://deepsfetch.com/docs/jobs?lang=pt-BR)
- [Respostas, artefatos e erros da API](https://deepsfetch.com/docs/api-results?lang=pt-BR)
- [Enviar coleções ao Supabase](https://deepsfetch.com/docs/supabase?lang=pt-BR)
