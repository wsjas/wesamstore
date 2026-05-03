
(function(){
  if (window.__WESAM_ERROR_LOGGER__) return; window.__WESAM_ERROR_LOGGER__ = true;
  function safeString(v){try{return typeof v==='string'?v:JSON.stringify(v)}catch(e){return String(v)}}
  function log(payload){
    try{
      payload = Object.assign({page: location.pathname, href: location.href, userAgent: navigator.userAgent, time: new Date().toISOString(), source:'wesam-error-logger'}, payload||{});
      console.warn('Wesam logged error:', payload);
      var WF = window.WesamFirebase;
      if (WF && WF.addDoc) WF.addDoc('error_logs', payload).catch(function(e){console.warn('تعذر حفظ الخطأ في Firebase:', e.message)});
      var local = JSON.parse(localStorage.getItem('wesam_error_logs')||'[]'); local.unshift(payload); local = local.slice(0,30); localStorage.setItem('wesam_error_logs', JSON.stringify(local));
    } catch(e) { console.warn('Wesam error logger failed:', e); }
  }
  window.addEventListener('error', function(e){ log({type:'window.error', message:e.message||'JS Error', filename:e.filename||'', lineno:e.lineno||0, colno:e.colno||0, stack:e.error&&e.error.stack?safeString(e.error.stack):''}); });
  window.addEventListener('unhandledrejection', function(e){ log({type:'unhandledrejection', message:e.reason&&e.reason.message?e.reason.message:safeString(e.reason), stack:e.reason&&e.reason.stack?safeString(e.reason.stack):''}); });
  window.WesamLogError = log;
})();
