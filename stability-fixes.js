(()=>{
const originalCover=cover;cover=function(image,...args){if(!image)return;return originalCover(image,...args)};
const STYLE_KEYS=['bg','libraryBg','avatar','wechat','appreciate','alipay','friend','visitor1','visitor2','name','english','quote','quote2','giftText','appleTitle','appleLine','mySpacePlaying','qrColor','desktopPhotoImage','collectionPhotoImage','feedPhotoImage','appleHeaderImage','applePhotoImage','appleEditImage','cropSlotImages'];
const defaults={name:'昵称',english:'nickname',quote:'感谢你的支持与喜欢',quote2:'感谢阅读，祝你天天开心',giftText:'付后请截图，谢谢老板\n在线时间不定，看见回秒回，8H未回dd\n非我原因拒不退款',appleTitle:'Blue chime',appleLine:'/ 风铃　　[我们会在春天短暂相逢]',mySpacePlaying:'正在播放：北国-燕池',qrColor:null};
const styleState=new Map();
let installed=false;
const STYLE_LABELS={ink:'水墨云笺',profile:'侧栏资料页',desktop:'透明玻璃桌面',collection:'左图右码资料卡',social:'社交动态主页',dew:'清透资料卡',card:'深色名片页',apple:'清蓝双栏页',feed:'星帘个人主页',gift:'少女礼盒',scrapbook:'梦境手帐',journal:'日系手帐',profilePost:'社交档案',hanging:'悬挂资料卡',bannerTriple:'横幅收款卡',angelFixed:'天使收款卡',mySpace:'黑白空间'};
function cloneSlots(value){return value?{...value}:{} }
function capture(id){if(!id)return;const copy={};for(const key of STYLE_KEYS)copy[key]=key==='cropSlotImages'?cloneSlots(state[key]):state[key];styleState.set(id,copy)}
function fresh(id){return{...defaults,...(id==='mySpace'?{name:'署名',english:'shuming',quote:'只要再凝眸相视 命运便会水到渠成'}:{}),bg:null,libraryBg:state.backgroundByStyle[id]||assets.styleBackgrounds[id]||null,avatar:null,wechat:null,appreciate:null,alipay:null,friend:null,visitor1:null,visitor2:null,desktopPhotoImage:null,collectionPhotoImage:null,feedPhotoImage:null,appleHeaderImage:null,applePhotoImage:null,appleEditImage:null,cropSlotImages:{}}}
function restore(id){const saved=styleState.get(id)||fresh(id);for(const key of STYLE_KEYS)state[key]=key==='cropSlotImages'?cloneSlots(saved[key]):saved[key];state.backgroundByStyle[id]=state.libraryBg;const values={nameInput:state.name,englishInput:state.english,quoteInput:id==='apple'?state.appleLine:state.quote,quote2Input:state.quote2,appleTitleInput:state.appleTitle,mySpacePlayingInput:state.mySpacePlaying};for(const [elementId,value] of Object.entries(values)){const element=document.getElementById(elementId);if(element)element.value=value??''}document.querySelectorAll('.upload-card').forEach(card=>{const input=card.querySelector('input');if(input)card.classList.toggle('loaded',Boolean(state[input.id.replace('Input','')]))});const picker=document.querySelector('#qrColorInput');if(picker)picker.value=palette(true).dark;const colorHint=document.querySelector('#qrColorHint');if(colorHint)colorHint.textContent=state.qrColor?'自选颜色':'已跟随背景配色';const bgNote=document.querySelector('#backgroundTrigger small');if(bgNote)bgNote.textContent=state.libraryBg?'已选择背景':'上传或从背景库选择'}
function addDefaultBackground(){const grid=document.querySelector('.background-grid');if(!grid||grid.querySelector('[data-bg="default"]'))return;const card=document.createElement('button');card.type='button';card.className='background-card default-background';card.dataset.bg='default';card.innerHTML='<img alt="当前款式默认背景"><span>当前款式默认</span>';grid.prepend(card);bindBackgroundCard(card)}
function refreshDefaultBackground(){const image=document.querySelector('[data-bg="default"] img'),source=assets.styleBackgrounds[state.style];if(image&&source?.src)image.src=source.src}
function updateStyleName(){let label=document.querySelector('#currentStyleName'),head=document.querySelector('.current-style-head');if(!label&&head){label=document.createElement('strong');label.id='currentStyleName';head.append(label)}if(label)label.textContent=STYLE_LABELS[state.style]||'款式'}
function keepStyleOrder(){
  const order=new Map(styles.map(([id],index)=>[id,index]));
  for(const selector of ['.style-gallery','#editorStyleStrip']){
    const container=document.querySelector(selector);if(!container)continue;
    const cards=[...container.children].filter(card=>card.dataset.style);
    cards.sort((a,b)=>(order.get(a.dataset.style)??Infinity)-(order.get(b.dataset.style)??Infinity));
    cards.forEach(card=>container.append(card));
  }
}
function decodedCanvasValue(source){const probe=document.createElement('canvas');probe.width=source.width;probe.height=source.height;const context=probe.getContext('2d',{willReadFrequently:true});context.fillStyle='#fff';context.fillRect(0,0,probe.width,probe.height);context.drawImage(source,0,0);return window.QRTools.decode(context.getImageData(0,0,probe.width,probe.height))?.data||null}
function renderNormalizedPreviews(){
  keepStyleOrder();
  const saved={};for(const key of STYLE_KEYS)saved[key]=key==='cropSlotImages'?cloneSlots(state[key]):state[key];const savedStyle=state.style,savedPreviewMode=state.previewMode;state.previewMode=true;
  Object.assign(state,defaults,{bg:null,avatar:null,wechat:null,appreciate:null,alipay:null,friend:null,visitor1:null,visitor2:null,cropSlotImages:{}});
  document.querySelectorAll('.style-choice').forEach(button=>{const id=button.dataset.style,background=assets.previewBackgrounds[id]||assets.styleBackgrounds[id];if(!background)return;state.style=id;state.libraryBg=background;if(id==='mySpace')Object.assign(state,{name:'署名',english:'shuming',quote:'只要再凝眸相视 命运便会水到渠成'});draw();for(const target of [button.querySelector('.style-thumb'),document.querySelector(`.editor-style-card[data-style="${id}"] i`)]){if(!target)continue;const preview=document.createElement('canvas');preview.width=preview.height=1254;preview.getContext('2d').drawImage(canvas,0,0);target.replaceChildren(preview);target.classList.add('canvas-preview')}});
  state.style=savedStyle;state.previewMode=savedPreviewMode;for(const key of STYLE_KEYS)state[key]=key==='cropSlotImages'?cloneSlots(saved[key]):saved[key];arrangeEditorStyles();updateStyleName();draw();
}
function revealCompleteLibrary(){
  const gallery=document.querySelector('.style-gallery'),loading=document.querySelector('#stylesLoading');
  if(!gallery)return;
  const ids=Object.keys(STYLE_LABELS);
  let finished=false;
  const check=()=>{
    if(finished||!ids.every(id=>assets.styleBackgrounds[id]&&gallery.querySelector(`.style-choice[data-style="${id}"]`)))return;
    try{renderNormalizedPreviews()}catch(error){console.error('款式预览生成失败',error);return}
    if(!ids.every(id=>gallery.querySelector(`.style-choice[data-style="${id}"] .style-thumb canvas`)))return;
    finished=true;clearInterval(timer);clearTimeout(fallback);
    gallery.hidden=false;if(loading)loading.hidden=true;
  };
  const timer=setInterval(check,100);
  const fallback=setTimeout(()=>{if(finished)return;finished=true;clearInterval(timer);gallery.hidden=false;if(loading)loading.textContent='部分款式预览未能加载，请刷新页面重试';},12000);
  check();
}
function install(){if(installed||typeof selectStyle!=='function'||typeof draw!=='function'||!document.querySelector('#editorStyleStrip'))return false;installed=true;addDefaultBackground();
  arrangeEditorStyles=function(){keepStyleOrder();const strip=document.querySelector('#editorStyleStrip');strip.querySelectorAll('.editor-style-card').forEach(button=>button.classList.toggle('active',button.dataset.style===state.style));const active=strip.querySelector(`[data-style="${state.style}"]`);if(active)strip.scrollLeft=Math.max(0,active.offsetLeft-strip.offsetLeft-strip.clientWidth/2+active.offsetWidth/2)};
  const rawSelect=selectStyle;capture(state.style);selectStyle=async function(id){const previous=state.style;if(previous!==id)capture(previous);await rawSelect(id);if(previous!==id){restore(id);await recolor();refreshDefaultBackground();draw()}else refreshDefaultBackground();updateStyleName()};
  document.addEventListener('click',event=>{const button=event.target.closest?.('[data-style]');if(button){event.preventDefault();event.stopImmediatePropagation();selectStyle(button.dataset.style)}},true);
  const rawKnockout=drawKnockout;drawKnockout=function(source,x,y,size){ctx.save();ctx.beginPath();ctx.rect(x,y,size,size);ctx.clip();rawKnockout(source,x,y,size);ctx.restore()};
  document.querySelector('#downloadBtn').addEventListener('click',event=>{event.preventDefault();event.stopImmediatePropagation();const button=event.currentTarget;if(pendingQrUploads.size){alert('二维码仍在识别中，请等上传完成后再下载。');return}const receipts=codes().filter(item=>item.img&&item.label!=='FRIEND');if(!receipts.length){alert('请先上传并识别你自己的收款码，再下载成品。');return}for(const item of receipts){if(!item.img.rawValue)continue;const decoded=decodedCanvasValue(item.img.canvas);if(!decoded){alert('当前二维码颜色过浅或图案无法识别，请选深一点的颜色后重试；无需重新上传原图。');return}if(decoded!==item.img.rawValue){alert('生成码与上传码内容不一致，已阻止下载。请重新上传并核对收款方。');return}}if(state.style==='collection'&&!state.friend){alert('款式4必须上传微信好友码后才能下载。');return}try{state.exporting=true;draw();const exportCanvas=document.createElement('canvas');exportCanvas.width=canvas.width;exportCanvas.height=canvas.height;exportCanvas.getContext('2d').drawImage(canvas,0,0);state.exporting=false;draw();const finish=blob=>{if(!blob)throw Error('empty PNG');const url=URL.createObjectURL(blob),link=document.createElement('a');link.download=`收款码-${state.name||'成品'}.png`;link.href=url;document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),10000);button.textContent='下载成品 PNG'};if(exportCanvas.toBlob)exportCanvas.toBlob(blob=>{try{finish(blob)}catch(error){console.error(error);button.textContent='下载失败，请重试'}},'image/png');else{const data=exportCanvas.toDataURL('image/png'),link=document.createElement('a');link.download=`收款码-${state.name||'成品'}.png`;link.href=data;link.click()}}catch(error){state.exporting=false;draw();console.error(error);button.textContent='下载失败，请重试'}},true);
  refreshDefaultBackground();updateStyleName();renderLibraryPreviews=renderNormalizedPreviews;revealCompleteLibrary();return true}
let attempts=0;const timer=setInterval(()=>{if(install()||++attempts>50)clearInterval(timer)},100);
})();
