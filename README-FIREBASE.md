# ربط Firebase التلقائي لموقع وسام للإلكترونيات

هذه النسخة مربوطة بمشروع Firebase:

- projectId: `wesamapp-790c1`
- Firestore: Cloud Firestore

## ماذا يحدث تلقائيًا؟

عند فتح أي صفحة تحتوي على `firebase-config.js` يقوم الموقع بمحاولة إنشاء الوثائق الأساسية تلقائيًا إذا لم تكن موجودة:

- `settings/site`
- `config/site`
- `products/_template`
- `orders/_template`
- `service_requests/_template`
- `contact_messages/_template`
- `subscribers/_template`
- `coupons/_template`
- `notifications/_template`

هذه الوثائق التي تنتهي بـ `_template` داخلية فقط ولا تظهر في الموقع أو في جداول اللوحة، لأنها تحتوي على الحقل:

```js
__system: true
```

## مهم جدًا

لا يمكن لأي موقع إنشاء بيانات في Firestore إذا كانت القواعد تمنع الكتابة. لذلك يجب نشر محتوى ملف:

`firestore.rules`

من Firebase Console > Firestore Database > Rules > Publish.

بعد نشر القواعد، افتح الموقع أو لوحة التحكم مرة واحدة، وستظهر المجموعات تلقائيًا داخل Firestore.

## المنتجات

الموقع لا يضيف منتجات تجريبية. يجب إضافة المنتجات من لوحة المنتجات أو من Firestore. عند أول منتج حقيقي سيظهر في المتجر.

## الطلبات والصيانة

- عند إرسال طلب من صفحة السلة يتم إنشاء وثيقة داخل `orders`.
- عند إرسال طلب صيانة يتم إنشاء وثيقة داخل `service_requests`.
- عند إرسال رسالة تواصل يتم إنشاء وثيقة داخل `contact_messages`.
