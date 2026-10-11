import fs from 'node:fs';
import path from 'node:path';
import {createHash,randomUUID} from 'node:crypto';
import {fileURLToPath} from 'node:url';

export const cases=[
 {id:'quotes-static',url:'https://quotes.toscrape.com/',markers:['Albert Einstein','Marilyn Monroe','Jane Austen']},
 {id:'quotes-javascript',url:'https://quotes.toscrape.com/js/',markers:['Albert Einstein','Marilyn Monroe','Jane Austen']},
 {id:'books',url:'https://books.toscrape.com/',markers:['A Light in the Attic','Tipping the Velvet','Soumission']},
 {id:'python-json',url:'https://docs.python.org/3/library/json.html',markers:['JSONDecodeError','json.dumps','json.loads']},
 {id:'mdn-map',url:'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map',markers:['Array.prototype.map()','callbackFn','thisArg']},
];
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
export function metrics(markdown,markers){
 const text=String(markdown||'');
 return {markdownPresent:text.length>0,markdownCharacters:text.length,markdownBytes:Buffer.byteLength(text),markdownSha256:createHash('sha256').update(text).digest('hex'),expectedMarkers:markers.length,matchedMarkers:markers.filter(x=>text.toLowerCase().includes(x.toLowerCase())).length};
}
async function json(response){
 let data;try{data=await response.json();}catch{throw Error('Non-JSON HTTP '+response.status);}
 if(!response.ok)throw Object.assign(Error('HTTP '+response.status+' '+String(data.code||data.error?.code||data.error||data.message||'').slice(0,160)),{httpStatus:response.status});
 return data;
}
export async function deepScrape(url,{key,idempotencyKey= randomUUID(),progress=()=>{}}={}){
 if(!key)throw Error('DEEPSFETCH_API_KEY is required');
 let job=await json(await fetch('https://api.deepsfetch.com/v2/scrape',{method:'POST',headers:{authorization:'Bearer '+key,'content-type':'application/json','idempotency-key':idempotencyKey},body:JSON.stringify({url,formats:['markdown'],collectionEngine:'auto',engineStrategy:'auto',onlyMainContent:true,async:true,costControl:{maxCredits:1,allowFallback:false,cacheMode:'fresh'}}),signal:AbortSignal.timeout(125000)}));
 if(!job.id)throw Error('Missing public job ID');progress({provider:'deepsfetch',jobId:job.id,idempotencyKey});
 const start=Date.now();
 while(!['completed','failed','cancelled'].includes(job.status)&&Date.now()-start<180000){await sleep(500);job=await json(await fetch('https://api.deepsfetch.com/v2/jobs/'+encodeURIComponent(job.id),{headers:{authorization:'Bearer '+key},signal:AbortSignal.timeout(30000)}));}
 if(job.status!=='completed')throw Error('Job '+job.status+' '+String(job.error?.code||job.error?.message||''));
 if(typeof job.result?.markdown!=='string')throw Error('No inline Markdown from collectionEngine=auto');
 return {markdown:job.result.markdown,jobId:job.id,reportedCredits:job.result.billing?.credits??null,upstreamStatus:job.result.status??job.result.statusCode??null,collectionStrategy:job.result.engine?.mode??null};
}
export async function fireScrape(url,{key}={}){
 const data=await json(await fetch('https://api.firecrawl.dev/v2/scrape',{method:'POST',headers:{'content-type':'application/json',...(key?{authorization:'Bearer '+key}:{})},body:JSON.stringify({url,formats:['markdown'],onlyMainContent:true,maxAge:0}),signal:AbortSignal.timeout(125000)}));
 if(data.success!==true||typeof data.data?.markdown!=='string')throw Error('Firecrawl returned no completed Markdown');
 return {markdown:data.data.markdown,jobId:data.data.metadata?.scrapeId??null,reportedCredits:data.data.metadata?.creditsUsed??null,upstreamStatus:data.data.metadata?.statusCode??null};
}
export async function compare({deepKey=process.env.DEEPSFETCH_API_KEY,fireKey=process.env.FIRECRAWL_API_KEY,rounds=2,output='comparison.json',progress=()=>{},runner}={}){
 if(!deepKey)throw Error('Configure DEEPSFETCH_API_KEY. Maximum DeepSFetch usage: 10 credits for the default sample.');
 if(![1,2].includes(rounds))throw Error('Use one or two rounds');
 if(fs.existsSync(output))throw Error('Output already exists: inspect or choose a new filename before spending more credits');
 const report={at:new Date().toISOString(),sample:cases,rounds,conditions:{format:'markdown',freshRequests:true,onlyMainContent:true,sequential:true,order:'Alternates which provider goes first in each round',deepEngine:'auto',deepMaximumCredits:cases.length*rounds,fireAuthentication:fireKey?'API key':'keyless free access',deepPollingMs:500},limits:['Small convenience sample; does not measure large-scale reliability or all website types.','Marker coverage measures three expected strings, not semantic accuracy or Markdown layout quality.','Latency includes API queueing, processing and DeepSFetch polling; provider environments are different.','Credit units are provider-specific and are not monetary prices. Keyless Firecrawl and free DeepSFetch workspace credits can have different limits.','No automatic retries or premium purchases. Failure timing is kept separate from completion timing.'],rows:[]};
 report.conditions.deepMainContentSelection=false;
 report.limits.push('onlyMainContent is requested from both APIs, but the current DeepSFetch automatic engine ignores that option and converts the full HTML. This is a known difference, not equivalent extraction behavior.');
 const save=()=>{fs.mkdirSync(path.dirname(path.resolve(output)),{recursive:true});fs.writeFileSync(output,JSON.stringify(report,null,2)+'\n');};save();
 for(let round=0;round<rounds;round++)for(const item of cases)for(const provider of round%2?['firecrawl','deepsfetch']:['deepsfetch','firecrawl']){
  const start=Date.now();const row={round:round+1,case:item.id,provider,url:item.url};
  try{const result=runner?await runner(provider,item,round):provider==='deepsfetch'?await deepScrape(item.url,{key:deepKey,progress}):await fireScrape(item.url,{key:fireKey});Object.assign(row,{status:'completed',elapsedMs:Date.now()-start,...metrics(result.markdown,item.markers),reportedCredits:result.reportedCredits,upstreamStatus:result.upstreamStatus,jobId:result.jobId,collectionStrategy:result.collectionStrategy??null});}
  catch(e){Object.assign(row,{status:'error',elapsedMs:Date.now()-start,error:e.message,httpStatus:e.httpStatus??null});}
  report.rows.push(row);save();progress({provider,case:item.id,round:round+1,status:row.status,elapsedMs:row.elapsedMs,matchedMarkers:row.matchedMarkers});
  if(provider==='firecrawl'&&[401,402,403].includes(row.httpStatus)){report.abortedReason='Firecrawl account/authentication error: fix the credential or account before rerunning';report.finishedAt=new Date().toISOString();save();return report;}
 }
 report.finishedAt=new Date().toISOString();save();return report;
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const report=await compare({output:process.argv[2]||'comparison.json',progress:r=>console.error(JSON.stringify(r))});
 console.log(JSON.stringify({output:process.argv[2]||'comparison.json',attempts:report.rows.length,completed:report.rows.filter(r=>r.status==='completed').length}));
}
