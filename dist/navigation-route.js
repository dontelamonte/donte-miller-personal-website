import {cameraAt} from './house-path.js?v=about-wall-1';
import {libraryCameraAt} from './library-path.js?v=left-return-28';
import {WORKSHOP_STOP} from './workshop-route.js';

const clamp01=value=>Math.max(0,Math.min(1,value));
const normalize=vector=>{const length=Math.hypot(...vector)||1;return vector.map(value=>value/length);};
const wrapAngle=angle=>Math.atan2(Math.sin(angle),Math.cos(angle));

// Blend camera directions on yaw and pitch rather than interpolating two
// world-space target points. A target-point blend can pass through the camera
// when travel reverses, producing the visible left/down/right swing.
export function blendViewDirections(start,end,amount,turn='shortest'){
 const a=normalize(start),b=normalize(end),t=clamp01(amount);
 const yawA=Math.atan2(a[0],a[2]),yawB=Math.atan2(b[0],b[2]);
 const pitchA=Math.asin(Math.max(-1,Math.min(1,a[1]))),pitchB=Math.asin(Math.max(-1,Math.min(1,b[1])));
 let delta=wrapAngle(yawB-yawA);
 if(turn==='left'&&delta<0)delta+=2*Math.PI;
 const yaw=yawA+delta*t,pitch=pitchA+(pitchB-pitchA)*t,level=Math.cos(pitch);
 return [Math.sin(yaw)*level,Math.sin(pitch),Math.cos(yaw)*level];
}

// Gaze is independent of path slope: lift from a reader, face the passage,
// then turn once toward the destination. Same-room travel only blends endpoints.
export function navigationDirection(start,end,from,to,t){
 const ease=x=>{x=clamp01(x);return x*x*x*(x*(x*6-15)+10);};
 // Turn right once toward the desk, then hold that heading for the approach.
 if(from==='table'&&to==='workshop')
  return blendViewDirections(start,end,ease(t/.38));
 // Return with one left turn toward the table, avoiding the west-facing about-face.
 if(from==='workshop'&&to==='table')
  return blendViewDirections(start,end,ease(t));
 const order={living:0,table:1,workshop:2,library:3};
 if([from,to].every(room=>room==='workshop'||room==='library'))
  return blendViewDirections(start,end,ease(t));
 const doorway=order[to]>order[from]?[1,0,0]:[-1,0,0];
 if(t<.32)return blendViewDirections(start,doorway,ease(t/.32),from==='workshop'&&to==='living'?'left':'shortest');
 if(t>.62)return blendViewDirections(doorway,end,ease((t-.62)/.38));
 return doorway;
}

// Presentation camera stops belong to the scroll tour, never tab navigation.
// Each pair uses only its destination and the clear approach to each doorway.
export function navigationViews(from,to,aspect){
 const views={living:cameraAt(0,aspect),table:cameraAt(1,aspect),
  workshop:libraryCameraAt(WORKSHOP_STOP,aspect),library:libraryCameraAt(1,aspect)};
 if(!views[from]||!views[to])return [];
 if(from===to)return [views[to]];
 const order={living:0,table:1,workshop:2,library:3};
 const reverse=order[from]>order[to],a=reverse?to:from,b=reverse?from:to;
 const passage=x=>({position:[x,3.3,3.3],target:[x+6,3.3,3.3],fov:46,room:'dining'});
 const route=[views[a]];
 if(a==='living')route.push(passage(-10.1),passage(-5.2));
 if(order[a]<2&&order[b]>=2)route.push(passage(5.2),passage(9.8));
 route.push(views[b]);
 return reverse?route.reverse():route;
}
