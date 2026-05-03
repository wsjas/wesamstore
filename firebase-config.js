// Wesam Electronics Firebase connection - shared for all pages
(function () {
  const firebaseConfig = {
    apiKey: "AIzaSyA8QALokJR8DXbOKfGNgkmOzJTAzhJ4ArQ",
    authDomain: "wesamstore-98c1f.firebaseapp.com",
    databaseURL: "https://wesamstore-98c1f-default-rtdb.firebaseio.com",
    projectId: "wesamstore-98c1f",
    storageBucket: "wesamstore-98c1f.firebasestorage.app",
    messagingSenderId: "89774380048",
    appId: "1:89774380048:web:601c7eef2cddff6deaa695",
    measurementId: "G-LZNN8106JC"
  };

  function init() {
    if (!window.firebase) {
      console.error('Firebase SDK لم يتم تحميله. تأكد من اتصال الإنترنت ومن ترتيب ملفات السكربت.');
      return null;
    }
    try {
      const existing = firebase.apps && firebase.apps.length ? firebase.app() : null;
      if (existing && existing.options && existing.options.projectId !== firebaseConfig.projectId) {
        console.warn('تم العثور على مشروع Firebase مختلف داخل الصفحة. سيتم استخدام التطبيق الحالي:', existing.options.projectId);
      }
      if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
      try { if (firebase.analytics) firebase.analytics(); } catch (e) { console.warn('Analytics غير مفعّل:', e.message); }
      return firebase.app();
    } catch (e) {
      console.error('تعذر تهيئة Firebase:', e);
      return null;
    }
  }

  const app = init();
  const db = app && firebase.firestore ? firebase.firestore() : null;
  const auth = app && firebase.auth ? firebase.auth() : null;
  const storage = app && firebase.storage ? firebase.storage() : null;
  try { if (auth && firebase.auth.Auth.Persistence) auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL); } catch (e) { console.warn('تعذر ضبط استمرارية تسجيل الدخول:', e.message); }

  const cleanObject = (obj) => Object.fromEntries(Object.entries(obj || {}).filter(([, v]) => v !== undefined));
  const isSystemRow = (row) => row && (row.__system === true || row.id === '_template' || row.status === 'system');

  async function getCollection(name, options = {}) {
    if (!db) throw new Error('Firebase غير مهيأ');
    let ref = db.collection(name);
    if (options.where) options.where.forEach(w => { ref = ref.where(w[0], w[1], w[2]); });
    if (options.orderBy) ref = ref.orderBy(options.orderBy[0], options.orderBy[1] || 'asc');
    if (options.limit) ref = ref.limit(options.limit);
    const snap = await ref.get();
    return snap.docs.map(d => ({ id: d.id, ...d.data() })).filter(row => !isSystemRow(row));
  }

  function listenCollection(name, cb, options = {}) {
    if (!db) throw new Error('Firebase غير مهيأ');
    let ref = db.collection(name);
    if (options.where) options.where.forEach(w => { ref = ref.where(w[0], w[1], w[2]); });
    if (options.orderBy) ref = ref.orderBy(options.orderBy[0], options.orderBy[1] || 'asc');
    if (options.limit) ref = ref.limit(options.limit);
    return ref.onSnapshot(snap => cb(snap.docs.map(d => ({ id: d.id, ...d.data() })).filter(row => !isSystemRow(row))));
  }

  async function addDoc(name, data) {
    if (!db) throw new Error('Firebase غير مهيأ');
    const payload = cleanObject({ ...data, createdAt: firebase.firestore.FieldValue.serverTimestamp(), source: data && data.source ? data.source : 'wesam.store' });
    const ref = await db.collection(name).add(payload);
    return ref.id;
  }

  async function setDoc(name, id, data, merge = true) {
    if (!db) throw new Error('Firebase غير مهيأ');
    await db.collection(name).doc(String(id)).set(cleanObject({ ...data, updatedAt: firebase.firestore.FieldValue.serverTimestamp() }), { merge });
    return String(id);
  }

  async function deleteDoc(name, id) {
    if (!db) throw new Error('Firebase غير مهيأ');
    await db.collection(name).doc(String(id)).delete();
  }

  async function getDoc(name, id) {
    if (!db) throw new Error('Firebase غير مهيأ');
    const snap = await db.collection(name).doc(String(id)).get();
    const row = snap.exists ? { id: snap.id, ...snap.data() } : null;
    return isSystemRow(row) ? null : row;
  }

  function toDateText(value) {
    try {
      const d = value && value.toDate ? value.toDate() : (value ? new Date(value) : new Date());
      return isNaN(d.getTime()) ? '' : d.toISOString().slice(0, 10);
    } catch (e) { return ''; }
  }

  const DEFAULT_SITE_SETTINGS = {
    storeName: 'وسام للإلكترونيات',
    siteName: 'وسام للإلكترونيات',
    tagline: 'صيانة وبيع ومتجر إلكتروني',
    phone: '0790781206',
    whatsapp: '+962790781206',
    email: 'info@wesam.store',
    website: 'https://wesam.store',
    facebook: '',
    mapUrl: '',
    appUrl: '',
    announcement: '',
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
    return cleanObject({ ...data, __system: true, createdBy: 'wesam-auto-setup', updatedAt: firebase.firestore.FieldValue.serverTimestamp() });
  }

  async function ensureDocument(collectionName, docId, data) {
    if (!db) throw new Error('Firebase غير مهيأ');
    const ref = db.collection(collectionName).doc(docId);
    const snap = await ref.get();
    if (!snap.exists) {
      await ref.set(withSystemFields({ ...data, createdAt: firebase.firestore.FieldValue.serverTimestamp() }), { merge: false });
      return { path: collectionName + '/' + docId, created: true };
    }
    return { path: collectionName + '/' + docId, created: false };
  }

  async function ensureCoreCollections(options = {}) {
    if (!db) throw new Error('Firebase غير مهيأ');
    const force = options.force === true;
    const key = 'wesam_firebase_auto_setup_done_' + firebaseConfig.projectId + '_v11';
    if (!force && localStorage.getItem(key) === '1') return { skipped: true, reason: 'already-ran-on-this-browser' };
    const tasks = [
      ensureDocument('settings', 'site', DEFAULT_SITE_SETTINGS),
      ensureDocument('config', 'site', DEFAULT_SITE_SETTINGS),
      ensureDocument('products', '_template', { active: false, visible: false, name: 'قالب داخلي - لا يظهر في المتجر', category: 'system', price: 0, sell: 0, stock: 0 }),
      ensureDocument('orders', '_template', { status: 'system', orderId: 'SYSTEM-TEMPLATE', customerName: 'قالب داخلي', total: 0 }),
      ensureDocument('service_requests', '_template', { status: 'system', requestId: 'SYSTEM-TEMPLATE', customerName: 'قالب داخلي', deviceType: 'system' }),
      ensureDocument('contact_messages', '_template', { status: 'system', name: 'قالب داخلي', phone: '', message: '' }),
      ensureDocument('subscribers', '_template', { status: 'system', name: 'قالب داخلي', phone: '' }),
      ensureDocument('coupons', '_template', { active: false, code: 'SYSTEM-TEMPLATE', discountType: 'fixed', value: 0 }),
      ensureDocument('notifications', '_template', { status: 'system', title: 'قالب داخلي', read: true }),
      ensureDocument('accounting_transactions', '_template', { status: 'system', type: 'income', amount: 0, description: 'قالب داخلي' }),
      ensureDocument('expenses', '_template', { status: 'system', amount: 0, category: 'system' }),
      ensureDocument('payments', '_template', { status: 'system', amount: 0, sourceCollection: 'system', sourceId: 'SYSTEM-TEMPLATE' }),
      ensureDocument('audit_logs', '_template', { status: 'system', action: 'template', description: 'قالب داخلي' }),
      ensureDocument('customers', '_template', { status: 'system', name: 'قالب داخلي', phone: '' }),
      ensureDocument('technicians', '_template', { status: 'system', name: 'قالب داخلي', phone: '' }),
      ensureDocument('admin_users', '_template', { status: 'system', name: 'قالب داخلي', role: 'admin' }),
      ensureDocument('suppliers', '_template', { status: 'system', name: 'قالب داخلي', phone: '' }),
      ensureDocument('purchase_orders', '_template', { status: 'system', supplierName: 'قالب داخلي', total: 0 }),
      ensureDocument('inventory_movements', '_template', { status: 'system', productId: 'SYSTEM-TEMPLATE', quantity: 0, type: 'adjust' }),
      ensureDocument('warranties', '_template', { status: 'system', warrantyId: 'SYSTEM-TEMPLATE', customerName: 'قالب داخلي' }),
      ensureDocument('work_notes', '_template', { status: 'system', sourceCollection: 'system', sourceId: 'SYSTEM-TEMPLATE', note: 'قالب داخلي' }),
      ensureDocument('diagnostics', '_template', { status: 'system', message: 'قالب داخلي' }),
      ensureDocument('followups', '_template', { status: 'system', sourceCollection: 'system', sourceId: 'SYSTEM-TEMPLATE', note: 'قالب داخلي' }),
      ensureDocument('message_templates', '_template', { status: 'system', name: 'قالب داخلي', type: 'system', text: '' }),
      ensureDocument('error_logs', '_template', { status: 'system', message: 'قالب داخلي', page: 'system' }),
      ensureDocument('archived_records', '_template', { status: 'system', originalCollection: 'system', originalId: 'SYSTEM-TEMPLATE', title: 'قالب داخلي' }),
      ensureDocument('devices', '_template', { status: 'system', customerName: 'قالب داخلي', phone: '', deviceType: 'system', deviceSerial: '' }),
      ensureDocument('daily_tasks', '_template', { status: 'system', title: 'قالب داخلي', type: 'system', priority: 'normal' }),
      ensureDocument('button_audits', '_template', { status: 'system', type: 'system', summary: {} }),
      ensureDocument('data_exports', '_template', { status: 'system', type: 'system', summary: {} }),
      ensureDocument('appointments', '_template', { status: 'system', customerName: 'قالب داخلي', phone: '', date: '' }),
      ensureDocument('returns', '_template', { status: 'system', customerName: 'قالب داخلي', type: 'return', amount: 0 }),
      ensureDocument('reviews', '_template', { status: 'system', customerName: 'قالب داخلي', rating: 5, text: '' }),
      ensureDocument('seo', 'site', { title: 'وسام للإلكترونيات', description: 'صيانة وبيع إلكترونيات في عمّان', keywords: 'وسام للإلكترونيات, صيانة شاشات, عمان' }),
      ensureDocument('notification_rules', 'site', { stockLimit: 2, lateDays: 3, followupDays: 0 }),
      ensureDocument('homepage_blocks', '_template', { status: 'system', active: false, title: 'قالب داخلي', placement: 'system', sortOrder: 0 }),
      ensureDocument('hero_slides', '_template', { status: 'system', active: false, title: 'قالب داخلي', sortOrder: 0 }),
      ensureDocument('loyalty_points', '_template', { status: 'system', customerName: 'قالب داخلي', phone: '', points: 0 }),
      ensureDocument('device_handover', '_template', { status: 'system', receiptId: 'SYSTEM-TEMPLATE', customerName: 'قالب داخلي', phone: '' }),
      ensureDocument('service_checklists', '_template', { status: 'system', title: 'قالب داخلي', items: [] }),
      ensureDocument('admin_notes', '_template', { status: 'system', title: 'قالب داخلي', note: '' }),
      ensureDocument('site_assets', '_template', { status: 'system', name: 'قالب داخلي', url: '' }),
      ensureDocument('seasonal_campaigns', '_template', { status: 'system', active: false, title: 'قالب داخلي', type: 'system', priority: 0 }),
      ensureDocument('service_check_results', '_template', { status: 'system', serviceId: 'SYSTEM-TEMPLATE', score: 0 }),
      ensureDocument('business_goals', '_template', { status: 'system', title: 'قالب داخلي', targetSales: 0, targetRepairs: 0, targetProfit: 0 }),
      ensureDocument('display_settings', 'site', { status: 'system', announcementEnabled: false, storeEnabled: true, repairsEnabled: true }),
      ensureDocument('status_templates', '_template', { status: 'system', collection: 'system', code: 'SYSTEM-TEMPLATE', labelAr: 'قالب داخلي', color: 'gray' }),
      ensureDocument('service_prices', '_template', { status: 'system', title: 'قالب داخلي', category: 'system', priceFrom: 0, priceTo: 0 }),
      ensureDocument('after_service_followups', '_template', { status: 'system', customerName: 'قالب داخلي', phone: '', followDate: '' }),
      ensureDocument('academy_lessons', '_template', { status: 'system', title: 'قالب داخلي', slug: 'system-template', access: 'free' }),
      ensureDocument('qr_links', '_template', { status: 'system', title: 'قالب داخلي', url: '', active: false }),
      ensureDocument('support_tickets', '_template', { status: 'system', title: 'قالب داخلي', customerName: 'قالب داخلي' })
    ];
    const results = await Promise.allSettled(tasks);
    const failed = results.filter(r => r.status === 'rejected');
    if (!failed.length) localStorage.setItem(key, '1');
    return { skipped: false, created: results.filter(r => r.status === 'fulfilled' && r.value.created).map(r => r.value.path), existing: results.filter(r => r.status === 'fulfilled' && !r.value.created).map(r => r.value.path), failed: failed.map(r => r.reason && r.reason.message ? r.reason.message : String(r.reason)) };
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
    const price = Number(doc.price ?? doc.sell ?? doc.salePrice ?? doc.currentPrice ?? doc.newPrice ?? 0);
    const old = Number(doc.old ?? doc.oldPrice ?? doc.compareAtPrice ?? doc.buy ?? 0) || null;
    const name = doc.name || doc.title || doc.nameAr || 'منتج بدون اسم';
    return {
      id: doc.id,
      cat: doc.cat || doc.category || doc.categoryId || 'other',
      category: doc.cat || doc.category || doc.categoryId || 'other',
      kind: doc.kind || doc.type || doc.icon || 'remote',
      name,
      description: doc.description || doc.desc || '',
      price,
      sell: price,
      old,
      rating: Number(doc.rating || 5),
      badge: doc.badge || doc.label || '',
      stock: Number(doc.stock ?? doc.qty ?? doc.quantity ?? 0),
      imageUrl: doc.imageUrl || doc.image || doc.photo || '',
      image: doc.image || doc.imageUrl || doc.photo || '',
      deliveryFee: Number(doc.deliveryFee || 0),
      active: doc.active !== false && doc.visible !== false
    };
  }

  async function loadProducts() {
    const rows = await getCollection('products', { limit: 500 });
    return rows.map(normalizeProduct).filter(p => p.active);
  }

  async function loadSettings() {
    return (await getDoc('settings','site')) || (await getDoc('config','site')) || DEFAULT_SITE_SETTINGS;
  }

  async function saveSettings(data) {
    const payload = { ...DEFAULT_SITE_SETTINGS, ...data, siteName: data.storeName || data.siteName || DEFAULT_SITE_SETTINGS.storeName, updatedFrom: 'wesam-admin' };
    await setDoc('settings','site',payload,true);
    await setDoc('config','site',payload,true);
    return payload;
  }


  function generateReadableId(prefix) {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const n = Math.floor(1000 + Math.random() * 9000);
    return `${prefix}-${y}${m}${day}-${n}`;
  }

  async function addAuditLog(action, data = {}) {
    if (!db) return null;
    try {
      return await addDoc('audit_logs', { action, ...data });
    } catch (e) {
      console.warn('تعذر حفظ سجل العملية:', e.message);
      return null;
    }
  }

  window.WESAM_FIREBASE_CONFIG = firebaseConfig;
  window.WesamFirebase = { app, db, auth, storage, projectId: firebaseConfig.projectId, getCollection, listenCollection, addDoc, setDoc, deleteDoc, getDoc, toDateText, loadProducts, normalizeProduct, loadSettings, saveSettings, ensureCoreCollections, generateReadableId, addAuditLog, serverTimestamp: () => firebase.firestore.FieldValue.serverTimestamp() };
  autoRunSetup();
})();
