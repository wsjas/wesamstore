تحسينات وسام للإلكترونيات V17

تم بناء هذه النسخة فوق أحدث ملف متوفر في بيئة العمل، وأُضيفت صفحات تشغيلية جديدة مع ربط Firebase مباشر.

أهم الإضافات:
- مرتجعات الصيانة وإعادة الفحص: admin-maintenance-returns.html -> maintenance_returns
- قطع الغيار المستخدمة في الصيانة: admin-used-parts.html -> used_parts
- سجل الزيارات الميدانية: admin-field-visits.html -> field_visits
- موافقات العملاء قبل الإصلاح: admin-customer-approvals.html -> customer_approvals
- فحص روابط وأزرار لوحة التحكم: admin-link-health.html -> admin_link_health
- ربحية طلبات الصيانة: admin-repair-profit.html -> repair_profit_reports

وأضيفت كذلك صفحات V13 إلى V16 التي قد لا تكون موجودة في آخر ملف متاح محليًا، حتى تبقى الروابط داخل لوحة التحكم قابلة للفتح.

بعد الرفع:
1) افتح Firebase Console.
2) انسخ محتوى firestore.rules.
3) انشر القواعد Publish.
4) افتح /admin.html ثم جرّب الصفحات الجديدة.

ملاحظة أمان:
قواعد firestore.rules الحالية مخصصة للتجربة لأنها تسمح بالكتابة. بعد التأكد من العمل استخدم قواعد محمية مبنية على Firebase Auth وadmins/role_permissions.
