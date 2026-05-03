// Shared admin shell extracted to be reused across pages
const { useEffect: _shellUE } = React;

function AdminShell({ active, lang, setLang, children }) {
  const t = T[lang];
  _shellUE(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.body.classList.toggle('ltr', lang !== 'ar');
  }, [lang]);

  const isAr = lang === 'ar';
  const links = [
    { section: 'main', items: [
      { key: 'dashboard', href: 'admin.html', icon: <AICON.Dashboard /> },
      { key: 'repairs', href: 'admin-repairs.html', icon: <AICON.Wrench />, badge: 12 },
      { key: 'orders', href: 'admin-orders.html', icon: <AICON.Cart />, badge: 8 },
    ]},
    { section: 'management', items: [
      { key: 'products', href: 'admin-products.html', icon: <AICON.Box /> },
      { key: 'customers', href: 'admin-customers.html', icon: <AICON.Users /> },
      { key: 'offers', href: 'admin-offers.html', icon: <AICON.Tag /> },
      { key: 'techs', href: 'admin-techs.html', icon: <AICON.HardHat /> },
      { key: 'accounting', href: 'admin-accounting.html', icon: <AICON.Money /> },
    ]},
    { section: 'system', items: [
      { key: 'reports', href: 'admin-reports.html', icon: <AICON.Chart /> },
      { key: 'settings', href: 'admin-settings.html', icon: <AICON.Settings /> },
    ]},
  ];

  return (
    <div className="admin-layout">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="mark">و</div>
          <div>
            <div className="name">{isAr ? 'وسام للإلكترونيات' : 'Wesam Electronics'}</div>
            <div className="sub">{isAr ? 'لوحة الإدارة' : 'Admin Panel'}</div>
          </div>
        </div>
        {links.map(group => (
          <div key={group.section}>
            <div className="sidebar-section">
              <div className="label">{group.section === 'main' ? t.nav_main : group.section === 'management' ? t.nav_management : t.nav_system}</div>
            </div>
            {group.items.map(item => (
              <a key={item.key} href={item.href} className={`nav-link ${active === item.key ? 'active' : ''}`}>
                {item.icon}
                <span>{t[item.key]}</span>
                {item.badge && <span className="badge">{item.badge}</span>}
              </a>
            ))}
          </div>
        ))}
        <div className="sidebar-foot">
          <div className="user-card">
            <div className="user-avatar">أ</div>
            <div style={{flex: 1, minWidth: 0}}>
              <div className="name">{isAr ? 'أحمد وسام' : 'Ahmed Wesam'}</div>
              <div className="role">{t.admin_role}</div>
            </div>
            <a href="index.html" className="action-btn" title={t.logout}><AICON.Logout /></a>
          </div>
        </div>
      </aside>

      <main className="main">
        <div className="topbar">
          <div className="search-input">
            <AICON.Search />
            <input type="text" placeholder={t.search} />
          </div>
          <div className="topbar-actions">
            <button className="lang-toggle" onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}>
              {lang === 'ar' ? 'EN' : 'العربية'}
            </button>
            <button className="icon-btn"><AICON.Mail /><span className="dot"></span></button>
            <button className="icon-btn"><AICON.Bell /><span className="dot"></span></button>
          </div>
        </div>
        <div className="content">{children}</div>
      </main>
    </div>
  );
}

window.AdminShell = AdminShell;
