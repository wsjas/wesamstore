/* Wesam V20 - public homepage extra improvements */
(function(){
  'use strict';
  const DEFAULT_PHONE = '0790781206';
  const DEFAULT_WA = '962790781206';
  const qs = (s, root=document) => root.querySelector(s);
  const qsa = (s, root=document) => Array.from(root.querySelectorAll(s));
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  const cleanPhone = (p) => String(p || DEFAULT_WA).replace(/\D/g,'').replace(/^0/,'962') || DEFAULT_WA;
  let settings = { phone: DEFAULT_PHONE, whatsapp: DEFAULT_WA, mapUrl: '', facebook: '', appUrl: '', storeEnabled: true, repairsEnabled: true };
  let lastClientError = '';

  function waUrl(topic){
    const msg = 'مرحبًا وسام للإلكترونيات، أريد: ' + (topic || 'استفسار من الموقع');
    return 'https://wa.me/' + cleanPhone(settings.whatsapp || settings.phone) + '?text=' + encodeURIComponent(msg);
  }
  function linkTarget(kind){
    if(kind === 'whatsapp') return waUrl('استفسار سريع');
    if(kind === 'map') return settings.mapUrl || 'contact.html';
    if(kind === 'facebook') return settings.facebook || 'https://www.facebook.com/share/1GiLxNKbdd/?mibextid=wwXIfr';
    if(kind === 'app') return settings.appUrl || 'customer-portal.html';
    return '#';
  }

  window.addEventListener('error', (e)=>{ lastClientError = (e.message || 'خطأ غير معروف') + (e.filename ? '\n' + e.filename + ':' + e.lineno : ''); });
  window.addEventListener('unhandledrejection', (e)=>{ lastClientError = (e.reason && (e.reason.message || String(e.reason))) || 'Promise rejection'; });

  async function loadSettings(){
    try{
      if(window.WesamFirebase && WesamFirebase.loadSettings){
        const s = await WesamFirebase.loadSettings();
        settings = Object.assign(settings, s || {});
      }
    }catch(e){ console.warn('V20 settings fallback:', e.message); }
  }

  function injectActionHub(){
    if(qs('#wesamV20Hub')) return;
    const anchor = qs('#wesamV19Proof') || qs('#wesamV19Assistant') || qs('.cta-section')?.closest('section') || qs('footer');
    if(!anchor || !anchor.parentNode) return;
    const hub = document.createElement('section');
    hub.id = 'wesamV20Hub';
    hub.className = 'wesam-v20-section wesam-v20-hub';
    hub.innerHTML = `<div class="wesam-v20-shell">
      <div class="wesam-v20-hub-head">
        <div><div class="wesam-v20-badge">🚀 مركز وصول سريع V20</div><h2>كل ما يحتاجه العميل في مكان واحد</h2><p>قسم عملي يختصر الطريق: طلب صيانة، تتبع، متجر، واتساب، خريطة، وتطبيق/بوابة العميل. الهدف تقليل ضياع العميل داخل الصفحة وزيادة الطلبات المكتملة.</p></div>
        <div class="wesam-v20-mini-status"><b><span class="wesam-v20-dot"></span>حالة الصفحة</b><span>تعمل روابط الصفحة محليًا حتى لو تعذر تحميل بعض بيانات Firebase.</span><div class="row"><span>رقم التواصل</span><strong>${esc(settings.phone || DEFAULT_PHONE)}</strong></div></div>
      </div>
      <div class="wesam-v20-grid">
        <a class="wesam-v20-card" href="request.html?source=v20_hub"><span class="ico">🛠️</span><strong>طلب صيانة سريع</strong><span>للشاشات، الميكروويف، المكانس، والأجهزة الإلكترونية.</span><em>افتح الطلب ←</em></a>
        <a class="wesam-v20-card" href="shop.html"><span class="ico">🛒</span><strong>المتجر</strong><span>ريموتات، رسيفرات، كيبلات، حوامل، وإكسسوارات.</span><em>تصفح المنتجات ←</em></a>
        <a class="wesam-v20-card" href="${esc(linkTarget('whatsapp'))}" target="_blank" rel="noopener"><span class="ico">💬</span><strong>واتساب مباشر</strong><span>استخدمه عندما تريد إرسال صورة العطل أو سؤال سريع.</span><em>راسلنا الآن ←</em></a>
        <a class="wesam-v20-card" href="${esc(linkTarget('map'))}" ${settings.mapUrl ? 'target="_blank" rel="noopener"' : ''}><span class="ico">📍</span><strong>الموقع على الخريطة</strong><span>زر واضح للعملاء الذين يريدون الوصول إلى مركز الصيانة.</span><em>افتح الموقع ←</em></a>
        <div class="wesam-v20-card wesam-v20-track"><span class="ico">🔎</span><strong>تتبع طلبك مباشرة</strong><span>اكتب رقم الطلب أو الصيانة، وسيتم فتح صفحة التتبع مع الرقم.</span><form class="wesam-v20-track-form" id="wesamV20TrackForm"><input id="wesamV20TrackInput" placeholder="مثال: SR-123 أو OR-123" autocomplete="off"><button type="submit">تتبع</button></form></div>
        <a class="wesam-v20-card" href="academy.html"><span class="ico">🎓</span><strong>الأكاديمية</strong><span>مدخل واضح لدروس الصيانة والإلكترونيات عند إضافتها للموقع.</span><em>افتح الدروس ←</em></a>
        <a class="wesam-v20-card" href="${esc(linkTarget('facebook'))}" target="_blank" rel="noopener"><span class="ico">📣</span><strong>فيس بوك</strong><span>تحويل مباشر لصفحة التواصل والعروض.</span><em>فتح الصفحة ←</em></a>
        <a class="wesam-v20-card" href="${esc(linkTarget('app'))}"><span class="ico">📱</span><strong>التطبيق / بوابة العميل</strong><span>مدخل للتطبيق أو بوابة العميل حسب الرابط المحفوظ في الإعدادات.</span><em>فتح البوابة ←</em></a>
      </div>
    </div>`;
    anchor.insertAdjacentElement('afterend', hub);
    const form = qs('#wesamV20TrackForm', hub);
    form?.addEventListener('submit', (e)=>{
      e.preventDefault();
      const v = qs('#wesamV20TrackInput', hub)?.value.trim();
      location.href = v ? 'track.html?id=' + encodeURIComponent(v) : 'track.html';
    });
  }

  function injectChecklist(){
    if(qs('#wesamV20OpenCheck')) return;
    const open = document.createElement('button');
    open.id = 'wesamV20OpenCheck';
    open.className = 'wesam-v20-open-check show';
    open.type = 'button';
    open.textContent = '✓ قبل إرسال الصيانة';
    const box = document.createElement('div');
    box.id = 'wesamV20CheckWidget';
    box.className = 'wesam-v20-check-widget';
    box.innerHTML = `<div class="wesam-v20-check-head"><b>قائمة تجهيز طلب الصيانة</b><button type="button" id="wesamV20CloseCheck">إغلاق</button></div><div class="wesam-v20-check-body">
      <label><input type="checkbox" data-k="model"> كتبت رقم موديل الجهاز أو صورت الملصق الخلفي.</label>
      <label><input type="checkbox" data-k="fault"> وصفت العطل بوضوح: لا يعمل، صوت بدون صورة، إضاءة، فصل، إلخ.</label>
      <label><input type="checkbox" data-k="phone"> تأكدت من رقم الهاتف والعنوان.</label>
      <label><input type="checkbox" data-k="image"> جهزت صورة للجهاز أو العطل عند الحاجة.</label>
      <div class="actions"><a class="wesam-v20-small-btn" href="request.html?source=v20_checklist">إرسال طلب</a><a class="wesam-v20-small-btn green" href="${esc(waUrl('طلب صيانة مع صورة'))}" target="_blank" rel="noopener">واتساب</a><button class="wesam-v20-small-btn light" type="button" id="wesamV20ResetCheck">مسح</button></div>
    </div>`;
    document.body.appendChild(open); document.body.appendChild(box);
    open.addEventListener('click', ()=> box.classList.toggle('show'));
    qs('#wesamV20CloseCheck')?.addEventListener('click', ()=> box.classList.remove('show'));
    const key = 'wesam_v20_service_checklist';
    function save(){ const data = {}; qsa('input[type="checkbox"]', box).forEach(i=>data[i.dataset.k]=i.checked); localStorage.setItem(key, JSON.stringify(data)); }
    try{ const data = JSON.parse(localStorage.getItem(key)||'{}'); qsa('input[type="checkbox"]', box).forEach(i=>i.checked=!!data[i.dataset.k]); }catch(e){}
    qsa('input[type="checkbox"]', box).forEach(i=>i.addEventListener('change', save));
    qs('#wesamV20ResetCheck')?.addEventListener('click', ()=>{ qsa('input[type="checkbox"]', box).forEach(i=>i.checked=false); save(); });
  }

  function whiteScreenGuard(){
    setTimeout(()=>{
      const root = qs('#root');
      const hasHero = !!qs('.hero');
      const rootEmpty = root && root.textContent.trim().length < 30 && root.children.length === 0;
      if(!hasHero && root && rootEmpty){
        root.innerHTML = `<div class="wesam-v20-rescue"><div class="wesam-v20-rescue-card"><h1>وسام للإلكترونيات</h1><p>تم تشغيل وضع الإنقاذ لأن الصفحة الرئيسية لم تُرسم بشكل صحيح. غالبًا السبب ملف JavaScript لم يُحمّل، أو خطأ في JSX/Babel، أو انقطاع اتصال. تستطيع استخدام الروابط الأساسية الآن.</p><div class="wesam-v20-rescue-actions"><a href="request.html">طلب صيانة</a><a href="shop.html">المتجر</a><a href="track.html">تتبع طلب</a><a href="${esc(waUrl('مشكلة في فتح الموقع'))}" class="dark" target="_blank" rel="noopener">واتساب</a><button class="light" onclick="location.reload()">إعادة تحميل</button></div><div class="wesam-v20-error-line">${esc(lastClientError || 'لا يوجد خطأ مسجل في المتصفح حتى الآن.')}</div></div></div>`;
      }
    }, 3800);
  }

  function init(){
    loadSettings().finally(()=>{
      injectActionHub();
      injectChecklist();
      whiteScreenGuard();
    });
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
