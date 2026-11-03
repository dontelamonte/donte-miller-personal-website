// Keep desktop URLs and all existing crop/UV calculations unchanged.
const sources={
 '/assets/akua-ribbon.jpg':'/assets/mobile/akua-ribbon.jpg',
 '/assets/living-room-reference.jpg':'/assets/mobile/living-room-reference.jpg',
 '/assets/workshop-wall.jpg':'/assets/mobile/workshop-wall.jpg',
 '/assets/original-report-cover.png':'/assets/mobile/original-report-cover.jpg'
};
export function imageSource(source,width=typeof innerWidth==='number'?innerWidth:Infinity){
 return width<=760?sources[source]||source:source;
}
export function originalImageFor(source){
 const pathname=new URL(source,'https://image.local').pathname;
 return Object.entries(sources).find(([,mobile])=>mobile===pathname)?.[0]||null;
}
export function fallbackImage(image){
 const original=originalImageFor(image.src);
 if(!original)return false;
 image.src=original;return true;
}
