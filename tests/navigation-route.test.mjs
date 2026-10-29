import test from 'node:test';
import assert from 'node:assert/strict';
import {navigationViews,blendViewDirections,navigationDirection} from '../dist/navigation-route.js';

const rooms=['living','table','workshop','library'];
test('every room tab has a connected travel route in either direction',()=>{
 for(const from of rooms)for(const to of rooms)if(from!==to){
  const views=navigationViews(from,to,16/9);
  assert.ok(views.length>=2,`${from} to ${to}`);
  assert.ok(views.every(v=>v.position.every(Number.isFinite)&&v.target.every(Number.isFinite)));
 }
});
test('Home to Library and back use one direct walking-height route through both doorways',()=>{
 const forward=navigationViews('living','library',16/9),back=navigationViews('library','living',16/9);
 assert.equal(forward.length,6);
 assert.deepEqual(back,forward.slice().reverse());
 assert.deepEqual(forward[1].position,[-10.1,3.3,3.3]);
 assert.deepEqual(forward[4].position,[9.8,3.3,3.3]);
 assert.ok(forward.every(v=>v.position[1]<6));
 assert.ok(!forward.some(v=>v.room==='workshop'||v.room==='table'));
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
test('reverse travel turns through a stable unit direction without a target-point swing',()=>{
 const starts=[[0,0,-1],[0,-.4,-.916],[1,0,0]],ends=[[0,0,1],[-1,0,0],[0,.2,-.98]];
 for(let pair=0;pair<starts.length;pair++)for(let step=0;step<=20;step++){
  const direction=blendViewDirections(starts[pair],ends[pair],step/20);
  assert.ok(direction.every(Number.isFinite));
  assert.ok(Math.abs(Math.hypot(...direction)-1)<1e-10);
 }
 const midpoint=blendViewDirections([0,0,-1],[0,0,1],.5);
 assert.ok(Math.abs(midpoint[1])<1e-12,'an about-face must not dip or rise');
});

import * as THREE from '../dist/vendor/three.module.min.js';
test('all twelve tab routes clear doorways without intermediate presentation poses',()=>{
 for(const aspect of [.45,1,16/9])for(const from of rooms)for(const to of rooms)if(from!==to){
  const views=navigationViews(from,to,aspect);
  const path=new THREE.CatmullRomCurve3(views.map(v=>new THREE.Vector3(...v.position)),false,'centripetal');
  for(let n=0;n<=500;n++){
   const p=path.getPointAt(n/500);
   for(const wall of [-7.5,7.6])if(Math.abs(p.x-wall)<.35){
    assert.ok(p.z>1.5&&p.z<5.1,`${from} to ${to}: doorway z ${p.z}`);
    assert.ok(p.y>2&&p.y<4.9,`${from} to ${to}: doorway y ${p.y}`);
   }
  }
 }
});
test('Table to Library leaves directly without backing away or visiting the desk',()=>{
 const views=navigationViews('table','library',16/9);
 assert.equal(views.length,4);
 assert.ok(views[1].position[0]>views[0].position[0]);
 assert.ok(views[1].position[2]<views[0].position[2]);
 assert.ok(!views.some(v=>v.room==='workshop'));
 assert.deepEqual(navigationViews('library','table',16/9),views.slice().reverse());
});
test('every tab flight has a level passage gaze and no pitch overshoot',()=>{
 for(const from of rooms)for(const to of rooms)if(from!==to){
  const views=navigationViews(from,to,16/9),first=views[0],last=views.at(-1);
  const dir=v=>v.target.map((x,i)=>x-v.position[i]);
  const start=dir(first),end=dir(last),sy=normalizeForTest(start)[1],ey=normalizeForTest(end)[1];
  for(let n=0;n<=200;n++){
   const d=navigationDirection(start,end,from,to,n/200);
   assert.ok(Math.abs(Math.hypot(...d)-1)<1e-10);
   assert.ok(d[1]>=Math.min(sy,ey,0)-1e-9&&d[1]<=Math.max(sy,ey,0)+1e-9);
  }
  if(!(from==='workshop'&&to==='table')&&![from,to].every(r=>r==='workshop'||r==='library'))assert.equal(navigationDirection(start,end,from,to,.5)[1],0);
 }
});
function normalizeForTest(v){const length=Math.hypot(...v);return v.map(x=>x/length);}

test('Table to Workshop turns right once and holds its desk heading',()=>{
 for(const aspect of [.45,1,16/9]){
  const views=navigationViews('table','workshop',aspect),direction=v=>v.target.map((x,i)=>x-v.position[i]);
  const start=direction(views[0]),end=direction(views.at(-1));
  let previousYaw=Math.atan2(start[0],start[2]);
  for(let i=0;i<=200;i++){
   const t=i/200,d=navigationDirection(start,end,'table','workshop',t),yaw=Math.atan2(d[0],d[2]);
   assert.ok(yaw<=previousYaw+1e-10,'right turn must not reverse');
   assert.ok(d[0]>=-1e-10,'must not face backward toward Home');
   if(t>=.38)d.forEach((value,j)=>assert.ok(Math.abs(value-normalizeForTest(end)[j])<1e-10));
   previousYaw=yaw;
  }
 }
});

test('Workshop to Table turns left continuously without an about-face',()=>{
 for(const aspect of [.45,1,16/9]){
  const views=navigationViews('workshop','table',aspect),dir=v=>v.target.map((x,i)=>x-v.position[i]);
  let last=Math.atan2(dir(views[0])[0],dir(views[0])[2]);
  for(let i=0;i<=300;i++){
   const d=navigationDirection(dir(views[0]),dir(views.at(-1)),'workshop','table',i/300);
   const yaw=Math.atan2(d[0],d[2]);
   assert.ok(yaw>=last-1e-9,'must turn left, not right');
   assert.ok(yaw<=Math.PI+1e-9,'must not turn past the table');
   last=yaw;
  }
 }
});
