// Admin Dashboard - starts empty and should read real data from Firebase pages/tools.
const ADMIN_DATA = {
  stats: {
    revenue: { num: '0', lbl_ar: 'الإيرادات (د.أ)', lbl_en: 'Revenue (JOD)', delta: '0%', up: true },
    orders: { num: '0', lbl_ar: 'طلبات المتجر', lbl_en: 'Shop Orders', delta: '0%', up: true },
    repairs: { num: '0', lbl_ar: 'طلبات الصيانة', lbl_en: 'Repair Tickets', delta: '0%', up: true },
    customers: { num: '0', lbl_ar: 'العملاء', lbl_en: 'Customers', delta: '0%', up: true },
  },
  repairs: [],
  shopOrders: [],
  products: [],
  customers: [],
  techs: [],
  offers: [],
  recent: [],
};
window.ADMIN_DATA = ADMIN_DATA;
