// Shared components for Wesam Electronics site
const { useState, useEffect } = React;

// === ICONS ===
const Icon = {
  Wrench: (p) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
  Cart: (p) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>,
  Tv: (p) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
  Microwave: (p) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="2" y="4" width="20" height="15" rx="2"/><rect x="5" y="7" width="10" height="9"/><line x1="18" y1="9" x2="18" y2="9.01"/><line x1="18" y1="13" x2="18" y2="13.01"/></svg>,
  Vacuum: (p) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="17" cy="16" r="5"/><path d="M14 13V7a4 4 0 0 0-4-4H6"/><path d="M3 7h6v4H3z"/></svg>,
  Remote: (p) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="6" y="2" width="12" height="20" rx="3"/><circle cx="12" cy="7" r="1.5"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="15" y2="16"/></svg>,
  Cable: (p) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4 9a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v9a3 3 0 0 0 6 0V9a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2"/><path d="M5 7V3M9 7V3M15 7V3M19 7V3"/></svg>,
  Receiver: (p) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="2" y="7" width="20" height="10" rx="2"/><circle cx="6" cy="12" r="1"/><line x1="10" y1="12" x2="18" y2="12"/></svg>,
  Mount: (p) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="4" width="18" height="12" rx="1"/><line x1="3" y1="20" x2="21" y2="20"/><line x1="12" y1="16" x2="12" y2="20"/></svg>,
  Phone: (p) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
  Whatsapp: (p) => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413"/></svg>,
  Mail: (p) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  MapPin: (p) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  Clock: (p) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  Shield: (p) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  Award: (p) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="8" r="6"/><path d="M15.5 12.5L17 22l-5-3-5 3 1.5-9.5"/></svg>,
  Truck: (p) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
  ArrowLeft: (p) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>,
  ArrowRight: (p) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  Check: (p) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...p}><polyline points="20 6 9 17 4 12"/></svg>,
  Star: (p) => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" {...p}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  Percent: (p) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>,
  Search: (p) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  Plus: (p) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Minus: (p) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  X: (p) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  Globe: (p) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  Menu: (p) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  Settings: (p) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
};

// === TOPBAR ===
function TopBar() {
  return (
    <div className="topbar">
      <div className="container topbar-inner">
        <div className="topbar-contact">
          <span><Icon.Phone /> 0790781206</span>
          <span><Icon.MapPin /> عمّان - الأردن</span>
          <span><Icon.Clock /> السبت - الخميس 9 ص - 9 م</span>
        </div>
        <div className="topbar-contact">
          <a href="https://wa.me/962790781206"><Icon.Whatsapp /> واتساب</a>
          <a href="mailto:info@wesam.store"><Icon.Mail /> info@wesam.store</a>
        </div>
      </div>
    </div>
  );
}

// === NAV ===
function Nav({ active }) {
  const [open, setOpen] = useState(false);
  const links = [
    { href: 'index.html', label: 'الرئيسية', key: 'home' },
    { href: 'maintenance.html', label: 'الصيانة', key: 'maintenance' },
    { href: 'shop.html', label: 'المتجر', key: 'shop' },
    { href: 'offers.html', label: 'العروض', key: 'offers' },
    { href: 'about.html', label: 'من نحن', key: 'about' },
    { href: 'contact.html', label: 'اتصل بنا', key: 'contact' },
  ];
  return (
    <nav className="nav">
      <div className="container nav-inner">
        <a href="index.html" className="brand">
          <div className="brand-mark">و</div>
          <div className="brand-text">
            <div className="name">وسام للإلكترونيات</div>
            <div className="sub">صيانة • بيع • ضمان</div>
          </div>
        </a>
        <div className="nav-links">
          {links.map(l => (
            <a key={l.key} href={l.href} className={active === l.key ? 'active' : ''}>{l.label}</a>
          ))}
          <a href="request.html?service=maintenance" className="nav-cta">احجز صيانة</a>
        </div>
        <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label="القائمة">
          <Icon.Menu />
        </button>
      </div>
      {open && (
        <div style={{ background: '#fff', borderTop: '1px solid var(--border)', padding: '12px 0' }}>
          <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {links.map(l => (
              <a key={l.key} href={l.href} style={{ padding: '12px 16px', borderRadius: 10, fontWeight: 600, background: active === l.key ? 'var(--orange-light)' : 'transparent', color: active === l.key ? 'var(--orange-dark)' : 'var(--navy-2)' }}>{l.label}</a>
            ))}
            <a href="request.html?service=maintenance" className="btn btn-primary" style={{ justifyContent: 'center', marginTop: 6 }}>احجز صيانة</a>
          </div>
        </div>
      )}
    </nav>
  );
}

