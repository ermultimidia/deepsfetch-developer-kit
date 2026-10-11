import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {compare,metrics,cases,deepScrape,fireScrape} from '../examples/compare.mjs';
const temporary=()=>path.join(fs.mkdtempSync(path.join(os.tmpdir(),'deepsfetch-compare-')),'report.json');
test('coverage distinguishes empty, partial, and complete content',()=>{
 assert.equal(metrics('',cases[0].markers).matchedMarkers,0);
 const m=metrics('albert einstein — Marilyn Monroe',cases[0].markers);
 assert.equal(m.matchedMarkers,2);assert(m.markdownBytes>m.markdownCharacters);
 assert.equal(metrics(cases[0].markers.join('\n'),cases[0].markers).matchedMarkers,3);
});
test('both rounds retain failures and alternate provider order without retries',async()=>{
 const calls=[],output=temporary();
 const r=await compare({deepKey:'offline',fireKey:'offline',output,runner:async(provider,item,round)=>{
  calls.push({provider,case:item.id,round});
  if(provider==='deepsfetch'&&item.id==='quotes-javascript')throw Error('render failed');
  return {markdown:item.markers.join('\n'),reportedCredits:1};
 }});
 assert.equal(calls.length,20);assert.equal(r.rows.filter(x=>x.status==='error').length,2);
 assert.deepEqual(calls.slice(0,2).map(x=>x.provider),['deepsfetch','firecrawl']);
 assert.deepEqual(calls.slice(10,12).map(x=>x.provider),['firecrawl','deepsfetch']);
 assert.equal(r.conditions.fireAuthentication,'API key');assert.equal(r.conditions.deepMainContentSelection,false);
 assert.equal(JSON.parse(fs.readFileSync(output)).rows.length,20);
 await assert.rejects(()=>compare({deepKey:'offline',output,runner:async()=>{throw Error('Must not call');}}),/already exists/);
});
test('authentication failure stops spending and cannot be counted as collection quality',async()=>{
 let n=0;const r=await compare({deepKey:'offline',output:temporary(),runner:async(provider)=>{
  n++;if(provider==='firecrawl')throw Object.assign(Error('Invalid token'),{httpStatus:401});
  return {markdown:'content',reportedCredits:1};
 }});
 assert.equal(n,2);assert(r.abortedReason);assert.equal(r.rows[1].httpStatus,401);
});
test('requests use fresh Markdown, bounded DeepSFetch credits, and separate credentials',async()=>{
 const original=globalThis.fetch,calls=[];
 globalThis.fetch=async(url,options)=>{
  calls.push({url,options});return Response.json(url.includes('firecrawl')
   ?{success:true,data:{markdown:'Fire content',metadata:{creditsUsed:1,statusCode:200}}}
   :{id:'job_mock',status:'completed',result:{markdown:'Deep content',engine:{mode:'basic'},billing:{credits:1}}});
 };
 try{
  await deepScrape(cases[0].url,{key:'deep-offline'});await fireScrape(cases[0].url,{key:'fire-offline'});
  const deep=JSON.parse(calls[0].options.body),fire=JSON.parse(calls[1].options.body);
  assert.equal(deep.costControl.maxCredits,1);assert.equal(deep.costControl.allowFallback,false);
  assert.equal(deep.collectionEngine,'auto');assert.equal(fire.maxAge,0);
  assert.equal(calls[0].options.headers.authorization,'Bearer deep-offline');
  assert.equal(calls[1].options.headers.authorization,'Bearer fire-offline');
  assert.deepEqual(deep.formats,['markdown']);assert.deepEqual(fire.formats,['markdown']);
 }finally{globalThis.fetch=original;}
});
