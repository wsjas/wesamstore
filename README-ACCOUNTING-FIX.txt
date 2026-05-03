إصلاح صفحة المحاسبة البيضاء

1) ارفع كل الملفات من داخل مجلد wesamstore(2) إلى Firebase Hosting.
2) افتح الرابط مباشرة: /admin-accounting.html وليس من نسخة مخزنة قديمة.
3) انسخ firestore.rules إلى Firestore Database > Rules ثم Publish.
4) إذا بقيت الصفحة بيضاء فهذا يعني أن المتصفح يعرض نسخة قديمة من الكاش. اضغط Ctrl+F5 أو افتح نافذة خاصة.

الصفحة الجديدة مستقلة ولا تعتمد على React أو Babel أو admin-styles.css، لذلك يجب أن تظهر حتى لو فشل اتصال Firebase.
