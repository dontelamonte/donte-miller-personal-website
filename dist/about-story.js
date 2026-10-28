export const ABOUT_CHAPTER_DISTANCE=600;
export function advanceAbout(offset,delta,total){
 const next=Math.max(0,Math.min(total,offset+delta));
 return {offset:next,overflow:delta>0?Math.max(0,offset+delta-total):0};
}
export function storyFrame(offset,total){
 const start=ABOUT_CHAPTER_DISTANCE;
 const clamped=Math.max(0,Math.min(total,offset));
 return {welcome:clamped<start,progress:Math.max(0,Math.min(1,(clamped-start)/(total-start)))};
}
export function storyReveal(offset,duration=260){
 const t=Math.max(0,Math.min(1,(offset-ABOUT_CHAPTER_DISTANCE)/duration));
 return t*t*(3-2*t);
}
