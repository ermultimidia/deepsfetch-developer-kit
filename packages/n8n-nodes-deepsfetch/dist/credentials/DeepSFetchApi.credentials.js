'use strict';
class DeepSFetchApi {
 constructor(){
  this.name='deepSFetchApi';this.displayName='DeepSFetch API';this.documentationUrl='https://deepsfetch.com/docs/n8n';
  this.properties=[{displayName:'API Key',name:'apiKey',type:'string',typeOptions:{password:true},default:'',required:true}];
  this.authenticate={type:'generic',properties:{headers:{Authorization:'=Bearer {{$credentials.apiKey}}'}}};
  this.test={request:{baseURL:'https://deepsfetch.com',url:'/integration/n8n/connection',method:'GET'}};
 }
}
module.exports={DeepSFetchApi};
