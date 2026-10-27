(()=>{
const ids=[['journal','日系手帐'],['profilePost','社交档案'],['hanging','悬挂资料卡'],['bannerTriple','横幅三合一']];
ids.forEach(item=>{if(!styles.some(s=>s[0]===item[0]))styles.push(item)});
const defaults={journal:'./assets/journal-reference-base.png',profilePost:'./assets/profile-post-reference-base.png',hanging:'./assets/hanging-reference-base.png',bannerTriple:'./assets/banner-triple-reference-base.png'};
const loaded={};
const oldDraw=draw,oldSelect=selectStyle;
function codeItems(limit=3){return codes().filter(v=>v.label!=='FRIEND').slice(0,limit)}
function codeBox(item,cx,y,size,label){
  ctx.save();ctx.shadowColor='#7772';ctx.shadowBlur=15;ctx.shadowOffsetY=5;ctx.fillStyle='rgba(255,255,255,.91)';rr(cx-size/2,y,size,size,12);ctx.fill();ctx.restore();
  if(item.img){if(item.img.appreciate)drawAppreciate(item.img,cx-size/2+8,y+8,size-16);else drawKnockout(item.img.canvas,cx-size/2+8,y+8,size-16)}
  else{ctx.fillStyle='#f6f6f4';ctx.fillRect(cx-size/2+10,y+10,size-20,size-20);ctx.fillStyle='#999';ctx.textAlign='center';ctx.font='19px "Microsoft YaHei"';ctx.fillText('收款码',cx,y+size/2+6)}
  ctx.fillStyle='#6f716d';ctx.textAlign='center';ctx.font='20px Arial';ctx.fillText(label,cx,y+size+32);
}
function drawJournal(){
  base('#fafafa');if(loaded.journal)ctx.drawImage(loaded.journal,0,0,1254,1254);
  ctx.fillStyle='#777';ctx.textAlign='left';ctx.font='22px "Microsoft YaHei"';wrapCopy(state.quote||'',294,474,650,58,2);
  const a=codeItems(3);
  const xs=a.length===1?[812]:a.length===2?[711,913]:[610,812,1014];
  const size=a.length===1?136:a.length===2?154:132,y=612;
  a.forEach((item,i)=>{
    if(!item.img)return;
    if(item.img.appreciate)drawAppreciate(item.img,xs[i]-size/2,y,size);
    else drawKnockout(item.img.canvas,xs[i]-size/2,y,size);
  });
}
function drawProfilePost(){
  ctx.drawImage(loaded.profilePost,0,0,1254,1254);
  // The dotted frame belongs to the template artwork. Tint only its four
  // outer bands; the color blend keeps the white dots and binder details.
  ctx.save();ctx.globalCompositeOperation='color';ctx.fillStyle=backgroundPalette().mid;
  ctx.fillRect(0,0,1254,47);ctx.fillRect(0,1207,1254,47);
  ctx.fillRect(90,47,36,1160);ctx.fillRect(1214,47,40,1160);ctx.restore();
  // Cover the entire gray photo guide, including its antialiased outer pixels.
  ctx.save();ctx.beginPath();ctx.rect(175,76,997,287);ctx.clip();cover(bg(),175,76,997,287);ctx.restore();
  // The reference artwork already contains the avatar rings and QR cards.
  // Only replace their inner content so no second frame or shifted placeholder is produced.
  plainCircle(state.avatar,310,337,96);
  ctx.strokeStyle='#fff';ctx.lineWidth=4;ctx.beginPath();ctx.arc(310,337,96,0,Math.PI*2);ctx.stroke();
  ctx.fillStyle='#fff';ctx.fillRect(205,438,875,160);ctx.fillRect(285,1080,735,72);
  ctx.fillStyle='#555';ctx.textAlign='left';ctx.font='700 31px "Microsoft YaHei"';ctx.fillText(state.name||'昵称',220,475);
  ctx.font='20px Arial';ctx.fillText('@'+(state.english||'nickname'),220,510);
  ctx.font='22px "Microsoft YaHei"';ctx.fillText('“내가 널 사랑하는 만큼 눈이 온다면 봄은 오지 않을거”',220,552);
  ctx.font='21px "Microsoft YaHei"';ctx.fillText('520 正在關註  1,314 關注者',220,587);
  plainCircle(state.avatar,246,720,34);plainCircle(state.avatar,246,1054,34);
  ctx.fillStyle='#666';ctx.font='26px "Microsoft YaHei"';wrapCopy(state.quote||'',300,1105,680,30,2);
  const a=codes().filter(v=>v.label!=='FRIEND').slice(0,3);
  const xs=a.length===1?[663]:a.length===2?[416,909]:[416,663,909],y=770,size=158;
  a.forEach((v,i)=>{if(v.img){if(v.img.appreciate)drawAppreciate(v.img,xs[i]-size/2,y,size);else drawKnockout(v.img.canvas,xs[i]-size/2,y,size)}});
}
function drawHanging(){
  ctx.drawImage(loaded.hanging,0,0,1254,1254);
  const a=codes().filter(v=>v.label!=='FRIEND').slice(0,3);
  const xs=a.length===1?[627]:a.length===2?[402,852]:[327,627,927],y=320,size=a.length===3?178:210;
  a.forEach((v,i)=>{if(v.img){if(v.img.appreciate)drawAppreciate(v.img,xs[i]-size/2,y,size);else drawKnockout(v.img.canvas,xs[i]-size/2,y,size)}});
  plainCircle(state.avatar,255,930,94);
  ctx.fillStyle='#fff';ctx.fillRect(370,820,420,230);
  ctx.fillStyle='#333';ctx.textAlign='left';ctx.font='700 28px Arial';ctx.fillText(state.name||'',385,865);ctx.fillStyle='#888';ctx.font='20px Arial';ctx.fillText(state.english||'',385,905);ctx.fillStyle='#555';ctx.font='22px "Microsoft YaHei"';wrapCopy(state.quote||'',385,970,520,36,3);
}
function drawBannerTriple(){
  ctx.drawImage(loaded.bannerTriple,0,0,1254,1254);ctx.save();ctx.beginPath();ctx.roundRect(68,0,1118,474,[0,0,220,220]);ctx.clip();cover(bg(),68,0,1118,474);ctx.restore();
  plainCircle(state.avatar,627,445,126);
  ctx.strokeStyle='#fff';ctx.lineWidth=5;ctx.beginPath();ctx.arc(627,445,129,0,Math.PI*2);ctx.stroke();
  ctx.fillStyle='#fff';ctx.fillRect(390,610,475,235);
  ctx.fillStyle='#666';ctx.textAlign='center';ctx.font='36px "Microsoft YaHei"';ctx.fillText(state.name||'',627,665);ctx.font='27px "Microsoft YaHei"';wrapCopy(state.quote||'',340,725,575,45,3);
  const a=codes().filter(v=>v.label!=='FRIEND').slice(0,3);
  const xs=a.length===1?[627]:a.length===2?[277,977]:[277,627,977],y=905,size=168;
  a.forEach((v,i)=>{if(v.img){if(v.img.appreciate)drawAppreciate(v.img,xs[i]-size/2,y,size);else drawKnockout(v.img.canvas,xs[i]-size/2,y,size)}});
}
draw=function(){if(state.style==='journal')drawJournal();else if(state.style==='profilePost')drawProfilePost();else if(state.style==='hanging')drawHanging();else if(state.style==='bannerTriple')drawBannerTriple();else oldDraw()};
selectStyle=async function(id){
  await oldSelect(id);if(!ids.some(x=>x[0]===id))return;
  const fixed=id==='journal';document.querySelector('#backgroundTrigger').hidden=fixed;inputs.avatar.closest('.upload-card').hidden=fixed;document.querySelector('#nameInput').closest('label').hidden=fixed;document.querySelector('#englishInput').closest('label').hidden=fixed;quoteInput.closest('label').hidden=false;
  // oldSelect has already restored the background saved for this style.
  if(!state.bg&&!state.libraryBg)state.libraryBg=assets.styleBackgrounds[id]||loaded[id];
  state.qrColor=null;await recolor();draw();
};
// Route crop gestures to the actual displayed image for the reference styles.
const previousCropTargetAt=cropTargetAt;
cropTargetAt=async function(x,y){
  const background=bg();
  if(state.style==='profilePost'){
    if(state.avatar&&(Math.hypot(x-310,y-337)<100||Math.hypot(x-246,y-720)<38||Math.hypot(x-246,y-1054)<38))return await previousCropTargetAt(x,y)||[state.avatar,1];
    if(x>=175&&x<=1172&&y>=76&&y<=363)return await previousCropTargetAt(x,y)||[background,997/287];
  }
  if(state.style==='bannerTriple'){
    if(state.avatar&&Math.hypot(x-627,y-445)<132)return await previousCropTargetAt(x,y)||[state.avatar,1];
    if(x>=68&&x<=1186&&y<=474)return await previousCropTargetAt(x,y)||[background,1118/474];
  }
  if(state.style==='hanging'&&state.avatar&&Math.hypot(x-255,y-930)<100)return await previousCropTargetAt(x,y)||[state.avatar,1];
  return previousCropTargetAt(x,y);
};
function addButtons(){
  const library=document.querySelector('.style-gallery'),strip=document.querySelector('#editorStyleStrip');
  ids.forEach(([id,name])=>{if(!library.querySelector(`[data-style="${id}"]`)){const b=document.createElement('button');b.type='button';b.className='style-choice';b.dataset.style=id;b.setAttribute('aria-label',name);b.innerHTML='<i class="style-thumb"></i>';b.onclick=()=>selectStyle(id);library.append(b)}if(!strip.querySelector(`[data-style="${id}"]`)){const b=document.createElement('button');b.type='button';b.className='editor-style-card';b.dataset.style=id;b.innerHTML='<i></i>';b.onclick=()=>selectStyle(id);strip.append(b)}});
  // Angel artwork may finish loading before this pack. Keep its slot at 16.
  for(const container of [library,strip]){const angel=container.querySelector('[data-style="angelFixed"]');if(angel)container.append(angel)}
}
Promise.all(Object.entries(defaults).map(async([id,url])=>{loaded[id]=await load(url);assets.styleBackgrounds[id]=loaded[id];assets.previewBackgrounds[id]=loaded[id]})).then(async()=>{
  const [style13Background,style15Background]=await Promise.all([load('./assets/backgrounds/style13-default.png'),load('./assets/backgrounds/style15-default.png')]);
  assets.styleBackgrounds.profilePost=style13Background;assets.previewBackgrounds.profilePost=style13Background;
  assets.styleBackgrounds.bannerTriple=style15Background;assets.previewBackgrounds.bannerTriple=style15Background;
  for(const [id,img,src] of [['style13BuiltIn',style13Background,'./assets/backgrounds/style13-default.png'],['style15BuiltIn',style15Background,'./assets/backgrounds/style15-default.png']]){
    assets.backgrounds[id]=img;
    if(!backgroundGrid.querySelector(`[data-bg="${id}"]`)){
      const card=document.createElement('button');card.type='button';card.className='background-card';card.dataset.bg=id;
      const thumb=document.createElement('img');thumb.src=src;thumb.alt='';card.append(thumb);backgroundGrid.append(card);bindBackgroundCard(card);
    }
  }
  addButtons();renderLibraryPreviews();
});
})();
