(()=>{
  const STYLE='mySpace';
  const NAME='黑白空间';
  styles.push([STYLE,NAME]);
  const receiptCodes=()=>codes().filter(item=>item.label!=='FRIEND').slice(0,3);
  function text(value,x,y,font,color='#171717',align='left'){
    ctx.font=font;ctx.fillStyle=color;ctx.textAlign=align;ctx.fillText(value,x,y);
  }
  function line(x1,y1,x2,y2,width=2,color='#171717'){
    ctx.strokeStyle=color;ctx.lineWidth=width;ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();
  }
  function box(x,y,w,h,r,fill,stroke,width=1){
    rr(x,y,w,h,r);if(fill){ctx.fillStyle=fill;ctx.fill()}if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=width;ctx.stroke()}
  }
  function drawCode(item,x,label,size=228){
    const y=size<220?794:786;
    if(item?.img?.appreciate){
      ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(x+size/2,y+size/2,size/2,0,Math.PI*2);ctx.fill();
    }else box(x,y,size,size,17,'rgba(255,255,255,.95)','#151515',2);
    if(item?.img){
      if(item.img.appreciate)drawAppreciate(item.img,x+15,y+15,size-30);
      else ctx.drawImage(item.img.canvas,x+15,y+15,size-30,size-30);
    }else if(!state.exporting){
      ctx.strokeStyle='#c9c9c9';ctx.lineWidth=2;ctx.setLineDash([7,7]);rr(x+16,y+16,size-32,size-32,8);ctx.stroke();ctx.setLineDash([]);
      text('收款码',x+size/2,y+size/2+8,'25px "Microsoft YaHei"','#8a8a8a','center');
    }
    text(label,x+size/2,1062,`${size<220?23:25}px Arial`,'#181818','center');
  }
  function thumbnail(x,y){
    ctx.save();rr(x,y,66,69,4);ctx.clip();cover(bg(),x,y,66,69);ctx.restore();
    ctx.strokeStyle='rgba(40,40,40,.17)';ctx.lineWidth=1;rr(x,y,66,69,4);ctx.stroke();
  }
  function statement(){
    const value=state.quote||'';const maxWidth=405,lines=[];
    ctx.font='22px "Microsoft YaHei"';
    let lineText='';
    for(const char of value){if(ctx.measureText(lineText+char).width>maxWidth&&lineText){lines.push(lineText);lineText=char}else lineText+=char}
    if(lineText||!lines.length)lines.push(lineText);
    const width=Math.max(84,Math.min(455,Math.ceil(Math.max(...lines.map(item=>ctx.measureText(item).width))+38)));
    const right=1135,left=right-width,top=541,height=Math.max(45,lines.length*31+14);
    line(left,top,left,top+height,3);line(left+width,top,left+width,top+height,3);
    line(left+15,top,left+width-15,top,1,'#bbb');line(left+15,top+height,left+width-15,top+height,1,'#bbb');
    lines.forEach((item,index)=>text(item,left+19,top+32+index*31,'22px "Microsoft YaHei"'));
  }
  // The reference's tiny UI marks are drawn as paths so they stay sharp and can be tinted.
  function icon(kind,x,y,size,color){
    ctx.save();ctx.translate(x,y);ctx.scale(size/32,size/32);
    ctx.strokeStyle=color;ctx.fillStyle=color;ctx.lineWidth=2.5;ctx.lineCap='round';ctx.lineJoin='round';
    const path=(points,close=false,fill=false)=>{ctx.beginPath();points.forEach(([px,py],i)=>i?ctx.lineTo(px,py):ctx.moveTo(px,py));if(close)ctx.closePath();fill?ctx.fill():ctx.stroke()};
    const disk=(cx,cy,r)=>{ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);ctx.fill()};
    if(kind==='expand'){
      path([[4,15],[14,5],[7,5]]);path([[14,5],[14,12]]);
      path([[28,17],[18,27],[25,27]]);path([[18,27],[18,20]]);
    }else if(kind==='down')path([[10,13],[22,13],[16,20]],true,true);
    else if(kind==='battery'){
      box(2,8,26,16,2,null,color,2);ctx.fillRect(29,13,2,6);ctx.fillRect(5,11,17,10);
    }else if(kind==='mute'){
      path([[3,12],[9,12],[16,6],[16,26],[9,20],[3,20]],true);
      path([[23,10],[29,22]]);path([[29,10],[23,22]]);path([[2,2],[30,30]],false);
    }else if(kind==='person'){
      disk(16,10,5);ctx.beginPath();ctx.moveTo(6,28);ctx.bezierCurveTo(7,17,25,17,26,28);ctx.closePath();ctx.fill();
    }else if(kind==='chevron')path([[12,7],[21,16],[12,25]]);
    else if(kind==='calendar'){
      box(3,5,26,24,2,null,color,2);line(3,11,29,11,2,color);line(9,2,9,8,2,color);line(23,2,23,8,2,color);
      line(9,17,23,17,1.5,color);line(9,22,20,22,1.5,color);
    }else if(kind==='music'){
      path([[3,10],[24,10],[24,24]]);path([[3,16],[18,16]]);path([[3,22],[14,22]]);disk(22,25,3);
    }else if(kind==='pencil'){
      path([[5,24],[21,8],[26,13],[10,29],[4,30]],true);path([[19,10],[24,15]]);path([[23,5],[28,10]]);
    }else if(kind==='scan'){
      for(const [px,py,sx,sy] of [[3,3,1,1],[29,3,-1,1],[3,29,1,-1],[29,29,-1,-1]])path([[px,py+8*sy],[px,py],[px+8*sx,py]]);
    }else if(kind==='home'){
      path([[3,15],[16,4],[29,15]]);path([[7,13],[7,28],[25,28],[25,13]]);ctx.fillRect(13,20,6,8);
    }else if(kind==='folder'){
      path([[3,9],[13,9],[16,12],[29,12],[29,27],[3,27]],true,true);line(3,14,29,14,2,color);
    }else if(kind==='search'){
      ctx.beginPath();ctx.arc(14,14,9,0,Math.PI*2);ctx.stroke();line(21,21,29,29,3,color);
    }else if(kind==='grid'){
      for(const px of [5,20])for(const py of [5,20]){ctx.beginPath();ctx.arc(px,py,5,0,Math.PI*2);ctx.fill()}
    }
    ctx.restore();
  }
  function stripedChip(x,y,w,h,r){
    box(x,y,w,h,r,'#0b0b0b');ctx.save();rr(x,y,w,h,r);ctx.clip();
    for(let offset=-h;offset<w+h;offset+=11)line(x+offset,y,x+offset+h,y+h,1,'rgba(255,255,255,.18)');
    ctx.restore();
  }
  function drawMySpace(){
    cropHitRegions.length=0;
    base('#ececec');
    // The uploaded/default photograph is strictly the lowest layer.
    cover(bg(),0,0,1254,1254);
    ctx.fillStyle='rgba(0,0,0,.16)';ctx.fillRect(0,0,365,1254);
    box(365,0,889,1254,[55,0,0,0],'rgba(255,255,255,.94)');
    ctx.save();ctx.globalAlpha=.12;ctx.strokeStyle='#777';ctx.lineWidth=1;
    for(let offset=-1300;offset<1300;offset+=14)line(0,offset,1254,offset+1254,1,'#9b9b9b');
    ctx.restore();
    const accent=palette(true).dark;
    icon('expand',409,39,42,accent);
    text('MY SPACE',808,73,'bold 27px Arial','black','center');
    text('•••',1175,73,'30px Arial','black','center');
    text('Personal Information',550,153,'23px Arial',accent);
    icon('down',810,133,22,accent);
    icon('battery',1097,128,34,accent);icon('mute',1161,126,37,accent);
    box(266,124,246,245,23,'#fff','#d1d1d1',5);
    ctx.save();rr(274,132,230,229,16);ctx.clip();
    if(state.avatar)cover(state.avatar,274,132,230,229);
    else if(!state.exporting){ctx.fillStyle='#ebebeb';ctx.fillRect(274,132,230,229);text('头像',389,256,'26px "Microsoft YaHei"','#aaa','center')}
    ctx.restore();
    box(476,329,56,48,5,accent);icon('person',488,335,32,'#fff');
    ctx.fillStyle=accent;ctx.beginPath();ctx.moveTo(489,375);ctx.lineTo(504,389);ctx.lineTo(516,375);ctx.fill();
    text(state.name||'昵称',550,262,'bold 51px "Microsoft YaHei"');
    text('@'+(state.english||'shuming'),550,319,'30px Arial');
    box(1010,216,35,35,2,'rgba(255,255,255,.8)','#d9d9d9');icon('chevron',1019,221,24,accent);
    thumbnail(1090,216);thumbnail(1167,216);
    stripedChip(1041,391,194,50,7);
    icon('calendar',1056,402,28,'#fff');text('Today',1131,424,'23px Arial','#fff','center');icon('down',1201,402,21,'#fff');
    text(state.mySpacePlaying??'正在播放：北国-燕池',895,518,'23px "Microsoft YaHei"');
    icon('music',1172,491,31,accent);
    statement();
    icon('pencil',1174,555,32,accent);
    stripedChip(416,653,166,47,7);text('Payment code',499,684,'22px Arial','#fff','center');
    stripedChip(594,653,48,47,7);text('</>',618,684,'21px Arial','#fff','center');
    icon('scan',1168,650,36,accent);
    const uploaded=receiptCodes();
    const display=uploaded.length?uploaded:state.exporting?[]:[{label:'WECHAT'},{label:'APPRECIATE'},{label:'ALIPAY'}];
    const controlsX=display.length===3?386:416;
    box(controlsX,865,34,34,6,'#fff','#111',2);text('+',controlsX+17,891,'27px Arial','#111','center');
    box(controlsX,914,34,34,6,'#fff','#111',2);text('−',controlsX+17,940,'27px Arial','#111','center');
    const positions=display.length===1?[735]:display.length===2?[537,875]:[451,701,951];
    display.forEach((item,index)=>{
      const label=item.label==='ALIPAY'?'Alipay':item.label==='APPRECIATE'?'Appreciate':'WeChat';
      drawCode(item,positions[index],label,display.length===3?210:228);
    });
    icon('home',605,1157,37,accent);icon('folder',732,1162,35,accent);
    icon('search',857,1159,38,accent);icon('grid',981,1163,35,accent);
  }
  const previousDraw=draw;
  draw=function(){if(state.style===STYLE)drawMySpace();else previousDraw()};
  const previousSelect=selectStyle;
  selectStyle=async function(id){await previousSelect(id);if(id!==STYLE)return;
    document.querySelector('#backgroundTrigger').hidden=false;
    inputs.avatar.closest('.upload-card').hidden=false;
    document.querySelector('#nameInput').closest('label').hidden=false;
    document.querySelector('#englishInput').closest('label').hidden=false;
    quoteInput.closest('label').hidden=false;
    playingLabel.hidden=false;playingInput.value=state.mySpacePlaying??'正在播放：北国-燕池';
    draw();
  };
  const playingLabel=document.createElement('label');playingLabel.hidden=true;
  playingLabel.innerHTML='<span>播放文字</span><input id="mySpacePlayingInput" type="text" maxlength="32">';
  const playingInput=playingLabel.querySelector('input');
  playingInput.addEventListener('input',()=>{state.mySpacePlaying=playingInput.value;draw()});
  document.querySelector('.text-controls').append(playingLabel);
  document.addEventListener('click',event=>{
    if(state.style!=='mySpace'||event.target?.id!=='resetBtn')return;
    setTimeout(()=>{
      state.mySpacePlaying='正在播放：北国-燕池';playingInput.value=state.mySpacePlaying;
      state.english='shuming';document.querySelector('#englishInput').value='shuming';draw();
    },0);
  },true);
  const selectWithPlaying=selectStyle;
  selectStyle=async function(id){await selectWithPlaying(id);playingLabel.hidden=id!==STYLE};
  const library=document.querySelector('.style-gallery'),strip=document.querySelector('#editorStyleStrip');
  for(const [parent,className,inner] of [[library,'style-choice','<i class="style-thumb"></i>'],[strip,'editor-style-card','<i></i>']]){
    if(parent.querySelector(`[data-style="${STYLE}"]`))continue;
    const button=document.createElement('button');button.type='button';button.className=className;button.dataset.style=STYLE;button.setAttribute('aria-label',NAME);button.innerHTML=inner;button.onclick=()=>selectStyle(STYLE);parent.append(button);
  }
  const orderTimer=setInterval(()=>{
    if(!library.querySelector('[data-style="angelFixed"]')||!strip.querySelector('[data-style="angelFixed"]'))return;
    library.append(library.querySelector(`[data-style="${STYLE}"]`));
    strip.append(strip.querySelector(`[data-style="${STYLE}"]`));
    clearInterval(orderTimer);
  },50);
  load('./assets/backgrounds/my-space-umbrella-original.jpg').then(image=>{
    assets.styleBackgrounds[STYLE]=image;assets.previewBackgrounds[STYLE]=image;renderLibraryPreviews();
  }).catch(error=>{
    console.warn('黑白空间原背景文件尚未添加，暂用已有黑白背景预览',error);
    const fallback=assets.styleBackgrounds.feed||assets.landscape;
    assets.styleBackgrounds[STYLE]=fallback;assets.previewBackgrounds[STYLE]=fallback;renderLibraryPreviews();
  });
})();
