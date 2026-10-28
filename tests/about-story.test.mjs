import test from 'node:test';
import assert from 'node:assert/strict';
import {advanceAbout,storyFrame,ABOUT_CHAPTER_DISTANCE as D} from '../dist/about-story.js';

test('the entire story consumes scroll before room travel receives overflow',()=>{
 let offset=0,overflow=0;
 for(let i=0;i<1499;i++){const next=advanceAbout(offset,2,5*D);offset=next.offset;overflow+=next.overflow;}
 assert.equal(offset,2998);assert.equal(overflow,0);
 const end=advanceAbout(offset,102,5*D);assert.equal(end.offset,3000);assert.equal(end.overflow,100);
});
test('reverse scrolling reads earlier chapters without moving beyond the welcome',()=>{
 assert.deepEqual(advanceAbout(3*D,-D,5*D),{offset:2*D,overflow:0});
 assert.deepEqual(advanceAbout(100,-200,5*D),{offset:0,overflow:0});
});
test('all five story chapters are legible at their centers and the final paragraph holds',()=>{
 for(let i=0;i<5;i++){const frame=storyFrame((i+.5)*D,5);assert.equal(frame.index,i);assert.equal(frame.opacity,1);assert.equal(frame.lift,0);}
 assert.equal(storyFrame(5*D,5).index,4);assert.equal(storyFrame(5*D,5).opacity,1);
});
