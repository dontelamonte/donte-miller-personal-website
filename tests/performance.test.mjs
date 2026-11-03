import test from 'node:test';
import assert from 'node:assert/strict';
import {renderingProfile,lazyAssetBatch} from '../dist/performance.js';

test('high-density phones reduce pixels and shadow memory without changing CSS dimensions',()=>{
 const phone=renderingProfile({width:390,pixelRatio:3});
 assert.equal(phone.pixelRatio,1.25);
 assert.equal(phone.shadowSize,1024);
 assert.equal(phone.mobile,true);
 assert.equal(renderingProfile({width:1440,coarse:true,pixelRatio:2}).mobile,true);
});

test('desktop quality and ordinary-density screens keep their existing resolution',()=>{
 const desktop=renderingProfile({width:1440,pixelRatio:2});
 assert.equal(desktop.pixelRatio,1.6);assert.equal(desktop.shadowSize,2048);
 assert.equal(renderingProfile({width:390,pixelRatio:1}).pixelRatio,1);
});

test('optional assets wait for entry, share concurrent requests and remain cached after success',async()=>{
 let requests=0,finish;
 const enter=lazyAssetBatch([()=>{requests++;return new Promise(resolve=>{finish=resolve;});}]);
 assert.equal(requests,0);
 const a=enter(),b=enter();assert.equal(a,b);
 await Promise.resolve();assert.equal(requests,1);
 finish();await a;await enter();assert.equal(requests,1);
});

test('one failed room image does not block other artwork and a later entry can retry',async()=>{
 let attempts=0;
 const enter=lazyAssetBatch([()=>{if(++attempts===1)throw new Error('offline');return 'restored';},()=> 'available']);
 const first=await enter();
 assert.equal(first[0].status,'rejected');assert.equal(first[1].value,'available');
 const retry=await enter();assert.equal(retry[0].value,'restored');
 await enter();assert.equal(attempts,2);
});
