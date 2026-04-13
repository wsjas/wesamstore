(function(){
  const config = {
    apiKey: "AIzaSyBDlQYnTunZMDwIFsysgPbmovHkPj0f3M8",
    authDomain: "wesamstorenew.firebaseapp.com",
    projectId: "wesamstorenew",
    storageBucket: "wesamstorenew.appspot.com",
    messagingSenderId: "956353010212",
    appId: "1:956353010212:web:2e5ee949fa8f4ea713d6b1",
    measurementId: "G-EDLFXHCPBB"
  };

  let app = null;
  let db = null;
  let auth = null;
  let storage = null;
  let initError = null;

  function init(){
    try {
      if (typeof firebase === 'undefined') throw new Error('Firebase SDK is not loaded');
      app = firebase.apps.length ? (firebase.apps.find(a => a.name === '[DEFAULT]') || firebase.app()) : firebase.initializeApp(config);
      db = firebase.firestore();
      auth = firebase.auth();
      try { storage = firebase.storage(); } catch(e) { storage = null; }
      window.db = db;
      window.auth = auth;
      window.storage = storage;
      window.firebaseInitialized = true;
      window.firebaseError = null;
      initError = null;
      return true;
    } catch (error) {
      console.error('Firebase init failed:', error);
      initError = error;
      window.firebaseInitialized = false;
      window.firebaseError = error && error.message ? error.message : String(error);
      return false;
    }
  }

  function ensureInit(){
    if (!db || !auth) init();
    return !!db;
  }

  function getServerTimestamp(){
    try {
      const st = firebase?.firestore?.FieldValue?.serverTimestamp;
      return (typeof st === 'function') ? st() : new Date();
    } catch (e) {
      return new Date();
    }
  }

  window.WesamFirebase = {
    config,
    init,
    ensureInit,
    get app(){ return app; },
    get db(){ ensureInit(); return db; },
    get auth(){ ensureInit(); return auth; },
    get storage(){ ensureInit(); return storage; },
    getServerTimestamp,
    isReady(){ return ensureInit(); },
    getError(){ return initError ? (initError.message || String(initError)) : null; },
    getServices(){ ensureInit(); return { app, db, auth, storage }; }
  };
})();