// === FOOTER ===
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div className="brand-mark">و</div>
              <div>
                <div style={{ color: '#fff', fontWeight: 800, fontSize: 18 }}>وسام للإلكترونيات</div>
                <div style={{ fontSize: 12, color: '#94A3B8' }}>صيانة وبيع ومتجر إلكتروني</div>
              </div>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: '#94A3B8', marginBottom: 16 }}>
              متخصصون في صيانة الأجهزة الإلكترونية والمنزلية، وبيع الريموتات وملحقات الشاشات والرسيفر وكافة المستلزمات بأسعار منافسة وضمان مضمون.
            </p>
            <div className="footer-contact-item"><div className="ico"><Icon.Phone /></div> 0790781206</div>
            <div className="footer-contact-item"><div className="ico"><Icon.Whatsapp /></div> +962 79 078 1206</div>
            <div className="footer-contact-item"><div className="ico"><Icon.Globe /></div> wesam.store</div>
          </div>
          <div>
            <h4>خدماتنا</h4>
            <ul>
              <li><a href="request.html?type=led">صيانة شاشات LED</a></li>
              <li><a href="request.html?type=microwave">صيانة الميكروويف</a></li>
              <li><a href="request.html?type=vacuum">صيانة المكانس</a></li>
              <li><a href="maintenance.html">جميع الخدمات</a></li>
            </ul>
          </div>
          <div>
            <h4>المتجر</h4>
            <ul>
              <li><a href="shop.html?cat=remotes">الريموتات</a></li>
              <li><a href="shop.html?cat=mounts">ملحقات الشاشات</a></li>
              <li><a href="shop.html?cat=receivers">الرسيفر</a></li>
              <li><a href="shop.html?cat=cables">كابلات ومستلزمات</a></li>
            </ul>
          </div>
          <div>
            <h4>روابط</h4>
            <ul>
              <li><a href="about.html">من نحن</a></li>
              <li><a href="offers.html">العروض</a></li>
              <li><a href="contact.html">اتصل بنا</a></li>
              <li><a href="track.html">تتبع طلبك</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          © 2026 وسام للإلكترونيات. جميع الحقوق محفوظة. | عمّان - الأردن
        </div>
      </div>
    </footer>
  );
}

// === BREADCRUMB ===
function Breadcrumb({ items }) {
  return (
    <div className="breadcrumb">
      {items.map((it, i) => (
        <React.Fragment key={i}>
          {i > 0 && <Icon.ArrowLeft style={{ width: 14, height: 14, opacity: .5 }} />}
          {it.href ? <a href={it.href}>{it.label}</a> : <span style={{ color: '#fff' }}>{it.label}</span>}
        </React.Fragment>
      ))}
    </div>
  );
}

