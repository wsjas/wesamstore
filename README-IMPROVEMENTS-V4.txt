نسخة التحسينات الرابعة - وسام للإلكترونيات

الجديد في هذه النسخة:

1) admin-import-export.html
- تصدير نسخة احتياطية كاملة JSON من Firestore.
- استيراد نسخة JSON بالدمج إلى Firebase.
- فحص عدد الوثائق في كل مجموعة.

2) customer-statement.html
- كشف حساب عميل بالاسم أو الهاتف.
- يجمع طلبات البيع وطلبات الصيانة والدفعات.
- يحسب الإجمالي والمدفوع والمتبقي.
- طباعة وتصدير CSV.

3) invoice-print.html
- طباعة فاتورة بيع أو وصل صيانة من رقم الطلب/الصيانة أو ID.
- فاتورة يدوية للطباعة السريعة.

4) inventory-control.html
- إدارة المخزون.
- تسجيل حركة إدخال/إخراج/تعديل مباشر.
- تحديث كمية المنتج في Firebase.
- إدارة الموردين.
- تنبيه المنتجات قليلة الكمية.

5) warranty-center.html
- إنشاء وتعديل وطباعة ضمانات.
- بحث برقم الهاتف أو رقم الضمان.

6) admin-security.html
- تسجيل دخول Firebase Auth.
- إنشاء وثيقة مدير داخل admin_users و admins بنفس UID.
- تستخدمها لاحقًا مع firestore.secure.rules.

7) تعديلات إضافية
- إضافة روابط الأدوات الجديدة داخل admin.html.
- إضافة المجموعات الجديدة للتهيئة التلقائية في firebase-config.js.
- تحديث firestore.rules و firestore.secure.rules للمجموعات الجديدة.

طريقة الاستخدام:
- ارفع الملفات إلى Firebase Hosting.
- انشر firestore.rules للتجربة.
- افتح /admin.html.
- بعد إنشاء حساب المدير من admin-security.html يمكن لاحقًا نشر firestore.secure.rules.
