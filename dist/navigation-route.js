import {cameraAt} from './house-path.js';
import {libraryCameraAt} from './library-path.js';
import {WORKSHOP_STOP} from './workshop-route.js';

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
