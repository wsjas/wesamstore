تحسينات وسام للإلكترونيات - النسخة V10

تمت إضافة أدوات تشغيل جديدة فوق نسخة V9:

1) admin-seasonal-campaigns.html
- مركز الحملات والعروض الموسمية.
- مزامنة الحملة مع الصفحة الرئيسية داخل homepage_blocks.
- حفظ الحملات في seasonal_campaigns.

2) admin-assets-library.html
- مكتبة روابط صور وفيديوهات وأيقونات الموقع.
- حفظ البيانات في site_assets.
- نسخ الرابط وتصدير CSV.

3) service-quality-checklist.html
- قوالب فحص جودة قبل تسليم جهاز الصيانة.
- حفظ القوالب في service_checklists.
- حفظ نتائج الفحص في service_check_results وربطها بطلب الصيانة.

4) admin-purchases.html
- إدارة الموردين وفواتير شراء القطع.
- حفظ الموردين في suppliers.
- حفظ المشتريات في purchase_orders.
- عند تسجيل دفعة شراء يتم إنشاء مصروف في expenses.

5) admin-goals-targets.html
- أهداف يومية/أسبوعية/شهرية/سنوية.
- مقارنة الأهداف مع بيانات orders و service_requests و expenses.
- حفظ الأهداف في business_goals.

6) admin-public-display.html
- التحكم بظهور المتجر والصيانة والأكاديمية.
- حفظ روابط فيسبوك والخريطة والتطبيق ورسالة أعلى الموقع.
- الحفظ في settings/site و config/site و display_settings/site.

7) wesam-site-settings.js
- ملف يقرأ إعدادات الظهور من Firebase ويطبقها على الصفحات العامة.
- تمت إضافته إلى الصفحات العامة الموجودة.

بعد الرفع:
1. انسخ محتوى firestore.rules إلى Firebase Console > Firestore Database > Rules.
2. اضغط Publish.
3. افتح /admin.html ثم جرّب الصفحات الجديدة من أزرار القائمة الجانبية.

ملاحظة:
firestore.rules مخصص للتجربة والتشغيل السريع. بعد اعتماد حساب المدير استخدم firestore.secure.rules.
