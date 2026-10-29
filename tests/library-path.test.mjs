import test from 'node:test';
import assert from 'node:assert/strict';
import {libraryCameraAt,moveLibrary,LIBRARY_CAMERA,LIBRARY_SCROLL_DISTANCE} from '../dist/library-path.js';
import {houseShellFrontZ} from '../dist/house-path.js';

test('the library route starts at the table and ends facing the shelves',()=>{
 const start=libraryCameraAt(0),end=libraryCameraAt(1);
 assert.deepEqual(start.position,[-1.3,7.8,6]);
 assert.deepEqual(end.position,LIBRARY_CAMERA.position);
 assert.deepEqual(end.target,LIBRARY_CAMERA.target);
 assert.equal(end.room,'library');
});

test('the route passes through the dining room doorway at standing eye level',()=>{
 const samples=Array.from({length:201},(_,i)=>libraryCameraAt(i/200));
 const opening=samples.find(s=>s.position[0]>=7.6);
 assert.ok(opening.position[1]>2.5&&opening.position[1]<6.2);
 assert.ok(opening.position[2]>1.1&&opening.position[2]<5.5);
 for(let i=1;i<samples.length;i++){
  const step=Math.hypot(...samples[i].position.map((v,j)=>v-samples[i-1].position[j]));
  assert.ok(step<.25,`camera jump at ${i/200}: ${step}`);
 }
});

test('library progress is reversible, clamped, and fits narrower viewports',()=>{
 assert.equal(moveLibrary(0,LIBRARY_SCROLL_DISTANCE),1);
 assert.equal(moveLibrary(1,-LIBRARY_SCROLL_DISTANCE),0);
 assert.equal(moveLibrary(0,-100),0);
 assert.equal(moveLibrary(1,100),1);
 assert.ok(libraryCameraAt(1,.9).position[2]>libraryCameraAt(1,16/9).position[2]);
});

test('camera and gaze velocity stay continuous through each library turn',()=>{
 const epsilon=.000001;
 for(const aspect of [.6,16/9])for(const p of [.22,.48,.68,.85])for(const field of ['position','target']){
  const a=libraryCameraAt(p-epsilon,aspect)[field],b=libraryCameraAt(p,aspect)[field],c=libraryCameraAt(p+epsilon,aspect)[field];
  for(let j=0;j<3;j++)assert.ok(Math.abs((b[j]-a[j])/epsilon-(c[j]-b[j])/epsilon)<.03,`${field} axis ${j} at ${p}`);
 }
});

test('the approach to the workshop keeps facing the blue wall without a reverse turn',()=>{
 for(let i=48;i<=76;i++){
  const view=libraryCameraAt(i/100),direction=view.target.map((v,j)=>v-view.position[j]);
  assert.ok(direction[0]>0,`camera stops facing the workshop at ${i/100}`);
  assert.ok(Math.abs(direction[2]/direction[0])<.08,`camera yaws away from the wall at ${i/100}`);
 }
});
test('the Table to Library camera rail remains inside the dining and east-room shells',()=>{
 for(const aspect of [.45,.6,1,16/9,2])for(let p=0;p<=1;p+=.001){
  const [x,y,z]=libraryCameraAt(p,aspect).position;
  assert.ok(x>-7.6&&x<23.1,`camera escaped a side wall at ${p} / ${aspect}`);
  assert.ok(y>-.5&&y<8.46,`camera escaped floor or ceiling at ${p} / ${aspect}`);
  assert.ok(z>-6&&z<houseShellFrontZ(aspect)-.35,`camera escaped a front/back wall at ${p} / ${aspect}`);
 }
});
