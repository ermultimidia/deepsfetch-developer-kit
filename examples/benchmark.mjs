import {collect} from './scrape.mjs';

// Operational smoke test: completion and artifact metadata, not content quality.
const urls=process.argv.slice(2);
if(!urls.length)urls.push('https://example.com','https://deepsfetch.com/docs','https://deepsfetch.com/docs/mcp');
if(urls.length>10)throw Error('Use at most 10 URLs. Each collection has a three-credit cap.');
const rows=[];
for(const url of urls){
 const start=Date.now();
 try{
  const job=await collect(url,{maxWaitMs:180000});
  const data=job.result?.result;
  rows.push({url,status:job.status,elapsedMs:Date.now()-start,markdownReference:typeof data?.markdownArtifactKey==='string',titlePresent:typeof data?.title==='string',maxCredits:3});
 }catch(error){rows.push({url,status:'error',elapsedMs:Date.now()-start,error:error.message,maxCredits:3});process.exitCode=1;}
}
console.log(JSON.stringify({at:new Date().toISOString(),mode:'http_basic/fresh/no-fallback',measures:'completion and artifact metadata only',contentQualityMeasured:false,competitorComparison:false,rows},null,2));
