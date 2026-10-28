// Consume movement within a publication before using overflow to change scenes.
// No idle gap is required: a continuous trackpad stream can cross the boundary.
export class ScrollFlow {
  constructor({forwardDistance=160,backDistance=100,settleTime=450}={}) {
    this.forwardDistance=forwardDistance;
    this.backDistance=backDistance;
    this.settleTime=settleTime;
    this.reset();
  }
  reset(now=0) {
    this.readyAt=now+this.settleTime;
    this.overflow=0;
    this.direction=0;
    this.lastAt=0;
  }
  move({delta,top,max,now}) {
    max=Math.max(0,max);
    top=Math.min(max,Math.max(0,top));
    const nextTop=Math.min(max,Math.max(0,top+delta));
    const overflow=delta-(nextTop-top);
    const direction=Math.sign(overflow);
    if(!Number.isFinite(delta)||!delta)return {top,action:null};
    if(!direction||now<this.readyAt) {
      this.overflow=0;
      this.direction=0;
      return {top:nextTop,action:null};
    }
    if(direction!==this.direction||now-this.lastAt>600)this.overflow=0;
    this.direction=direction;
    this.lastAt=now;
    this.overflow+=Math.abs(overflow);
    const threshold=direction>0?this.forwardDistance:this.backDistance;
    if(this.overflow<threshold)return {top:nextTop,action:null};
    this.overflow=0;
    return {top:nextTop,action:direction>0?'next':'table'};
  }
}
