import test from 'node:test';
import assert from 'node:assert/strict';
import {navigationViews} from '../dist/navigation-route.js';

const rooms=['living','table','workshop','library'];
test('every room tab has a connected travel route in either direction',()=>{
 for(const from of rooms)for(const to of rooms)if(from!==to){
  const views=navigationViews(from,to,16/9);
  assert.ok(views.length>=2,`${from} to ${to}`);
  assert.ok(views.every(v=>v.position.every(Number.isFinite)&&v.target.every(Number.isFinite)));
 }
});
test('Home to Library and back pass the table at walking height',()=>{
 for(const [from,to] of [['living','library'],['library','living']]){
  const views=navigationViews(from,to,16/9);
  assert.ok(views.some(v=>v.room==='dining'));
  assert.ok(views.every(v=>v.position[1]<6),`${from} to ${to} rose into the overhead table view`);
  assert.ok(views.some(v=>v.room==='workshop'));
 }
});
test('Table travel uses its overhead pose only at the selected endpoint',()=>{
 for(const other of ['living','workshop','library']){
  const outward=navigationViews('table',other,16/9);
  const returnTrip=navigationViews(other,'table',16/9);
  assert.ok(outward[0].position[1]>7);
  assert.ok(returnTrip.at(-1).position[1]>7);
  assert.ok(outward.slice(1).every(v=>v.position[1]<6));
 }
});
