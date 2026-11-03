import test from 'node:test';
import assert from 'node:assert/strict';
import {connectSceneTouch} from '../dist/scene-touch.js';

class Surface extends EventTarget{
 blocked=false;
 closest(){return this.blocked?{}:null;}
}
function setup(){
 const target=new Surface(),moves=[],state={mode:'exploring',scale:1,releases:0};
 const controller=connectSceneTouch(target,{isExploring:()=>state.mode==='exploring',getScale:()=>state.scale,advance:delta=>moves.push(delta),release:()=>state.releases++});
 const send=(type,ys=[],x=0)=>{
  const event=new Event(type,{cancelable:true});
  Object.defineProperty(event,'touches',{value:ys.map(clientY=>({clientY,clientX:x}))});
  target.dispatchEvent(event);return event;
 };
 return {target,moves,state,controller,send};
}

test('one-finger house swipes advance the tour and cancel native page panning',()=>{
 const {send,moves,controller}=setup();
 send('touchstart',[300]);assert.equal(controller.active,true);
 assert.equal(send('touchmove',[280]).defaultPrevented,true);
 assert.equal(send('touchmove',[250]).defaultPrevented,true);
 assert.deepEqual(moves,[40,60]);
});

test('reader and recognition-panel gestures keep their own scrolling',()=>{
 for(const mode of ['reading','model-reading','course-reading','living-detail']){
  const {send,state,moves,controller}=setup();state.mode=mode;
  send('touchstart',[300]);assert.equal(send('touchmove',[250]).defaultPrevented,false);
  assert.deepEqual(moves,[]);assert.equal(controller.active,false);
 }
});

test('touches in reader shells or navigation are not taken over while exploring',()=>{
 const {send,target,moves,controller}=setup();target.blocked=true;
 send('touchstart',[300]);assert.equal(send('touchmove',[250]).defaultPrevented,false);
 assert.deepEqual(moves,[]);assert.equal(controller.active,false);
});

test('pinching releases the house gesture and remains available to the browser',()=>{
 const {send,moves,controller}=setup();send('touchstart',[300]);
 assert.equal(send('touchmove',[280,320]).defaultPrevented,false);
 assert.equal(controller.active,false);
 assert.equal(send('touchmove',[260]).defaultPrevented,false);
 assert.deepEqual(moves,[]);
});

test('one-finger panning while zoomed does not move the house or cancel browser panning',()=>{
 const {send,state,moves}=setup();state.scale=2;
 send('touchstart',[300]);assert.equal(send('touchmove',[250]).defaultPrevented,false);
 assert.deepEqual(moves,[]);
});

test('horizontal browser gestures are not consumed by the vertical house controller',()=>{
 const {send,moves,controller}=setup();send('touchstart',[300],0);
 assert.equal(send('touchmove',[298],30).defaultPrevented,false);
 assert.equal(controller.active,false);assert.deepEqual(moves,[]);
});

test('ending or cancelling a swipe releases the existing held-touch gate',()=>{
 for(const type of ['touchend','touchcancel']){
  const {send,state,controller}=setup();send('touchstart',[300]);send(type);
  assert.equal(controller.active,false);assert.equal(state.releases,1);
 }
});

test('opening a reader during a swipe stops background gesture consumption',()=>{
 const {send,state,moves}=setup();send('touchstart',[300]);state.mode='opening';
 assert.equal(send('touchmove',[250]).defaultPrevented,false);assert.deepEqual(moves,[]);
});
