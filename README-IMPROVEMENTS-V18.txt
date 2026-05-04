تحسينات وسام للإلكترونيات V18 - نسخة مدمجة

هذه النسخة مبنية على V17، وتم التأكد من دمج تحديثات النسخ غير المتوفرة V13 وV14 وV15 وV16 داخلها كصفحات فعلية وروابط داخل لوحة التحكم وقواعد Firestore.

محتوى V13 المدمج:
- admin-subscriptions.html -> customer_subscriptions, subscription_payments
- admin-print-templates.html -> print_templates
- admin-tech-performance.html -> tech_performance_notes
- admin-custom-fields.html -> custom_fields
- admin-service-quotes.html -> service_quotes
- admin-cashbox.html -> cash_sessions

محتوى V14 المدمج:
- admin-payroll-commissions.html -> payroll_commissions
- admin-spare-parts.html -> spare_parts
- public-booking.html -> public_bookings
- admin-audit-review.html -> audit_review
- admin-communication-settings.html -> communication_settings
- admin-customer-risk.html -> customer_risk

محتوى V15 المدمج:
- admin-branches.html -> branches_locations
- admin-attendance.html -> staff_attendance
- device-barcode-registry.html -> device_registry
- customer-portal.html -> customer_portal_logs
- admin-role-permissions.html -> role_permissions
- admin-database-maintenance.html -> database_maintenance_reports

محتوى V16 المدمج:
- admin-service-quality-reviews.html -> service_quality_reviews
- admin-delivery-pricing.html -> delivery_zones
- admin-call-log.html -> call_logs
- admin-warranty-expiry.html -> warranty_followups
- admin-loaner-devices.html -> loaner_devices
- admin-print-copy-settings.html -> document_settings

محتوى V17 الموجود أيضًا:
- admin-maintenance-returns.html -> maintenance_returns
- admin-used-parts.html -> used_parts
- admin-field-visits.html -> field_visits
- admin-customer-approvals.html -> customer_approvals
- admin-link-health.html -> admin_link_health
- admin-repair-profit.html -> repair_profit_reports

بعد رفع النسخة:
1) ارفع كل الملفات إلى Firebase Hosting.
2) افتح ملف firestore.rules من هذه النسخة.
3) انسخ محتواه إلى Firebase Console > Firestore Database > Rules.
4) اضغط Publish.
5) افتح /admin.html وستجد روابط أدوات V13 إلى V17 داخل لوحة التحكم.

ملاحظة مهمة:
قواعد firestore.rules الموجودة هنا مخصصة للتجربة والتأكد أن الحفظ والاسترجاع يعملان. بعد انتهاء التجربة يجب الانتقال إلى firestore.secure.rules وربطها بحسابات المدير والصلاحيات.
