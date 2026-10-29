import {LIBRARY_SCROLL_DISTANCE} from './library-path.js?v=direct-workshop-27';

export const WORKSHOP_STOP=.76;
export const WORKSHOP_STORY_DISTANCE=1500;

// One continuous scroll coordinate covers camera travel, the workshop story,
// and the final turn to the bookshelves. The camera holds at the workshop stop.
export function advanceWorkshopRoute(target,offset,delta){
 const stop=WORKSHOP_STOP*LIBRARY_SCROLL_DISTANCE;
 const total=LIBRARY_SCROLL_DISTANCE+WORKSHOP_STORY_DISTANCE;
 const current=target<WORKSHOP_STOP?target*LIBRARY_SCROLL_DISTANCE:target>WORKSHOP_STOP?target*LIBRARY_SCROLL_DISTANCE+WORKSHOP_STORY_DISTANCE:stop+offset;
 const raw=current+delta;
 const at=Math.max(0,Math.min(total,raw));
 const overflow=raw>total?raw-total:raw<0?raw:0;
 if(at<stop-1e-7)return {target:at/LIBRARY_SCROLL_DISTANCE,offset:0,overflow};
 if(at<=stop+WORKSHOP_STORY_DISTANCE+1e-7)return {target:WORKSHOP_STOP,offset:Math.max(0,Math.min(WORKSHOP_STORY_DISTANCE,at-stop)),overflow};
 return {target:(at-WORKSHOP_STORY_DISTANCE)/LIBRARY_SCROLL_DISTANCE,offset:WORKSHOP_STORY_DISTANCE,overflow};
}
