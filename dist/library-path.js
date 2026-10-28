export const LIBRARY_SCROLL_DISTANCE=2500;
export const LIBRARY_CAMERA={position:[15,3.35,8.8],target:[15,3.35,-4.8],fov:46};
const stops=[
 {at:0,position:[-1.3,7.8,6],target:[-1.3,0,0]},
 {at:.22,position:[-1.3,3.3,8.1],target:[2.5,3.1,3.3]},
 {at:.48,position:[5.2,3.3,3.3],target:[10.5,3.3,3.3]},
 {at:.68,position:[9.8,3.3,3.3],target:[15,3.3,1.4]},
 {at:.76,position:[11.4,3.4,3.3],target:[23,3.4,3.3]},
 {at:.85,position:[13.8,3.35,5.8],target:[15,3.35,-3.5]},
 {at:1,...LIBRARY_CAMERA}
];
const clamp=x=>Math.max(0,Math.min(1,x));
const smooth=x=>x*x*(3-2*x);
// Shape-preserving cubic tangents keep velocity continuous through the doorway.
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
export function libraryCameraAt(progress,aspect=16/9){
 const p=clamp(progress);let i=0;while(i<stops.length-2&&p>stops[i+1].at)i++;
 const a=stops[i],b=stops[i+1],t=(p-a.at)/(b.at-a.at);
 const position=curve(i,'position',t);
 const target=curve(i,'target',t);
 // Keep the full shelf wall in view on square and narrow screens.
 const halfWidth=7.7;
 const requiredDistance=halfWidth/(Math.tan(46*Math.PI/360)*Math.max(.45,aspect));
 const baseDistance=LIBRARY_CAMERA.position[2]-LIBRARY_CAMERA.target[2];
 const fit=Math.min(7,Math.max(0,requiredDistance-baseDistance));
 position[2]+=fit*smooth(Math.max(0,(p-.68)/.32));
 return {position,target,fov:46,room:p>.94?'library':p>.7&&p<.84?'workshop':'dining'};
}
export function moveLibrary(progress,delta){
 return Math.max(0,Math.min(1,progress+delta/LIBRARY_SCROLL_DISTANCE));
}
