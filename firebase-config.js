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
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
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
  window.WesamFirebase = { app, db, auth, getCollection, addDoc, setDoc, deleteDoc, loadProducts, normalizeProduct };
})();
