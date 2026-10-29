import {cameraAt} from './house-path.js?v=compact-shell-24';
import {libraryCameraAt} from './library-path.js';
import {WORKSHOP_STOP} from './workshop-route.js';

const clamp01=value=>Math.max(0,Math.min(1,value));
const normalize=vector=>{const length=Math.hypot(...vector)||1;return vector.map(value=>value/length);};
const wrapAngle=angle=>Math.atan2(Math.sin(angle),Math.cos(angle));

// Blend camera directions on yaw and pitch rather than interpolating two
// world-space target points. A target-point blend can pass through the camera
// when travel reverses, producing the visible left/down/right swing.
export function blendViewDirections(start,end,amount){
 const a=normalize(start),b=normalize(end),t=clamp01(amount);
 const yawA=Math.atan2(a[0],a[2]),yawB=Math.atan2(b[0],b[2]);
 const pitchA=Math.asin(Math.max(-1,Math.min(1,a[1]))),pitchB=Math.asin(Math.max(-1,Math.min(1,b[1])));
 const yaw=yawA+wrapAngle(yawB-yawA)*t,pitch=pitchA+(pitchB-pitchA)*t,level=Math.cos(pitch);
 return [Math.sin(yaw)*level,Math.sin(pitch),Math.cos(yaw)*level];
}

// Tab travel uses connected room passages, but only the chosen room is a stop.
// The table pose is overhead, so routes passing the table stay at walking height.
export function navigationViews(from,to,aspect){
 const home=cameraAt(0,aspect),table=cameraAt(1,aspect);
 const house=p=>cameraAt(p,aspect),east=p=>libraryCameraAt(p,aspect);
 if((from==='living'&&to==='library')||(from==='library'&&to==='living')){
  const route=[home,
   {position:[-7.5,3.3,3.3],target:[-1.5,3.3,3.3],fov:46,room:'living'},
   {position:[7.6,3.3,3.3],target:[13.6,3.3,3.3],fov:46,room:'dining'},
   east(1)];
  return from==='living'?route:route.slice().reverse();
 }
 let rooms,views;
 if((from==='living'&&to==='table')||(from==='table'&&to==='living')){
  rooms={living:0,table:5};
  views=[home,house(.19),house(.37),house(.57),house(.76),table];
 }else if(from==='table'||to==='table'){
  rooms={table:0,workshop:4,library:6};
  views=[table,east(.22),east(.48),east(.68),east(WORKSHOP_STOP),east(.85),east(1)];
 }else{
  rooms={living:0,workshop:7,library:9};
  views=[home,house(.19),house(.37),house(.57),
   {position:[-1.3,3.3,3.3],target:[4,3.3,3.3],fov:46,room:'dining'},
   east(.48),east(.68),east(WORKSHOP_STOP),east(.85),east(1)];
 }
 const start=rooms[from],end=rooms[to];
 if(start===undefined||end===undefined)return [];
 return (start<=end?views.slice(start,end+1):views.slice(end,start+1).reverse());
}
