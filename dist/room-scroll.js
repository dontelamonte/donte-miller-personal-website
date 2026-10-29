// Room boundaries are actions, independent of wheel units or swipe length.
export function roomScrollDestination(s,delta,aboutDistance,workshopStop){
 if(!Number.isFinite(delta)||!delta)return null;
 if(s.libraryTarget>=1)return delta<0?'workshop':null;
 if(s.libraryTarget>=workshopStop)return delta<0?'table':s.modelSequenceComplete?'library':null;
 if(s.libraryTarget>0)return delta<0?'table':'workshop';
 if(s.houseTarget<1)return delta>0&&s.aboutOffset>=aboutDistance?'table':null;
 if(delta<0&&s.scrollAmount<=0)return 'living';
 return delta>0&&s.scrollTarget==='library'?'workshop':null;
}

// A journey consumes its gesture, including momentum after arrival. A held
// touch must end before another action; wheel input must first become quiet.
export class RoomGestureGate{
 constructor(){this.locked=false;this.last=-Infinity;}
 lock(){this.locked=true;}
 accept(delta,now,busy,touching=false){
  if(!Number.isFinite(delta)||!delta)return false;
  const quiet=now-this.last>=180;this.last=now;
  if(busy)return false;
  if(this.locked){if(touching||!quiet)return false;this.locked=false;}
  return true;
 }
 releaseTouch(){this.locked=false;}
}
