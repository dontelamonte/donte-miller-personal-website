import test from 'node:test';
import assert from 'node:assert/strict';
import {cameraAt,moveHouse,HOUSE_SCROLL_DISTANCE,followProgress,TABLE_CAMERA} from '../dist/house-path.js';

test('journey ends at the lower table camera without changing the reading sequence',()=>{
 assert.deepEqual(cameraAt(1,16/9),{...TABLE_CAMERA,room:'table'});assert.ok(TABLE_CAMERA.position[1]<8);
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

test('camera position and gaze velocities are continuous at all interior joins',()=>{
 const epsilon=.000001;
 for(const aspect of [.6,16/9])for(const p of [.19,.37,.57,.76])for(const field of ['position','target']){
  const a=cameraAt(p-epsilon,aspect)[field],b=cameraAt(p,aspect)[field],c=cameraAt(p+epsilon,aspect)[field];
  for(let j=0;j<3;j++)assert.ok(Math.abs((b[j]-a[j])/epsilon-(c[j]-b[j])/epsilon)<.02);
 }
});
test('lens stays fixed during the entire house journey',()=>{
 for(let p=0;p<=1;p+=.001)assert.equal(cameraAt(p).fov,46);
});
test('scroll following retains momentum when more input arrives',()=>{
 let p=0,v=0;for(let i=0;i<12;i++){const n=followProgress(p,.3,v,1/60);p=n.position;v=n.velocity;}
 assert.ok(v>0);const next=followProgress(p,.6,v,1/60);assert.ok(next.position>p);assert.ok(next.velocity>=v*.9);
});
test('scroll follow-through converges without overshoot and reverses smoothly',()=>{
 let p=0,v=0;for(let i=0;i<240;i++){const n=followProgress(p,1,v,1/60);assert.ok(n.position>=p&&n.position<=1);p=n.position;v=n.velocity;}
 assert.equal(p,1);assert.equal(v,0);
 for(let i=0;i<240;i++){const n=followProgress(p,0,v,1/60);assert.ok(n.position<=p&&n.position>=0);p=n.position;v=n.velocity;}
 assert.equal(p,0);assert.equal(v,0);
});
