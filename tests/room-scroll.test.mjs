import test from 'node:test';
import assert from 'node:assert/strict';
import {roomScrollDestination as destination,RoomGestureGate} from '../dist/room-scroll.js';
const base={houseTarget:1,libraryTarget:0,aboutOffset:1000,scrollAmount:0,scrollTarget:'press',modelSequenceComplete:false};
const go=(s,d)=>destination({...base,...s},d,1000,.76);
test('one small or large input completes every room boundary in either direction',()=>{
 for(const amount of [.1,2,60,800]){
  assert.equal(go({houseTarget:0},amount),'table');
  assert.equal(go({},-amount),'living');
  assert.equal(go({scrollTarget:'library'},amount),'workshop');
  assert.equal(go({libraryTarget:.76},-amount),'table');
  assert.equal(go({libraryTarget:.76,modelSequenceComplete:true},amount),'library');
  assert.equal(go({libraryTarget:1},-amount),'workshop');
 }
});
test('reading prompts do not skip stories, publications, models, or curricula',()=>{
 assert.equal(go({houseTarget:0,aboutOffset:999},100),null);
 assert.equal(go({},100),null);
 assert.equal(go({libraryTarget:.76},100),null);
 assert.equal(go({libraryTarget:1},100),null);
 for(const d of [0,NaN,Infinity])assert.equal(go({scrollTarget:'library'},d),null);
});
test('wheel momentum cannot chain rooms after landing, fresh gesture can',()=>{
 const gate=new RoomGestureGate();assert.equal(gate.accept(1,0,false),true);gate.lock();
 for(let t=10;t<=1100;t+=10)assert.equal(gate.accept(2,t,t<1000),false);
 assert.equal(gate.accept(1,1300,false),true);
});
test('held swipe cannot chain rooms; a new swipe can',()=>{
 const gate=new RoomGestureGate();gate.lock();
 assert.equal(gate.accept(2,5000,false,true),false);
 gate.releaseTouch();assert.equal(gate.accept(2,5010,false,true),true);
});
