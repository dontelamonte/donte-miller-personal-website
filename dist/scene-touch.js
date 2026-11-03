// House swipes belong to the tour, not the browser's root scrolling surface.
// Readers and pinch-zoom keep their existing native gesture handling.
export function connectSceneTouch(target,{isExploring,advance,release,getScale=()=>1}){
 let y=null,x=0,vertical=false;
 const protectedRegion='.reader-shell,.course-shell,.model-shell,.living-panel,.room-navigation';
 const eligible=event=>isExploring()&&event.touches.length===1&&getScale()<=1.01;
 const start=event=>{
  y=eligible(event)&&!event.target?.closest?.(protectedRegion)?event.touches[0].clientY:null;
  x=event.touches[0]?.clientX||0;vertical=false;
 };
 const move=event=>{
  if(!eligible(event)){y=null;return;}
  if(y===null||event.defaultPrevented)return;
  const next=event.touches[0].clientY,nextX=event.touches[0].clientX||0,dy=y-next,dx=nextX-x;
  if(!dy&&!dx)return;
  // Leave horizontal browser/back gestures available before claiming a vertical swipe.
  if(!vertical&&Math.abs(dx)>Math.abs(dy)){y=null;return;}
  vertical=true;const delta=dy*2;y=next;x=nextX;
  if(event.cancelable)event.preventDefault();
  advance(delta);
 };
 const end=()=>{y=null;release();};
 target.addEventListener('touchstart',start,{passive:true});
 target.addEventListener('touchmove',move,{passive:false});
 target.addEventListener('touchend',end,{passive:true});
 target.addEventListener('touchcancel',end,{passive:true});
 return {get active(){return y!==null;}};
}
