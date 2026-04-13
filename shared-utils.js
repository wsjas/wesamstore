(function(){
  function $id(id){ return document.getElementById(id); }
  function escapeHtml(value){
    const d = document.createElement('div');
    d.textContent = value == null ? '' : String(value);
    return d.innerHTML;
  }
  window.WesamUtils = { $id, escapeHtml };
})();
