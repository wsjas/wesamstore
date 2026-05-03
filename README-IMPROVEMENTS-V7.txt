تحسينات النسخة السابعة - وسام للإلكترونيات

تمت إضافة صفحات جديدة:
1) admin-archive-center.html
   مركز أرشفة وتنظيف الطلبات المنتهية أو الملغاة، مع استرجاع الأرشيف.

2) device-service-history.html
   سجل صيانة الأجهزة، بحث برقم الهاتف أو اسم العميل أو موديل الجهاز، وحفظ أجهزة وملاحظات صيانة.

3) admin-daily-tasks.html
   إدارة المهام اليومية والمتابعات الداخلية للمحل.

4) admin-button-check.html
   فحص الروابط والأزرار والصفحات الداخلية لمعرفة الروابط المفقودة أو الأزرار بلا وظيفة.

5) admin-data-tools.html
   أدوات بيانات متقدمة: تصدير JSON/CSV، فحص المجموعات، حفظ تقارير بيانات.

مجموعات Firestore الجديدة:
- archived_records
- devices
- daily_tasks
- button_audits
- data_exports

بعد رفع النسخة:
1) ارفع الملفات إلى Firebase Hosting.
2) انسخ firestore.rules إلى Firestore > Rules ثم Publish.
3) افتح /admin.html وستجد روابط الأدوات الجديدة أعلى اللوحة.
4) عند اعتماد نظام المدير المحمي لاحقًا، استخدم firestore.secure.rules بدل قواعد التجربة.
