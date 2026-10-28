export const HOUSE_SCROLL_DISTANCE=3400;
const stops=[
 {at:0,position:[-15,3.65,8.0],target:[-15,3.5,-5.6],fov:43},
 {at:.19,position:[-12.1,3.5,10.0],target:[-7.5,3.3,3.3],fov:48},
 {at:.37,position:[-10.1,3.25,3.3],target:[-4.7,3.1,3.25],fov:48},
 {at:.57,position:[-5.6,3.25,3.3],target:[.7,3.0,-2.8],fov:48},
 {at:.76,position:[-.9,4.4,10.5],target:[0,2.4,-3.0],fov:46},
 {at:1,position:[-1.3,9.8,6.8],target:[-1.3,0,0],fov:40}
];
const smooth=t=>t*t*(3-2*t);
export function cameraAt(progress,aspect=1.7778){
 const p=Math.max(0,Math.min(1,progress));
 let i=0;while(i<stops.length-2&&p>stops[i+1].at)i++;
 const a=stops[i],b=stops[i+1],t=smooth((p-a.at)/(b.at-a.at));
 const mix=(x,y)=>x+(y-x)*t;
 const position=a.position.map((x,j)=>mix(x,b.position[j]));
 const target=a.target.map((x,j)=>mix(x,b.target[j]));
 // Pull back the opening view on portrait screens so both plaque columns fit.
 const openingWidth=aspect<.85?8.5:13.6;
 const openingFit=Math.max(0,openingWidth/(2*Math.tan(43*Math.PI/360)*aspect)-13.6);
 position[2]+=openingFit*Math.max(0,1-p/.37);
 // Keep the original approved table framing on narrow screens.
 if(p>.76&&aspect<.9){const blend=smooth((p-.76)/.24);position[0]+=1.3*blend;target[0]+=1.3*blend;}
 return {position,target,fov:mix(a.fov,b.fov),room:p<.42?'living':p<.94?'dining':'table'};
}
export function moveHouse(progress,delta){
 const raw=progress+delta/HOUSE_SCROLL_DISTANCE;
 return {progress:Math.max(0,Math.min(1,raw)),overflow:raw>1?(raw-1)*HOUSE_SCROLL_DISTANCE:0};
}
