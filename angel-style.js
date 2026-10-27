(()=>{
const STYLE='angelFixed';
if(!styles.some(([id])=>id===STYLE))styles.push([STYLE,'天使双码']);
const images={};
const receiptCodes=()=>codes().filter(item=>item.label!=='FRIEND').slice(0,2);
function qr(item,cx,cy,size){
  if(!item?.img)return;
  if(item.img.appreciate)drawAppreciate(item.img,cx-size/2,cy-size/2,size);
  else drawKnockout(item.img.canvas,cx-size/2,cy-size/2,size);
}
function drawAngelFixed(){
  const list=receiptCodes(),single=list.length<2;
  ctx.drawImage(single?images.single:images.double,0,0,1254,1254);
  if(single)qr(list[0],627,700,420);
  else{qr(list[0],337,913,390);qr(list[1],917,913,390);}
}
const previousDraw=draw;
draw=function(){if(state.style===STYLE)drawAngelFixed();else previousDraw()};
const previousSelect=selectStyle;
selectStyle=async function(id){
  await previousSelect(id);
  if(id!==STYLE)return;
  document.querySelector('#backgroundTrigger').hidden=true;
  inputs.avatar.closest('.upload-card').hidden=true;
  document.querySelector('#nameInput').closest('label').hidden=true;
  document.querySelector('#englishInput').closest('label').hidden=true;
  quoteInput.closest('label').hidden=true;
  state.bg=null;state.libraryBg=images.single;state.backgroundByStyle[STYLE]=images.single;state.qrColor=null;
  await recolor();draw();
};
function addButtons(){
  const name='天使双码',library=document.querySelector('.style-gallery'),strip=document.querySelector('#editorStyleStrip');
  if(!library.querySelector('[data-style="'+STYLE+'"]')){
    const b=document.createElement('button');b.type='button';b.className='style-choice';b.dataset.style=STYLE;b.setAttribute('aria-label',name);b.innerHTML='<i class="style-thumb"></i>';b.onclick=()=>selectStyle(STYLE);library.append(b);
  }
  if(!strip.querySelector('[data-style="'+STYLE+'"]')){
    const b=document.createElement('button');b.type='button';b.className='editor-style-card';b.dataset.style=STYLE;b.innerHTML='<i></i>';b.onclick=()=>selectStyle(STYLE);strip.append(b);
  }
}
['wechat','appreciate','alipay'].forEach(key=>{
  inputs[key].addEventListener('change',event=>{
    if(state.style!==STYLE||state[key])return;
    const total=['wechat','appreciate','alipay'].filter(k=>state[k]).length;
    if(total>=2){
      event.preventDefault();event.stopImmediatePropagation();inputs[key].value='';
      alert('这个款式最多只能上传两个收款码，请先取消一个已上传的收款码。');return;
    }
    const before=total;let attempts=0;
    const timer=setInterval(async()=>{
      const count=['wechat','appreciate','alipay'].filter(k=>state[k]).length;
      if(count===before&&attempts++<40)return;
      clearInterval(timer);
      const background=count>=2?images.double:images.single;
      state.libraryBg=background;state.backgroundByStyle[STYLE]=background;state.qrColor=null;
      await recolor();draw();
    },100);
  },true);
});
Promise.all([load('./assets/angel-double-fixed.png'),load('./assets/angel-single-fixed.png')]).then(([double,single])=>{
  images.double=double;images.single=single;assets.styleBackgrounds[STYLE]=single;assets.previewBackgrounds[STYLE]=single;
  addButtons();renderLibraryPreviews();
});
})();
