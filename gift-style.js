/* Fixed artwork and independent editable copy for the gift template. */
(()=>{
const defaultCopy='付后请截图，谢谢老板\n在线时间不定，看见回秒回，8H未回dd\n非我原因拒不退款';
state.giftText=state.giftText??defaultCopy;
const label=document.createElement('label');label.hidden=true;label.innerHTML='<span>文案</span><textarea rows="4" maxlength="180"></textarea>';
const input=label.querySelector('textarea');input.value=state.giftText;
document.querySelector('.text-controls').append(label);
input.oninput=()=>{state.giftText=input.value;draw()};
const oldSelect=selectStyle;
selectStyle=async function(id){await oldSelect(id);const gift=id==='gift';document.querySelector('#backgroundTrigger').hidden=gift;label.hidden=!gift;if(gift){quoteInput.closest('label').hidden=true;document.querySelector('#nameInput').closest('label').hidden=false;inputs.avatar.closest('.upload-card').hidden=true;state.qrColor=null;await recolor();draw()}else{document.querySelector('#nameInput').closest('label').hidden=false;inputs.avatar.closest('.upload-card').hidden=false}};
const oldReset=document.querySelector('#resetBtn').onclick;
document.querySelector('#resetBtn').addEventListener('click',()=>{if(state.style==='gift'){state.giftText=defaultCopy;input.value=defaultCopy;setTimeout(draw,0)}},true);
const art=document.createElement('canvas');art.width=art.height=1254;const a=art.getContext('2d');
function rect(x,y,w,h,r=0,fill='#fff',stroke){a.beginPath();a.roundRect(x,y,w,h,r);a.fillStyle=fill;a.fill();if(stroke){a.strokeStyle=stroke;a.stroke()}}
function heart(x,y,s){a.beginPath();a.moveTo(x,y+s*.4);a.bezierCurveTo(x-s,y-s*.2,x-s*.4,y-s,x,y-s*.45);a.bezierCurveTo(x+s*.4,y-s,x+s,y-s*.2,x,y+s*.4);a.closePath()}
function lace(x,y,w,h){rect(x,y,w,h,4,'#fbfdff','#e3ebf2');a.fillStyle='#fff';for(let n=0;n<w;n+=22){a.beginPath();a.arc(x+n,y,12,0,7);a.fill();a.beginPath();a.arc(x+n,y+h,12,0,7);a.fill()}for(let n=0;n<h;n+=22){a.beginPath();a.arc(x,y+n,12,0,7);a.fill();a.beginPath();a.arc(x+w,y+n,12,0,7);a.fill()}a.setLineDash([2,5]);a.strokeStyle='#dde6ee';a.strokeRect(x+12,y+12,w-24,h-24);a.setLineDash([])}
a.fillStyle='#f7fbff';a.fillRect(0,0,1254,1254);
for(let n=0;n<1254;n+=12){a.fillStyle=n%36===0?'rgba(209,226,240,.27)':'rgba(222,235,246,.21)';a.fillRect(n,0,5,1254);a.fillRect(0,n,1254,5)}
lace(0,45,1254,16);lace(0,1191,1254,18);lace(990,55,205,215);lace(45,985,300,210);lace(30,675,180,235);
rect(110,110,1034,1034,0,'rgba(255,255,255,.94)','#dce5ed');rect(141,141,972,972,0,'#fff','#e0e8ef');
a.save();a.strokeStyle='#d6e0e9';a.setLineDash([2,4]);a.beginPath();a.moveTo(154,199);a.lineTo(173,258);a.stroke();a.setLineDash([]);heart(173,264,32);a.fillStyle='#f9fbfe';a.fill();a.stroke();a.restore();
rect(500,93,248,62,4,'#fcfdff','#e2e8ee');a.fillStyle='#a4aab0';a.textAlign='center';a.font='bold 24px "Microsoft YaHei"';a.fillText('<少女礼盒>',624,133);
a.save();a.globalAlpha=.26;a.strokeStyle='#cfdce7';a.lineWidth=3;heart(627,515,210);a.stroke();a.fillStyle='#edf3f9';a.fill();a.font='italic 58px Georgia';a.fillStyle='#c5d4e2';a.fillText('Dear',627,492);a.fillText('My wish',627,548);a.restore();
a.save();a.globalAlpha=.3;rect(435,680,386,145,50,'#f3f8fc','#d7e2eb');a.strokeStyle='#d4e0ea';a.beginPath();a.ellipse(628,824,195,25,0,0,7);a.stroke();a.restore();
for(const [x,y] of [[399,274],[850,274],[87,647],[1200,273],[1190,1051]]){a.save();a.globalAlpha=.5;heart(x,y,28);a.strokeStyle='#e3edf5';a.lineWidth=3;a.stroke();a.restore()}
a.fillStyle='#a0a7ad';a.textAlign='center';a.font='bold 27px Georgia';a.fillText('「 ALIPAY 」',627,267);a.font='17px Georgia';a.fillStyle='#b5bbc0';a.fillText('Please take a screenshot after payment,thank you.',627,294);a.font='20px "Microsoft YaHei"';a.fillText('「署名」',627,1177);a.font='12px Georgia';a.fillText("THE GIRL’S WISH IS A TREASURED GIFT.",627,1200);
const referenceBase=new Image();
referenceBase.onload=async()=>{a.clearRect(0,0,1254,1254);a.drawImage(referenceBase,0,0,1254,1254);a.textAlign='center';a.fillStyle='#9ba7b2';a.font='bold 25px "Microsoft YaHei"';a.fillText('<少女礼盒>',627,134);a.font='bold 27px Georgia';a.fillText('「 ALIPAY 」',627,267);a.font='17px Georgia';a.fillStyle='#aeb8c1';a.fillText('Please take a screenshot after payment, thank you.',627,296);a.font='12px Georgia';a.fillText("THE GIRL'S WISH IS A TREASURED GIFT.",627,1200);assets.styleBackgrounds.gift=referenceBase;if(state.style==='gift'){state.libraryBg=referenceBase;state.qrColor=null;await recolor()}renderLibraryPreviews();draw()};
referenceBase.src='./assets/gift-reference-base.png';
const oldDraw=draw;
draw=function(){if(state.style!=='gift')return oldDraw();cropHitRegions.length=0;ctx.clearRect(0,0,1254,1254);ctx.drawImage(art,0,0);let items=codes().filter(v=>v.label!=='FRIEND').slice(0,3);if(!items.length)items=[{label:'WECHAT'},{label:'APPRECIATE'},{label:'ALIPAY'}];const xs=items.length===1?[627]:items.length===2?[450,804]:[385,627,869];items.forEach((v,i)=>{const x=xs[i]-103,y=522;ctx.save();ctx.shadowColor='#798a9c22';ctx.shadowBlur=12;ctx.shadowOffsetY=4;ctx.fillStyle='#fff';if(v.img?.appreciate){ctx.beginPath();ctx.arc(xs[i],y+103,103,0,Math.PI*2)}else rr(x,y,206,210,10);ctx.fill();ctx.restore();if(v.img){if(v.img.appreciate)drawAppreciate(v.img,x+12,y+14,182);else drawKnockout(v.img.canvas,x+12,y+14,182)}else{ctx.fillStyle='#f8fbfd';ctx.fillRect(x+15,y+15,176,176);ctx.fillStyle='#a1aab2';ctx.font='20px "Microsoft YaHei"';ctx.textAlign='center';ctx.fillText('收款码',xs[i],y+113)}ctx.fillStyle='#9aa3ab';ctx.font='bold 23px Georgia';ctx.textAlign='center';ctx.fillText(({WECHAT:'VX',APPRECIATE:'ZSM',ALIPAY:'ZFB'})[v.label]||v.label,xs[i],773)});ctx.fillStyle='#969fa8';ctx.textAlign='center';ctx.font='22px "Microsoft YaHei"';(state.giftText??defaultCopy).split('\n').slice(0,5).forEach((line,i)=>ctx.fillText(line,627,944+i*30,875));ctx.font='17px Georgia';ctx.fillText('- T h a n k  y o u  f o r  r e a d i n g -',627,1040)};
const drawGiftWithSignature=draw;draw=function(){drawGiftWithSignature();if(state.style==='gift'){ctx.fillStyle='#9ba7b2';ctx.textAlign='center';ctx.font='20px "Microsoft YaHei"';ctx.fillText(`「${state.name||'署名'}」`,627,1177)}};
if(state.style==='gift')selectStyle('gift');
renderLibraryPreviews();
})();
