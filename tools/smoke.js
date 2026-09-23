/* SpillTrace smoke test — loads every page DOM in jsdom, executes the real local scripts in order, reports runtime errors */
const fs = require('fs');
const path = require('path');
const { JSDOM, VirtualConsole } = require('jsdom');

const pages = ['index.html', 'login.html', 'dashboard.html', 'investigations.html', 'investigation.html', 'map.html', 'spill.html', 'drift.html', 'candidates.html', 'attribution.html', 'evidence.html', 'reports.html', 'settings.html'];

(async () => {
  let fail = 0;
  for (const p of pages) {
    const vc = new VirtualConsole();
    const errors = [];
    vc.on('jsdomError', (e) => errors.push('jsdomError: ' + String(e.message).split('\n')[0]));
    vc.on('error', (...a) => errors.push('console.error: ' + a.map(String).join(' ')));
    const html = fs.readFileSync(path.join('/home/user', p), 'utf8');
    const dom = new JSDOM(html, {
      url: 'file:///home/user/' + p,
      runScripts: 'outside-only',
      pretendToBeVisual: true,
      virtualConsole: vc
    });
    const w = dom.window;
    /* environment polyfills that every real browser provides */
    if (!w.matchMedia) w.matchMedia = (q) => ({ matches: false, media: q, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {} });
    w.scrollTo = () => {};
    if (!w.IntersectionObserver) w.IntersectionObserver = class { constructor(cb) { this.cb = cb; } observe(t) { this.cb([{ isIntersecting: true, target: t }], this); } unobserve() {} disconnect() {} };
    w.addEventListener('error', (e) => errors.push('uncaught: ' + e.message));
    /* execute local scripts in document order */
    const srcs = Array.from(dom.window.document.querySelectorAll('script[src]')).map((s) => s.getAttribute('src')).filter((s) => !s.startsWith('http'));
    for (const s of srcs) {
      try { w.eval(fs.readFileSync(path.join('/home/user', s), 'utf8')); }
      catch (e) { errors.push('script ' + s + ' threw: ' + e.message); }
    }
    try { w.document.dispatchEvent(new w.Event('DOMContentLoaded', { bubbles: true })); } catch (e) {}
    await new Promise((r) => setTimeout(r, 1500));
    const d = w.document;
    let probe = '';
    try {
      if (p === 'index.html') probe = 'hero=' + !!d.getElementById('heroVideo') + ' stages=' + d.querySelectorAll('.stage').length + ' words=' + d.querySelectorAll('#statement .w').length;
      if (p === 'login.html') probe = 'form=' + !!d.getElementById('loginForm');
      if (p === 'dashboard.html') probe = 'navlinks=' + d.querySelectorAll('.navlink').length + ' metrics=' + d.querySelectorAll('.metric').length + ' topnav=' + !!d.querySelector('.topnav');
      if (p === 'investigations.html') probe = 'rows=' + d.querySelectorAll('#invTable tbody tr').length;
      if (p === 'investigation.html') probe = 'mods=' + d.querySelectorAll('.mod').length + ' health=' + d.querySelectorAll('.health .cell').length;
      if (p === 'map.html') probe = 'layers=' + d.querySelectorAll('#gisSvg .layerg').length + ' toggles=' + d.querySelectorAll('.layer-toggle').length + ' particles=' + d.querySelectorAll('#particles circle').length;
      if (p === 'spill.html') probe = 'panes=' + d.querySelectorAll('.tabpane').length;
      if (p === 'drift.html') probe = 'particles=' + d.querySelectorAll('#driftParticles circle').length + ' acc=' + d.querySelectorAll('.acc-item').length;
      if (p === 'candidates.html') probe = 'rows=' + d.querySelectorAll('#candTable tbody tr').length;
      if (p === 'attribution.html') probe = 'bars=' + d.querySelectorAll('.sbar').length + ' gauge=' + !!d.getElementById('gaugeArc');
      if (p === 'evidence.html') probe = 'nodes=' + d.querySelectorAll('.chain-node').length;
      if (p === 'reports.html') probe = 'feature=' + !!d.getElementById('genBtn');
      if (p === 'settings.html') probe = 'switches=' + d.querySelectorAll('.switch').length + ' cards=' + d.querySelectorAll('.card').length;
    } catch (e) { probe = 'probe error ' + e.message; }
    if (errors.length) fail++;
    console.log((errors.length ? 'FAIL' : 'PASS') + ' ' + p + ' | ' + probe);
    errors.slice(0, 6).forEach((e) => console.log('    ' + e));
    w.close();
  }
  console.log(fail ? 'SMOKE FAIL' : 'SMOKE PASS');
  process.exit(fail ? 1 : 0);
})();
