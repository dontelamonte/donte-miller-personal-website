import * as THREE from './vendor/three.module.min.js';

// Shared, deterministic 512px surfaces: detail without additional asset requests.
const surfaces=new Map(),materials=new Map();
export function surfaceTexture(kind){
 if(surfaces.has(kind))return surfaces.get(kind);
 const canvas=document.createElement('canvas');canvas.width=canvas.height=512;
 const c=canvas.getContext('2d');let seed=43;
 const random=()=>((seed=seed*16807%2147483647)-1)/2147483646;
 c.fillStyle='#d5d5d5';c.fillRect(0,0,512,512);
 for(let i=0;i<2200;i++){
  const x=random()*512,y=random()*512,light=i%3===0;
  c.fillStyle=kind==='plaster'?(light?'rgba(255,255,255,.05)':'rgba(45,45,45,.018)'):(light?'rgba(255,255,255,.12)':'rgba(45,45,45,.07)');
  c.save();c.translate(x,y);c.rotate(kind==='wood'?.02:(random()-.5)*.6);
  c.fillRect(0,0,kind==='wood'?40+random()*150:8+random()*43,kind==='wood'?1+random()*3:2+random()*12);c.restore();
 }
 if(kind==='wood')for(let i=0;i<180;i++){
  const y=random()*512;c.strokeStyle=i%2?'#ffffff20':'#28282824';c.lineWidth=.5+random();c.beginPath();c.moveTo(0,y);c.bezierCurveTo(170,y-8,340,y+8,512,y);c.stroke();
 }
 if(kind==='fabric')for(let i=0;i<512;i+=3){c.fillStyle=i%2?'#ffffff22':'#22222222';c.fillRect(i,0,1,512);c.fillRect(0,i,512,1);}
 if(kind==='painted-wood')for(let i=0;i<95;i++){c.fillStyle='#f9e4bf24';c.fillRect(random()*512,random()*512,2+random()*36,1+random()*3);}
 const map=new THREE.CanvasTexture(canvas);map.colorSpace=THREE.SRGBColorSpace;map.anisotropy=4;
 surfaces.set(kind,map);return map;
}
export function environmentMaterial(color,kind='plaster'){
 const key=kind+color;if(materials.has(key))return materials.get(key);
 const material=new THREE.MeshStandardMaterial({color,map:surfaceTexture(kind),roughness:kind==='wood'?.84:1});
 materials.set(key,material);return material;
}

// Thin leaf silhouettes and visible stems replace the large oval placeholders.
// Instancing keeps each whole vine to one foliage draw call.
export function addTrailingVine(parent,{x,y,z,length=2.5,spread=.55,seed=17}){
 let value=seed;const random=()=>((value=value*16807%2147483647)-1)/2147483646;
 const shape=new THREE.Shape();shape.moveTo(0,-.22);shape.bezierCurveTo(-.17,-.04,-.14,.12,0,.24);shape.bezierCurveTo(.14,.12,.17,-.04,0,-.22);
 const geometry=new THREE.ShapeGeometry(shape,5);
 const material=new THREE.MeshStandardMaterial({color:'#61764a',roughness:1,side:THREE.DoubleSide});
 const leaves=new THREE.InstancedMesh(geometry,material,64),pose=new THREE.Object3D();leaves.receiveShadow=true;
 for(let i=0;i<64;i++){
  const t=i/63;pose.position.set(x+Math.sin(t*9)*spread*.22+(random()-.5)*.18,y-t*length,z+Math.sin(t*5)*spread+(i%2?1:-1)*(.12+random()*.16));
  pose.rotation.set((random()-.5)*.8,-Math.PI/2+(random()-.5)*1.4,(random()-.5)*1.7);pose.scale.setScalar(.6+random()*.6);pose.updateMatrix();leaves.setMatrixAt(i,pose.matrix);
  leaves.setColorAt(i,new THREE.Color(i%4===0?'#9a8246':i%3===0?'#72834d':'#3b583a'));
 }
 parent.add(leaves);
 const points=Array.from({length:12},(_,i)=>{const t=i/11;return new THREE.Vector3(x+Math.sin(t*9)*spread*.22,y-t*length,z+Math.sin(t*5)*spread);});
 const stem=new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points),24,.015,4,false),environmentMaterial('#6b5437','wood'));parent.add(stem);
 return leaves;
}
