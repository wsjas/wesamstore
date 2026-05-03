
(function(){
  'use strict';
  function loadScript(src){return new Promise((res,rej)=>{if(document.querySelector('script[src="'+src+'"]')) return res(); const s=document.createElement('script'); s.src=src; s.onload=res; s.onerror=rej; document.head.appendChild(s);});}
  async function ensureFirebase(){
    if(window.WesamFirebase) return window.WesamFirebase;
    if(!window.firebase){
      await loadScript('https://www.gstatic.com/firebasejs/10.12.4/firebase-app-compat.js');
      await loadScript('https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore-compat.js');
      await loadScript('https://www.gstatic.com/firebasejs/10.12.4/firebase-auth-compat.js').catch(()=>{});
    }
    await loadScript('firebase-config.js');
    return window.WesamFirebase;
  }
  function addAnnouncement(s){
    if(!s || s.announcementEnabled===false || !s.announcement) return;
    if(document.getElementById('wesamTopAnnouncement')) return;
    var bar=document.createElement('div');
    bar.id='wesamTopAnnouncement';
    bar.textContent=s.announcement;
    bar.style.cssText='position:relative;z-index:99999;background:linear-gradient(135deg,'+(s.primaryColor||'#f97316')+','+(s.secondaryColor||'#2563eb')+');color:#fff;text-align:center;padding:10px 12px;font-weight:900;font-family:Tahoma,Arial,sans-serif;box-shadow:0 8px 22px rgba(15,23,42,.16)';
    document.body.insertBefore(bar, document.body.firstChild);
  }
  function setCssVars(s){
    if(!s) return;
    if(s.primaryColor) document.documentElement.style.setProperty('--orange', s.primaryColor);
    if(s.secondaryColor) document.documentElement.style.setProperty('--blue', s.secondaryColor);
  }
  function updateLinks(s){
    if(!s) return;
    var wa = (s.whatsapp||'').replace(/\D/g,'').replace(/^0/,'962');
    if(wa) document.querySelectorAll('a[href*="wa.me"],a[href*="whatsapp"]').forEach(a=>{ if(!a.dataset.keepHref) a.href='https://wa.me/'+wa; });
    if(s.facebookUrl) document.querySelectorAll('a[href*="facebook.com"]').forEach(a=>{ if(!a.dataset.keepHref) a.href=s.facebookUrl; });
    if(s.mapUrl) document.querySelectorAll('a[href*="maps"],a[href*="goo.gl/maps"]').forEach(a=>{ if(!a.dataset.keepHref) a.href=s.mapUrl; });
  }
  function applyToggles(s){
    if(!s) return;
    if(s.storeEnabled===false) document.querySelectorAll('a[href*="shop.html"],a[href*="checkout.html"]').forEach(x=>x.style.display='none');
    if(s.repairsEnabled===false) document.querySelectorAll('a[href*="request.html"],a[href*="maintenance.html"]').forEach(x=>x.style.display='none');
    if(s.academyEnabled===false) document.querySelectorAll('a[href*="academy"],a[href*="courses"]').forEach(x=>x.style.display='none');
  }
  async function run(){
    try{
      var W=await ensureFirebase(); if(!W || !W.loadSettings) return;
      var s=await W.loadSettings();
      setCssVars(s); addAnnouncement(s); updateLinks(s); applyToggles(s);
      window.WESAM_SITE_SETTINGS=s;
    }catch(e){ console.warn('Wesam site settings skipped:', e.message||e); }
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', run); else run();
})();