// === PRODUCT PLACEHOLDER ===
function ProductImage({ kind, height = 180 }) {
  // SVG placeholder illustrations for each product type
  const renderers = {
    led: (
      <svg viewBox="0 0 200 140" fill="none">
        <rect x="20" y="20" width="160" height="90" rx="6" fill="#0F172A" stroke="#334155" strokeWidth="2"/>
        <rect x="28" y="28" width="144" height="74" rx="3" fill="url(#ledGrad)"/>
        <defs>
          <linearGradient id="ledGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F97316" stopOpacity=".6"/>
            <stop offset="100%" stopColor="#1E293B"/>
          </linearGradient>
        </defs>
        <rect x="92" y="110" width="16" height="6" fill="#0F172A"/>
        <rect x="70" y="116" width="60" height="4" rx="2" fill="#0F172A"/>
      </svg>
    ),
    microwave: (
      <svg viewBox="0 0 200 140" fill="none">
        <rect x="20" y="30" width="160" height="80" rx="6" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="2"/>
        <rect x="30" y="40" width="100" height="60" rx="3" fill="#0F172A"/>
        <rect x="34" y="44" width="20" height="6" rx="1" fill="#10B981"/>
        <circle cx="155" cy="55" r="8" fill="#0F172A"/>
        <rect x="142" y="75" width="26" height="4" rx="1" fill="#0F172A"/>
        <rect x="142" y="83" width="26" height="4" rx="1" fill="#0F172A"/>
        <rect x="142" y="91" width="26" height="4" rx="1" fill="#0F172A"/>
      </svg>
    ),
    vacuum: (
      <svg viewBox="0 0 200 140" fill="none">
        <ellipse cx="100" cy="95" rx="55" ry="22" fill="#0F172A"/>
        <ellipse cx="100" cy="92" rx="55" ry="22" fill="#1E293B"/>
        <circle cx="65" cy="95" r="8" fill="#F97316"/>
        <circle cx="135" cy="95" r="8" fill="#F97316"/>
        <path d="M155 85 Q175 50 145 35 L120 50" stroke="#334155" strokeWidth="6" fill="none"/>
        <rect x="115" y="48" width="14" height="8" rx="2" fill="#F97316"/>
      </svg>
    ),
    remote: (
      <svg viewBox="0 0 200 140" fill="none">
        <rect x="75" y="15" width="50" height="110" rx="8" fill="#0F172A" stroke="#334155" strokeWidth="1.5"/>
        <circle cx="100" cy="32" r="4" fill="#F97316"/>
        <rect x="84" y="48" width="32" height="14" rx="2" fill="#1E293B"/>
        {[0,1,2].map(r => [0,1,2].map(c => (
          <circle key={`${r}-${c}`} cx={86 + c*14} cy={75 + r*12} r="3.5" fill="#334155"/>
        )))}
        <circle cx="100" cy="115" r="4" fill="#334155"/>
      </svg>
    ),
    mount: (
      <svg viewBox="0 0 200 140" fill="none">
        <rect x="40" y="40" width="120" height="50" rx="3" fill="#1E293B"/>
        <rect x="50" y="50" width="100" height="30" rx="2" fill="#334155"/>
        <rect x="95" y="90" width="10" height="20" fill="#0F172A"/>
        <rect x="60" y="108" width="80" height="6" rx="2" fill="#0F172A"/>
      </svg>
    ),
    receiver: (
      <svg viewBox="0 0 200 140" fill="none">
        <rect x="20" y="50" width="160" height="50" rx="6" fill="#0F172A" stroke="#334155" strokeWidth="1.5"/>
        <rect x="30" y="62" width="40" height="14" rx="2" fill="#1E293B"/>
        <text x="50" y="74" fill="#F97316" fontSize="10" fontFamily="monospace" textAnchor="middle">8888</text>
        <circle cx="90" cy="75" r="3" fill="#10B981"/>
        <circle cx="105" cy="75" r="3" fill="#F97316"/>
        <rect x="130" y="68" width="40" height="14" rx="2" fill="#1E293B"/>
      </svg>
    ),
    cable: (
      <svg viewBox="0 0 200 140" fill="none">
        <rect x="30" y="60" width="40" height="20" rx="3" fill="#0F172A"/>
        <path d="M70 70 Q100 40 130 70" stroke="#0F172A" strokeWidth="6" fill="none" strokeLinecap="round"/>
        <rect x="130" y="60" width="40" height="20" rx="3" fill="#0F172A"/>
        <rect x="30" y="100" width="20" height="20" rx="3" fill="#1E293B"/>
        <rect x="60" y="100" width="20" height="20" rx="3" fill="#1E293B"/>
        <rect x="90" y="100" width="20" height="20" rx="3" fill="#1E293B"/>
      </svg>
    ),
    default: (
      <svg viewBox="0 0 200 140" fill="none">
        <rect x="20" y="20" width="160" height="100" rx="8" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="4 4"/>
        <text x="100" y="75" fill="#94A3B8" fontSize="14" fontFamily="monospace" textAnchor="middle">صورة المنتج</text>
      </svg>
    ),
  };
  return (
    <div style={{ height, background: 'linear-gradient(135deg, #FAFAF9 0%, #F1F5F9 100%)', borderRadius: 12, display: 'grid', placeItems: 'center', overflow: 'hidden' }}>
      <div style={{ width: '80%', maxWidth: 220 }}>{renderers[kind] || renderers.default}</div>
    </div>
  );
}

// Make available globally
Object.assign(window, { Icon, TopBar, Nav, Footer, Breadcrumb, ProductImage });
