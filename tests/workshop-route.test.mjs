import test from 'node:test';
import assert from 'node:assert/strict';
import {advanceWorkshopRoute,WORKSHOP_STOP,WORKSHOP_STORY_DISTANCE} from '../dist/workshop-route.js';

test('one continuous stream pauses the camera for all three workshop beats before reaching the shelves',()=>{
 let target=0,offset=0;
 for(let i=0;i<950;i++)({target,offset}=advanceWorkshopRoute(target,offset,2));
 assert.equal(target,WORKSHOP_STOP);
 assert.ok(offset<.001);
 for(let i=0;i<WORKSHOP_STORY_DISTANCE/2;i++)({target,offset}=advanceWorkshopRoute(target,offset,2));
 assert.equal(target,WORKSHOP_STOP);
 assert.equal(offset,WORKSHOP_STORY_DISTANCE);
 ({target,offset}=advanceWorkshopRoute(target,offset,600));
 assert.equal(target,1);
});

test('reverse scroll visits the workshop before returning to the table',()=>{
 const first=advanceWorkshopRoute(1,WORKSHOP_STORY_DISTANCE,-600);
 assert.equal(first.target,WORKSHOP_STOP);
 assert.equal(first.offset,WORKSHOP_STORY_DISTANCE);
 const second=advanceWorkshopRoute(first.target,first.offset,-WORKSHOP_STORY_DISTANCE);
 assert.equal(second.target,WORKSHOP_STOP);
 assert.equal(second.offset,0);
 assert.ok(advanceWorkshopRoute(second.target,second.offset,-200).target<WORKSHOP_STOP);
});

test('excess movement beyond the shelf is retained for opening a curriculum',()=>{
 const next=advanceWorkshopRoute(WORKSHOP_STOP,WORKSHOP_STORY_DISTANCE,760);
 assert.equal(next.target,1);
 assert.equal(next.overflow,160);
});
