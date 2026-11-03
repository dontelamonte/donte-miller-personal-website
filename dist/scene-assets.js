import * as THREE from './vendor/three.module.min.js';
import {lazyAssetBatch} from './performance.js';

export function imageTexture(image,anisotropy=1){
 const map=new THREE.Texture(image);map.colorSpace=THREE.SRGBColorSpace;
 map.anisotropy=anisotropy;map.needsUpdate=true;return map;
}

export function deferredTextureBatch(){
 const tasks=[];
 function texture(src,configure){
  const canvas=document.createElement('canvas');canvas.width=canvas.height=1;
  const context=canvas.getContext('2d');context.fillStyle='#f2e6d0';context.fillRect(0,0,1,1);
  const map=imageTexture(canvas);configure?.(map);
  let loaded=false;
  tasks.push(()=>loaded?undefined:new Promise((resolve,reject)=>{
   new THREE.ImageLoader().load(src,image=>{
    map.image=image;map.needsUpdate=true;loaded=true;
    window.dispatchEvent(new Event('scene-asset-ready'));resolve();
   },undefined,reject);
  }));
  return map;
 }
 return {texture,load:lazyAssetBatch(tasks)};
}
