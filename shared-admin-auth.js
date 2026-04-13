(function(){
  function normalizeEmail(email){ return String(email || '').trim().toLowerCase(); }
  function defaultMapAuthError(err){
    const code = err && err.code ? String(err.code) : '';
    switch(code){
      case 'auth/invalid-email': return 'البريد الإلكتروني غير صحيح';
      case 'auth/user-not-found': return 'الحساب غير موجود';
      case 'auth/wrong-password': return 'كلمة المرور غير صحيحة';
      case 'auth/too-many-requests': return 'محاولات كثيرة، حاول لاحقاً';
      case 'auth/network-request-failed': return 'مشكلة اتصال بالإنترنت';
      case 'auth/user-disabled': return 'تم تعطيل هذا الحساب';
      default: return (err && err.message) ? err.message : 'فشل تسجيل الدخول';
    }
  }

  function build(opts){
    const auth = opts && opts.auth;
    const db = opts && opts.db;
    const mapAuthError = (opts && opts.mapAuthError) || defaultMapAuthError;
    const adminEmailSet = new Set(((opts && opts.adminEmails) || []).map(normalizeEmail));

    function emailInAdminList(email){ return adminEmailSet.has(normalizeEmail(email)); }

    async function checkAdminByAdminsDoc(user){
      try{
        if(!user || !db) return null;
        const snap = await db.collection('admins').doc(user.uid).get();
        return !!snap.exists;
      }catch(e){
        console.warn('admins doc check failed:', e);
        return null;
      }
    }

    async function isAdmin(user){
      if(!user) return false;
      if(emailInAdminList(user.email)) return true;
      const exists = await checkAdminByAdminsDoc(user);
      return exists === true;
    }

    async function signInAsAdmin(email,password){
      if(!auth) throw new Error('Auth is not available');
      const cred = await auth.signInWithEmailAndPassword(email,password);
      const user = cred && cred.user;
      const ok = await isAdmin(user);
      if(!ok){
        try{ await auth.signOut(); }catch(_e){}
        const error = new Error('هذا الحساب ليس مدير');
        error.code = 'auth/not-admin';
        throw error;
      }
      return cred;
    }

    function bindSimpleUI(ui){
      const loginButton = ui.loginButton;
      const emailInput = ui.emailInput;
      const passwordInput = ui.passwordInput;
      const errorBox = ui.errorBox;
      const overlay = ui.overlay;
      const logoutButton = ui.logoutButton;
      const idleText = ui.idleText || 'تسجيل الدخول';
      const loadingText = ui.loadingText || 'جاري التحقق...';
      let initialized = false;

      function setError(msg){
        if(!errorBox) return;
        errorBox.textContent = msg || '';
        errorBox.style.display = msg ? 'block' : 'none';
      }
      function setLoading(isLoading){
        if(!loginButton) return;
        loginButton.disabled = !!isLoading;
        loginButton.textContent = isLoading ? loadingText : idleText;
      }
      async function handleAuthState(user){
        const allowed = await isAdmin(user);
        if(allowed){
          if(overlay) overlay.style.display = 'none';
          if(typeof ui.onAuthorized === 'function') await ui.onAuthorized(user, !initialized);
        } else {
          if(overlay) overlay.style.display = 'flex';
          if(typeof ui.onUnauthorized === 'function') await ui.onUnauthorized(user, !initialized);
        }
        initialized = true;
      }
      async function handleLogin(){
        const email = emailInput ? emailInput.value.trim() : '';
        const password = passwordInput ? passwordInput.value : '';
        if(!email || !password){ setError('أدخل البريد وكلمة المرور'); return; }
        setError('');
        setLoading(true);
        try{
          await signInAsAdmin(email,password);
        }catch(err){
          setError(mapAuthError(err));
          if(typeof ui.onLoginError === 'function') ui.onLoginError(err);
        }finally{
          setLoading(false);
        }
      }

      if(loginButton) loginButton.addEventListener('click', handleLogin);
      if(passwordInput) passwordInput.addEventListener('keydown', e => { if(e.key === 'Enter') handleLogin(); });
      if(logoutButton) logoutButton.addEventListener('click', async()=>{ try{ await auth.signOut(); } finally { location.reload(); } });
      if(auth && typeof auth.onAuthStateChanged === 'function'){
        auth.onAuthStateChanged(user => { handleAuthState(user).catch(e => console.warn('auth state handler failed', e)); });
      }

      return { setError, setLoading, handleLogin, isAdmin, checkAdminByAdminsDoc };
    }

    return { emailInAdminList, checkAdminByAdminsDoc, isAdmin, signInAsAdmin, bindSimpleUI, mapAuthError };
  }

  window.WesamAdminAuth = { build, defaultMapAuthError };
})();
