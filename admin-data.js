// Admin Dashboard - mock data
const ADMIN_DATA = {
  stats: {
    revenue: { num: '12,450', lbl_ar: 'الإيرادات (د.أ)', lbl_en: 'Revenue (JOD)', delta: '+12.5%', up: true },
    orders: { num: '248', lbl_ar: 'طلبات المتجر', lbl_en: 'Shop Orders', delta: '+8.2%', up: true },
    repairs: { num: '67', lbl_ar: 'طلبات الصيانة', lbl_en: 'Repair Tickets', delta: '+15.3%', up: true },
    customers: { num: '1,284', lbl_ar: 'العملاء', lbl_en: 'Customers', delta: '+4.1%', up: true },
  },
  repairs: [
    { id: 'WS-48291', customer: 'محمد العلي', phone: '0790123456', type: 'صيانة شاشة LED', brand: 'Samsung', date: '2026-05-02', status: 'new', tech: '-', price: '15.00' },
    { id: 'WS-48290', customer: 'أحمد الزعبي', phone: '0795554321', type: 'صيانة ميكروويف', brand: 'LG', date: '2026-05-02', status: 'progress', tech: 'يوسف', price: '12.00' },
    { id: 'WS-48289', customer: 'فاطمة الحاج', phone: '0791112233', type: 'صيانة مكنسة', brand: 'Bosch', date: '2026-05-01', status: 'pending', tech: 'خالد', price: '10.00' },
    { id: 'WS-48288', customer: 'سامي الخطيب', phone: '0796667788', type: 'برمجة ريموت', brand: 'Sony', date: '2026-05-01', status: 'done', tech: 'يوسف', price: '5.00' },
    { id: 'WS-48287', customer: 'ليلى المصري', phone: '0794445566', type: 'صيانة رسيفر', brand: 'HD', date: '2026-04-30', status: 'done', tech: 'خالد', price: '8.00' },
    { id: 'WS-48286', customer: 'عمر الكردي', phone: '0793332211', type: 'صيانة شاشة LED', brand: 'TCL', date: '2026-04-30', status: 'canceled', tech: '-', price: '0.00' },
    { id: 'WS-48285', customer: 'هناء الشامي', phone: '0792221100', type: 'صيانة ميكروويف', brand: 'Samsung', date: '2026-04-29', status: 'progress', tech: 'يوسف', price: '14.50' },
    { id: 'WS-48284', customer: 'رامي العبدالله', phone: '0795557799', type: 'صيانة شاشة LED', brand: 'LG', date: '2026-04-29', status: 'new', tech: '-', price: '15.00' },
  ],
  shopOrders: [
    { id: 'OR-1042', customer: 'لينا أحمد', items: 3, total: '32.00', date: '2026-05-02', status: 'pending', payment: 'كاش' },
    { id: 'OR-1041', customer: 'حسام الدين', items: 1, total: '65.00', date: '2026-05-02', status: 'shipped', payment: 'بطاقة' },
    { id: 'OR-1040', customer: 'نور الهدى', items: 5, total: '24.50', date: '2026-05-01', status: 'done', payment: 'كاش' },
    { id: 'OR-1039', customer: 'محمد الزعبي', items: 2, total: '18.00', date: '2026-05-01', status: 'shipped', payment: 'بطاقة' },
    { id: 'OR-1038', customer: 'سارة الحاج', items: 4, total: '47.00', date: '2026-04-30', status: 'done', payment: 'كاش' },
    { id: 'OR-1037', customer: 'علي العمري', items: 1, total: '12.00', date: '2026-04-30', status: 'canceled', payment: '-' },
  ],
  products: [
    { id: 'r1', name: 'ريموت Samsung Smart TV', kind: 'remote', price: 12, stock: 24, cat: 'الريموتات' },
    { id: 'r2', name: 'ريموت LG Smart TV', kind: 'remote', price: 11, stock: 18, cat: 'الريموتات' },
    { id: 'm2', name: 'حامل شاشة متحرك 40-70"', kind: 'mount', price: 28, stock: 6, cat: 'حاملات' },
    { id: 's1', name: 'رسيفر HD مع IPTV', kind: 'receiver', price: 35, stock: 3, cat: 'رسيفر' },
    { id: 's2', name: 'رسيفر 4K Ultra HD', kind: 'receiver', price: 65, stock: 0, cat: 'رسيفر' },
    { id: 'c1', name: 'كابل HDMI 4K 1.5م', kind: 'cable', price: 4, stock: 52, cat: 'كابلات' },
    { id: 'c5', name: 'موزّع HDMI 1×4', kind: 'cable', price: 12, stock: 9, cat: 'كابلات' },
    { id: 'r6', name: 'ريموت بديل عام', kind: 'remote', price: 6, stock: 41, cat: 'الريموتات' },
  ],
  customers: [
    { id: 'C-2041', name: 'محمد العلي', phone: '0790123456', orders: 5, repairs: 2, spent: '142.50', joined: '2024-08' },
    { id: 'C-2040', name: 'أحمد الزعبي', phone: '0795554321', orders: 3, repairs: 4, spent: '98.00', joined: '2024-11' },
    { id: 'C-2039', name: 'فاطمة الحاج', phone: '0791112233', orders: 8, repairs: 1, spent: '215.00', joined: '2023-12' },
    { id: 'C-2038', name: 'سامي الخطيب', phone: '0796667788', orders: 2, repairs: 1, spent: '34.50', joined: '2025-02' },
    { id: 'C-2037', name: 'ليلى المصري', phone: '0794445566', orders: 6, repairs: 3, spent: '187.00', joined: '2024-05' },
    { id: 'C-2036', name: 'عمر الكردي', phone: '0793332211', orders: 1, repairs: 2, spent: '28.00', joined: '2025-09' },
  ],
  techs: [
    { name: 'يوسف خالد', role: 'فني شاشات أول', initials: 'ي', done: 142, active: 4, rating: 4.9 },
    { name: 'خالد محمود', role: 'فني أجهزة منزلية', initials: 'خ', done: 98, active: 3, rating: 4.8 },
    { name: 'مهند العلي', role: 'فني الكترونيات', initials: 'م', done: 67, active: 2, rating: 4.7 },
    { name: 'سامر النابلسي', role: 'فني عام', initials: 'س', done: 41, active: 1, rating: 4.6 },
  ],
  offers: [
    { name: 'عرض دائم على الصيانة', target: 'كل خدمات الصيانة', discount: '15%', status: 'active', uses: 124 },
    { name: 'كشف مجاني', target: 'صيانة شاشات LED', discount: 'مجاناً', status: 'active', uses: 67 },
    { name: 'خصم الريموتات', target: 'قسم الريموتات', discount: '30%', status: 'active', uses: 89 },
    { name: 'تركيب مجاني للحاملات', target: 'قسم حاملات الشاشات', discount: 'مجاناً', status: 'active', uses: 34 },
    { name: 'عرض اشترِ 2 احصل على 1', target: 'الكابلات', discount: '+1 مجاناً', status: 'paused', uses: 22 },
  ],
  recent: [
    { type: 'repair', title: 'طلب صيانة جديد - WS-48291', meta: 'محمد العلي · شاشة Samsung LED', time: 'قبل 5 دقائق' },
    { type: 'order', title: 'طلب متجر جديد - OR-1042', meta: 'لينا أحمد · 3 منتجات · 32 د.أ', time: 'قبل 12 دقيقة' },
    { type: 'repair', title: 'تم إصلاح - WS-48287', meta: 'ليلى المصري · رسيفر HD', time: 'قبل 38 دقيقة' },
    { type: 'order', title: 'تم شحن - OR-1041', meta: 'حسام الدين · 65 د.أ', time: 'قبل ساعة' },
    { type: 'product', title: 'مخزون منخفض', meta: 'رسيفر 4K Ultra HD - نفد المخزون', time: 'قبل 2 ساعة' },
  ],
};

window.ADMIN_DATA = ADMIN_DATA;
