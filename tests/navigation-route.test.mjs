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
 // The return adds one walk-in point in front of the sofa before stepping back to the Home view.
 assert.equal(back.length,forward.length+1);
 assert.deepEqual(back.slice(0,5),forward.slice(1).reverse());
 assert.deepEqual(back.at(-1),forward[0]);
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
test('Table to Library follows the tour curve in, and the return curves left into the arch',()=>{
 for(const aspect of [.45,1,16/9]){
  const views=navigationViews('table','library',aspect);
  assert.equal(views.length,6);
  assert.ok(views[1].position[0]>views[0].position[0]);
  assert.ok(views[1].position[2]<views[0].position[2]);
  for(let i=2;i<views.length;i++)assert.ok(views[i].position[0]>=views[i-1].position[0],'keeps walking east into the Library');
  const back=navigationViews('library','table',aspect);
  assert.equal(back.length,5);
  assert.deepEqual(back[0],views.at(-1));
  assert.deepEqual(back.at(-1),views[0]);
  // Heading turns left monotonically from the shelves toward the arch: no sideways jog.
  const heading=(a,b)=>Math.atan2(b.position[0]-a.position[0],b.position[2]-a.position[2]);
  const turns=[heading(back[0],back[1]),heading(back[1],back[2]),heading(back[2],back[3])].map(y=>y<0?y+2*Math.PI:y);
  assert.ok(turns[0]<turns[1]&&turns[1]<=turns[2]+1e-9,`left curve ${turns}`);
 }
});
test('re-selecting the current room settles without a doorway glance',()=>{
 const start=[0,-.79,-.61],end=[0,-.79,-.62];
 for(let n=0;n<=20;n++){const d=navigationDirection(start,end,'table','table',n/20);assert.ok(d[1]<-.7,'never looks up')}
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

test('Workshop to Home departs left toward the west doorway at every viewport',()=>{
 for(const aspect of [.45,1,16/9]){
  const views=navigationViews('workshop','living',aspect),dir=v=>v.target.map((x,i)=>x-v.position[i]);
  const start=dir(views[0]),end=dir(views.at(-1));
  let previous=navigationDirection(start,end,'workshop','living',0),total=0;
  for(let i=1;i<=320;i++){
   const current=navigationDirection(start,end,'workshop','living',i/1000);
   const a=Math.atan2(previous[0],previous[2]),b=Math.atan2(current[0],current[2]);
   const delta=Math.atan2(Math.sin(b-a),Math.cos(b-a));
   assert.ok(delta>=-1e-9,'departure must turn left');
   total+=delta;previous=current;
  }
  assert.ok(total>Math.PI*.9&&total<Math.PI*1.1,'one left about-face toward Home');
  assert.deepEqual(navigationDirection(start,end,'workshop','living',.5),[-1,0,0]);
 }
});

test('Table to Home turns right to the wall without a left jog first',()=>{
 for(const aspect of [.45,1,16/9]){
  const views=navigationViews('table','living',aspect),dir=v=>v.target.map((x,i)=>x-v.position[i]);
  const path=new THREE.CatmullRomCurve3(views.map(v=>new THREE.Vector3(...v.position)),false,'centripetal'),length=path.getLength(),final=path.getPointAt(1).toArray();
  let previous=null,turnedRight=false;
  for(let i=0;i<=400;i++){
   const t=i/400,p=path.getPointAt(t),a=Math.min(.75,t);
   const d=navigationDirection(dir(views[0]),dir(views.at(-1)),'table','living',t,{position:p.toArray(),final,length,ahead:path.getPointAt(a+.25).sub(path.getPointAt(a)).toArray()});
   const yaw=Math.atan2(d[0],d[2]);
   if(previous!==null){const delta=Math.atan2(Math.sin(yaw-previous),Math.cos(yaw-previous));if(delta<-1e-6)turnedRight=true;if(turnedRight)assert.ok(delta<=1e-6,`turns back left at ${t} / ${aspect}`);}
   previous=yaw;
  }
  assert.ok(Math.abs(path.getPointAt(.98).x-final[0])<.6,'arrives without overshooting past Home');
 }
});
