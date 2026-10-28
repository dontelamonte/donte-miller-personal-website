export const ABOUT_CHAPTER_DISTANCE=600;
export function advanceAbout(offset,delta,total){
 const next=Math.max(0,Math.min(total,offset+delta));
 return {offset:next,overflow:delta>0?Math.max(0,offset+delta-total):0};
}
export function storyFrame(offset,count){
 const position=Math.max(0,Math.min(count,offset/ABOUT_CHAPTER_DISTANCE));
 const index=Math.min(count-1,Math.floor(position));
 const fraction=position-index;
 const enter=index===0?1:Math.min(1,fraction/.14);
 const exit=index===count-1?1:Math.min(1,(1-fraction)/.16);
 return {index,opacity:Math.max(0,Math.min(enter,exit)),lift:(1-enter)*25-(1-exit)*25};
}
