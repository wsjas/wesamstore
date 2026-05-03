// Wesam Electronics Firebase connection - shared for all pages
(function () {
  const firebaseConfig = {
    apiKey: "AIzaSyCqEeXe2NOjzLeyns7IaPczxhCDUDg88Kc",
    authDomain: "wesamapp-790c1.firebaseapp.com",
    databaseURL: "https://wesamapp-790c1-default-rtdb.firebaseio.com",
    projectId: "wesamapp-790c1",
    storageBucket: "wesamapp-790c1.firebasestorage.app",
    messagingSenderId: "624654723290",
    appId: "1:624654723290:web:55fb3a4ca01781fed95de3",
    measurementId: "G-BGT9BR9QKS"
  };

  function init() {
    if (!window.firebase) {
      console.error('Firebase SDK لم يتم تحميله');
      return null;
    }
    if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
    try { if (firebase.analytics) firebase.analytics(); } catch (e) { console.warn('Analytics غير مفعّل:', e.message); }
    return firebase.app();
  }

  const app = init();
  const db = app && firebase.firestore ? firebase.firestore() : null;
  const auth = app && firebase.auth ? firebase.auth() : null;

  const cleanObject = (obj) => Object.fromEntries(Object.entries(obj || {}).filter(([, v]) => v !== undefined));

  async function getCollection(name, options = {}) {
    if (!db) throw new Error('Firebase غير مهيأ');
    let ref = db.collection(name);
    if (options.where) options.where.forEach(w => { ref = ref.where(w[0], w[1], w[2]); });
    if (options.orderBy) ref = ref.orderBy(options.orderBy[0], options.orderBy[1] || 'asc');
    if (options.limit) ref = ref.limit(options.limit);
    const snap = await ref.get();
    return snap.docs
      .map(d => ({ id: d.id, ...d.data() }))
      .filter(row => row.__system !== true);
  }

  async function addDoc(name, data) {
    if (!db) throw new Error('Firebase غير مهيأ');
    const payload = cleanObject({ ...data, createdAt: firebase.firestore.FieldValue.serverTimestamp(), source: 'wesam.store' });
    const ref = await db.collection(name).add(payload);
    return ref.id;
  }

  async function setDoc(name, id, data, merge = true) {
    if (!db) throw new Error('Firebase غير مهيأ');
    await db.collection(name).doc(id).set(cleanObject({ ...data, updatedAt: firebase.firestore.FieldValue.serverTimestamp() }), { merge });
    return id;
  }

  async function deleteDoc(name, id) {
    if (!db) throw new Error('Firebase غير مهيأ');
    await db.collection(name).doc(id).delete();
  }



  const DEFAULT_SITE_SETTINGS = {
    storeName: 'وسام للإلكترونيات',
    siteName: 'وسام للإلكترونيات',
    tagline: 'صيانة وبيع ومتجر إلكتروني',
    phone: '0790781206',
    whatsapp: '+962790781206',
    email: 'info@wesam.store',
    website: 'https://wesam.store',
    address: 'عمّان - الأردن',
    currency: 'JOD',
    currencyLabel: 'د.أ',
    timezone: 'Asia/Amman',
    storeEnabled: true,
    repairsEnabled: true,
    ordersEnabled: true,
    createdByAutoSetup: true
  };

  function withSystemFields(data) {
    return cleanObject({
      ...data,
      __system: true,
      createdBy: 'wesam-auto-setup',
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  }

  async function ensureDocument(collectionName, docId, data) {
    if (!db) throw new Error('Firebase غير مهيأ');
    const ref = db.collection(collectionName).doc(docId);
    const snap = await ref.get();
    if (!snap.exists) {
      await ref.set(withSystemFields({
        ...data,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      }), { merge: false });
      return { path: collectionName + '/' + docId, created: true };
    }
    return { path: collectionName + '/' + docId, created: false };
  }

  async function ensureCoreCollections(options = {}) {
    if (!db) throw new Error('Firebase غير مهيأ');
    const force = options.force === true;
    const key = 'wesam_firebase_auto_setup_done_v2';
    if (!force && localStorage.getItem(key) === '1') return { skipped: true, reason: 'already-ran-on-this-browser' };

    const tasks = [
      ensureDocument('settings', 'site', DEFAULT_SITE_SETTINGS),
      ensureDocument('config', 'site', DEFAULT_SITE_SETTINGS),
      ensureDocument('products', '_template', { active: false, visible: false, name: 'قالب داخلي - لا يظهر في المتجر', category: 'system', price: 0, stock: 0 }),
      ensureDocument('orders', '_template', { status: 'system', orderId: 'SYSTEM-TEMPLATE', customerName: 'قالب داخلي', total: 0 }),
      ensureDocument('service_requests', '_template', { status: 'system', requestId: 'SYSTEM-TEMPLATE', customerName: 'قالب داخلي', deviceType: 'system' }),
      ensureDocument('contact_messages', '_template', { status: 'system', name: 'قالب داخلي', phone: '', message: '' }),
      ensureDocument('subscribers', '_template', { status: 'system', name: 'قالب داخلي', phone: '' }),
      ensureDocument('coupons', '_template', { active: false, code: 'SYSTEM-TEMPLATE', discountType: 'fixed', value: 0 }),
      ensureDocument('notifications', '_template', { status: 'system', title: 'قالب داخلي', read: true })
    ];

    const results = await Promise.allSettled(tasks);
    const failed = results.filter(r => r.status === 'rejected');
    if (!failed.length) localStorage.setItem(key, '1');
    return {
      skipped: false,
      created: results.filter(r => r.status === 'fulfilled' && r.value.created).map(r => r.value.path),
      existing: results.filter(r => r.status === 'fulfilled' && !r.value.created).map(r => r.value.path),
      failed: failed.map(r => r.reason && r.reason.message ? r.reason.message : String(r.reason))
    };
  }

  function autoRunSetup() {
    if (!db) return;
    window.setTimeout(() => {
      ensureCoreCollections().then(res => {
        if (res && !res.skipped) console.info('Wesam Firebase auto setup:', res);
      }).catch(err => console.warn('تعذر إنشاء مجموعات Firebase تلقائيًا. تحقق من قواعد Firestore:', err.message));
    }, 700);
  }

  function normalizeProduct(doc) {
    const price = Number(doc.price ?? doc.salePrice ?? doc.currentPrice ?? 0);
    const old = Number(doc.old ?? doc.oldPrice ?? doc.compareAtPrice ?? 0) || null;
    const name = doc.name || doc.title || doc.nameAr || 'منتج بدون اسم';
    return {
      id: doc.id,
      cat: doc.cat || doc.category || doc.categoryId || 'other',
      kind: doc.kind || doc.type || doc.icon || 'remote',
      name,
      price,
      old,
      rating: Number(doc.rating || 5),
      badge: doc.badge || doc.label || '',
      stock: Number(doc.stock ?? doc.qty ?? doc.quantity ?? 0),
      imageUrl: doc.imageUrl || doc.image || doc.photo || '',
      active: doc.active !== false && doc.visible !== false
    };
  }

  async function loadProducts() {
    const rows = await getCollection('products', { limit: 200 });
    return rows.map(normalizeProduct).filter(p => p.active);
  }

  window.WESAM_FIREBASE_CONFIG = firebaseConfig;
  window.WesamFirebase = { app, db, auth, getCollection, addDoc, setDoc, deleteDoc, loadProducts, normalizeProduct, ensureCoreCollections };
  autoRunSetup();
})();
