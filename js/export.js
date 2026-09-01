function chooseMime(){const types=['video/webm;codecs=vp9,opus','video/webm;codecs=vp8,opus','video/webm'];return types.find(t=>MediaRecorder.isTypeSupported(t))||''}
export async function renderVideo({canvas,image,state,verses,translations,audioEdition,onProgress,draw}){
  if(!window.MediaRecorder)throw new Error('This browser does not support video recording. Use Chrome or Edge.');
  const ctx=canvas.getContext('2d');const ac=new AudioContext();const dest=ac.createMediaStreamDestination();const audioBuffers=[];
  for(let i=0;i<verses.length;i++){
    const a=verses[i];onProgress?.(Math.round((i/verses.length)*35),'Downloading audio…');
    const number=a.globalNumber;const url=`https://cdn.islamic.network/quran/audio/128/${audioEdition}/${number}.mp3`;
    const res=await fetch(url);if(!res.ok)throw new Error(`Audio could not be loaded for ${a.surah.number}:${a.numberInSurah}`);const buf=await res.arrayBuffer();audioBuffers.push(await ac.decodeAudioData(buf));
  }
  await ac.resume();const fps=30;const stream=canvas.captureStream(fps);stream.addTrack(dest.stream.getAudioTracks()[0]);const mime=chooseMime();if(!mime)throw new Error('No WebM recorder is available in this browser.');const chunks=[];const recorder=new MediaRecorder(stream,{mimeType:mime,videoBitsPerSecond:7_000_000,audioBitsPerSecond:192_000});
  recorder.ondataavailable=e=>e.data.size&&chunks.push(e.data);
  const total=audioBuffers.reduce((s,b)=>s+b.duration,0)+0.25*Math.max(0,audioBuffers.length-1);let resolveStop;const stopped=new Promise(r=>resolveStop=r);recorder.onstop=resolveStop;recorder.start(250);
  let t=ac.currentTime+0.15;const starts=[];for(let i=0;i<audioBuffers.length;i++){starts.push(t);const src=ac.createBufferSource();src.buffer=audioBuffers[i];src.connect(dest);src.start(t);t+=audioBuffers[i].duration+0.25}
  const startWall=performance.now();let raf;const loop=()=>{const elapsed=(performance.now()-startWall)/1000;let idx=0;while(idx<starts.length-1&&(ac.currentTime-starts[idx+1])>=0)idx++;draw(idx);onProgress?.(35+Math.min(64,Math.round(elapsed/total*64)),'Rendering video…');if(elapsed<total){raf=requestAnimationFrame(loop)}else{cancelAnimationFrame(raf);setTimeout(()=>recorder.stop(),220)}};loop();await stopped;stream.getTracks().forEach(tk=>tk.stop());dest.stream.getTracks().forEach(tk=>tk.stop());ac.close();onProgress?.(100,'Done');return new Blob(chunks,{type:mime})}
