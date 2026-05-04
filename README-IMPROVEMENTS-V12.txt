نسخة التحسينات V12 - وسام للإلكترونيات

الإضافات الجديدة:
1) admin-service-contracts.html
   مركز عقود الخدمة والضمان الممتد، مع طباعة وحفظ في service_contracts.

2) admin-product-discounts.html
   إدارة خصومات المنتجات وتطبيق السعر الجديد مباشرة على وثيقة المنتج في products.

3) admin-tax-finance.html
   تقرير مالي/ضريبي مبسط يجمع المبيعات والصيانة والمصروفات والمرتجعات والمشتريات.

4) admin-delivery-center.html
   مركز التوصيل والتسليم للطلبات وأجهزة الصيانة، مع زر واتساب.

5) admin-backup-scheduler.html
   إنشاء نسخة احتياطية JSON من أهم مجموعات Firestore وتسجيل سجل النسخ.

6) admin-workflow-automation.html
   قواعد تشغيل بسيطة للتنبيهات وسجل النشاط ورسائل المتابعة.

تم تحديث:
- admin.html بإضافة روابط الأدوات الجديدة.
- firebase-config.js لإنشاء المجموعات الجديدة تلقائياً.
- firestore.rules للتجربة.
- firestore.secure.rules للحماية لاحقاً.

بعد رفع الملفات:
1) افتح Firebase Console.
2) اذهب إلى Firestore Database > Rules.
3) انسخ محتوى firestore.rules ثم Publish.
4) افتح /admin.html ثم جرب الروابط الجديدة.

ملاحظة:
firestore.rules مؤقتة للتجربة. بعد إنشاء حساب المدير وتجربة كل شيء، استخدم firestore.secure.rules.
