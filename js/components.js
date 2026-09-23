/* OILTRACE — icons, shell & shared UI components */
(function () {
  'use strict';

  /* ============ ICONS ============ */
  const P = {
    logo: '<circle cx="12" cy="12" r="3.2"/><path d="M2.5 12c0-2 4.2-3.6 9.5-3.6S21.5 10 21.5 12"/><path d="M12 2.8v2.4M12 18.8v2.4"/><circle cx="19" cy="5.5" r="1.4"/>',
    dashboard: '<rect x="3" y="3" width="7.5" height="9" rx="1.5"/><rect x="13.5" y="3" width="7.5" height="5.5" rx="1.5"/><rect x="13.5" y="12" width="7.5" height="9" rx="1.5"/><rect x="3" y="15.5" width="7.5" height="5.5" rx="1.5"/>',
    folder: '<path d="M3 7a2 2 0 0 1 2-2h4l2 2.5h8a2 2 0 0 1 2 2V17a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/>',
    chart: '<path d="M3 3v18h18"/><path d="M7.5 14v3.5M12 9.5v8M16.5 6v11.5"/>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/><path d="M9 13h6M9 17h6"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M18.7 5.3l-2.1 2.1M7.4 16.6l-2.1 2.1"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    bell: '<path d="M6 8.5a6 6 0 0 1 12 0c0 6 2.5 7 2.5 7h-17S6 14.5 6 8.5"/><path d="M10 19.5a2.2 2.2 0 0 0 4 0"/>',
    logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/>',
    chevL: '<path d="m14.5 6-6 6 6 6"/>',
    chevR: '<path d="m9.5 6 6 6-6 6"/>',
    chevD: '<path d="m6 9.5 6 6 6-6"/>',
    x: '<path d="M6 6l12 12M18 6 6 18"/>',
    check: '<path d="m4.5 12.5 5 5 10-11"/>',
    copy: '<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
    layers: '<path d="m12 2.5 9.5 5L12 12.5l-9.5-5Z"/><path d="m2.5 12.5 9.5 5 9.5-5"/><path d="m2.5 17 9.5 5 9.5-5"/>',
    ship: '<path d="M4 15.5 3 11l9-2 9 2-1 4.5"/><path d="M12 9V4.5h4V9"/><path d="M2 19c1.5 1.2 3 1.2 4.5 0s3-1.2 4.5 0 3 1.2 4.5 0 3-1.2 4.5 0"/><path d="M8 9V6.5h4V9"/>',
    satellite: '<rect x="9" y="9" width="6" height="6" rx="1" transform="rotate(45 12 12)"/><path d="m4 7 3-3 3 3-3 3ZM14 17l3-3 3 3-3 3Z"/><path d="M12 15.5V19M12 5v3.5"/>',
    droplet: '<path d="M12 2.8s6.5 6.6 6.5 11.2a6.5 6.5 0 0 1-13 0C5.5 9.4 12 2.8 12 2.8Z"/>',
    wind: '<path d="M3 8h10a2.5 2.5 0 1 0-2.4-3.2"/><path d="M3 12h15a2.5 2.5 0 1 1-2.4 3.2"/><path d="M3 16h7a2 2 0 1 1-1.9 2.6"/>',
    map: '<path d="m9 4-6 2v14l6-2 6 2 6-2V4l-6 2Z"/><path d="M9 4v14M15 6v14"/>',
    radar: '<path d="M12 12 6.2 6.2"/><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    download: '<path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M4 21h16"/>',
    eye: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
    focus: '<path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M8 21H5a2 2 0 0 1-2-2v-3M16 21h3a2 2 0 0 0 2-2v-3"/>',
    present: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M12 16v4M8 20h8"/>',
    arrR: '<path d="M4 12h16"/><path d="m14 6 6 6-6 6"/>',
    arrUR: '<path d="M7 17 17 7"/><path d="M8 7h9v9"/>',
    filter: '<path d="M4 5h16l-6 7.5V19l-4 2v-8.5Z"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c.8-4 4-6 8-6s7.2 2 8 6"/>',
    lock: '<rect x="4.5" y="10.5" width="15" height="10.5" rx="2"/><path d="M8 10.5V7a4 4 0 0 1 8 0v3.5"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    alert: '<path d="M12 3 2.5 20h19Z"/><path d="M12 9.5V14M12 17.2v.1"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 7.8v.1"/>',
    shield: '<path d="M12 2.5 4.5 5.5v6c0 5 3.2 8.3 7.5 10 4.3-1.7 7.5-5 7.5-10v-6Z"/><path d="m8.8 11.8 2.3 2.3 4.2-4.6"/>',
    route: '<circle cx="6" cy="19" r="2.5"/><circle cx="18" cy="5" r="2.5"/><path d="M8.5 19H15a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h6.5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
    activity: '<path d="M2.5 12h4l3-8 5 16 3-8h4"/>',
    crosshair: '<circle cx="12" cy="12" r="8"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/>',
    waves: '<path d="M2 7c1.7 1.4 3.3 1.4 5 0s3.3-1.4 5 0 3.3 1.4 5 0 3.3-1.4 5 0"/><path d="M2 12.5c1.7 1.4 3.3 1.4 5 0s3.3-1.4 5 0 3.3 1.4 5 0 3.3-1.4 5 0"/><path d="M2 18c1.7 1.4 3.3 1.4 5 0s3.3-1.4 5 0 3.3 1.4 5 0 3.3-1.4 5 0"/>',
    anchor: '<circle cx="12" cy="5.5" r="2.5"/><path d="M12 8v13"/><path d="M3.5 13c.6 5 4 8 8.5 8s7.9-3 8.5-8"/><path d="M9 11h6"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    play: '<path d="M7 4.5v15l12-7.5Z"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4"/>',
    moon: '<path d="M20 13.5A8.5 8.5 0 1 1 10.5 4a7 7 0 0 0 9.5 9.5Z"/>',
    spin: '<path d="M12 3a9 9 0 1 0 9 9"/>'
  };
  window.ICONS = P;
  window.ic = (name, cls) => '<svg class="ic ' + (cls || '') + '" viewBox="0 0 24 24" aria-hidden="true">' + (P[name] || P.info) + '</svg>';

  /* ============ UTILS ============ */
  const qs = (s, r) => (r || document).querySelector(s);
  const qsa = (s, r) => Array.from((r || document).querySelectorAll(s));
  window.U = { qs, qsa };

  window.pill = (status, label) => {
    const map = {
      completed: ['pill-ok', label || 'Completed'], running: ['pill-run', label || 'Running'],
      active: ['pill-run', label || 'Active'], ready: ['pill-muted', label || 'Ready'],
      archived: ['pill-muted', label || 'Archived'], complete: ['pill-ok', label || 'Complete'],
      attention: ['pill-warn', label || 'Requires attention'], qualified: ['pill-ok', label || 'Qualified'],
      marginal: ['pill-warn', label || 'Marginal'], excluded: ['pill-err', label || 'Excluded'],
      inconclusive: ['pill-warn', label || 'Inconclusive'], verified: ['pill-verified', label || 'Verified'],
      queued: ['pill-muted', label || 'Queued'], high: ['pill-ok', label || 'High'],
      medium: ['pill-warn', label || 'Medium'], low: ['pill-err', label || 'Low'], none: ['pill-muted', label || 'None']
    };
    const m = map[(status || '').toLowerCase()] || ['pill-muted', label || status];
    return '<span class="pill ' + m[0] + '"><i class="dot"></i>' + m[1] + '</span>';
  };

  window.toast = (msg, icon) => {
    let zone = qs('.toast-zone');
    if (!zone) { zone = document.createElement('div'); zone.className = 'toast-zone'; document.body.appendChild(zone); }
    const t = document.createElement('div');
    t.className = 'toast';
    t.innerHTML = ic(icon || 'check') + '<span>' + msg + '</span>';
    zone.appendChild(t);
    setTimeout(() => { t.style.opacity = '0'; t.style.transition = 'opacity .4s'; setTimeout(() => t.remove(), 420); }, 3200);
  };

  window.copyText = (txt) => {
    const done = () => toast('Copied to clipboard', 'copy');
    if (navigator.clipboard && window.isSecureContext) { navigator.clipboard.writeText(txt).then(done).catch(() => fallback()); }
    else fallback();
    function fallback() {
      const ta = document.createElement('textarea');
      ta.value = txt; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); done(); } catch (e) { }
      ta.remove();
    }
  };

  window.countUp = (el, target, opts) => {
    opts = opts || {};
    const dur = opts.duration || 1400, dec = opts.decimals || 0, pad = opts.pad || 0;
    const t0 = performance.now();
    const fmt = (v) => { let s = v.toFixed(dec); if (pad) s = s.padStart(pad, '0'); return s; };
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { el.textContent = fmt(target); return; }
    (function step(t) {
      const p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 4);
      el.textContent = fmt(target * e);
      if (p < 1) requestAnimationFrame(step);
    })(t0);
  };

  /* ============ MODAL / DRAWER ============ */
  let modalRoot = null, drawerRoot = null;
  window.openModal = (inner, wide) => {
    closeModal();
    modalRoot = document.createElement('div');
    modalRoot.className = 'modal-scrim';
    modalRoot.innerHTML = '<div class="modal' + (wide ? ' wide' : '') + '" role="dialog" aria-modal="true">' + inner + '</div>';
    document.body.appendChild(modalRoot);
    requestAnimationFrame(() => document.body.classList.add('modal-open'));
    modalRoot.addEventListener('click', (e) => { if (e.target === modalRoot) closeModal(); });
    qsa('[data-close-modal]', modalRoot).forEach((b) => b.addEventListener('click', closeModal));
    return modalRoot;
  };
  window.closeModal = () => {
    if (!modalRoot) return;
    document.body.classList.remove('modal-open');
    const r = modalRoot; modalRoot = null;
    setTimeout(() => r.remove(), 320);
  };

  window.openDrawer = (inner) => {
    closeDrawer();
    drawerRoot = document.createElement('div');
    drawerRoot.innerHTML = '<div class="drawer-scrim"></div><aside class="drawer" role="dialog" aria-modal="true">' + inner + '</aside>';
    document.body.appendChild(drawerRoot);
    qs('.drawer-scrim', drawerRoot).addEventListener('click', closeDrawer);
    requestAnimationFrame(() => document.body.classList.add('drawer-open'));
    qsa('[data-close-drawer]', drawerRoot).forEach((b) => b.addEventListener('click', closeDrawer));
    return drawerRoot;
  };
  window.closeDrawer = () => {
    if (!drawerRoot) return;
    document.body.classList.remove('drawer-open');
    const r = drawerRoot; drawerRoot = null;
    setTimeout(() => r.remove(), 480);
  };

  /* ============ SHELL (top navigation only) ============ */
  const NAV = [
    { key: 'dashboard', t: 'Dashboard', href: 'dashboard.html' },
    { key: 'investigations', t: 'Investigations', href: 'investigations.html' },
    { key: 'analytics', t: 'Analytics', href: 'dashboard.html#analytics' },
    { key: 'reports', t: 'Evidence Reports', href: 'reports.html' },
    { key: 'settings', t: 'Settings', href: 'settings.html' }
  ];
  const INV_SCOPE = ['investigation', 'map', 'spill', 'drift', 'candidates', 'attribution', 'evidence', 'reports'];

  window.buildShell = (page) => {
    const u = DATA.user;
    const inv = CTX.inv();
    const isOn = (it) => page === it.key || (it.key === 'investigations' && INV_SCOPE.includes(page)) || (it.key === 'reports' && page === 'reports');

    const nav = document.createElement('header');
    nav.className = 'topnav';
    nav.innerHTML =
      '<a class="nav-logo" href="index.html"><img src="assets/images/logo.ico" width="24" height="24" alt="SpillTrace logo"/><h3>SpillTrace</h3></a>' +
      '<nav class="nav-links">' +
      NAV.filter((it) => it.key !== 'analytics' && it.key !== 'reports').map((it) => '<a class="navlink' + (isOn(it) ? ' on' : '') + '" href="' + it.href + '">' + it.t + '</a>').join('') +
      '</nav>' +

      '<div class="nav-right">' +

      '<div class="dd" id="notifDd">' +
      '<button class="tb-btn nav-action-btn" data-tip="Notifications">' +
      ic('bell') +
      '<i class="ndot"></i>' +
      '</button>' +
      '<div class="dd-menu nav-notification-menu">' +
      '<div class="dd-head">Notifications</div>' +
      DATA.notifications.map((n) => '<div class="dd-item"><span style="margin-top:5px;width:6px;height:6px;border-radius:50%;background:var(--blue);flex:none"></span><span><span class="t">' + n.t + '</span><br><span class="s">' + n.s + '</span></span></div>').join('') +
      '</div>' +
      '</div>' +

      '<button class="tb-btn nav-action-btn" id="searchBtn" data-tip="Search — Ctrl K">' +
      ic('search') +
      '</button>' +

      '<div class="dd" id="profileDd">' +
      '<button class="avatar nav-avatar" style="cursor:pointer" data-tip="' + u.name + ' — ' + u.role + '">' + u.initials + '</button>' +
      '<div class="dd-menu" style="min-width:200px;right:0">' +
      '<div class="dd-head">' + u.name + '</div>' +
      '<div class="dd-item" style="pointer-events:none;opacity:.6"><span><span class="s">' + u.role + ' · ' + u.email + '</span></span></div>' +
      '<a class="dd-item" href="settings.html"><span><span class="t">Settings</span></span></a>' +
      '<a class="dd-item" href="login.html"><span><span class="t">Logout</span></span></a>' +
      '</div>' +
      '</div>' +

      '<div class="dd" id="navMenuDd">' +
      '<button class="tb-btn nav-action-btn navmenu-btn" data-tip="Menu">' + ic('menu') + '</button>' +
      '<div class="dd-menu">' +
      NAV.map((it) => '<a class="dd-item" href="' + it.href + '"><span><span class="t">' + it.t + '</span></span></a>').join('') +
      '<a class="dd-item" href="login.html"><span><span class="t">Logout</span></span></a>' +
      '</div>' +
      '</div>' +

      '</div>';
    document.body.insertBefore(nav, document.body.firstChild);

    /* dropdown plumbing */
    const dds = [qs('#workspaceDd'), qs('#notifDd'), qs('#profileDd'), qs('#navMenuDd')].filter(Boolean);

    dds.forEach((dd) => {
      const button = qs('button', dd);

      button.addEventListener('click', (e) => {
        e.stopPropagation();

        dds.forEach((o) => {
          if (o !== dd) o.classList.remove('open');
        });

        dd.classList.toggle('open');
      });
    });

    document.addEventListener('click', () => {
      dds.forEach((o) => o.classList.remove('open'));
    });
    /* duplicate listener removed */
    qs('#searchBtn').addEventListener('click', openPalette);

    /* investigation subnav */
    if (INV_SCOPE.includes(page)) {
      const holder = qs('[data-subnav]');
      if (holder) {
        const items = [
          ['investigation', 'Overview', 'investigation.html'], ['map', 'Map & Analysis', 'map.html'],
          ['spill', 'Spill Detection', 'spill.html'], ['drift', 'Drift Analysis', 'drift.html'],
          ['candidates', 'Vessel Candidates', 'candidates.html'], ['attribution', 'Attribution', 'attribution.html'],
          ['evidence', 'Evidence', 'evidence.html'], ['reports', 'Reports', 'reports.html']
        ];
        holder.innerHTML = '<nav class="subnav">' + items.map((it) =>
          '<a href="' + it[2] + '" class="' + (page === it[0] ? 'on' : '') + '">' + it[1] + '</a>').join('') + '</nav>';
      }
    }

    buildPalette();
  };

  /* ============ COMMAND PALETTE ============ */
  function paletteItems() {
    const inv = CTX.inv();
    const base = [
      { icon: 'dashboard', t: 'Dashboard', s: 'Page', href: 'dashboard.html' },
      { icon: 'folder', t: 'Investigations', s: 'Page', href: 'investigations.html' },
      { icon: 'map', t: 'Map & Analysis', s: inv.id, href: 'map.html' },
      { icon: 'droplet', t: 'Spill Detection', s: inv.id, href: 'spill.html' },
      { icon: 'wind', t: 'Drift Analysis', s: inv.id, href: 'drift.html' },
      { icon: 'ship', t: 'Vessel Candidates', s: inv.id, href: 'candidates.html' },
      { icon: 'crosshair', t: 'Attribution', s: inv.id, href: 'attribution.html' },
      { icon: 'shield', t: 'Evidence Chain', s: inv.id, href: 'evidence.html' },
      { icon: 'file', t: 'Reports', s: inv.id, href: 'reports.html' },
      { icon: 'settings', t: 'Settings', s: 'Page', href: 'settings.html' },
      { icon: 'anchor', t: 'Vessel A — top candidate', s: 'Entity', href: 'candidates.html' },
      { icon: 'anchor', t: 'Vessel B', s: 'Entity', href: 'candidates.html' },
      { icon: 'anchor', t: 'Vessel C', s: 'Entity', href: 'candidates.html' },
      { icon: 'present', t: 'Toggle presentation mode', s: 'Action', action: 'present' },
      { icon: 'focus', t: 'Toggle focus mode', s: 'Action', action: 'focus' }
    ];
    return base;
  }
  let palRoot = null, palSel = 0, palList = [];
  function buildPalette() {
    if (palRoot) return;
    palRoot = document.createElement('div');
    palRoot.className = 'palette-scrim';
    palRoot.innerHTML = '<div class="palette"><input id="palInput" placeholder="Search pages, vessels, actions…" autocomplete="off"/><div class="palette-list" id="palList"></div></div>';
    document.body.appendChild(palRoot);
    palRoot.addEventListener('click', (e) => { if (e.target === palRoot) closePalette(); });
    qs('#palInput').addEventListener('input', renderPalette);
    qs('#palInput').addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') { e.preventDefault(); palSel = Math.min(palSel + 1, palList.length - 1); paintSel(); }
      if (e.key === 'ArrowUp') { e.preventDefault(); palSel = Math.max(palSel - 1, 0); paintSel(); }
      if (e.key === 'Enter' && palList[palSel]) go(palList[palSel]);
    });
  }
  function renderPalette() {
    const q = (qs('#palInput').value || '').toLowerCase();
    palList = paletteItems().filter((i) => i.t.toLowerCase().includes(q));
    palSel = 0;
    qs('#palList').innerHTML = palList.length ? palList.map((i, idx) =>
      '<button class="pal-item' + (idx === palSel ? ' sel' : '') + '" data-i="' + idx + '">' + ic(i.icon) + '<span class="t">' + i.t + '</span><span class="s">' + i.s + '</span></button>').join('')
      : '<div class="pal-empty">No matches in this workspace.</div>';
    qsa('.pal-item', qs('#palList')).forEach((b) => {
      b.addEventListener('click', () => go(palList[+b.getAttribute('data-i')]));
      b.addEventListener('mousemove', () => { palSel = +b.getAttribute('data-i'); paintSel(); });
    });
  }
  function paintSel() { qsa('.pal-item', qs('#palList')).forEach((b, i) => b.classList.toggle('sel', i === palSel)); }
  function go(item) {
    closePalette();
    if (item.action === 'present') { document.body.classList.toggle('presentation'); return; }
    if (item.action === 'focus') { document.body.classList.toggle('focus-mode'); return; }
    if (item.href) { document.body.classList.add('page-leave'); setTimeout(() => location.href = item.href, 200); }
  }
  window.openPalette = () => { if (!palRoot) buildPalette(); document.body.classList.add('palette-open'); setTimeout(() => { const i = qs('#palInput'); i.value = ''; renderPalette(); i.focus(); }, 60); };
  window.closePalette = () => document.body.classList.remove('palette-open');

  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); document.body.classList.contains('palette-open') ? closePalette() : openPalette(); }
    if (e.key === 'Escape') { closePalette(); closeModal(); closeDrawer(); document.body.classList.remove('side-open'); }
  });
})();
