import test from 'node:test';
import assert from 'node:assert/strict';
import {advanceLibraryScroll,libraryBookReady,LIBRARY_BOOK_THRESHOLD} from '../dist/library-scroll.js';
import {LIBRARY_SCROLL_DISTANCE} from '../dist/library-path.js';

test('continuous small deltas carry through camera arrival into the first book',()=>{
 let target=0,pending=0;
 for(let i=0;i<(LIBRARY_SCROLL_DISTANCE+LIBRARY_BOOK_THRESHOLD)/2;i++){
  ({target,pending}=advanceLibraryScroll(target,pending,2));
 }
 assert.equal(target,1);
 assert.ok(pending>=LIBRARY_BOOK_THRESHOLD-0.001);
 assert.equal(libraryBookReady(target,.9,pending),false);
 assert.equal(libraryBookReady(target,.995,pending),true);
});

test('one long gesture preserves overflow instead of losing it at the shelf',()=>{
 const result=advanceLibraryScroll(.9,0,410);
 assert.equal(result.target,1);
 assert.ok(result.pending>=160);
});

test('reverse scrolling clears pending book movement',()=>{
 assert.deepEqual(advanceLibraryScroll(1,150,-30),{target:.988,pending:0});
 assert.equal(libraryBookReady(1,1,159),false);
});
