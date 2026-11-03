import {createCanvas,loadImage} from '@napi-rs/canvas';
import {mkdir,writeFile,stat} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {grainTexture,rugTexture} from './texture-recipes.mjs';

const assets=new URL('../dist/assets/',import.meta.url);
const output=new URL('optimized/',assets);
await mkdir(output,{recursive:true});
const manifest={};
async function save(name,canvas,quality=82){
 const bytes=await canvas.encode('webp',quality);
 await writeFile(new URL(name,output),bytes);
 manifest[name]={width:canvas.width,height:canvas.height,bytes:bytes.length};
}
async function image(source,name,width,{crop,quality=82}={}){
 const input=await loadImage(fileURLToPath(new URL(source,assets)));
 const [x,y,w,h]=crop||[0,0,input.width,input.height];
 const targetWidth=Math.min(width,w),targetHeight=Math.round(targetWidth*h/w);
 const canvas=createCanvas(targetWidth,targetHeight);
 canvas.getContext('2d').drawImage(input,x,y,w,h,0,0,targetWidth,targetHeight);
 await save(name,canvas,quality);
}

// The crop matches the original portrait canvas exactly. Keep source images intact.
await image('living-room-reference.jpg','portrait.webp',768,{crop:[2048*.321,2048*.154,2048*.357,2048*.393],quality:88});
await image('akua-ribbon.jpg','ribbon-768.webp',768);
await image('akua-ribbon.jpg','ribbon-1536.webp',1536);
// About geometry uses the reference's original pixel coordinates; preserve its dimensions.
await image('about-wall.webp','about-wall.webp',1024);
await image('about-painting-family.webp','family.webp',600,{quality:86});
await image('about-painting-father.webp','father.webp',450,{quality:86});
await image('original-report-cover.png','report-cover.webp',480);
// Crop only the framed painting; the surrounding Workshop remains actual 3D geometry.
await image('workshop-wall.jpg','workshop-painting.webp',768,{crop:[1400*.273,1400*(1-.493-.38),1400*.445,1400*.38],quality:86});
for(const id of ['forbes','georgia','atlanta','morehouse','village','echoing']){
 await image(`plaques/${id}.png`,`plaque-${id}.webp`,320,{quality:90});
}
for(const [name,[draw,width,height]] of [['table-grain.webp',grainTexture],['rug.webp',rugTexture]]){
 const canvas=createCanvas(width,height);draw(canvas.getContext('2d'),width,height);
 await save(name,canvas,86);
 const mobile=createCanvas(width/2,height/2);
 mobile.getContext('2d').drawImage(canvas,0,0,mobile.width,mobile.height);
 await save(name.replace('.webp','-mobile.webp'),mobile,82);
}
await writeFile(new URL('manifest.json',output),JSON.stringify(manifest,null,2)+'\n');
const originalStartup=['akua-ribbon.jpg','living-room-reference.jpg','about-wall.webp','about-painting-family.webp','about-painting-father.webp',...['forbes','georgia','atlanta','morehouse','village','echoing'].map(id=>`plaques/${id}.png`)];
const optimizedStartup=['ribbon-768.webp','portrait.webp','about-wall.webp','family.webp','father.webp','rug-mobile.webp','table-grain-mobile.webp',...Object.keys(manifest).filter(name=>name.startsWith('plaque-'))];
const oldBytes=(await Promise.all(originalStartup.map(name=>stat(new URL(name,assets))))).reduce((n,s)=>n+s.size,0);
const newBytes=optimizedStartup.reduce((n,name)=>n+manifest[name].bytes,0);
console.log(`Startup images: ${oldBytes} → ${newBytes} bytes (${Math.round((1-newBytes/oldBytes)*100)}% smaller, including pre-rendered textures).`);
