نسخة التحسينات السادسة - وسام للإلكترونيات

الجديد في هذه النسخة:

1) admin-whatsapp-center.html
- مركز واتساب وقوالب الرسائل.
- قراءة العملاء من orders و service_requests و customers.
- إنشاء قوالب داخل message_templates.
- حفظ متابعة داخل followups.

2) admin-followups.html
- مركز متابعة العملاء.
- متابعة بتاريخ محدد.
- كشف المتابعات المتأخرة.
- زر واتساب مباشر.
- تصدير CSV.

3) admin-profit-analysis.html
- تحليل أرباح تقديري.
- يحسب إيرادات البيع والصيانة والمصروفات.
- يحاول حساب تكلفة المنتجات من buyPrice / cost.
- تصدير CSV وطباعة.

4) admin-error-center.html
- مركز الأخطاء والتشخيص.
- يقرأ diagnostics و error_logs.
- يضيف سجل تجربة.
- يساعد على معرفة سبب الصفحة البيضاء أو الزر المعطل.

5) wesam-error-logger.js
- يسجل أخطاء JavaScript تلقائيًا في error_logs إذا كان Firebase متاحًا.
- يحفظ آخر الأخطاء محليًا أيضًا في localStorage.

6) تحديثات Firebase
- إضافة مجموعات تلقائية:
  message_templates
  error_logs
- تحديث firestore.rules و firestore.secure.rules.

طريقة التشغيل:
1. ارفع الملفات إلى Firebase Hosting أو GitHub.
2. انسخ محتوى firestore.rules إلى Firebase Console > Firestore Database > Rules ثم Publish.
3. افتح admin.html وستجد روابط الأدوات الجديدة في القائمة الجانبية.

ملاحظة:
تحليل الأرباح تقديري، وللدقة يجب إدخال سعر الشراء buyPrice أو cost لكل منتج، أو داخل عناصر الطلب.
