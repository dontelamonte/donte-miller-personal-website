import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {imageSource,originalImageFor,fallbackImage} from '../dist/mobile-images.js';

test('desktop keeps original URLs; mobile selects full-image derivatives',()=>{
 for(const source of ['/assets/akua-ribbon.jpg','/assets/living-room-reference.jpg','/assets/workshop-wall.jpg','/assets/original-report-cover.png']){
  assert.equal(imageSource(source,1280),source);
  assert.equal(originalImageFor(imageSource(source,390)),source);
  assert.notEqual(imageSource(source,760),source);
  assert.equal(imageSource(source,761),source);
 }
});

test('all other artwork and media retain their original paths',()=>{
 for(const source of ['/assets/about-wall.webp','/assets/about-painting-family.webp','/assets/plaques/forbes.png','/assets/workshop/endao-deck-1.webp?v=2','/assets/vmf-10-year-report.pdf'])assert.equal(imageSource(source,390),source);
});

test('failed mobile images retry the original exactly once, including absolute URLs',()=>{
 const image={src:'https://example.test/assets/mobile/workshop-wall.jpg'};
 assert.equal(fallbackImage(image),true);assert.equal(image.src,'/assets/workshop-wall.jpg');
 assert.equal(fallbackImage(image),false);
 assert.equal(originalImageFor('/unrelated.jpg'),null);
});

test('every original asset, including all artwork and the PDF, remains byte-for-byte intact',async()=>{
 const originals=JSON.parse(await readFile(new URL('fixtures/original-asset-inventory.json',import.meta.url)));
 for(const [path,hash] of Object.entries(originals)){
  const bytes=await readFile(new URL(`../dist/assets/${path}`,import.meta.url));
  assert.equal(createHash('sha256').update(bytes).digest('hex'),hash,path);
 }
});

test('every derivative exists, is smaller, and preserves full-image proportions',async()=>{
 const manifest=JSON.parse(await readFile(new URL('../dist/assets/mobile/manifest.json',import.meta.url)));
 for(const [source,item] of Object.entries(manifest)){
  const bytes=await readFile(new URL(`../dist/assets/mobile/${item.mobile}`,import.meta.url));
  assert.equal(bytes[0],255);assert.equal(bytes[1],216);
  assert.equal(bytes.length,item.mobileBytes);assert.ok(bytes.length<item.sourceBytes,source);
  assert.equal(item.crop,'none');
  const [sw,sh]=item.sourceDimensions,[mw,mh]=item.mobileDimensions;
  assert.ok(Math.abs(mh-mw*sh/sw)<=.5,source);
 }
});
