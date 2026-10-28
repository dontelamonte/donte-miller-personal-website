import test from 'node:test';
import assert from 'node:assert/strict';
import {libraryCameraAt,moveLibrary,LIBRARY_CAMERA,LIBRARY_SCROLL_DISTANCE} from '../dist/library-path.js';

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
