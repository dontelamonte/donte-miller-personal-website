import * as THREE from './vendor/three.module.min.js';
import {curricula} from './library-content.js';

export function buildLibrary(scene){
 const root=new THREE.Group();root.name='The library';scene.add(root);
 const pickables=[],books=new Map(),anchors=new Map(),modelPads=new Map(),modelPickables=[];
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
 // The reference describes a room. Only its central painting is mapped onto the wall;
 // the desk, chair, computer and surrounding decor are separate 3D objects.
 const studioWood=new THREE.MeshStandardMaterial({color:'#94633e',roughness:.88});
 const deskBlue=new THREE.MeshStandardMaterial({color:'#245474',roughness:.9});
 const studioCream=new THREE.MeshStandardMaterial({color:'#e4d4b8',roughness:1});
 const screen=new THREE.MeshStandardMaterial({color:'#d7d0bb',roughness:.75,emissive:'#786e5c',emissiveIntensity:.14});
 const upholstery=new THREE.MeshStandardMaterial({color:'#385d75',roughness:1});
 for(const z of [-.95,7.45])box(.11,8.2,1.4,22.87,3.55,z,studioCream);
 box(.12,.14,7.4,22.85,7.75,3.25,studioWood);box(.12,.14,7.4,22.85,.08,3.25,studioWood);
 const paintingMap=new THREE.TextureLoader().load('/assets/workshop-wall.jpg',()=>window.dispatchEvent(new Event('scene-asset-ready')));
 paintingMap.colorSpace=THREE.SRGBColorSpace;
 // UV crop of the framed painting in the supplied composition (not the desk or wall).
 paintingMap.repeat.set(.445,.38);paintingMap.offset.set(.273,.493);
 const painting=mesh(new THREE.PlaneGeometry(4.1,3.5),new THREE.MeshBasicMaterial({map:paintingMap,side:THREE.DoubleSide}));painting.position.set(22.79,5.4,3.25);painting.rotation.y=-Math.PI/2;painting.castShadow=false;
 for(const z of [1.13,5.37])box(.16,3.63,.12,22.72,5.4,z,studioWood);
 for(const y of [3.6,7.2])box(.16,.12,4.26,22.72,y,3.25,studioWood);
 // Work surface and two drawer pedestals sit in front of the wall.
 box(1.28,.16,6.7,21.76,1.33,3.25,studioWood);
 for(const z of [.94,5.56]){
  box(.95,1.58,1.58,21.95,.25,z,deskBlue);
  for(const y of [-.25,.23,.71]){box(.025,.39,1.42,21.46,y,z,deskBlue);box(.035,.035,.37,21.43,y,z,edge);}
 }
 box(.08,.82,1.35,21.5,2.08,3.25,dark);box(.012,.68,1.18,21.45,2.08,3.25,screen);
 box(.08,.49,.08,21.57,1.55,3.25,edge);box(.44,.035,.46,21.57,1.44,3.25,dark);
 box(.46,.028,1.02,21.12,1.43,3.25,studioCream);
 // Three independent sketchpads lie on the desk, rather than being printed into the wall image.
 const padNames=[['workers-equity','WORKER’S EQUITY','01 / OWNERSHIP'],['endao','EnDAO','02 / GOVERNANCE'],['time-bank','THE TIME BANK','03 / CONTRIBUTION']];
 for(const [i,[id,title,caption]] of padNames.entries()){
  const group=new THREE.Group();root.add(group);group.position.set(21.03,1.87,1.62+i*1.63);
  box(.09,.81,1.26,0,0,0,studioCream,group);box(.34,.035,1.3,-.09,-.42,0,studioWood,group);
  const coverMap=canvasTexture((c,w,h)=>{c.fillStyle=['#ead7b1','#d9dcbf','#ead1b7'][i];c.fillRect(0,0,w,h);c.strokeStyle='#8f6747';c.lineWidth=7;c.strokeRect(18,18,w-36,h-36);c.fillStyle='#25445b';c.font='bold 42px Georgia';c.fillText(title,36,185);c.font='22px Georgia';c.fillText(caption,36,245);for(let y=340;y<h-45;y+=43){c.fillStyle='#7a929055';c.fillRect(38,y,w-76,2);}},768,512);
  const cover=mesh(new THREE.PlaneGeometry(1.25,.79),new THREE.MeshBasicMaterial({map:coverMap,side:THREE.DoubleSide}),group);cover.rotation.y=-Math.PI/2;cover.position.x=-.047;cover.castShadow=false;
  const binding=box(.1,.07,1.28,-.02,.42,0,studioWood,group);
  for(let j=0;j<9;j++){const loop=mesh(new THREE.TorusGeometry(.036,.01,4,10),edge,group);loop.position.set(-.08,.45,-.54+j*.135);loop.rotation.y=Math.PI/2;}
  group.traverse(o=>{if(o.isMesh){o.userData.modelId=id;modelPickables.push(o);}});
  modelPads.set(id,{group,home:{position:group.position.clone(),rotation:group.rotation.clone()}});
 }
 // A swiveling desk chair has its own depth and silhouette during camera travel.
 box(.78,.12,.96,20.52,.55,3.25,upholstery);
 box(.15,1.05,1.03,20.06,1.02,3.25,studioWood);
 box(.025,.72,.83,19.97,1.04,3.25,upholstery);
 box(.1,.09,1.02,20.04,1.43,3.25,upholstery);
 for(const z of [2.7,3.8]){box(.7,.065,.07,20.43,.93,z,studioWood);box(.07,.35,.07,20.75,.74,z,studioWood);}
 const chairPost=mesh(new THREE.CylinderGeometry(.065,.08,.68,10),dark);chairPost.position.set(20.52,.1,3.25);
 for(const angle of [0,Math.PI*.4,Math.PI*.8,Math.PI*1.2,Math.PI*1.6]){
  const foot=box(.05,.05,.65,20.52,-.27,3.25,dark);foot.rotation.y=angle;
 }
 // Small working materials and greenery keep the studio lived in without flattening it.
 for(const [z,count] of [[.35,5],[5.0,4]])for(let i=0;i<count;i++)box(.42,.06,.55,21.42,1.46+i*.063,z+i*.13,i%2?studioCream:studioWood);
 const plantGreen=new THREE.MeshStandardMaterial({color:'#4b6845',roughness:1});
 for(const z of [-.2,6.7]){
  const pot=mesh(new THREE.CylinderGeometry(.26,.19,.38,10),studioCream);pot.position.set(21.65,1.57,z);
  for(let i=0;i<7;i++){const leaf=mesh(new THREE.SphereGeometry(.29,7,5),plantGreen);leaf.scale.set(.48,1.9,.38);leaf.position.set(21.65+(i%3-1)*.2,1.97+(i%2)*.3,z+(i-3)*.13);leaf.rotation.z=(i-3)*.17;}
 }
 for(const z of [.25,6.25]){
  box(.025,1.3,.025,21.9,7.63,z,dark);
  const lamp=mesh(new THREE.CylinderGeometry(.18,.42,.34,14),studioCream);lamp.position.set(21.9,6.85,z);
 }
 for(let i=0;i<18;i++){
  const leaf=mesh(new THREE.SphereGeometry(.25,7,5),plantGreen);leaf.scale.set(.7,1.5,.75);
  leaf.position.set(22.45-(i%3)*.18,7.85-(i%5)*.22,.2+i*.34);
  leaf.rotation.z=(i%4-1.5)*.35;
 }
 const studioLight=new THREE.PointLight('#ffcc91',7,12,2);studioLight.position.set(20.5,5.6,3.25);root.add(studioLight);
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
 return {root,pickables,books,anchors,modelPads,modelPickables};
}
