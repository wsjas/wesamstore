تحسينات وسام للإلكترونيات V11

أضيفت في هذه النسخة:
1) admin-service-pricing.html
- إدارة أسعار خدمات الصيانة.
- السعر من/إلى، تكلفة القطع، المدة، الحالة، التصدير CSV.
- الحفظ في service_prices.

2) admin-after-service.html
- متابعة العميل بعد الإصلاح.
- إنشاء متابعات من طلبات الصيانة المكتملة.
- حفظ المتابعة في after_service_followups.

3) admin-academy-content.html
- إدارة دروس الأكاديمية.
- استيراد JSON وتصدير JSON/CSV.
- الحفظ في academy_lessons.

4) admin-qr-links.html
- إدارة روابط QR.
- توليد QR لكل رابط ونسخ الرابط بسرعة.
- الحفظ في qr_links.

5) admin-support-tickets.html
- مركز تذاكر وشكاوى العملاء.
- حالات وأولويات وربط الطلبات.
- الحفظ في support_tickets.

6) admin-firebase-troubleshooter.html
- فحص كتابة/قراءة/تحديث/حذف لكل المجموعات المهمة.
- يساعد على معرفة سبب عدم الحفظ أو عدم الاسترجاع.
- يسجل أخطاء الفحص في diagnostics.

مهم بعد الرفع:
- انسخ محتوى firestore.rules إلى Firebase Console > Firestore Database > Rules ثم Publish.
- افتح admin.html ثم روابط الأدوات الجديدة من القائمة الجانبية.
- إذا ظهر فشل في الحفظ افتح admin-firebase-troubleshooter.html وشغل الفحص الكامل.
