/* Wesam V19 - public homepage enhancements */
(function(){
  'use strict';
  const DEFAULT_PHONE = '0790781206';
  const DEFAULT_WA = '962790781206';
  const qs = (s, root=document) => root.querySelector(s);
  const qsa = (s, root=document) => Array.from(root.querySelectorAll(s));
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  const phoneToWa = (p) => String(p || DEFAULT_WA).replace(/\D/g,'').replace(/^0/,'962') || DEFAULT_WA;
  let settings = { phone: DEFAULT_PHONE, whatsapp: DEFAULT_WA, mapUrl: '', appUrl: '', storeEnabled: true, repairsEnabled: true };

  const cases = {
    led_no_power: {
      icon:'📺', title:'الشاشة لا تعمل نهائيًا', sub:'لا توجد لمبة بيان أو الجهاز يفصل بسرعة.', service:'شاشة LED لا تعمل',
      text:'الاحتمال الأقرب يكون في دائرة الباور أو تغذية المين بورد. سجّل الطلب مع ذكر الموديل وحجم الشاشة وصورة خلفية الجهاز إن أمكن.',
      checks:['افصل الكهرباء 5 دقائق ثم جرّب مرة واحدة فقط.','لا تكرر التشغيل إذا سمعت صوت تكتكة أو شممت رائحة احتراق.','اكتب رقم الموديل الموجود خلف الشاشة قبل إرسال الطلب.']
    },
    led_backlight: {
      icon:'💡', title:'صوت موجود والصورة مظلمة', sub:'غالبًا عطل إضاءة خلفية أو دائرة LED.', service:'عطل إضاءة خلفية',
      text:'هذا العطل شائع في شاشات LED ويحتاج فحص ليدات الإضاءة ومزودها. الأفضل عدم تشغيل الشاشة لفترات طويلة حتى لا يزيد العطل.',
      checks:['قرّب كشاف هاتف من الشاشة للتأكد من وجود صورة خافتة.','اذكر حجم الشاشة وعدد سنوات الاستخدام.','لا تضغط على البانل أثناء الفحص.']
    },
    remote_receiver: {
      icon:'🕹️', title:'ريموت أو رسيفر أو ملحقات', sub:'شراء سريع من المتجر أو سؤال عن التوفر.', service:'استفسار متجر',
      text:'يمكنك فتح المتجر أو مراسلتنا بصورة القطعة المطلوبة. سنطابق الريموت أو الملحق حسب موديل الجهاز.',
      checks:['صوّر الريموت القديم أو رقم موديل الجهاز.','اذكر نوع القطعة: ريموت، رسيفر، كيبل، حامل.','تأكد من رقم الهاتف للتواصل السريع.']
    },
    microwave: {
      icon:'♨️', title:'الميكروويف لا يسخّن', sub:'يعمل لكن التسخين ضعيف أو غير موجود.', service:'صيانة ميكروويف',
      text:'أعطال التسخين تحتاج فحص آمن لدائرة الجهد العالي. لا تفتح الجهاز منزليًا لأن المكثف الداخلي قد يبقى مشحونًا.',
      checks:['لا تفك الغطاء في المنزل.','اكتب هل الطبق يدور وهل الإضاءة تعمل.','اذكر هل يوجد صوت غير طبيعي أو رائحة.']
    },
    vacuum: {
      icon:'🧹', title:'المكنسة ضعيفة أو تفصل', sub:'ضعف شفط، صوت عالي، أو فصل متكرر.', service:'صيانة مكنسة كهربائية',
      text:'قد يكون السبب فلتر مسدود، فرش كربون، موتور، أو سلك الكهرباء. أرسل نوع المكنسة ووصف الصوت أو العطل.',
      checks:['نظّف الفلتر إن كان قابلًا للتنظيف قبل الطلب.','لا تستمر بتشغيلها إذا ظهرت رائحة احتراق.','اذكر هل العطل يظهر فور التشغيل أم بعد دقائق.']
    }
  };

  function requestUrl(service){ return 'request.html?service=' + encodeURIComponent(service || 'maintenance') + '&source=v19_assistant'; }
  function waUrl(service){ const text = 'مرحبًا، أريد الاستفسار عن: ' + (service || 'طلب صيانة') + ' عبر موقع وسام للإلكترونيات'; return 'https://wa.me/' + phoneToWa(settings.whatsapp || settings.phone) + '?text=' + encodeURIComponent(text); }

  function resultHtml(key){
    const c = cases[key] || cases.led_no_power;
    return `<h3>${esc(c.title)}</h3><p>${esc(c.text)}</p><div class="wesam-v19-checks">${c.checks.map(x=>`<div>✓ ${esc(x)}</div>`).join('')}</div><div class="wesam-v19-actions"><a class="wesam-v19-btn primary" href="${requestUrl(c.service)}">تسجيل طلب صيانة</a><a class="wesam-v19-btn light" href="${waUrl(c.service)}" target="_blank" rel="noopener">واتساب مباشر</a><a class="wesam-v19-btn ghost" href="track.html">تتبع طلب سابق</a></div>`;
  }

  function injectAssistant(){
    if(qs('#wesamV19Assistant')) return;
    const hero = qs('.hero') || qs('section');
    if(!hero || !hero.parentNode) return;
    const section = document.createElement('section');
    section.id = 'wesamV19Assistant';
    section.className = 'wesam-v19-section wesam-v19-assistant';
    section.innerHTML = `<div class="wesam-v19-shell"><div class="wesam-v19-head"><div><div class="wesam-v19-kicker">⚡ مساعد ذكي لاختيار الخدمة</div><h2>اختر العطل وسنقترح عليك أسرع إجراء</h2><p>هذا القسم يساعد العميل على فهم الخطوة الصحيحة قبل التواصل، ويقلل الرسائل الناقصة عند تسجيل طلب الصيانة.</p></div><div class="wesam-v19-status"><b><span class="dot"></span>جاهزون لاستقبال الطلبات</b><span>صيانة شاشات LED، ميكروويف، مكانس، وملحقات إلكترونية.</span></div></div><div class="wesam-v19-grid"><div class="wesam-v19-cases">${Object.entries(cases).map(([k,c],i)=>`<button type="button" class="wesam-v19-case ${i===0?'active':''}" data-case="${k}"><span class="icon">${c.icon}</span><strong>${esc(c.title)}</strong><small>${esc(c.sub)}</small></button>`).join('')}</div><div class="wesam-v19-result" id="wesamV19Result">${resultHtml('led_no_power')}</div></div></div>`;
    hero.insertAdjacentElement('afterend', section);
    qsa('.wesam-v19-case', section).forEach(btn => btn.addEventListener('click', () => {
      qsa('.wesam-v19-case', section).forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      localStorage.setItem('wesam_v19_last_case', btn.dataset.case);
      qs('#wesamV19Result').innerHTML = resultHtml(btn.dataset.case);
    }));
    const last = localStorage.getItem('wesam_v19_last_case');
    if(last && cases[last]) qs(`.wesam-v19-case[data-case="${last}"]`, section)?.click();
  }

  function injectProof(){
    if(qs('#wesamV19Proof')) return;
    const services = qs('#services') || qs('.section-light');
    if(!services || !services.parentNode) return;
    const section = document.createElement('section');
    section.id = 'wesamV19Proof';
    section.className = 'wesam-v19-section wesam-v19-proof';
    section.innerHTML = `<div class="wesam-v19-shell"><div class="wesam-v19-proof-grid"><div class="wesam-v19-proof-card"><i>🧾</i><b>رقم طلب واضح</b><span>كل طلب صيانة أو بيع يمكن تتبعه برقم واضح من صفحة التتبع.</span></div><div class="wesam-v19-proof-card"><i>🛡️</i><b>ضمان وفحص منظم</b><span>تسجيل بيانات الجهاز والعطل يساعد على متابعة الإصلاح بدقة.</span></div><div class="wesam-v19-proof-card"><i>📍</i><b>خدمة محلية في عمّان</b><span>روابط مباشرة للخريطة والواتساب لتسهيل الوصول والتواصل.</span></div><div class="wesam-v19-proof-card"><i>🔔</i><b>متابعة بعد الطلب</b><span>العميل يستطيع العودة لصفحة التتبع بدل تكرار السؤال عن الحالة.</span></div></div></div>`;
    services.insertAdjacentElement('afterend', section);
  }

  function injectFloatingBar(){
    if(qs('#wesamV19Floating')) return;
    const el = document.createElement('nav');
    el.id = 'wesamV19Floating';
    el.className = 'wesam-v19-floating';
    const map = settings.mapUrl || 'contact.html';
    el.innerHTML = `<a class="primary" href="request.html?source=v19_mobile_bar">صيانة</a><a href="${waUrl('استفسار سريع')}" target="_blank" rel="noopener">واتساب</a><a href="track.html">تتبع</a><a href="${esc(map)}" ${settings.mapUrl?'target="_blank" rel="noopener"':''}>الخريطة</a>`;
    document.body.appendChild(el);
  }

  function injectOnlineBadge(){
    if(qs('#wesamV19Online')) return;
    const b = document.createElement('div');
    b.id = 'wesamV19Online';
    b.className = 'wesam-v19-online';
    function paint(){ b.className = 'wesam-v19-online ' + (navigator.onLine ? 'on' : 'off'); b.textContent = navigator.onLine ? 'متصل — الموقع جاهز' : 'غير متصل — ستعمل الروابط المحلية فقط'; }
    window.addEventListener('online', paint); window.addEventListener('offline', paint); paint();
    document.body.appendChild(b);
  }

  async function loadSettings(){
    try{
      if(window.WesamFirebase && WesamFirebase.loadSettings){
        const s = await WesamFirebase.loadSettings();
        settings = Object.assign(settings, s || {});
      }
    }catch(e){ console.warn('V19 settings fallback:', e.message); }
  }

  function init(){ injectAssistant(); injectProof(); injectFloatingBar(); injectOnlineBadge(); }
  function whenReady(){
    let tries = 0;
    const timer = setInterval(() => {
      tries++;
      if(qs('.hero') || tries > 30){ clearInterval(timer); loadSettings().finally(init); }
    }, 180);
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', whenReady); else whenReady();
})();
