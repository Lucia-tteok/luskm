(()=>{
  state.decorColor??=null;
  state.qrRequestedColor??=null;
  const originalPalette=palette;
  palette=function(forQr=false){
    if(forQr)return originalPalette(true);
    return state.decorColor?{dark:state.decorColor,mid:state.decorColor}:originalPalette(false);
  };
  const controls=document.querySelector('.color-tools');
  controls.innerHTML=`
    <div class="color-row"><strong>二维码颜色</strong><button id="eyedropperBtn" type="button">吸取颜色</button><label>选色 <input id="qrColorInput" type="color" value="#555555"></label><button id="autoColorBtn" type="button">跟随背景</button></div>
    <div class="actual-qr-color"><i id="qrActualSwatch" aria-hidden="true"></i><span>成品实际码色 <output id="qrActualHex"></output></span></div>
    <small id="qrColorHint" aria-live="polite"></small>
    <div class="color-row decor-row"><strong>装饰颜色</strong><button id="decorEyedropperBtn" type="button">吸取颜色</button><label>选色 <input id="decorColorInput" type="color" value="#777777"></label><button id="decorAutoBtn" type="button">跟随背景</button></div>
    <small id="decorColorHint" aria-live="polite">装饰区域跟随背景；底图照片保持原样</small>`;
  const qrInput=controls.querySelector('#qrColorInput'),decorInput=controls.querySelector('#decorColorInput');
  const qrHint=controls.querySelector('#qrColorHint'),decorHint=controls.querySelector('#decorColorHint');
  function refresh(){
    const actual=palette(true).dark;
    controls.querySelector('#qrActualSwatch').style.backgroundColor=actual;
    controls.querySelector('#qrActualHex').value=actual.toUpperCase();
    qrInput.value=state.qrRequestedColor||actual;
    qrHint.textContent=state.qrColor
      ?qrLuminance(actual)>.18?'已按原色使用；颜色较浅，下载前会检查能否扫码':'已按所选原色使用'
      :'二维码颜色跟随背景';
    decorInput.value=state.decorColor||backgroundPalette().mid;
    decorHint.textContent=state.decorColor?'装饰区域使用自选颜色；二维码颜色单独设置':'装饰区域跟随背景；底图照片保持原样';
  }
  window.refreshColorControls=refresh;
  const originalRecolor=recolor;
  recolor=async function(){const result=await originalRecolor();refresh();return result};
  let latest=0,queue=Promise.resolve();
  function scheduleQrRender(){
    const request=++latest;
    queue=queue.catch(()=>{}).then(async()=>{if(request!==latest)return;await recolor();if(request===latest)draw()});
  }
  qrInput.addEventListener('input',event=>{
    const requested=event.target.value.toLowerCase();
    state.qrRequestedColor=requested;
    state.qrColor=validColor(requested);
    refresh();scheduleQrRender();
  });
  controls.querySelector('#autoColorBtn').addEventListener('click',()=>{
    state.qrColor=null;state.qrRequestedColor=null;refresh();scheduleQrRender();
  });
  decorInput.addEventListener('input',event=>{
    state.decorColor=event.target.value.toLowerCase();refresh();draw();
  });
  controls.querySelector('#decorAutoBtn').addEventListener('click',()=>{
    state.decorColor=null;refresh();draw();
  });
  async function pickColor(input){
    if(!window.EyeDropper){input.click();return}
    try{const color=(await new EyeDropper().open()).sRGBHex;input.value=color;input.dispatchEvent(new Event('input',{bubbles:true}))}catch{}
  }
  controls.querySelector('#eyedropperBtn').addEventListener('click',()=>pickColor(qrInput));
  controls.querySelector('#decorEyedropperBtn').addEventListener('click',()=>pickColor(decorInput));
  document.addEventListener('click',event=>{
    if(event.target?.id!=='resetBtn')return;
    state.decorColor=null;state.qrRequestedColor=null;
    setTimeout(refresh,50);
  },true);
  refresh();
})();
