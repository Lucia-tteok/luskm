(()=>{
  const dialog=document.createElement('dialog');
  dialog.className='site-notice';dialog.setAttribute('role','alertdialog');dialog.setAttribute('aria-labelledby','siteNoticeTitle');dialog.setAttribute('aria-describedby','siteNoticeMessage');
  dialog.innerHTML='<div class="site-notice-ornament" aria-hidden="true"><span>✦</span><span>◇</span><span>✦</span></div><div class="site-notice-icon" aria-hidden="true">!</div><h2 id="siteNoticeTitle">温馨提示</h2><p id="siteNoticeMessage" class="site-notice-message"></p><div class="site-notice-actions"><button type="button" class="site-notice-confirm">知道了</button></div>';
  document.body.append(dialog);
  const message=dialog.querySelector('.site-notice-message');
  const confirm=dialog.querySelector('.site-notice-confirm');
  const queue=[];let previousFocus=null;
  function showNext(){
    if(dialog.open||!queue.length)return;
    previousFocus=document.activeElement;
    message.textContent=queue.shift();
    dialog.showModal();confirm.focus();
  }
  dialog.addEventListener('close',()=>{previousFocus?.focus?.();showNext()});
  confirm.addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close()});
  window.alert=function(value){queue.push(String(value??''));showNext()};
})();
