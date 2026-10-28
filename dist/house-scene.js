import * as THREE from './vendor/three.module.min.js';

// Connected architecture and independent objects; the room is not a backdrop.
export function buildHouse(scene,{portrait, rugMap}) {
 const root=new THREE.Group();root.name='Connected living and dining rooms';scene.add(root);
 const pickables=[],anchors=new Map();
 let seed=21;const rand=()=>{seed=(seed*16807)%2147483647;return(seed-1)/2147483646;};
 function tex(draw,w=768,h=768){const c=document.createElement('canvas');c.width=w;c.height=h;draw(c.getContext('2d'),w,h);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;return t;}
 function paint(color){const base=new THREE.Color(color).convertLinearToSRGB();const map=tex((c,w,h)=>{c.fillStyle=color;c.fillRect(0,0,w,h);for(let i=0;i<9000;i++){const v=.92+rand()*.16;c.fillStyle=`rgba(${Math.round(base.r*255*v)},${Math.round(base.g*255*v)},${Math.round(base.b*255*v)},${.04+rand()*.08})`;c.save();c.translate(rand()*w,rand()*h);c.rotate(-.45+rand()*.4);c.fillRect(0,0,4+rand()*42,1+rand()*8);c.restore();}},512,512);return new THREE.MeshStandardMaterial({map,roughness:1});}
 const red=paint('#a84629'),blue=paint('#183b54'),navy=paint('#243f55'),cream=paint('#d9c3a0'),wood=paint('#633d27'),fabric=paint('#214e70'),rust=paint('#b9562f');
 const gold=new THREE.MeshStandardMaterial({color:'#ae793b',metalness:.55,roughness:.52});
 const paleGold=new THREE.MeshStandardMaterial({color:'#d0ab66',metalness:.4,roughness:.6});
 const dark=new THREE.MeshStandardMaterial({color:'#28231b',roughness:.8});
 function mesh(g,m,parent=root){const o=new THREE.Mesh(g,m);parent.add(o);o.castShadow=true;o.receiveShadow=true;return o;}
 function box(w,h,d,x,y,z,m,parent=root){const o=mesh(new THREE.BoxGeometry(w,h,d),m,parent);o.position.set(x,y,z);return o;}
 function roundBox(w,h,d,r,m,parent=root){const s=new THREE.Shape();s.moveTo(-w/2+r,-h/2);s.lineTo(w/2-r,-h/2);s.quadraticCurveTo(w/2,-h/2,w/2,-h/2+r);s.lineTo(w/2,h/2-r);s.quadraticCurveTo(w/2,h/2,w/2-r,h/2);s.lineTo(-w/2+r,h/2);s.quadraticCurveTo(-w/2,h/2,-w/2,h/2-r);s.lineTo(-w/2,-h/2+r);s.quadraticCurveTo(-w/2,-h/2,-w/2+r,-h/2);const geometry=new THREE.ExtrudeGeometry(s,{depth:d,bevelEnabled:true,bevelSize:.04,bevelThickness:.04,bevelSegments:2,steps:1,curveSegments:8});const uv=geometry.attributes.uv,pos=geometry.attributes.position;for(let i=0;i<pos.count;i++)uv.setXY(i,pos.getX(i)/w+.5,pos.getY(i)/h+.5);const o=mesh(geometry,m,parent);o.position.z=-d/2;return o;}
 function ring(w,h,border,m){const s=new THREE.Shape();s.moveTo(-w/2,-h/2);s.lineTo(w/2,-h/2);s.lineTo(w/2,h/2);s.lineTo(-w/2,h/2);s.closePath();const hole=new THREE.Path();hole.moveTo(-w/2+border,-h/2+border);hole.lineTo(-w/2+border,h/2-border);hole.lineTo(w/2-border,h/2-border);hole.lineTo(w/2-border,-h/2+border);hole.closePath();s.holes.push(hole);return mesh(new THREE.ExtrudeGeometry(s,{depth:.09,bevelEnabled:true,bevelSize:.025,bevelThickness:.025,bevelSegments:2,steps:1}),m);}
 function register(o,id){o.traverse(n=>{if(n.isMesh){n.userData.livingId=id;pickables.push(n);}});}
 function wallFrame(w,h,x,y,z){for(const [inset,mat] of [[0,wood],[.13,gold],[.24,dark],[.31,paleGold]]){const o=ring(w-inset,h-inset,.07,mat);o.position.set(x,y,z+inset*.18);} }
 // Living room: an open front, red portrait wall and blue woodwork.
 box(15.5,9,.32,-15.25,4,-6,red);
 box(.28,9,16,-23.1,4,1.8,navy);
 box(15.5,.38,.55,-15.25,8.15,-5.85,navy);box(15.5,.08,.62,-15.25,7.88,-5.8,gold);
 for(const y of [.1,.45,.8])box(15.5,.09,.22,-15.25,y,-5.75,y===.45?gold:navy);
 for(const x of [-22.65,-7.85]){box(.32,8.3,.5,x,3.9,-5.72,navy);box(.06,8.3,.54,x+.21,3.9,-5.7,gold);}
 for(const x of [-22.2,-8.3]){const f=ring(1.05,6.8,.075,gold);f.position.set(x,4.3,-5.75);}
 // Coffered ceiling ends at the dividing wall, clear of the overhead table.
 box(15.5,.22,15.9,-15.25,8.6,1.65,wood);
 for(let x=-22.7;x<=-7.7;x+=2.5)box(.12,.17,15.9,x,8.4,1.65,dark);
 for(let z=-5.9;z<=9.5;z+=2.5)box(15.4,.17,.12,-15.25,8.4,z,dark);
 const rug=mesh(new THREE.PlaneGeometry(12.8,8.2),new THREE.MeshStandardMaterial({map:rugMap,roughness:1}));rug.rotation.x=-Math.PI/2;rug.position.set(-15,-.46,.6);rug.castShadow=false;
 // Portrait uses only the painting area from the user's supplied reference.
 const portraitMap=tex((c,w,h)=>c.drawImage(portrait,portrait.width*.321,portrait.height*.154,portrait.width*.357,portrait.height*.393,0,0,w,h),768,844);
 wallFrame(4.35,4.75,-15,4.65,-5.72);
 const art=mesh(new THREE.PlaneGeometry(3.98,4.38),new THREE.MeshBasicMaterial({map:portraitMap}));art.position.set(-15,4.65,-5.48);art.castShadow=false;register(art,'about');anchors.set('about',new THREE.Vector3(-15,2.2,-5.25));
 const plaqueDefinitions=[['forbes',-19.1,6.25,'Forbes','30 under 30'],['georgia',-19.1,4.65,'Georgia','500'],['atlanta',-19.1,3.05,'Atlanta','500'],['morehouse',-10.9,6.25,'MOREHOUSE','COLLEGE'],['echoing',-10.9,4.65,'ECHOING','GREEN'],['village',-10.9,3.05,'VILLAGE','MICRO FUND']];
 for(const [id,x,y,title,sub] of plaqueDefinitions){const g=new THREE.Group();root.add(g);g.position.set(x,y,-5.62);const s=new THREE.Shape();const w=1.8,h=1.32,k=.23;for(const [i,p] of [[-w/2+k,-h/2],[w/2-k,-h/2],[w/2,-h/2+k],[w/2,h/2-k],[w/2-k,h/2],[-w/2+k,h/2],[-w/2,h/2-k],[-w/2,-h/2+k]].entries()){i?s.lineTo(...p):s.moveTo(...p);}s.closePath();mesh(new THREE.ExtrudeGeometry(s,{depth:.095,bevelEnabled:true,bevelSize:.035,bevelThickness:.035,bevelSegments:2,steps:1}),gold,g);const map=tex((c,W,H)=>{c.fillStyle='#463125';c.fillRect(0,0,W,H);for(let i=0;i<6000;i++){c.fillStyle=`rgba(205,150,78,${rand()*.1})`;c.fillRect(rand()*W,rand()*H,rand()*16,rand()*8);}c.strokeStyle='#a47943';c.lineWidth=3;c.strokeRect(30,30,W-60,H-60);c.fillStyle='#e1c085';c.textAlign='center';c.font=`${id==='morehouse'?46:id==='echoing'?56:72}px Georgia`;c.fillText(title,W/2,H*.43);c.font=`${sub==='500'?100:sub==='30 under 30'?56:35}px Georgia`;c.fillText(sub,W/2,H*.72);c.font='14px Georgia';c.fillText(id==='morehouse'?'EDUCATION':'DONTE MILLER',W/2,H*.9);},640,440);const face=mesh(new THREE.PlaneGeometry(w-.16,h-.13),new THREE.MeshBasicMaterial({map}),g);face.position.z=.15;register(g,id);anchors.set(id,new THREE.Vector3(x,y,-5.25));}
 // Sofa, rolled arms, cushions, piping and a tasseled skirt.
 const sofa=new THREE.Group();root.add(sofa);sofa.position.set(-15,0,-3.85);
 box(7.8,.48,1.8,0,.35,0,fabric,sofa);box(7.65,.13,1.78,0,.62,.05,rust,sofa);
 const back=roundBox(7.55,1.75,.4,.22,fabric,sofa);back.position.set(0,1.35,-.68);
 box(7.45,.07,.1,0,2.16,-.62,rust,sofa);
 for(const x of [-2.48,0,2.48]){const cushion=roundBox(2.4,.27,1.63,.12,fabric,sofa);cushion.position.set(x,.77,.16);const seam=box(2.33,.025,.035,x,.85,.98,rust,sofa);seam.castShadow=false;const pad=roundBox(2.36,1.3,.31,.2,fabric,sofa);pad.position.set(x,1.5,-.4);for(const u of [-.55,.55]){const button=mesh(new THREE.SphereGeometry(.045,8,6),navy,sofa);button.position.set(x+u,1.6,-.18);}}
 for(const x of [-3.82,3.82]){const arm=mesh(new THREE.CylinderGeometry(.34,.34,1.9,20),fabric,sofa);arm.rotation.x=Math.PI/2;arm.position.set(x,1.12,.02);const end=mesh(new THREE.TorusGeometry(.3,.025,6,24),rust,sofa);end.position.set(x,1.12,1.01);}
 for(let i=0;i<27;i++){const tassel=mesh(new THREE.ConeGeometry(.1,.3,8),rust,sofa);tassel.rotation.z=Math.PI;tassel.position.set(-3.65+i*.28,-.02,1.02);}
 for(const x of [-3.5,3.5])for(const z of [-.6,.65])box(.12,.32,.12,x,-.18,z,wood,sofa);
 for(const x of [-1.5,1.65]){const p=mesh(new THREE.SphereGeometry(.48,18,12),rust,sofa);p.scale.set(1.1,1,.58);p.position.set(x,1.22,.05);p.rotation.z=x*.13;}
 const bolster=mesh(new THREE.CylinderGeometry(.31,.31,1.6,20),rust,sofa);bolster.rotation.z=Math.PI/2;bolster.position.set(0,1.1,.3);
 // Blue-and-white porcelain lamps echo the supplied room.
 const chinaMap=tex((c,W,H)=>{c.fillStyle='#e7ddc5';c.fillRect(0,0,W,H);c.strokeStyle='#24476a';for(let i=0;i<120;i++){const x=rand()*W,y=rand()*H;c.beginPath();c.ellipse(x,y,8+rand()*10,14+rand()*18,rand()*3,0,Math.PI*2);c.lineWidth=3;c.stroke();}for(const y of [10,30,H-30,H-10]){c.fillStyle='#214768';c.fillRect(0,y,W,5);}},512,768);
 const china=new THREE.MeshStandardMaterial({map:chinaMap,roughness:.6});
 function lamp(x,z){box(1.45,.13,1.1,x,.72,z,wood);for(const a of [-.54,.54])for(const b of [-.38,.38])box(.07,1.18,.07,x+a,.1,z+b,wood);const points=[[.12,0],[.35,.12],[.36,.55],[.21,.9],[.14,1.02]].map(p=>new THREE.Vector2(...p));const vase=mesh(new THREE.LatheGeometry(points,24),china);vase.position.set(x,.8,z);const stem=mesh(new THREE.CylinderGeometry(.035,.035,.5,10),gold);stem.position.set(x,1.95,z);const shade=mesh(new THREE.ConeGeometry(.58,.65,14,1,true),new THREE.MeshStandardMaterial({color:'#f6dbad',roughness:1,side:THREE.DoubleSide,emissive:'#bd782b',emissiveIntensity:.25}));shade.position.set(x,2.35,z);const rim=mesh(new THREE.TorusGeometry(.58,.022,6,28),dark);rim.rotation.x=Math.PI/2;rim.position.set(x,2.03,z);const light=new THREE.PointLight('#ffd19a',7,5,2);light.position.set(x,2.12,z);root.add(light);const jar=mesh(new THREE.LatheGeometry(points,20),china);jar.scale.set(.7,.7,.7);jar.position.set(x,-.45,z);}
 lamp(-19.9,-4.55);lamp(-10.1,-4.55);
 // The dividing wall has an actual opening: z=1.1..5.5, x=-7.5.
 box(.35,8.8,7.1,-7.5,3.9,-2.45,cream);box(.35,8.8,4.4,-7.5,3.9,7.7,cream);
 const opening=new THREE.Shape();opening.moveTo(1.1,5.0);opening.quadraticCurveTo(1.5,6.35,3.3,7.0);opening.quadraticCurveTo(5.1,6.35,5.5,5.0);opening.lineTo(5.5,8.3);opening.lineTo(1.1,8.3);opening.closePath();const archTop=mesh(new THREE.ExtrudeGeometry(opening,{depth:.35,bevelEnabled:false,steps:1,curveSegments:28}),cream);archTop.rotation.y=-Math.PI/2;archTop.position.x=-7.32;
 for(const z of [1.04,5.56]){box(.66,5.4,.32,-7.5,2.2,z,cream);box(.78,.18,.5,-7.5,4.95,z,paleGold);box(.83,.22,.55,-7.5,-.28,z,cream);for(const dz of [-.08,.08])box(.72,4.9,.025,-7.5,2.25,z+dz,paleGold);}
 const archCurve=new THREE.CatmullRomCurve3([new THREE.Vector3(-7.75,5.0,1.04),new THREE.Vector3(-7.75,6.17,1.85),new THREE.Vector3(-7.75,6.95,3.3),new THREE.Vector3(-7.75,6.17,4.75),new THREE.Vector3(-7.75,5.0,5.56)]);mesh(new THREE.TubeGeometry(archCurve,48,.055,6,false),paleGold);
 // Dining room: cream architecture, indigo painted mural and a suspended lantern.
 box(15.2,8.8,.3,0,3.9,-6,cream);box(.3,8.8,15.8,7.6,3.9,1.8,cream);
 for(const y of [-.1,.3,8.0]){box(15.2,.12,.32,0,y,-5.77,wood);box(.32,.12,15.7,7.42,y,1.8,wood);}
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
