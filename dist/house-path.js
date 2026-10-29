export const HOUSE_SCROLL_DISTANCE=3400;
// Maximum fallback used for the narrowest supported screens.
export const HOUSE_SHELL_FRONT_Z=22;
// Keep the wall just behind the farthest camera framing for the current screen.
// Wide screens therefore get a compact room instead of a deep, unused stage,
// while narrow screens retain the extra distance needed to frame the artwork.
export function houseShellFrontZ(aspect=16/9){
 const safeAspect=Math.max(.4,aspect);
 const openingWidth=safeAspect<.85?8.5:13.6;
 const homeFit=Math.max(0,openingWidth/(2*Math.tan(46*Math.PI/360)*safeAspect)-12.6);
 const libraryDistance=7.7/(Math.tan(46*Math.PI/360)*Math.max(.45,safeAspect));
 const libraryFit=Math.min(7,Math.max(0,libraryDistance-13.6));
 return Math.min(HOUSE_SHELL_FRONT_Z,Math.max(10.5,8.8+homeFit+.9,8.8+libraryFit+.9));
}
export const TABLE_CAMERA={position:[-1.3,7.8,6],target:[-1.3,0,0],fov:46};
const stops=[
 {at:0,position:[-15,3.1,7.0],target:[-15,3.15,-5.6]},
 {at:.19,position:[-12.1,3.1,8.3],target:[-7.5,3.1,3.3]},
 {at:.37,position:[-10.1,3.05,3.3],target:[-4.7,3.0,3.25]},
 {at:.57,position:[-5.6,3.05,3.3],target:[.7,2.8,-2.8]},
 {at:.76,position:[-.9,5.0,6.6],target:[0,1.1,-1.5]},
 {at:1,position:TABLE_CAMERA.position,target:TABLE_CAMERA.target}
];
const clamp=x=>Math.max(0,Math.min(1,x));
const smoother=t=>t*t*t*(t*(t*6-15)+10);
// Shape-preserving cubic tangents: C1 continuity without overshooting walls.
function tangent(i,field,axis){
 if(i===0||i===stops.length-1)return 0;
 const prev=stops[i-1],here=stops[i],next=stops[i+1];
 const h0=here.at-prev.at,h1=next.at-here.at;
 const d0=(here[field][axis]-prev[field][axis])/h0,d1=(next[field][axis]-here[field][axis])/h1;
 if(d0*d1<=0)return 0;
 const w0=2*h1+h0,w1=h1+2*h0;
 return (w0+w1)/(w0/d0+w1/d1);
}
function curve(i,field,t){
 const a=stops[i],b=stops[i+1],h=b.at-a.at;
 return a[field].map((v,j)=>(2*t*t*t-3*t*t+1)*v+(t*t*t-2*t*t+t)*h*tangent(i,field,j)+(-2*t*t*t+3*t*t)*b[field][j]+(t*t*t-t*t)*h*tangent(i+1,field,j));
}
export function cameraAt(progress,aspect=1.7778){
 const p=clamp(progress);let i=0;while(i<stops.length-2&&p>stops[i+1].at)i++;
 const t=(p-stops[i].at)/(stops[i+1].at-stops[i].at);
 const position=curve(i,'position',t),target=curve(i,'target',t);
 const openingWidth=aspect<.85?8.5:13.6;
 const openingFit=Math.max(0,openingWidth/(2*Math.tan(TABLE_CAMERA.fov*Math.PI/360)*aspect)-12.6);
 position[2]+=openingFit*(1-smoother(clamp(p/.37)));
 if(p>.76&&aspect<.9){const blend=smoother((p-.76)/.24);position[0]+=1.3*blend;target[0]+=1.3*blend;}
 return {position,target,fov:TABLE_CAMERA.fov,room:p<.42?'living':p<.94?'dining':'table'};
}
// Analytic critically damped follow-through retains velocity across scroll events.
export function followProgress(value,target,velocity,dt,response=.4){
 const time=Math.max(0,Math.min(.05,dt)),omega=2/response;
 const offset=value-target,decay=Math.exp(-omega*time),step=(velocity+omega*offset)*time;
 let position=target+(offset+step)*decay;
 let speed=(velocity-omega*step)*decay;
 if(Math.abs(position-target)<.00001&&Math.abs(speed)<.0001){position=target;speed=0;}
 return {position:clamp(position),velocity:speed};
}
export function moveHouse(progress,delta){
 const raw=progress+delta/HOUSE_SCROLL_DISTANCE;
 return {progress:clamp(raw),overflow:raw>1?(raw-1)*HOUSE_SCROLL_DISTANCE:0};
}
