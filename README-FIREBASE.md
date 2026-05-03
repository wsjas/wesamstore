# تعديلات ربط Firebase

تمت إضافة `firebase-config.js` كملف مركزي للربط مع مشروع Firebase:
`wesamapp-790c1`

## المجموعات المستخدمة
- `products`: يقرأ منها المتجر المنتجات الحقيقية فقط. لا توجد منتجات تجريبية داخل `shop.html`.
- `orders`: صفحة `checkout.html` ترسل طلبات السلة إلى هذه المجموعة.
- `service_requests`: صفحة `request.html` ترسل طلبات الصيانة إلى هذه المجموعة.
- `contact_messages`: صفحة `contact.html` ترسل رسائل التواصل إلى هذه المجموعة.

## ملفات جديدة
- `firebase-config.js`
- `checkout.html`
- `track.html`
- `firestore.rules`

## ملاحظة مهمة
إذا ظهر خطأ صلاحيات، انسخ قواعد `firestore.rules` إلى Firebase Console > Firestore Database > Rules ثم Publish.
