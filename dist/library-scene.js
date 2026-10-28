import * as THREE from './vendor/three.module.min.js';
import {curricula} from './library-content.js';

export function buildLibrary(scene){
 const root=new THREE.Group();root.name='The library';scene.add(root);
 const pickables=[],books=new Map(),anchors=new Map();
 const wood=new THREE.MeshStandardMaterial({color:'#633d29',roughness:.85});
 const edge=new THREE.MeshStandardMaterial({color:'#a66b3a',roughness:.7});
 const blue=new THREE.MeshStandardMaterial({color:'#183b54',roughness:1});
 const dark=new THREE.MeshStandardMaterial({color:'#162a38',roughness:1});
 const green=new THREE.MeshStandardMaterial({color:'#4d6547',roughness:1});
 const cream=new THREE.MeshStandardMaterial({color:'#d6c29e',roughness:1});
 function mesh(geometry,material,parent=root){const m=new THREE.Mesh(geometry,material);parent.add(m);m.castShadow=true;m.receiveShadow=true;return m;}
 function box(w,h,d,x,y,z,material,parent=root){const m=mesh(new THREE.BoxGeometry(w,h,d),material,parent);m.position.set(x,y,z);return m;}
 function canvasTexture(draw,w=512,h=768){const c=document.createElement('canvas');c.width=w;c.height=h;draw(c.getContext('2d'),w,h);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;return t;}
 // The dining-room doorway opens directly into this room, so the camera never fades between spaces.
 box(15.4,8.8,.3,15.3,3.9,-6,blue);box(.3,8.8,15.8,23.1,3.9,1.8,blue);
 box(15.2,.25,15.8,15.3,8.45,1.8,dark);
 for(const x of [9.5,12.5,15.5,18.5,21.5])box(.1,.12,15.6,x,8.26,1.8,wood);
 for(const y of [-.12,.26,7.95])box(15.2,.12,.35,15.3,y,-5.77,edge);
 const rugMap=canvasTexture((c,w,h)=>{c.fillStyle='#1e4a6c';c.fillRect(0,0,w,h);for(let i=0;i<6;i++){c.strokeStyle=['#d9a35f','#e5c38c','#8f512f'][i%3];c.lineWidth=12-i;c.strokeRect(25+i*16,25+i*16,w-50-i*32,h-50-i*32);}for(let x=70;x<w-70;x+=40)for(let y=70;y<h-70;y+=40){c.fillStyle=(x+y)%3?'#ba6748':'#d5aa78';c.beginPath();c.ellipse(x,y,5,9,0,0,Math.PI*2);c.fill();}},768,512);
 const rug=mesh(new THREE.PlaneGeometry(11.8,7.5),new THREE.MeshStandardMaterial({map:rugMap,roughness:1}));rug.rotation.x=-Math.PI/2;rug.position.set(15.2,-.465,1.4);rug.castShadow=false;
 // Three broad wooden cases, stocked with varied spines around a central course band.
 for(const x of [8.5,13.1,17.7,22.3]){box(.25,7.65,1.2,x,3.36,-4.9,wood);box(.34,7.65,.12,x,3.36,-4.22,edge);}
 for(const y of [.02,2.42,4.96,7.35]){box(14.05,.2,1.25,15.4,y,-4.9,wood);box(14.05,.06,.12,15.4,y-.1,-4.22,edge);}
 let seed=129;const random=()=>{seed=(seed*16807)%2147483647;return(seed-1)/2147483646;};
 const colors=['#9c4d30','#cf9860','#d4b78d','#355a68','#6a754e','#7d5a48','#e0cba0','#ad6d41'];
 for(const row of [0,1,2]){const bottom=[.13,5.08,7.48][row],height=[1.9,1.65,.62][row];for(let x=8.75;x<22.05;){const w=.11+random()*.17,h=height*(.7+random()*.27),z=-4.52+random()*.15;const m=new THREE.MeshStandardMaterial({color:colors[Math.floor(random()*colors.length)],roughness:.9});const book=box(w,h,.58,x+w/2,bottom+h/2,z,m);book.rotation.z=(random()-.5)*.08;if(random()>.8)box(w*.7,.025,.61,x+w/2,bottom+h*.75,z,edge);x+=w+.018;}}
 for(const [i,item] of curricula.entries()){
  const x=9.67+i*2.25,group=new THREE.Group();root.add(group);group.position.set(x,3.65,-4.55);group.rotation.y=(i%2?-.06:.06);
  const coverMap=canvasTexture((c,w,h)=>{c.fillStyle=item.theme;c.fillRect(0,0,w,h);c.strokeStyle='#e6c18b';c.lineWidth=5;c.strokeRect(22,22,w-44,h-44);c.fillStyle='#f3e4c6';c.font='22px Georgia';c.fillText('DONTE MILLER',45,92);const parts=item.title==='Flourish Fellowship'?['Flourish','Fellowship']:[item.title];c.font=parts.length>1?'62px Georgia':'78px Georgia';parts.forEach((part,j)=>c.fillText(part,43,300+j*78));c.fillRect(45,575,w-90,2);c.font='24px Georgia';c.fillText(item.comingSoon?'COMING SOON':'CURRICULUM PREVIEW',45,622);},512,768);
  const page=mesh(new THREE.BoxGeometry(1.52,2.04,.16),cream,group);
  const hinge=new THREE.Group();hinge.position.set(-.76,0,.095);group.add(hinge);
  const cover=mesh(new THREE.BoxGeometry(1.52,2.04,.035),[edge,edge,edge,edge,new THREE.MeshBasicMaterial({map:coverMap}),edge],hinge);cover.position.x=.76;
  const spine=box(.09,2.06,.28,-.74,0,0,edge,group);
  group.userData.courseId=item.id;group.traverse(o=>{if(o.isMesh){o.userData.courseId=item.id;pickables.push(o);}});
  const home={position:group.position.clone(),rotation:group.rotation.clone()};books.set(item.id,{group,hinge,home});anchors.set(item.id,new THREE.Vector3(x,4.72,-4.25));
 }
 // Globe, plant clusters and a bench give the library its own silhouette.
 box(3.8,.18,1.2,15.4,.53,-3.3,wood);for(const x of [13.7,17.1])box(.14,.65,.14,x,.18,-3.3,wood);
 const globe=mesh(new THREE.SphereGeometry(.43,20,12),new THREE.MeshStandardMaterial({color:'#bba26e',roughness:.8}));globe.position.set(15.4,6.3,-4.5);const stand=mesh(new THREE.CylinderGeometry(.025,.04,.32,8),edge);stand.position.set(15.4,5.78,-4.5);
 for(const x of [8.4,22.4]){const pot=mesh(new THREE.CylinderGeometry(.38,.28,.7,12),cream);pot.position.set(x,-.1,-2.8);for(let i=0;i<7;i++){const leaf=mesh(new THREE.SphereGeometry(1,7,5),green);leaf.scale.set(.22,.67,.13);leaf.position.set(x+(random()-.5)*.9,.75+random()*1.4,-2.8+(random()-.5)*.9);leaf.rotation.z=(random()-.5)*1.2;}};
 const light=new THREE.PointLight('#ffcf96',14,23,2);light.position.set(16,6,2);root.add(light);
 return {root,pickables,books,anchors};
}
