import test from 'node:test';
import assert from 'node:assert/strict';
import {advanceAbout,storyFrame,ABOUT_CHAPTER_DISTANCE as D} from '../dist/about-story.js';

test('the entire story consumes scroll before room travel receives overflow',()=>{
 let offset=0,overflow=0;
 for(let i=0;i<1499;i++){const next=advanceAbout(offset,2,5*D);offset=next.offset;overflow+=next.overflow;}
 assert.equal(offset,2998);assert.equal(overflow,0);
 const end=advanceAbout(offset,102,5*D);assert.equal(end.offset,3000);assert.equal(end.overflow,100);
});
test('reverse scrolling reads earlier text without moving beyond the welcome',()=>{
 assert.deepEqual(advanceAbout(3*D,-D,5*D),{offset:2*D,overflow:0});
 assert.deepEqual(advanceAbout(100,-200,5*D),{offset:0,overflow:0});
});
test('the passage advances continuously and reaches its end before room travel',()=>{
 const total=5*D;
 assert.deepEqual(storyFrame(0,total),{welcome:true,progress:0});
 assert.deepEqual(storyFrame(D,total),{welcome:false,progress:0});
 assert.equal(storyFrame(2*D,total).progress,.25);
 assert.equal(storyFrame(3*D,total).progress,.5);
 assert.equal(storyFrame(total,total).progress,1);
});
