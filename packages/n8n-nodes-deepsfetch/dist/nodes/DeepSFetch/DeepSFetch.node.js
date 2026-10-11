'use strict';
const {NodeOperationError}=require('n8n-workflow');
class DeepSFetch {
 constructor(){this.description={displayName:'DeepSFetch',name:'deepSFetch',icon:'file:deepsfetch.svg',group:['transform'],version:1,subtitle:'={{$parameter["operation"]}}',description:'Collect web data with credit caps and validated fields',defaults:{name:'DeepSFetch'},inputs:['main'],outputs:['main'],credentials:[{name:'deepSFetchApi',required:true}],properties:[
  {displayName:'Operation',name:'operation',type:'options',noDataExpression:true,options:[{name:'Start Collection',value:'start',action:'Start a collection'},{name:'Get Result',value:'result',action:'Get a collection result'},{name:'Estimate Credits',value:'estimate',action:'Estimate collection credits'}],default:'start'},
  {displayName:'Language / Idioma',name:'language',type:'options',options:[{name:'English',value:'en'},{name:'Português',value:'pt-BR'}],default:'en'},
  {displayName:'Payload JSON',name:'payload',type:'json',default:'={{ JSON.stringify($json) }}',required:true,description:'Import a configured workflow from DeepSFetch guided setup. Keep the same job ID when polling and idempotency key when retrying.'}
 ]};}
 async execute(){
  const items=this.getInputData(),out=[];
  for(let i=0;i<items.length;i++){
   const pt=this.getNodeParameter('language',i,'en')==='pt-BR',operation=this.getNodeParameter('operation',i),t=(p,e)=>pt?p:e;
   try{
    if(!['start','result','estimate'].includes(operation))throw Error('invalid_operation');
    let body=this.getNodeParameter('payload',i);if(typeof body==='string')try{body=JSON.parse(body);}catch{throw Error('invalid_payload');}
    if(!body||Array.isArray(body)||typeof body!=='object')throw Error('invalid_payload');
    if(operation==='start'&&!body.idempotencyKey)body={...body,idempotencyKey:'n8n-'+this.getExecutionId()+'-'+i};
    // Fixed origin prevents accidentally forwarding a credential to a user-supplied URL.
    const response=await this.helpers.httpRequestWithAuthentication.call(this,'deepSFetchApi',{method:'POST',url:'https://deepsfetch.com/integration/n8n/'+operation,body,json:true,timeout:30000});
    out.push({json:response,pairedItem:{item:i}});
   }catch(e){
    const detail=e.response?.body||e.response?.data||e.context?.data;let data=detail;if(typeof data==='string')try{data=JSON.parse(data);}catch{}
    const code=data?.error||e.message||'operation_failed',messages={invalid_payload:t('JSON inválido. Importe o fluxo pela experiência guiada.','Invalid JSON. Import a workflow from guided setup.'),invalid_api_key:t('Chave inválida ou revogada. Confira a credencial DeepSFetch API.','Invalid or revoked key. Check the DeepSFetch API credential.'),monthly_limit_exceeded:t('Limite mensal atingido. Confira Controle de custos.','Monthly cap reached. Check Cost controls.'),task_limit_exceeded:t('Limite da coleta insuficiente. Confira a estimativa.','Collection cap is too low. Check the estimate.'),invalid_fields:t('Confira os campos e seletores na experiência guiada.','Check fields and selectors in guided setup.')};
    const message=messages[code]||t('Falha na consulta DeepSFetch. Confira o ID da tarefa antes de enviar outra coleta.','DeepSFetch request failed. Check the job ID before submitting a new collection.');
    if(this.continueOnFail())out.push({json:{error:message,code:typeof code==='string'&&/^[a-z_]+$/.test(code)?code:'request_failed'},pairedItem:{item:i}});
    else throw new NodeOperationError(this.getNode(),message,{itemIndex:i,description:typeof code==='string'&&/^[a-z_]+$/.test(code)?code:'request_failed'});
   }
  }
  return [out];
 }
}
module.exports={DeepSFetch};
