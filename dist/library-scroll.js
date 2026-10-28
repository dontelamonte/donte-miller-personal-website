import {LIBRARY_SCROLL_DISTANCE} from './library-path.js';

export const LIBRARY_BOOK_THRESHOLD=160;

// Scroll distance left after camera travel remains available at the shelf.
// Keep it while the camera eases into position, then open the next book.
export function advanceLibraryScroll(target,pending,delta){
 if(!Number.isFinite(delta)||!delta)return {target,pending};
 const raw=target+delta/LIBRARY_SCROLL_DISTANCE;
 const next=Math.max(0,Math.min(1,raw));
 if(delta<0)return {target:next,pending:0};
 const overflow=Math.max(0,raw-1)*LIBRARY_SCROLL_DISTANCE;
 return {target:next,pending:Math.min(1000,pending+overflow)};
}

export function libraryBookReady(target,progress,pending){
 return target>=1&&progress>=.995&&pending>=LIBRARY_BOOK_THRESHOLD;
}
