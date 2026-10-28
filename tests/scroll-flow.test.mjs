import test from 'node:test';
import assert from 'node:assert/strict';
import {ScrollFlow} from '../dist/scroll-flow.js';

test('uninterrupted small trackpad deltas advance without a pause or large event',()=>{
  const flow=new ScrollFlow();flow.reset(0);
  let top=950,action=null;
  for(let now=500;now<1700&&!action;now+=10) {
    const next=flow.move({delta:2,top,max:1000,now});top=next.top;action=next.action;
  }
  assert.equal(top,1000);assert.equal(action,'next');
});
test('a long gesture consumes the remaining content and its overflow can advance',()=>{
  const flow=new ScrollFlow();flow.reset(0);
  assert.deepEqual(flow.move({delta:1000,top:0,max:700,now:500}),{top:700,action:'next'});
});
test('reaching the last line alone does not advance; more downward movement does',()=>{
  const flow=new ScrollFlow();flow.reset(0);
  assert.deepEqual(flow.move({delta:100,top:900,max:1000,now:500}),{top:1000,action:null});
  assert.equal(flow.move({delta:80,top:1000,max:1000,now:510}).action,null);
  assert.equal(flow.move({delta:80,top:1000,max:1000,now:520}).action,'next');
});
test('scrolling upward reads content first and then returns to the table',()=>{
  const flow=new ScrollFlow();flow.reset(0);
  assert.deepEqual(flow.move({delta:-200,top:200,max:1000,now:500}),{top:0,action:null});
  assert.equal(flow.move({delta:-100,top:0,max:1000,now:510}).action,'table');
});
test('new publications discard old overflow and have a short reveal guard',()=>{
  const flow=new ScrollFlow();flow.reset(0);
  flow.move({delta:150,top:1000,max:1000,now:500});
  flow.reset(510);
  assert.equal(flow.move({delta:1000,top:0,max:2000,now:520}).action,null);
  assert.equal(flow.move({delta:100,top:2000,max:2000,now:1000}).action,null);
  assert.equal(flow.move({delta:60,top:2000,max:2000,now:1010}).action,'next');
});
test('reversing into content clears pending forward movement',()=>{
  const flow=new ScrollFlow();flow.reset(0);
  flow.move({delta:150,top:1000,max:1000,now:500});
  flow.move({delta:-50,top:1000,max:1000,now:510});
  assert.equal(flow.move({delta:60,top:950,max:1000,now:520}).action,null);
});
