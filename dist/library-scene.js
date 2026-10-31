import * as THREE from './vendor/three.module.min.js';
import {environmentMaterial,addTrailingVine} from './environment-materials.js';
import {curricula} from './library-content.js';
import {houseShellFrontZ} from './house-path.js?v=home-fit-1';

export function buildLibrary(scene,{aspect=16/9}={}){
 const root=new THREE.Group();root.name='The library';scene.add(root);
 const pickables=[],books=new Map(),anchors=new Map(),modelPads=new Map(),modelPickables=[];
 const wood=environmentMaterial('#875535','wood');
 const edge=environmentMaterial('#bd874d','wood');
 const blue=environmentMaterial('#26516d','plaster');
 const dark=new THREE.MeshStandardMaterial({color:'#162a38',roughness:1});
 const green=new THREE.MeshStandardMaterial({color:'#4d6547',roughness:1});
 const cream=environmentMaterial('#e4d1ae');
 function mesh(geometry,material,parent=root){const m=new THREE.Mesh(geometry,material);parent.add(m);m.castShadow=true;m.receiveShadow=true;return m;}
 function box(w,h,d,x,y,z,material,parent=root){const m=mesh(new THREE.BoxGeometry(w,h,d),material,parent);m.position.set(x,y,z);return m;}
 function canvasTexture(draw,w=512,h=768){const c=document.createElement('canvas');c.width=w;c.height=h;draw(c.getContext('2d'),w,h);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;return t;}
 const backWallZ=-6,existingSideEndZ=9.7,frontWallZ=houseShellFrontZ(aspect);
 const shellDepth=frontWallZ-backWallZ;
 const shellCenterZ=(frontWallZ+backWallZ)/2;
 const returnDepth=frontWallZ-existingSideEndZ;
 const returnCenterZ=(frontWallZ+existingSideEndZ)/2;
 // The dining-room doorway opens directly into this room, so the camera never fades between spaces.
 box(15.4,8.8,.3,15.3,3.9,-6,blue);box(.3,8.8,15.8,23.1,3.9,1.8,blue);
 // The reference describes a room. Only its central painting is mapped onto the wall;
 // the desk, chair, computer and surrounding decor are separate 3D objects.
 const studioWood=environmentMaterial('#ac794b','wood');
 const deskBlue=environmentMaterial('#386884','painted-wood');
 const studioCream=environmentMaterial('#ead8b9');
 const upholstery=environmentMaterial('#446d89','fabric');
 for(const z of [-.95,7.45])box(.11,8.2,1.4,22.87,3.55,z,studioCream);
 box(.12,.14,7.4,22.85,7.75,3.25,studioWood);box(.12,.14,7.4,22.85,.08,3.25,studioWood);
 const paintingMap=new THREE.TextureLoader().load('/assets/workshop-wall.jpg',()=>window.dispatchEvent(new Event('scene-asset-ready')));
 paintingMap.colorSpace=THREE.SRGBColorSpace;
 // UV crop of the framed painting in the supplied composition (not the desk or wall).
 paintingMap.repeat.set(.445,.38);paintingMap.offset.set(.273,.493);
 const painting=mesh(new THREE.PlaneGeometry(4.92,4.2),new THREE.MeshBasicMaterial({map:paintingMap,side:THREE.DoubleSide}));painting.position.set(22.79,5.4,3.25);painting.rotation.y=-Math.PI/2;painting.castShadow=false;
 // Desk after Donte's studio reference: a thick butcher-block top over two four-drawer pedestals
 // with cup pulls and worn paint, joined by a back panel. Colors are unchanged.
 let deskSeed=29;const deskRand=()=>((deskSeed=deskSeed*16807%2147483647)-1)/2147483646;
 const blockMap=canvasTexture((c,w,h)=>{c.fillStyle='#d5d5d5';c.fillRect(0,0,w,h);for(let y=0;y<h;y+=h/14){c.fillStyle=deskRand()<.5?'rgba(255,255,255,.1)':'rgba(40,30,20,.1)';c.fillRect(0,y,w,h/14);c.fillStyle='rgba(50,30,15,.35)';c.fillRect(0,y,w,1.5);}for(let i=0;i<1400;i++){c.strokeStyle=i%2?'rgba(255,240,215,.08)':'rgba(50,30,15,.09)';c.lineWidth=.5+deskRand();const x=deskRand()*w,y=deskRand()*h;c.beginPath();c.moveTo(x,y);c.lineTo(x+20+deskRand()*90,y+(deskRand()-.5)*2);c.stroke();}},1024,256);
 const blockTop=new THREE.MeshStandardMaterial({color:'#ac794b',map:blockMap,roughness:.8});
 const wornMap=canvasTexture((c,w,h)=>{c.fillStyle='#d5d5d5';c.fillRect(0,0,w,h);for(let i=0;i<500;i++){c.save();c.translate(deskRand()*w,deskRand()*h);c.rotate((deskRand()-.5)*.4);c.fillStyle=i%2?'rgba(255,255,255,.1)':'rgba(30,30,30,.08)';c.fillRect(0,0,6+deskRand()*40,1+deskRand()*3);c.restore();}for(let i=0;i<70;i++){const x=deskRand()<.5?deskRand()*14:w-deskRand()*14,y=deskRand()*h;c.fillStyle='rgba(245,230,205,.45)';c.beginPath();c.ellipse(x,y,2+deskRand()*6,1+deskRand()*4,deskRand()*3,0,Math.PI*2);c.fill();}for(let i=0;i<40;i++){c.fillStyle='rgba(245,230,205,.35)';c.beginPath();c.ellipse(deskRand()*w,deskRand()<.5?deskRand()*12:h-deskRand()*12,3+deskRand()*8,1+deskRand()*3,0,0,Math.PI*2);c.fill();}},256,256);
 const wornBlue=new THREE.MeshStandardMaterial({color:'#386884',map:wornMap,roughness:.9});
 box(1.34,.24,6.8,21.74,1.3,3.25,blockTop);
 box(.06,.92,3.05,22.36,.58,3.25,wornBlue);
 for(const z of [.94,5.56]){
  box(.95,1.5,1.58,21.95,.31,z,wornBlue);
  box(.85,.1,1.48,21.98,-.49,z,wornBlue);
  for(const [y,h] of [[.93,.2],[.58,.38],[.16,.38],[-.26,.38]]){
   box(.03,h,1.46,21.46,y,z,wornBlue);
   for(const [dz,dy,ww,hh] of [[0,h/2-.02,1.46,.03],[0,-h/2+.02,1.46,.03],[.715,0,.03,h],[-.715,0,.03,h]])box(.02,hh,ww,21.435,y+dy,z+dz,wornBlue);
   const pull=mesh(new THREE.CylinderGeometry(.075,.075,.035,16,1,false,0,Math.PI),edge);pull.rotation.set(0,0,Math.PI/2);pull.position.set(21.41,y+(h>.3?.06:0),z);
  }
 }
 // The desk computer is the EnDAO model (build-plan §20.2): its screen shows the deck's first page,
 // and selecting it zooms the camera into the monitor.
 const assetMap=(src,set)=>{const t=new THREE.TextureLoader().load(src,()=>window.dispatchEvent(new Event('scene-asset-ready')));t.colorSpace=THREE.SRGBColorSpace;set?.(t);return t;};
 const monitor=new THREE.Group();root.add(monitor);
 // 50% larger than the first version (bezel .82 × 1.35), with its bottom edge kept at the same height above the stand.
 box(.08,1.23,2.025,22.08,2.285,3.25,dark,monitor);
 const deckScreen=mesh(new THREE.PlaneGeometry(1.77,1.02),new THREE.MeshBasicMaterial({map:assetMap('/assets/workshop/endao-deck-1.webp?v=2',t=>{t.repeat.set(.952,1);t.offset.set(.024,0);})}),monitor);
 deckScreen.position.set(22.03,2.285,3.25);deckScreen.rotation.y=-Math.PI/2;deckScreen.castShadow=false;
 monitor.traverse(o=>{if(o.isMesh){o.userData.modelId='endao';modelPickables.push(o);}});
 modelPads.set('endao',{group:monitor,kind:'screen',home:{position:monitor.position.clone(),rotation:monitor.rotation.clone()},focus:{position:[20.28,2.285,3.25],target:[22.03,2.285,3.25]}});
 // The Worker's Equity Fund is a freestanding whiteboard at the right end of the desk (build-plan §20.1).
 const board=new THREE.Group();root.add(board);board.position.set(21.25,0,7.05);board.rotation.y=-Math.PI/2-.36;
 const boardW=1.3,boardH=2.92,boardY=2.62,aluminium=new THREE.MeshStandardMaterial({color:'#c9ccce',roughness:.35,metalness:.6});
 const face=mesh(new THREE.PlaneGeometry(boardW,boardH),new THREE.MeshBasicMaterial({map:assetMap('/assets/workshop/workers-equity-whiteboard.webp'),color:'#f2f2f2'}),board);face.position.set(0,boardY,.03);face.castShadow=false;
 box(boardW+.12,boardH+.12,.05,0,boardY,0,studioCream,board);
 for(const [w,h,x,y] of [[boardW+.14,.05,0,boardY+boardH/2+.04],[boardW+.14,.05,0,boardY-boardH/2-.04],[.05,boardH+.12,-boardW/2-.05,boardY],[.05,boardH+.12,boardW/2+.05,boardY]])box(w,h,.08,x,y,.02,aluminium,board);
 box(boardW,.04,.16,0,boardY-boardH/2-.09,.09,aluminium,board);
 for(const x of [-.56,.56]){box(.06,boardY-boardH/2+.62,.06,x,(boardY-boardH/2-.62)/2,-.02,aluminium,board);box(.07,.05,.7,x,-.56,-.02,aluminium,board);}
 board.traverse(o=>{if(o.isMesh){o.userData.modelId='workers-equity';modelPickables.push(o);}});
 {const n=new THREE.Vector3(0,0,1).applyAxisAngle(new THREE.Vector3(0,1,0),board.rotation.y),c=new THREE.Vector3(21.25,boardY,7.05);
  modelPads.set('workers-equity',{group:board,kind:'whiteboard',home:{position:board.position.clone(),rotation:board.rotation.clone()},focus:{position:c.clone().addScaledVector(n,3.75).toArray(),target:c.toArray()}});}
 box(.08,.49,.08,22.15,1.55,3.25,edge);box(.44,.035,.46,22.15,1.44,3.25,dark);
 box(.36,.028,.92,21.96,1.43,3.25,studioCream);
 // The Time Bank sketchpad lies on the desk, rather than being printed into the wall image.
 // The Time Bank keeps its sketchpad; the other two models are the whiteboard and the computer.
 const padNames=[['time-bank','THE TIME BANK','03 / CONTRIBUTION',2]];
 for(const [id,title,caption,i] of padNames){
  const group=new THREE.Group();root.add(group);group.position.set(21.52,1.49,1.58+i*1.66);group.rotation.y=Math.PI/2;
  box(1.43,.055,.92,0,0,0,studioCream,group);
  const coverMap=canvasTexture((c,w,h)=>{c.fillStyle=['#b2704e','#416e72','#b28c57'][i];c.fillRect(0,0,w,h);c.strokeStyle='#f1d6a6';c.lineWidth=7;c.strokeRect(18,18,w-36,h-36);c.fillStyle='#fff0cf';c.font='bold 43px Georgia';c.fillText(title,36,185);c.font='22px Georgia';c.fillText(caption,36,245);for(let y=340;y<h-45;y+=43){c.fillStyle='#f6e2be77';c.fillRect(38,y,w-76,2);}},768,512);
  const pageMap=canvasTexture((c,w,h)=>{c.fillStyle='#f3e8d1';c.fillRect(0,0,w,h);c.fillStyle='#3a5961';c.font='bold 30px Georgia';c.fillText(title,40,80);c.font='19px Georgia';c.fillText('WORKING NOTES · DONTE MILLER',40,119);for(let y=155;y<h-35;y+=37){c.fillStyle='#91a9a755';c.fillRect(40,y,w-80,2);}},768,512);
  const page=mesh(new THREE.PlaneGeometry(1.4,.89),new THREE.MeshBasicMaterial({map:pageMap,side:THREE.DoubleSide}),group);page.rotation.set(-Math.PI/2,0,Math.PI);page.position.y=.032;page.castShadow=false;
  const hinge=new THREE.Group();hinge.position.set(0,.066,.43);group.add(hinge);
  const cover=mesh(new THREE.BoxGeometry(1.4,.025,.88),[studioWood,studioWood,new THREE.MeshBasicMaterial({map:coverMap}),studioWood,studioWood,studioWood],hinge);cover.position.z=-.43;cover.rotation.y=Math.PI;cover.castShadow=false;
  box(1.43,.075,.07,0,.06,.43,studioWood,group);
  for(let j=0;j<10;j++){const loop=mesh(new THREE.TorusGeometry(.035,.01,4,10),edge,group);loop.position.set(-.61+j*.135,.095,.43);loop.rotation.x=Math.PI/2;}
  group.traverse(o=>{if(o.isMesh){o.userData.modelId=id;modelPickables.push(o);}});
  modelPads.set(id,{group,hinge,home:{position:group.position.clone(),rotation:group.rotation.clone()}});
 }
 // Wooden swivel chair after Donte's studio reference: curved crest rail and arms, spindles and a centre splat,
 // a round blue cushion and a four-legged base. Its back stays below the EnDAO camera (y 1.55).
 const chair=new THREE.Group();root.add(chair);chair.position.set(20.52,0,3.25);
 const arc=(radius,tube,y,from,span)=>{const g=new THREE.Group();g.rotation.y=-from;g.position.y=y;chair.add(g);const t=mesh(new THREE.TorusGeometry(radius,tube,8,32,span),studioWood,g);t.rotation.x=Math.PI/2;return t;};
 const seat=mesh(new THREE.CylinderGeometry(.46,.44,.08,32),studioWood,chair);seat.position.y=.5;
 const cushion=mesh(new THREE.CylinderGeometry(.4,.42,.1,32),upholstery,chair);cushion.position.y=.59;
 const roll=mesh(new THREE.TorusGeometry(.4,.05,8,32),upholstery,chair);roll.rotation.x=Math.PI/2;roll.position.y=.62;
 arc(.47,.04,.88,Math.PI-1.75,3.5);
 arc(.47,.055,1.3,Math.PI-.95,1.9);
 for(const t of [-1.6,-1.2,-.75,.75,1.2,1.6]){const a=Math.PI+t*.55,sp=mesh(new THREE.CylinderGeometry(.018,.018,.42,6),studioWood,chair);sp.position.set(Math.cos(a)*.47,1.09,Math.sin(a)*.47);}
 const splat=mesh(new THREE.BoxGeometry(.035,.72,.24),studioWood,chair);splat.position.set(-.47,.92,0);
 for(const a of [Math.PI-1.75,Math.PI+1.75]){const post=mesh(new THREE.CylinderGeometry(.025,.025,.32,8),studioWood,chair);post.position.set(Math.cos(a)*.47,.7,Math.sin(a)*.47);}
 const column=mesh(new THREE.CylinderGeometry(.06,.075,.62,12),studioWood,chair);column.position.y=.15;
 const hub=mesh(new THREE.SphereGeometry(.1,12,8),studioWood,chair);hub.position.y=-.16;
 for(let i=0;i<4;i++){const a=Math.PI/4+i*Math.PI/2,c=Math.cos(a),z=Math.sin(a);const curve=new THREE.CatmullRomCurve3([new THREE.Vector3(0,-.16,0),new THREE.Vector3(c*.25,-.3,z*.25),new THREE.Vector3(c*.48,-.44,z*.48),new THREE.Vector3(c*.56,-.43,z*.56)]);mesh(new THREE.TubeGeometry(curve,16,.035,8,false),studioWood,chair);const foot=mesh(new THREE.SphereGeometry(.045,8,6),studioWood,chair);foot.position.set(c*.56,-.45,z*.56);}
 // Small working materials and greenery keep the studio lived in without flattening it.
 for(const [z,count] of [[.35,5],[5.9,4]])for(let i=0;i<count;i++)box(.42,.06,.55,21.42,1.46+i*.063,z+i*.13,i%2?studioCream:studioWood);
 // Desk plants sit on the butcher-block top behind the book stacks: a rimmed pot, soil and arching leaf blades.
 const bladeShape=new THREE.Shape();bladeShape.moveTo(0,0);bladeShape.bezierCurveTo(.13,.1,.12,.28,0,.4);bladeShape.bezierCurveTo(-.12,.28,-.13,.1,0,0);
 const blade=new THREE.ShapeGeometry(bladeShape,6),leafMat=new THREE.MeshStandardMaterial({color:'#4b6845',roughness:1,side:THREE.DoubleSide});
 let plantSeed=13;const plantRand=()=>((plantSeed=plantSeed*16807%2147483647)-1)/2147483646;
 for(const z of [.12,6.38]){
  const pot=mesh(new THREE.LatheGeometry([[0,0],[.16,0],[.19,.04],[.22,.28],[.25,.29],[.25,.34],[0,.34]].map(p=>new THREE.Vector2(...p)),18),studioCream);pot.position.set(21.95,1.42,z);
  const soil=mesh(new THREE.CircleGeometry(.22,18),dark);soil.rotation.x=-Math.PI/2;soil.position.set(21.95,1.74,z);
  const leaves=new THREE.InstancedMesh(blade,leafMat,26),pose=new THREE.Object3D();
  for(let i=0;i<26;i++){const a=i*2.4+plantRand()*.5,tilt=.25+plantRand()*.9;pose.position.set(21.95+Math.cos(a)*.05,1.73,z+Math.sin(a)*.05);pose.rotation.set(0,-a+Math.PI/2,0);pose.rotateX(tilt);pose.scale.setScalar(.8+plantRand()*.7);pose.updateMatrix();leaves.setMatrixAt(i,pose.matrix);}
  leaves.castShadow=true;root.add(leaves);
 }
 for(const z of [.25,6.25]){
  box(.025,1.3,.025,21.9,7.63,z,dark);
  const lamp=mesh(new THREE.CylinderGeometry(.18,.42,.34,14),studioCream);lamp.position.set(21.9,6.85,z);
 }
 for(const [z,length] of [[.25,2.5],[6.1,3.4],[6.75,2]])addTrailingVine(root,{x:22.38,y:8.05,z,length,seed:Math.round(z*20)+9});
 const studioLight=new THREE.PointLight('#ffcc91',7,12,2);studioLight.position.set(20.5,5.6,3.25);root.add(studioLight);
 box(15.2,.25,shellDepth,15.3,8.45,shellCenterZ,dark);
 // Complete the shared outer shell behind the camera path. This joins the
 // living/dining return wall while leaving the east-west archways unobstructed.
 box(15.2,8.8,.3,15.3,3.9,frontWallZ,blue);
 // The east return completes the four-wall Workshop/Library volume.
 box(.3,8.8,returnDepth,23.1,3.9,returnCenterZ,blue);
 box(.1,.12,returnDepth,23.1,.12,returnCenterZ,edge);
 for(const x of [8.5,22.1])box(.25,8.3,.42,x,3.7,frontWallZ-.26,edge);
 for(const y of [.05,.35,.72])box(15.0,.08,.16,15.3,y,frontWallZ-.26,edge);
 for(const x of [9.5,12.5,15.5,18.5,21.5])box(.1,.12,shellDepth,x,8.26,shellCenterZ,wood);
 for(const y of [-.12,.26,7.95])box(15.2,.12,.35,15.3,y,-5.77,edge);
 const rugMap=canvasTexture((c,w,h)=>{c.fillStyle='#1e4a6c';c.fillRect(0,0,w,h);for(let i=0;i<6;i++){c.strokeStyle=['#d9a35f','#e5c38c','#8f512f'][i%3];c.lineWidth=12-i;c.strokeRect(25+i*16,25+i*16,w-50-i*32,h-50-i*32);}for(let x=70;x<w-70;x+=40)for(let y=70;y<h-70;y+=40){c.fillStyle=(x+y)%3?'#ba6748':'#d5aa78';c.beginPath();c.ellipse(x,y,5,9,0,0,Math.PI*2);c.fill();}},768,512);
 const rug=mesh(new THREE.PlaneGeometry(11.8,7.5),new THREE.MeshStandardMaterial({map:rugMap,roughness:1}));rug.rotation.x=-Math.PI/2;rug.position.set(15.2,-.465,1.4);rug.castShadow=false;
 // Three broad wooden cases, stocked with varied spines around a central course band.
 for(const x of [8.5,13.1,17.7,22.3]){box(.25,7.65,1.2,x,3.36,-4.9,wood);box(.34,7.65,.12,x,3.36,-4.22,edge);}
 for(const y of [.02,2.42,4.96,7.35]){box(14.05,.2,1.25,15.4,y,-4.9,wood);box(14.05,.06,.12,15.4,y-.1,-4.22,edge);}
 let seed=129;const random=()=>{seed=(seed*16807)%2147483647;return(seed-1)/2147483646;};
 const colors=['#9c4d30','#cf9860','#d4b78d','#355a68','#6a754e','#7d5a48','#e0cba0','#ad6d41'];
 for(const row of [0,1,2]){const bottom=[.13,5.08,7.48][row],height=[1.9,1.65,.62][row];for(let x=8.75;x<22.05;){const w=.11+random()*.17,h=height*(.7+random()*.27),z=-4.52+random()*.15;if(row===2&&Math.abs(x-15.4)<.65){x+=.3;continue;}const m=environmentMaterial(colors[Math.floor(random()*colors.length)],'fabric');const book=box(w,h,.58,x+w/2,bottom+h/2,z,m);book.rotation.z=(random()-.5)*.08;if(random()>.8)box(w*.7,.025,.61,x+w/2,bottom+h*.75,z,edge);x+=w+.018;}}
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
 const globe=mesh(new THREE.SphereGeometry(.32,20,12),new THREE.MeshStandardMaterial({color:'#bba26e',roughness:.8}));globe.position.set(15.4,7.99,-4.5);const stand=mesh(new THREE.CylinderGeometry(.025,.04,.32,8),edge);stand.position.set(15.4,7.54,-4.5);
 for(const x of [8.4,22.4]){const pot=mesh(new THREE.CylinderGeometry(.38,.28,.7,12),cream);pot.position.set(x,-.1,-2.8);for(let i=0;i<7;i++){const leaf=mesh(new THREE.SphereGeometry(1,7,5),green);leaf.scale.set(.22,.67,.13);leaf.position.set(x+(random()-.5)*.9,.75+random()*1.4,-2.8+(random()-.5)*.9);leaf.rotation.z=(random()-.5)*1.2;}};
 const light=new THREE.PointLight('#ffcf96',14,23,2);light.position.set(16,6,2);root.add(light);
 return {root,pickables,books,anchors,modelPads,modelPickables};
}
