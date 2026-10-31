import * as THREE from './vendor/three.module.min.js';
import {environmentMaterial} from './environment-materials.js';
import {houseShellFrontZ,ABOUT_PANEL_LEFT_Z,ABOUT_PANEL_HEIGHT} from './house-path.js?v=home-fit-1';

// Connected architecture and independent objects; the room is not a backdrop.
export function buildHouse(scene,{portrait,aboutWall,aboutPaintings,plaqueLogos,rugMap,aspect=16/9}) {
 const root=new THREE.Group();root.name='Connected living, dining and library rooms';scene.add(root);
 const pickables=[],anchors=new Map();
 let seed=21;const rand=()=>{seed=(seed*16807)%2147483647;return(seed-1)/2147483646;};
 function tex(draw,w=768,h=768){const c=document.createElement('canvas');c.width=w;c.height=h;draw(c.getContext('2d'),w,h);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;return t;}
 const red=environmentMaterial('#bd5030'),blue=environmentMaterial('#204b65','painted-wood'),navy=environmentMaterial('#294d65','painted-wood'),cream=environmentMaterial('#e3cfad'),wood=environmentMaterial('#805334','wood'),fabric=environmentMaterial('#30668a','fabric'),rust=environmentMaterial('#cb6b3e','fabric');
 const gold=new THREE.MeshStandardMaterial({color:'#ae793b',metalness:.55,roughness:.52});
 const paleGold=new THREE.MeshStandardMaterial({color:'#d0ab66',metalness:.4,roughness:.6});
 const dark=new THREE.MeshStandardMaterial({color:'#28231b',roughness:.8});
 function mesh(g,m,parent=root){const o=new THREE.Mesh(g,m);parent.add(o);o.castShadow=true;o.receiveShadow=true;return o;}
 function box(w,h,d,x,y,z,m,parent=root){const o=mesh(new THREE.BoxGeometry(w,h,d),m,parent);o.position.set(x,y,z);return o;}
 function roundBox(w,h,d,r,m,parent=root){const s=new THREE.Shape();s.moveTo(-w/2+r,-h/2);s.lineTo(w/2-r,-h/2);s.quadraticCurveTo(w/2,-h/2,w/2,-h/2+r);s.lineTo(w/2,h/2-r);s.quadraticCurveTo(w/2,h/2,w/2-r,h/2);s.lineTo(-w/2+r,h/2);s.quadraticCurveTo(-w/2,h/2,-w/2,h/2-r);s.lineTo(-w/2,-h/2+r);s.quadraticCurveTo(-w/2,-h/2,-w/2+r,-h/2);const geometry=new THREE.ExtrudeGeometry(s,{depth:d,bevelEnabled:true,bevelSize:.04,bevelThickness:.04,bevelSegments:2,steps:1,curveSegments:8});const uv=geometry.attributes.uv,pos=geometry.attributes.position;for(let i=0;i<pos.count;i++)uv.setXY(i,pos.getX(i)/w+.5,pos.getY(i)/h+.5);const o=mesh(geometry,m,parent);o.position.z=-d/2;return o;}
 function ring(w,h,border,m){const s=new THREE.Shape();s.moveTo(-w/2,-h/2);s.lineTo(w/2,-h/2);s.lineTo(w/2,h/2);s.lineTo(-w/2,h/2);s.closePath();const hole=new THREE.Path();hole.moveTo(-w/2+border,-h/2+border);hole.lineTo(-w/2+border,h/2-border);hole.lineTo(w/2-border,h/2-border);hole.lineTo(w/2-border,-h/2+border);hole.closePath();s.holes.push(hole);return mesh(new THREE.ExtrudeGeometry(s,{depth:.09,bevelEnabled:true,bevelSize:.025,bevelThickness:.025,bevelSegments:2,steps:1}),m);}
 function register(o,id){o.traverse(n=>{if(n.isMesh){n.userData.livingId=id;pickables.push(n);}});}
 function wallFrame(w,h,x,y,z){for(const [inset,mat] of [[0,wood],[.13,gold],[.24,dark],[.31,paleGold]]){const o=ring(w-inset,h-inset,.07,mat);o.position.set(x,y,z+inset*.18);} }
 const backWallZ=-6,existingSideEndZ=9.8,frontWallZ=houseShellFrontZ(aspect);
 const shellDepth=frontWallZ-backWallZ;
 const shellCenterZ=(frontWallZ+backWallZ)/2;
 const returnDepth=frontWallZ-existingSideEndZ;
 const returnCenterZ=(frontWallZ+existingSideEndZ)/2;
 // Living room: an open front, red portrait wall and blue woodwork.
 box(15.5,9,.32,-15.25,4,-6,red);
 box(.28,9,16,-23.1,4,1.8,navy);
 box(15.5,.38,.55,-15.25,8.15,-5.85,navy);box(15.5,.08,.62,-15.25,7.88,-5.8,gold);
 for(const y of [.1,.45,.8])box(15.5,.09,.22,-15.25,y,-5.75,y===.45?gold:navy);
 for(const x of [-22.65,-7.85]){box(.32,8.3,.5,x,3.9,-5.72,navy);box(.06,8.3,.54,x+.21,3.9,-5.7,gold);}
 for(const x of [-22.2,-8.3]){const f=ring(1.05,6.8,.075,gold);f.position.set(x,4.3,-5.75);}
 // Coffered ceiling ends at the dividing wall, clear of the overhead table.
 box(15.5,.22,shellDepth,-15.25,8.6,shellCenterZ,wood);
 for(let x=-22.7;x<=-7.7;x+=2.5)box(.12,.17,shellDepth,x,8.4,shellCenterZ,dark);
 for(let z=-5.9;z<=frontWallZ-.9;z+=2.5)box(15.4,.17,.12,-15.25,8.4,z,dark);
 // The dining room bridges both neighboring ceilings so reverse camera views
 // stay inside one connected house shell instead of revealing the open scene.
 box(15.1,.22,shellDepth,0,8.46,shellCenterZ,wood);
 for(let x=-7.3;x<=7.3;x+=2.5)box(.12,.17,shellDepth,x,8.27,shellCenterZ,dark);
 for(let z=-5.9;z<=frontWallZ-.9;z+=2.5)box(15.0,.17,.12,0,8.27,z,dark);
 const rug=mesh(new THREE.PlaneGeometry(12.8,8.2),new THREE.MeshStandardMaterial({map:rugMap,roughness:1}));rug.rotation.x=-Math.PI/2;rug.position.set(-15,-.46,.6);rug.castShadow=false;
 // Portrait uses only the painting area from the user's supplied reference.
 // About wall (build-plan 19.1): the west wall is painted after Donte's reference; the shelving scene
 // in front of it is built in 3D below, leaving open blue wall on the right for the story text.
 if(aboutWall){
  const z0=-5.55,z1=frontWallZ-.45,y0=-.5,y1=8.45,length=z1-z0,height=y1-y0;
  const ppu=Math.min(4096/length,180),W=Math.round(length*ppu),H=Math.round(height*ppu);
  const px=z=>(z1-z)*ppu,py=y=>(y1-y)*ppu;
  const map=tex((c,w,h)=>{
   c.fillStyle='#2f4559';c.fillRect(0,0,w,h);
   for(let i=0;i<900;i++){const x=rand()*w,y=rand()*h;c.fillStyle=rand()<.5?'#3a52671a':'#22374a1a';c.fillRect(x,y,2+rand()*5,20+rand()*90);}
   // Copper skirting and a moulding panel behind the story text, as in the reference.
   c.fillStyle='#a8532c';c.fillRect(0,py(.05),w,.07*ppu);
   c.fillStyle='#283c4f';c.fillRect(0,py(.05)+.07*ppu,w,h);
   c.fillStyle='#a8532c';
   for(const z of [1.5,-5.1])c.fillRect(px(z),py(7.95),.045*ppu,(7.95-.35)*ppu);
   c.fillRect(px(1.5),py(7.95),6.6*ppu,.045*ppu);c.fillRect(px(1.5),py(.35),6.6*ppu,.045*ppu);
  },W,H);
  map.anisotropy=4;
  const wall=mesh(new THREE.PlaneGeometry(length,height),new THREE.MeshBasicMaterial({map,color:'#ececec'}));
  wall.rotation.y=Math.PI/2;wall.position.set(-22.94,(y0+y1)/2,(z0+z1)/2);wall.castShadow=false;
 }
 const portraitMap=tex((c,w,h)=>c.drawImage(portrait,portrait.width*.321,portrait.height*.154,portrait.width*.357,portrait.height*.393,0,0,w,h),768,844);
 wallFrame(4.35,4.75,-15,4.65,-5.72);
 const art=mesh(new THREE.PlaneGeometry(3.98,4.38),new THREE.MeshBasicMaterial({map:portraitMap}));art.position.set(-15,4.65,-5.48);art.castShadow=false;register(art,'about');anchors.set('about',new THREE.Vector3(-15,2.2,-5.25));
 const plaqueDefinitions=[['forbes',-19.1,6.25,'Forbes','30 under 30'],['georgia',-19.1,4.65,'Georgia','500'],['atlanta',-19.1,3.05,'Atlanta','500'],['morehouse',-10.9,6.25,'MOREHOUSE','COLLEGE'],['village',-10.9,4.65,'VILLAGE','MICRO FUND'],['echoing',-10.9,3.05,'ECHOING','GREEN']];
 for(const [id,x,y,title,sub] of plaqueDefinitions){const g=new THREE.Group();root.add(g);g.position.set(x,y,-5.62);const s=new THREE.Shape();const w=1.8,h=1.32,k=.23;for(const [i,p] of [[-w/2+k,-h/2],[w/2-k,-h/2],[w/2,-h/2+k],[w/2,h/2-k],[w/2-k,h/2],[-w/2+k,h/2],[-w/2,h/2-k],[-w/2,-h/2+k]].entries()){i?s.lineTo(...p):s.moveTo(...p);}s.closePath();mesh(new THREE.ExtrudeGeometry(s,{depth:.095,bevelEnabled:true,bevelSize:.035,bevelThickness:.035,bevelSegments:2,steps:1}),gold,g);const map=tex((c,W,H)=>{c.fillStyle='#463125';c.fillRect(0,0,W,H);for(let i=0;i<6000;i++){c.fillStyle=`rgba(205,150,78,${rand()*.1})`;c.fillRect(rand()*W,rand()*H,rand()*16,rand()*8);}c.strokeStyle='#a47943';c.lineWidth=3;c.strokeRect(30,30,W-60,H-60);const logo=plaqueLogos?.[id];if(logo){const k=Math.min(500/logo.width,300/logo.height);c.drawImage(logo,(W-logo.width*k)/2,(H-logo.height*k)/2,logo.width*k,logo.height*k);return;}c.fillStyle='#e1c085';c.textAlign='center';c.font=`${id==='morehouse'?46:id==='echoing'?56:72}px Georgia`;c.fillText(title,W/2,H*.43);c.font=`${sub==='500'?100:sub==='30 under 30'?56:35}px Georgia`;c.fillText(sub,W/2,H*.72);c.font='14px Georgia';c.fillText(id==='morehouse'?'EDUCATION':'DONTE MILLER',W/2,H*.9);},640,440);const face=mesh(new THREE.PlaneGeometry(w-.16,h-.13),new THREE.MeshBasicMaterial({map}),g);face.position.z=.15;register(g,id);anchors.set(id,new THREE.Vector3(x,y,-5.25));}
 // Sofa after the reference painting: one deep seat, three square back cushions,
 // fringed piping on every edge and a full tasseled skirt in place of legs.
 const sofa=new THREE.Group();root.add(sofa);sofa.position.set(-15,0,-3.85);
 let sofaSeed=7;const sofaRand=()=>((sofaSeed=sofaSeed*16807%2147483647)-1)/2147483646;
 const velvetMap=tex((c,W,H)=>{c.fillStyle='#d5d5d5';c.fillRect(0,0,W,H);for(let i=0;i<34;i++){const x=sofaRand()*W,y=sofaRand()*H,r=40+sofaRand()*120,g=c.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,i%3?'rgba(255,255,255,.2)':'rgba(30,30,30,.14)');g.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=g;c.fillRect(0,0,W,H);}for(let i=0;i<900;i++){c.save();c.translate(sofaRand()*W,sofaRand()*H);c.rotate(-.7+(sofaRand()-.5)*.5);c.fillStyle=i%3?'rgba(255,255,255,.07)':'rgba(30,30,30,.07)';c.fillRect(0,0,14+sofaRand()*46,2+sofaRand()*5);c.restore();}},512,512);
 const velvet=new THREE.MeshStandardMaterial({color:'#30668a',map:velvetMap,roughness:.92});
 const strandMap=tex((c,W,H)=>{c.fillStyle='#d5d5d5';c.fillRect(0,0,W,H);for(let x=0;x<W;x+=2){c.fillStyle=sofaRand()<.5?'rgba(255,255,255,.16)':'rgba(40,40,40,.16)';c.fillRect(x,0,1+sofaRand()*1.5,H);}},128,128);
 const strands=new THREE.MeshStandardMaterial({color:'#cb6b3e',map:strandMap,roughness:1});
 function pad(w,h,d,r,x,y,z,m=velvet){const o=roundBox(w,h,d,r,m,sofa);o.position.set(x,y,z-d/2);return o;}
 const tuftPoses=[],up=new THREE.Vector3(0,-1,0);
 function fringe(a,b,n,dir){const q=new THREE.Quaternion().setFromUnitVectors(up,dir.clone().normalize());for(let i=0;i<n;i++){const p=a.clone().lerp(b,(i+.5)/n);tuftPoses.push([p,q,.8+sofaRand()*.45]);}}
 function fringeRing(center,radius,n,axis='z',sx=1,sy=1){for(let i=0;i<n;i++){const t=i/n*Math.PI*2,d=axis==='z'?new THREE.Vector3(Math.cos(t)*sx,Math.sin(t)*sy,0):new THREE.Vector3(0,Math.sin(t),Math.cos(t));const p=center.clone().addScaledVector(d,radius);tuftPoses.push([p,new THREE.Quaternion().setFromUnitVectors(up,d.normalize()),.75+sofaRand()*.4]);}}
 function piping(a,b){const v=new THREE.Vector3().subVectors(b,a),o=mesh(new THREE.CylinderGeometry(.034,.034,v.length(),8),rust,sofa);o.position.copy(a).lerp(b,.5);o.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),v.normalize());}
 const V=(x,y,z)=>new THREE.Vector3(x,y,z),down=V(0,-1,0);
 box(7.6,.72,1.8,0,.31,0,velvet,sofa);
 pad(7.5,.36,1.72,.14,0,.86,.06);
 box(7.5,1,.34,0,1.15,-.74,velvet,sofa);
 piping(V(-3.75,1.06,.98),V(3.75,1.06,.98));fringe(V(-3.7,1.04,1),V(3.7,1.04,1),220,down);
 piping(V(-3.8,.67,.92),V(3.8,.67,.92));fringe(V(-3.75,.65,.94),V(3.75,.65,.94),200,down);
 piping(V(-3.82,-.03,.92),V(3.82,-.03,.92));
 for(const x of [-2.47,0,2.47]){pad(2.4,1.08,.42,.2,x,1.56,-.42);const f=-.16,l=x-1.2,r=x+1.2,b=1.02,t=2.1;piping(V(l,t,f),V(r,t,f));piping(V(l,b+.08,f),V(l,t,f));piping(V(r,b+.08,f),V(r,t,f));fringe(V(l+.05,t+.02,f),V(r-.05,t+.02,f),56,V(0,1,.25));fringe(V(l-.02,b+.12,f),V(l-.02,t-.05,f),24,V(-1,0,.2));fringe(V(r+.02,b+.12,f),V(r+.02,t-.05,f),24,V(1,0,.2));}
 for(const x of [-3.82,3.82]){const arm=mesh(new THREE.CylinderGeometry(.34,.34,1.9,24),velvet,sofa);arm.rotation.x=Math.PI/2;arm.position.set(x,1.12,.02);const end=mesh(new THREE.TorusGeometry(.3,.03,6,28),rust,sofa);end.position.set(x,1.12,.98);fringeRing(V(x,1.12,.99),.32,54);}
 // Thick tassels along the front and sides, knot over a flared skirt, down to the rug.
 const tasselSpots=[];for(let i=0;i<30;i++)tasselSpots.push([-3.68+i*7.36/29,.94]);for(const x of [-3.86,3.86])for(let i=0;i<7;i++)tasselSpots.push([x,-.72+i*.24]);
 const knots=new THREE.InstancedMesh(new THREE.SphereGeometry(.075,10,8),strands,tasselSpots.length),skirts=new THREE.InstancedMesh(new THREE.CylinderGeometry(.05,.14,.34,12),strands,tasselSpots.length),pose=new THREE.Object3D();
 tasselSpots.forEach(([x,z],i)=>{pose.position.set(x,-.09,z);pose.rotation.set(0,0,0);pose.scale.setScalar(1);pose.updateMatrix();knots.setMatrixAt(i,pose.matrix);pose.position.y=-.29;pose.rotation.y=sofaRand()*3;pose.scale.set(.95+sofaRand()*.15,1,.95+sofaRand()*.15);pose.updateMatrix();skirts.setMatrixAt(i,pose.matrix);});
 for(const t of [knots,skirts]){t.castShadow=t.receiveShadow=true;sofa.add(t);}
 // Plump fringed pillows and a gathered bolster, reshaped from the original three.
 for(const x of [-1.5,1.65]){const p=mesh(new THREE.SphereGeometry(.48,24,16),rust,sofa);p.scale.set(1.12,1,.5);p.position.set(x,1.5,.08);p.rotation.z=x*.13;const rim=mesh(new THREE.TorusGeometry(.48,.045,8,40),rust,sofa);rim.scale.set(1.12,1,1);rim.position.copy(p.position);rim.rotation.z=p.rotation.z;fringeRing(p.position.clone().add(V(0,0,.02)),.49,76,'z',1.12,1);}
 const bolster=mesh(new THREE.CylinderGeometry(.3,.3,1.6,24),rust,sofa);bolster.rotation.z=Math.PI/2;bolster.position.set(0,1.36,.42);
 for(const s of [-1,1]){const cap=mesh(new THREE.ConeGeometry(.3,.16,24),rust,sofa);cap.rotation.z=-s*Math.PI/2;cap.position.set(s*.88,1.36,.42);fringeRing(V(s*.8,1.36,.42),.31,48,'x');for(const u of [-.45,.45]){const band=mesh(new THREE.TorusGeometry(.305,.018,6,28),strands,sofa);band.rotation.y=Math.PI/2;band.position.set(u,1.36,.42);}}
 const tufts=new THREE.InstancedMesh(new THREE.CylinderGeometry(.022,.032,.065,5).translate(0,-.03,0),strands,tuftPoses.length);
 tuftPoses.forEach(([p,q,s],i)=>{pose.position.copy(p);pose.quaternion.copy(q);pose.scale.set(1,s,1);pose.updateMatrix();tufts.setMatrixAt(i,pose.matrix);});tufts.castShadow=true;sofa.add(tufts);
 // Blue-and-white porcelain lamps echo the supplied room.
 const chinaMap=tex((c,W,H)=>{c.fillStyle='#e7ddc5';c.fillRect(0,0,W,H);c.strokeStyle='#24476a';for(let i=0;i<120;i++){const x=rand()*W,y=rand()*H;c.beginPath();c.ellipse(x,y,8+rand()*10,14+rand()*18,rand()*3,0,Math.PI*2);c.lineWidth=3;c.stroke();}for(const y of [10,30,H-30,H-10]){c.fillStyle='#214768';c.fillRect(0,y,W,5);}},512,768);
 const china=new THREE.MeshStandardMaterial({map:chinaMap,roughness:.6});
 function lamp(x,z){box(1.45,.13,1.1,x,.72,z,wood);for(const a of [-.54,.54])for(const b of [-.38,.38])box(.07,1.18,.07,x+a,.1,z+b,wood);const points=[[.12,0],[.35,.12],[.36,.55],[.21,.9],[.14,1.02]].map(p=>new THREE.Vector2(...p));const vase=mesh(new THREE.LatheGeometry(points,24),china);vase.position.set(x,.8,z);const stem=mesh(new THREE.CylinderGeometry(.035,.035,.5,10),gold);stem.position.set(x,1.95,z);const shade=mesh(new THREE.LatheGeometry([[.58,-.32],[.55,-.19],[.46,.02],[.31,.19],[.12,.28],[.05,.3]].map(p=>new THREE.Vector2(...p)),24),new THREE.MeshStandardMaterial({color:'#f6dbad',roughness:1,side:THREE.DoubleSide,emissive:'#bd782b',emissiveIntensity:.25}));shade.position.set(x,2.35,z);for(let i=0;i<10;i++){const a=i*Math.PI/5;const curve=new THREE.CatmullRomCurve3([[.58,-.32],[.46,.02],[.12,.28]].map(([r,h])=>new THREE.Vector3(x+Math.cos(a)*r,2.35+h,z+Math.sin(a)*r)));mesh(new THREE.TubeGeometry(curve,8,.009,3,false),dark);}const rim=mesh(new THREE.TorusGeometry(.58,.022,6,28),dark);rim.rotation.x=Math.PI/2;rim.position.set(x,2.03,z);const light=new THREE.PointLight('#ffd19a',7,5,2);light.position.set(x,2.12,z);root.add(light);const jar=mesh(new THREE.LatheGeometry(points,20),china);jar.scale.set(.7,.7,.7);jar.position.set(x,-.45,z);}
 lamp(-19.9,-4.55);lamp(-10.1,-4.55);
 // About wall shelving scene in 3D, laid out from Donte's reference image: px/py are pixels in the
 // 1024×955 reference, mapped onto the wall (left edge ABOUT_PANEL_LEFT_Z, bottom at the floor).
 if(aboutWall){
  const wallX=-22.94,k=ABOUT_PANEL_HEIGHT/aboutWall.height,Z=px=>ABOUT_PANEL_LEFT_Z-px*k,Y=py=>-.5+(aboutWall.height-py)*k;
  const shelfWood=environmentMaterial('#a4552f','wood'),darkWood=environmentMaterial('#7c3b22','wood');
  const crop=(x0,y0,x1,y1)=>tex((c,w,h)=>c.drawImage(aboutWall,x0,y0,x1-x0,y1-y0,0,0,w,h),Math.round((x1-x0)*2),Math.round((y1-y0)*2));
  const onWall=(o,depth)=>{o.rotation.y=Math.PI/2;o.position.x=wallX+depth;return o;};
  // Étagère: two towers of turned posts and shelves on cabinets, joined by a top shelf and plinth.
  const top=Y(150),cabinetTop=Y(822),floor=-.5,depth=.52;
  function tower(left,right,shelves){
   const z0=Z(left),z1=Z(right),w=z0-z1,zc=(z0+z1)/2;
   box(depth,cabinetTop-floor-.28,w,wallX+depth/2,(cabinetTop+floor+.28)/2,zc,shelfWood);
   box(.03,(cabinetTop-floor-.28)*.72,w*.78,wallX+depth+.01,(cabinetTop+floor+.28)/2,zc,darkWood);
   for(const py of shelves)box(depth,.05,w,wallX+depth/2,Y(py),zc,shelfWood);
   for(const z of [z0-.05,z1+.05])for(const x of [wallX+.06,wallX+depth-.05]){
    const post=mesh(new THREE.CylinderGeometry(.04,.045,top-cabinetTop,10),shelfWood);post.position.set(x,(top+cabinetTop)/2,z);
    for(const py of shelves){const knob=mesh(new THREE.SphereGeometry(.06,10,8),shelfWood);knob.position.set(x,Y(py)+.06,z);}
   }
  }
  tower(210,362,[318,452,597,735]);tower(655,812,[312,455,597,735]);
  box(depth+.08,.11,Z(205)-Z(822),wallX+(depth+.08)/2,top,(Z(205)+Z(822))/2,shelfWood);
  box(depth+.12,.06,Z(198)-Z(830),wallX+(depth+.12)/2,top+.08,(Z(198)+Z(830))/2,darkWood);
  box(depth+.1,.3,Z(205)-Z(815),wallX+(depth+.1)/2,floor+.15,(Z(205)+Z(815))/2,darkWood);
  // Paintings: 3D frames around the artwork cropped from the reference.
  function painting(x0,y0,x1,y1,depthOut=.05,inset=10,lean=0,image=null){
   const w=(x1-x0)*k,h=(y1-y0)*k,g=new THREE.Group();root.add(g);
   const map=image?tex((c,W,H)=>c.drawImage(image,0,0,W,H),image.width,image.height):crop(x0+inset,y0+inset,x1-inset,y1-inset);
   const art=mesh(new THREE.PlaneGeometry(w-2*inset*k,h-2*inset*k),new THREE.MeshBasicMaterial({map,color:'#e6e6e6'}),g);art.position.z=.06;art.castShadow=false;
   const f=ring(w,h,inset*k+.02,gold);g.add(f);f.position.set(0,0,0);
   onWall(g,depthOut);g.position.y=Y((y0+y1)/2);g.position.z=Z((x0+x1)/2);g.rotation.z=0;if(lean)g.rotateX(-lean);return g;
  }
  // The two centre paintings are Donte's family portraits, framed to each image's own proportions
  // (portrait on top; landscape below, filling the gap between the towers). Without them, the reference crops show.
  if(aboutPaintings?.father)painting(435.7,187,587.3,405,.05,10,0,aboutPaintings.father);else painting(425,187,598,405);
  if(aboutPaintings?.family)painting(380,462.7,642,665.3,.05,14,0,aboutPaintings.family);else painting(398,430,623,698,.05,14);
  painting(243,343,325,443,.14,7,.08);painting(248,490,318,585,.14,7,.08);painting(683,355,785,445,.16,8,.06);painting(700,620,765,720,.16,6,.08);
  // Blue-and-white plates on the top shelf and the right tower.
  function plate(cx,cy,r,depthOut=.12){const d=mesh(new THREE.CircleGeometry(r*k,32),new THREE.MeshBasicMaterial({map:crop(cx-r,cy-r,cx+r,cy+r),color:'#e8e8e8'}));onWall(d,depthOut);d.position.set(wallX+depthOut,Y(cy),Z(cx));d.rotateX(-.12);const rim=mesh(new THREE.TorusGeometry(r*k,.015,6,32),china);onWall(rim,depthOut);rim.position.set(wallX+depthOut,Y(cy),Z(cx));rim.rotateX(-.12);}
  plate(415,110,34);plate(505,108,48);plate(606,113,33);plate(732,540,36,.2);plate(310,770,30,.2);
  // Porcelain vases and the central planter with orange flowers.
  function vase(px,py,h,r,x=.3){const pts=[[.55,0],[.9,.2],[1,.5],[.7,.85],[.45,1]].map(([a,b])=>new THREE.Vector2(a*r,b*h));const v=mesh(new THREE.LatheGeometry(pts,24),china);v.position.set(wallX+x,Y(py),Z(px));return v;}
  vase(518,925,.75,.42,.6);vase(400,868,.5,.24,.32);vase(720,300,.42,.22,.27);vase(722,592,.3,.17,.27);vase(300,262,.38,.17,.27);vase(296,445,.18,.1,.27);vase(778,590,.3,.08,.27);
  const books=[['#7c3b22','#c9a46a','#2f4c66','#e3cfad'],['#a4552f','#e3cfad','#5b3a26','#3c5a75']];
  for(const [px,py,n,set] of [[410,930,4,0],[730,820,6,1],[732,708,2,0]])for(let i=0;i<n;i++)box(.42,.07,(px>600?.8:.75)-i*.02,wallX+.3,Y(py)+.035+i*.075,Z(px),environmentMaterial(books[set][i%4],'fabric'));
  // Plants: one instanced set of leaves for the vines, shelf plants and the fiddle-leaf fig.
  const leafShape=new THREE.Shape();leafShape.moveTo(0,0);leafShape.quadraticCurveTo(.55,.42,0,1);leafShape.quadraticCurveTo(-.55,.42,0,0);
  const leafGeometry=new THREE.ShapeGeometry(leafShape,4),leaves=[],greens=['#3f6b3a','#56803f','#2f5532','#6f9a4c','#486f35'];
  const addLeaf=(x,y,z,size,down=false)=>leaves.push({x,y,z,size,rx:(rand()-.5)*1.6,ry:rand()*Math.PI*2,rz:down?Math.PI+(rand()-.5)*1.4:(rand()-.5)*2.4,c:greens[Math.floor(rand()*greens.length)]});
  const cluster=(px,py,n,spread,size,x=.3)=>{for(let i=0;i<n;i++)addLeaf(wallX+x+(rand()-.3)*.35,Y(py)+(rand()-.3)*spread,Z(px)+(rand()-.5)*spread*1.4,size*(.7+rand()*.5));};
  const vine=(px,py,lengthPx,size,x=.45)=>{let z=Z(px),y=Y(py);const steps=Math.round(lengthPx/14);for(let i=0;i<steps;i++){z+=(rand()-.5)*.09;y-=14*k;addLeaf(wallX+x+(rand()-.5)*.15,y,z+(rand()-.5)*.12,size*(.75+rand()*.5),true);}};
  cluster(300,190,110,.75,.22);cluster(220,250,90,.7,.21);cluster(380,170,40,.45,.18);cluster(720,170,90,.7,.21);cluster(770,260,60,.55,.2);cluster(660,175,30,.4,.18);
  for(const [px,len] of [[140,320],[165,260],[195,290],[230,180],[270,150],[330,130],[380,100],[625,220],[650,170],[700,140],[760,200],[795,250],[825,190]])vine(px,165,len,.18);
  cluster(270,680,55,.45,.19);cluster(320,700,40,.4,.17);cluster(730,680,50,.42,.18);cluster(255,812,24,.3,.15);cluster(745,262,30,.32,.16);cluster(300,250,25,.3,.16);
  cluster(518,815,40,.45,.16,.55);
  // Fiddle-leaf fig at the left in a terracotta pot.
  const potPts=[[.3,0],[.36,.05],[.42,.55],[.46,.6],[.46,.66]].map(([a,b])=>new THREE.Vector2(a,b));const pot=mesh(new THREE.LatheGeometry(potPts,24),rust);pot.position.set(wallX+.75,-.5,Z(130));
  const stem=mesh(new THREE.CylinderGeometry(.03,.04,3.3,8),darkWood);stem.position.set(wallX+.75,1.75,Z(130));
  for(let i=0;i<70;i++){const t=i/70,a=rand()*Math.PI*2;addLeaf(wallX+.75+Math.cos(a)*.7*(1-t*.35),.7+t*3.4,Z(130)+Math.sin(a)*.8*(1-t*.3),.5+rand()*.22);}
  const leafMesh=new THREE.InstancedMesh(leafGeometry,new THREE.MeshStandardMaterial({color:'#ffffff',roughness:.8,side:THREE.DoubleSide}),leaves.length);
  const dummy=new THREE.Object3D(),colour=new THREE.Color();
  leaves.forEach((l,i)=>{dummy.position.set(l.x,l.y,l.z);dummy.rotation.set(l.rx,l.ry,l.rz);dummy.scale.setScalar(l.size);dummy.updateMatrix();leafMesh.setMatrixAt(i,dummy.matrix);leafMesh.setColorAt(i,colour.set(l.c));});
  leafMesh.castShadow=true;leafMesh.receiveShadow=true;root.add(leafMesh);
  // Orange flowers above the central planter.
  const flowers=new THREE.InstancedMesh(new THREE.IcosahedronGeometry(.045,0),new THREE.MeshStandardMaterial({color:'#ffffff',roughness:.7}),220),oranges=['#e8552b','#f06a35','#d9481f','#f28a4a'];
  for(let i=0;i<220;i++){const a=rand()*Math.PI,b=rand()*Math.PI*.5,r=.75+rand()*.25;dummy.position.set(wallX+.6+Math.cos(a)*Math.sin(b)*.42*r,Y(830)+Math.cos(b)*.62*r,Z(510)+Math.sin(a)*Math.sin(b)*-.95*r+(rand()-.5)*.25);dummy.rotation.set(0,0,0);dummy.scale.setScalar(.7+rand()*.7);dummy.updateMatrix();flowers.setMatrixAt(i,dummy.matrix);flowers.setColorAt(i,colour.set(oranges[i%4]));}
  root.add(flowers);
 }
 // The dividing wall has an actual opening: z=1.1..5.5, x=-7.5.
 box(.35,8.8,7.1,-7.5,3.9,-2.45,cream);box(.35,8.8,4.4,-7.5,3.9,7.7,cream);
 const opening=new THREE.Shape();opening.moveTo(1.1,5.0);opening.quadraticCurveTo(1.5,6.35,3.3,7.0);opening.quadraticCurveTo(5.1,6.35,5.5,5.0);opening.lineTo(5.5,8.3);opening.lineTo(1.1,8.3);opening.closePath();const archTop=mesh(new THREE.ExtrudeGeometry(opening,{depth:.35,bevelEnabled:false,steps:1,curveSegments:28}),cream);archTop.rotation.y=-Math.PI/2;archTop.position.x=-7.32;
 for(const z of [1.04,5.56]){box(.66,5.4,.32,-7.5,2.2,z,cream);box(.78,.18,.5,-7.5,4.95,z,paleGold);box(.83,.22,.55,-7.5,-.28,z,cream);for(const dz of [-.08,.08])box(.72,4.9,.025,-7.5,2.25,z+dz,paleGold);}
 const archCurve=new THREE.CatmullRomCurve3([new THREE.Vector3(-7.75,5.0,1.04),new THREE.Vector3(-7.75,6.17,1.85),new THREE.Vector3(-7.75,6.95,3.3),new THREE.Vector3(-7.75,6.17,4.75),new THREE.Vector3(-7.75,5.0,5.56)]);mesh(new THREE.TubeGeometry(archCurve,48,.055,6,false),paleGold);
 // Dining room: cream architecture, indigo painted mural and a suspended lantern.
 box(15.2,8.8,.3,0,3.9,-6,cream);
 // Continuous exterior wall behind the camera closes the living/dining shell;
 // the interior route still crosses the side archways at x=-7.5 and x=7.6.
 box(15.5,9,.3,-15.25,4,frontWallZ,red);
 box(15.1,8.8,.3,0,3.9,frontWallZ,cream);
 // Join the side walls to the front wall. These returns remain behind the
 // navigation portals and prevent reverse/direct travel from exposing voids.
 box(.28,9,returnDepth,-23.1,4,returnCenterZ,navy);
 box(.35,8.8,returnDepth,-7.5,3.9,returnCenterZ,cream);
 box(.3,8.8,returnDepth,7.6,3.9,returnCenterZ,cream);
 for(const x of [-23.1,-7.5])box(.1,.12,returnDepth,x,.12,returnCenterZ,x===-23.1?gold:wood);
 box(.1,.12,returnDepth,7.6,.12,returnCenterZ,wood);
 for(const x of [-22.65,-7.85])box(.3,8.3,.42,x,3.9,frontWallZ-.26,navy);
 for(const y of [.1,.45,.8])box(15.4,.09,.16,-15.25,y,frontWallZ-.26,y===.45?gold:navy);
 for(const y of [.05,.35,.72])box(15.0,.08,.16,0,y,frontWallZ-.26,wood);
 // The library continues through a matching opening in the dining room's right wall.
 box(.3,8.8,7.1,7.6,3.9,-2.45,cream);box(.3,8.8,4.4,7.6,3.9,7.7,cream);
 box(.3,2.1,4.4,7.6,7.25,3.3,cream);
 for(const z of [1.04,5.56]){box(.52,5.2,.28,7.6,2.1,z,paleGold);box(.68,.18,.5,7.6,4.9,z,wood);}
 for(const y of [-.1,.3,8.0]){box(15.2,.12,.32,0,y,-5.77,wood);box(.32,.12,7.1,7.42,y,-2.45,wood);box(.32,.12,4.4,7.42,y,7.7,wood);}
 const muralMap=tex((c,W,H)=>{c.fillStyle='#26485e';c.fillRect(0,0,W,H);c.fillStyle='#d2be99';c.beginPath();c.moveTo(W*.3,H*.7);c.lineTo(W*.3,H*.36);c.bezierCurveTo(W*.3,H*.18,W*.41,H*.1,W*.5,H*.07);c.bezierCurveTo(W*.59,H*.1,W*.7,H*.18,W*.7,H*.36);c.lineTo(W*.7,H*.7);c.fill();for(let i=0;i<19000;i++){const x=rand()*W,y=rand()*H;c.fillStyle=(y>H*.5?['#26485e24','#3f5d5c40','#d5bc9022']:['#d9c29b18','#81938915','#1e405326'])[i%3];c.fillRect(x,y,rand()*27+1,rand()*10+1);}for(let i=0;i<55;i++){const x=rand()*W,y=H*(.4+rand()*.6);c.strokeStyle='#263e3c55';c.lineWidth=1+rand()*3;c.beginPath();c.moveTo(x,H);c.quadraticCurveTo(x-20,y+70,x+rand()*50-25,y);c.stroke();for(let j=0;j<12;j++){c.fillStyle=j%2?'#33574965':'#65765955';c.beginPath();c.ellipse(x+(rand()-.5)*90,y+rand()*160,4+rand()*14,3+rand()*10,rand()*3,0,Math.PI*2);c.fill();}}},1024,1024);
 wallFrame(10.2,6.65,0,4.12,-5.78);const mural=mesh(new THREE.PlaneGeometry(9.85,6.3),new THREE.MeshStandardMaterial({map:muralMap,roughness:1}));mural.position.set(0,4.12,-5.54);mural.castShadow=false;
 // Recess-like side panels provide depth without obstructing the path.
 for(const x of [-6.3,6.3]){box(1.1,5.4,.15,x,3.3,-5.7,navy);for(const dx of [-.66,.66])box(.14,6.6,.3,x+dx,3.3,-5.44,cream);}
 function plant(x,z){const pot=mesh(new THREE.CylinderGeometry(.35,.27,.65,24),china);pot.position.set(x,-.13,z);for(let j=0;j<5;j++){const h=2.6+rand()*1.9,dx=(rand()-.5)*.65;const stem=mesh(new THREE.CylinderGeometry(.022,.035,h,6),wood);stem.position.set(x+dx,h/2+.1,z);stem.rotation.z=dx*.18;for(let k=0;k<5;k++){const leaf=mesh(new THREE.SphereGeometry(1,7,5),new THREE.MeshStandardMaterial({color:k%2?'#536a42':'#314c39',roughness:1}));leaf.scale.set(.4,.065,.16);leaf.position.set(x+dx+(k%2?.25:-.25),.7+k*.63+rand()*.2,z+(rand()-.5)*.5);leaf.rotation.z=k%2?.5:-.5;leaf.rotation.y=rand()*3;}}}
 plant(-6.1,-3.6);plant(6.1,-3.6);
 const lantern=new THREE.Group();root.add(lantern);lantern.position.set(0,5.5,-2.5);const glass=new THREE.MeshStandardMaterial({color:'#f7d296',transparent:true,opacity:.6,roughness:.5,emissive:'#b97425',emissiveIntensity:.22});const body=mesh(new THREE.CylinderGeometry(.24,.27,.8,6),glass,lantern);for(const y of [-.42,.42]){const band=mesh(new THREE.CylinderGeometry(.29,.29,.055,6),gold,lantern);band.position.y=y;}for(let i=0;i<6;i++){const a=i/6*Math.PI*2;box(.025,.85,.025,Math.cos(a)*.25,0,Math.sin(a)*.25,gold,lantern);}const cap=mesh(new THREE.ConeGeometry(.32,.22,6),gold,lantern);cap.position.y=.53;box(.025,2.15,.025,0,1.65,0,dark,lantern);
 // A few floor inlays join both rooms and make lateral travel easy to read.
 const floorLine=new THREE.MeshStandardMaterial({color:'#b69c76',roughness:1,transparent:true,opacity:.25});
 for(let x=-23;x<8;x+=2)box(.015,.002,22,x,-.493,2,floorLine);
 return {root,pickables,anchors};
}
