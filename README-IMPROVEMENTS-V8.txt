تحسينات وسام للإلكترونيات - النسخة V8
=======================================

هذه النسخة تكمل النسخة V7 وتضيف أدوات تشغيل يومية جديدة داخل لوحة التحكم.

الملفات الجديدة:

1) admin-appointments.html
- مركز مواعيد الصيانة.
- ربط الموعد بطلب صيانة وفني.
- حفظ المواعيد في مجموعة appointments.
- تعديل/حذف/إكمال الموعد.
- زر واتساب لتذكير العميل.

2) admin-returns.html
- إدارة المرتجعات والاستبدال والضمان.
- حفظ العمليات في returns.
- عند إكمال استرجاع مبلغ يتم تسجيل مصروف تلقائي في accounting_transactions.

3) admin-reviews.html
- إدارة تقييمات العملاء.
- حفظ التقييمات في reviews.
- نشر/مسودة/رفض وحذف.
- حساب متوسط التقييم.

4) admin-seo-center.html
- حفظ SEO في seo/site.
- مزامنة بيانات أساسية مع settings/site.
- توليد كود HEAD لنسخه داخل الصفحات.

5) admin-smart-notifications.html
- فحص المنتجات قليلة الكمية.
- فحص الطلبات والصيانة المتأخرة.
- فحص الذمم والمتابعات المستحقة.
- حفظ التنبيهات في notifications.
- حفظ قواعد التنبيه في notification_rules/site.

6) admin-status-workflow.html
- إدارة قوالب حالات الطلبات والصيانة.
- حفظ الرسائل الجاهزة في status_templates.
- مفيد لاحقًا لربط تغيير الحالة برسالة واتساب جاهزة.

تم تحديث:
- admin.html لإضافة روابط الأدوات الجديدة.
- firebase-config.js لإنشاء المجموعات الجديدة تلقائيًا.
- firestore.rules لقواعد التجربة.
- firestore.secure.rules لقواعد المدير المحمية لاحقًا.

بعد الرفع:
1. ارفع كل الملفات إلى Firebase Hosting أو GitHub حسب طريقتك.
2. افتح Firebase Console > Firestore Database > Rules.
3. انسخ محتوى firestore.rules واضغط Publish.
4. افتح /admin.html ثم جرب الصفحات الجديدة.

المجموعات الجديدة في Firestore:
- appointments
- returns
- reviews
- seo
- notification_rules
- status_templates
