(()=>{
  const original=drawAppreciate;
  drawAppreciate=function(item,x,y,size){
    const cx=x+size/2,cy=y+size/2,r=size/2-2;
    ctx.save();
    ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);ctx.clip();
    ctx.fillStyle='#fff';ctx.fillRect(x,y,size,size);
    original(item,x,y,size);
    ctx.restore();
    ctx.save();ctx.strokeStyle='#454545';ctx.lineWidth=Math.max(1.5,size*.009);
    ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);ctx.stroke();ctx.restore();
  };
  const originalCard=qrCard;
  qrCard=function(item,x,y,size,labelY=y+size+43,opt={}){
    if(!item?.img?.appreciate)return originalCard(item,x,y,size,labelY,opt);
    ctx.save();ctx.shadowColor=opt.shadow||'rgba(50,50,50,.18)';ctx.shadowBlur=15;ctx.shadowOffsetY=6;
    ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(x+size/2,y+size/2,size/2,0,Math.PI*2);ctx.fill();ctx.restore();
    drawAppreciate(item.img,x+7,y+7,size-14);
    ctx.fillStyle='#666';ctx.textAlign='center';ctx.font=`${size<235?20:25}px Arial`;
    ctx.fillText(item.label||'APPRECIATE',x+size/2,labelY);
  };
})();
