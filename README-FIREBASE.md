# ربط موقع وسام للإلكترونيات مع Firebase

هذه النسخة مربوطة مع مشروع Firebase التالي:

- projectId: `wesamstore-98c1f`
- authDomain: `wesamstore-98c1f.firebaseapp.com`
- databaseURL: `https://wesamstore-98c1f-default-rtdb.firebaseio.com`

## مهم قبل التجربة

1. افتح Firebase Console.
2. ادخل إلى Firestore Database > Rules.
3. انسخ محتوى ملف `firestore.rules` الموجود في هذه النسخة.
4. اضغط Publish.
5. ارفع الملفات إلى Firebase Hosting أو افتحها من سيرفر محلي.

## المجموعات المستخدمة

- `settings/site` و `config/site`: إعدادات الموقع.
- `products`: المنتجات.
- `orders`: طلبات المتجر.
- `service_requests`: طلبات الصيانة.
- `contact_messages`: رسائل التواصل.
- `accounting_transactions`: حركات المحاسبة اليدوية.
- `customers`: العملاء اليدويون، مع قراءة العملاء تلقائيًا من الطلبات والصيانة.
- `technicians`: الفنيون.
- `coupons`: العروض والكوبونات.

## ملاحظة

المنتجات التي تستخدم الحقل `sell` سيتم قراءتها كسعر بيع تلقائيًا، وكذلك الحقول `price` و `salePrice`.
