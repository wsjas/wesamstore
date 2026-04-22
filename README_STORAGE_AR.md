# إعداد رفع صور المنتجات إلى Firebase Storage

## الملفات المعدلة
- `product-images.html`
- `admin.html`
- `shared-firebase.js`
- `storage.rules`

## ما الذي تم تجهيزه
- زر رفع الصورة الرئيسية مباشرة إلى Firebase Storage داخل صفحة `product-images.html`.
- بقاء الصور الإضافية بروابط خارجية مجانية داخل الحقل `additionalImages`.
- إضافة رابط صفحة صور المنتجات داخل `admin.html`.
- تحديث `shared-firebase.js` لاستخدام bucket الحالي: `wesamstorenew.firebasestorage.app`.

## الخطوات داخل Firebase
1. افتح Firebase Console.
2. ادخل إلى **Storage** ثم **Rules**.
3. الصق محتوى ملف `storage.rules` ثم اضغط **Publish**.
4. تأكد أن حساب المدير موجود داخل مجموعة `admins` في Firestore أو أن بريده موجود ضمن القائمة المسموح بها في القواعد.
5. ارفع الملفات المعدلة إلى GitHub بدل الملفات القديمة.

## طريقة الاستخدام
1. افتح صفحة `product-images.html`.
2. سجل دخول المدير.
3. اختر منتجاً.
4. في قسم **رفع الصورة الرئيسية إلى Firebase Storage** اختر صورة من جهازك.
5. اضغط **رفع إلى Firebase**.
6. بعد انتهاء الرفع سيوضع الرابط تلقائياً في حقل الصورة الرئيسية.
7. أضف الصور الإضافية كرابط خارجي مجاني من Postimages أو ImgBB.
8. اضغط **حفظ الصور**.

## ملاحظات مهمة
- الصورة الرئيسية فقط تم تجهيز رفعها إلى Firebase Storage.
- الصور الإضافية تبقى بروابط خارجية مجانية كما طلبت.
- الحد الحالي للصور في القواعد: 5MB لصور المنتجات.
- مسار رفع الصور: `products/{productId}/...`

## Storage Rules الجاهزة
استخدم ملف `storage.rules` المرفق كما هو.
