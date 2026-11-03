// Choose once at startup so rotation does not repeatedly recreate the renderer.
export function renderingProfile({width=1280,coarse=false,pixelRatio=1}={}){
 const mobile=coarse||width<=760;
 return {mobile,pixelRatio:Math.min(Math.max(1,pixelRatio),mobile?1.25:1.6),shadowSize:mobile?1024:2048,powerPreference:mobile?'default':'high-performance'};
}

// Share one request across optional assets and allow a later visit to retry failures.
export function lazyAssetBatch(tasks){
 let pending;
 return ()=>pending||(pending=Promise.allSettled(tasks.map(task=>Promise.resolve().then(task))).then(results=>{
  if(results.some(result=>result.status==='rejected'))pending=undefined;
  return results;
 }));
}
