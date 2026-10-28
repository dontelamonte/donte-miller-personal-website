import test from 'node:test';
import assert from 'node:assert/strict';
import {cameraAt,moveHouse,HOUSE_SCROLL_DISTANCE} from '../dist/house-path.js';

test('journey terminates at the approved desktop table camera',()=>{
 assert.deepEqual(cameraAt(1,16/9),{position:[-1.3,9.8,6.8],target:[-1.3,0,0],fov:40,room:'table'});
});
test('camera crosses the dividing wall inside the arch opening',()=>{
 for(let p=0;p<=1;p+=.001){const {position:[x,y,z]}=cameraAt(p,16/9);if(x> -7.85&&x< -7.15){assert.ok(z>1.5&&z<5.1);assert.ok(y>1.5&&y<4.9);}}
});
test('opening camera fits the focused phone view or both desktop plaque columns',()=>{
 for(const aspect of [.5,.65,.95,16/9]){const {position,target,fov}=cameraAt(0,aspect);const distance=position[2]-target[2];const width=2*distance*Math.tan(fov*Math.PI/360)*aspect;assert.ok(width>=(aspect<.85?8.49:13.59));}
});
test('all camera samples remain finite, keep a look direction and do not enter the couch',()=>{
 for(let p=0;p<=1;p+=.001){const {position,target,fov}=cameraAt(p,.6);assert.ok([...position,...target,fov].every(Number.isFinite));assert.ok(Math.hypot(...position.map((x,i)=>x-target[i]))>1);if(position[0]< -8)assert.ok(position[2]>1.5);}
});
test('travel reverses and bounds overflow separately from the room',()=>{
 assert.equal(moveHouse(0,HOUSE_SCROLL_DISTANCE/2).progress,.5);
 assert.equal(moveHouse(.5,-HOUSE_SCROLL_DISTANCE/4).progress,.25);
 assert.equal(moveHouse(0,-1000).progress,0);
 const last=moveHouse(.9,HOUSE_SCROLL_DISTANCE*.2);assert.equal(last.progress,1);assert.ok(Math.abs(last.overflow-HOUSE_SCROLL_DISTANCE*.1)<.00001);
});
