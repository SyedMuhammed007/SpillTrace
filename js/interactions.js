/* SpillTrace — page interactions (simulated, frontend only) */
(function () {
  'use strict';
  const go = (href, ms) => { document.body.classList.add('page-leave'); setTimeout(() => location.href = href, ms || 210); };

  window.Interactions = {
    init(page) {
      /* non-primary investigations get a contextual empty state on deep pages */
      const gated = ['map', 'spill', 'drift', 'candidates', 'attribution', 'evidence', 'reports'];
      if (gated.includes(page) && CTX.id !== 'INV-2026-001') {
        const c = document.getElementById('ctxContent');
        if (c) {
          const inv = CTX.inv();
          const msg = inv.status === 'running'
            ? 'Analysis in progress. SAR ingestion and detection are underway; downstream modules unlock automatically as artifacts verify.'
            : 'Archived with an inconclusive attribution. The full evidence chain is retained for audit and review.';
          c.innerHTML = '<div class="empty" style="margin-top:10px"><div class="bgimg" style="background-image:url(\'assets/images/ocean-texture.png\')"></div><div class="inner">' +
            pill(inv.status) + '<h2 class="h-title" style="margin:20px 0 10px">' + inv.title + '</h2>' +
            '<p class="body" style="max-width:48ch;margin:0 auto 26px">' + msg + '</p>' +
            '<div class="row" style="justify-content:center"><button class="btn btn-light" id="backTo001">Return to Gulf of Mexico case</button></div></div></div>';
          document.getElementById('backTo001').addEventListener('click', () => { CTX.id = 'INV-2026-001'; location.reload(); });
          return;
        }
      }
      const fn = this[page];
      if (fn) fn.call(this);
    },

    /* ---------- login ---------- */
    login() {
      const form = document.getElementById('loginForm');
      const btn = document.getElementById('loginBtn');
      const msg = document.getElementById('formMsg');
      const demo = document.getElementById('demoBtn');
      if (!form) return;
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        msg.className = 'form-msg';
        const email = document.getElementById('email').value.trim();
        const pass = document.getElementById('pass').value;
        btn.disabled = true;
        btn.innerHTML = '<svg class="ic" style="animation:spin 1s linear infinite" viewBox="0 0 24 24">' + ICONS.spin + '</svg> AUTHENTICATING…';
        setTimeout(() => {
          if (pass === 'offline') {
            btn.disabled = false; btn.innerHTML = 'Sign In';
            msg.className = 'form-msg warn'; msg.innerHTML = ic('alert') + '<span>Server unavailable. The identity service did not respond. Try again shortly.</span>';
            return;
          }
          if (email !== 'investigator@SpillTrace.ai' || pass !== '••••••••••') {
            btn.disabled = false; btn.innerHTML = 'Sign In';
            msg.className = 'form-msg err'; msg.innerHTML = ic('alert') + '<span>Invalid credentials. This workspace requires issued investigator access.</span>';
            const panel = document.querySelector('.login-box');
            panel.classList.remove('shake'); void panel.offsetWidth; panel.classList.add('shake');
            return;
          }
          btn.innerHTML = ic('check') + ' ACCESS GRANTED';
          btn.classList.remove('btn-light'); btn.classList.add('btn-blue');
          setTimeout(() => go('dashboard.html', 500), 700);
        }, 1300);
      });
      if (demo) demo.addEventListener('click', () => go('dashboard.html'));
    },

    /* ---------- dashboard ---------- */
    dashboard() {
      const h = new Date().getHours();
      const g = document.getElementById('greeting');
      if (g) g.textContent = (h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening') + ', Investigator.';
    },

    /* ---------- investigations ---------- */
    investigations() {
      const rows = Array.from(document.querySelectorAll('#invTable tbody tr'));
      const chips = Array.from(document.querySelectorAll('#filterChips .chip'));
      const search = document.getElementById('invSearch');
      let status = 'all';
      const apply = () => {
        const q = (search.value || '').toLowerCase();
        rows.forEach((r) => {
          const okS = status === 'all' || r.dataset.status === status;
          const okQ = !q || r.dataset.title.toLowerCase().includes(q);
          r.style.display = okS && okQ ? '' : 'none';
        });
      };
      chips.forEach((c) => c.addEventListener('click', () => {
        chips.forEach((o) => o.classList.remove('on'));
        c.classList.add('on');
        status = c.dataset.filter;
        apply();
      }));
      search.addEventListener('input', apply);
      rows.forEach((r) => r.addEventListener('click', () => { CTX.id = r.dataset.id; go('investigation.html'); }));
    },

    /* ---------- investigation overview ---------- */
    investigation() {
      const inv = CTX.inv();
      const ovId = document.getElementById('ovId');
      if (ovId) ovId.textContent = inv.id;
      const ovTitle = document.getElementById('ovTitle');
      if (ovTitle) {
        const parts = inv.id === 'INV-2026-001' ? ['Gulf of Mexico', 'Oil Spill Investigation'] : [inv.short, inv.title.replace(inv.short + ' ', '')];
        ovTitle.innerHTML = parts[0] + '<br/>' + (parts[1] || 'Investigation');
      }
      const ovMeta = document.getElementById('ovMeta');
      if (ovMeta) ovMeta.innerHTML = pill(inv.status) +
        '<span class="meta" style="color:rgba(245,245,242,.6)">Created ' + inv.created + '</span>' +
        '<span class="meta" style="color:rgba(245,245,242,.6)">Last updated ' + inv.updated + '</span>' +
        '<span class="meta" style="color:rgba(245,245,242,.6)">' + inv.coords + '</span>';

      /* pipeline render per investigation state */
      const hrefs = { M1: 'investigation.html', M2: 'evidence.html', M3: 'spill.html', M4: 'spill.html', M5: 'spill.html', M6: 'drift.html', M7: 'drift.html', M8: 'drift.html', M9: 'candidates.html', M10: 'attribution.html', M11: 'map.html', M12: 'reports.html' };
      let mods = DATA.pipeline;
      if (inv.status === 'running') {
        mods = DATA.pipeline.map((m, i) => i < 4 ? m : i === 4 ? Object.assign({}, m, { status: 'running', note: 'In progress' }) : Object.assign({}, m, { status: 'queued', note: 'Awaiting upstream' }));
      } else if (inv.status === 'archived') {
        mods = DATA.pipeline.map((m) => m.id === 'M10' ? Object.assign({}, m, { status: 'inconclusive', note: 'No qualified candidates' }) : m.id === 'M11' || m.id === 'M12' ? Object.assign({}, m, { status: 'ready' }) : Object.assign({}, m, { status: 'complete' }));
      }
      const grid = document.getElementById('modGrid');
      if (grid) grid.innerHTML = mods.map((m, i) =>
        '<div class="mod" data-status="' + m.status + '" data-href="' + hrefs[m.id] + '" tabindex="0">' +
        '<div class="idx">' + m.id + ' · MODULE</div><div class="nm">' + m.name + '</div>' +
        '<div class="bar"><i style="transition-delay:' + (i * 70) + 'ms"></i></div>' +
        '<div class="st">' + m.status + ' — ' + m.note + '</div></div>').join('');
      requestAnimationFrame(() => requestAnimationFrame(() => grid.querySelectorAll('.mod').forEach((m) => m.classList.add('in'))));

      const hg = document.getElementById('healthGrid');
      if (hg) hg.innerHTML = (inv.health.length ? inv.health : DATA.investigations['INV-2026-001'].health).map((h) =>
        '<div class="cell"><div class="l">' + h.label + '</div><div class="v num">' + h.value + '</div></div>').join('');

      document.querySelectorAll('.mod').forEach((m) => {
        m.addEventListener('click', () => { if (m.dataset.href) go(m.dataset.href); });
      });
      const rerun = document.getElementById('rerunBtn');
      if (rerun) rerun.addEventListener('click', () => {
        const root = openModal(
          '<div class="modal-head"><div><div class="meta">Pipeline</div><div class="h-title" style="font-size:20px">Re-run analysis</div></div><button class="tb-btn" data-close-modal>' + ic('x') + '</button></div>' +
          '<div class="modal-body"><p class="body" style="margin-bottom:18px">Queues the full M1–M12 pipeline against the registered datasets. This prototype simulates the run.</p>' +
          '<div class="gen-bar"><i id="rrBar"></i></div><div class="meta" id="rrLabel" style="margin-top:10px">Submitting job…</div></div>');
        const bar = root.querySelector('#rrBar'), lab = root.querySelector('#rrLabel');
        const stages = ['Submitting job…', 'Resolving datasets…', 'Scheduling modules…', 'Queued ✓'];
        let i = 0;
        const t = setInterval(() => {
          i++;
          bar.style.width = (i / (stages.length - 1)) * 100 + '%';
          lab.textContent = stages[Math.min(i, stages.length - 1)];
          if (i >= stages.length - 1) { clearInterval(t); setTimeout(() => { closeModal(); toast('Analysis re-queued — simulation only', 'activity'); }, 600); }
        }, 650);
      });
      const gen = document.getElementById('genPackBtn');
      if (gen) gen.addEventListener('click', () => go('reports.html#generate'));
    },

    /* ---------- spill ---------- */
    spill() {
      const tabs = Array.from(document.querySelectorAll('.tabs .tab'));
      tabs.forEach((t) => t.addEventListener('click', () => {
        tabs.forEach((o) => o.classList.remove('on'));
        t.classList.add('on');
        document.querySelectorAll('.tabpane').forEach((p) => p.classList.toggle('on', p.id === 'pane-' + t.dataset.tab));
      }));
    },

    /* ---------- drift ---------- */
    drift() {
      document.querySelectorAll('.acc-item').forEach((item) => {
        const head = item.querySelector('.acc-head');
        const body = item.querySelector('.acc-body');
        head.addEventListener('click', () => {
          const open = item.classList.toggle('open');
          body.style.maxHeight = open ? body.scrollHeight + 'px' : '0px';
        });
      });
      /* simulated particle cloud with hover metadata */
      const host = document.getElementById('driftParticles');
      const tip = document.getElementById('driftTip');
      if (host) {
        const svgNS = 'http://www.w3.org/2000/svg';
        const rnd = (a, b) => a + Math.random() * (b - a);
        for (let i = 0; i < 70; i++) {
          const t = Math.random();
          const x = 700 - t * rnd(280, 340) + rnd(-22, 22);
          const y = 225 + t * rnd(15, 70) + rnd(-26, 26);
          const c = document.createElementNS(svgNS, 'circle');
          c.setAttribute('cx', x); c.setAttribute('cy', y);
          c.setAttribute('r', rnd(.9, 2).toFixed(1));
          c.setAttribute('fill', 'rgba(91,140,255,' + rnd(.25, .8).toFixed(2) + ')');
          c.setAttribute('data-lat',(26.1 + (240 - y) / 4000).toFixed(3));
          c.setAttribute('data-log',(-91.1 + (x - 460) / 4000).toFixed(3));
          c.setAttribute('data-h',Math.round(t * 12));
          host.appendChild(c);
          if (window.gsap && !Anim.reduced) gsap.to(c, { x: rnd(-12, 6), y: rnd(-8, 8), duration: rnd(3, 7), repeat: -1, yoyo: true, ease: 'sine.inOut', delay: rnd(0, 2) });
        }
        if (tip) {
          host.addEventListener('mousemove', (e) => {
            const c = e.target.closest('circle');
            if (!c || !c.getAttribute('data-lat')) { tip.classList.remove('on'); return; }
            tip.innerHTML = '<b>' + c.getAttribute('data-lat') + '° N, ' + c.getAttribute('data-log') + '° W</b><br>backward step −' + c.getAttribute('data-h') + ' h';
            tip.style.left = Math.min(e.clientX + 14, innerWidth - 280) + 'px';
            tip.style.top = (e.clientY + 16) + 'px';
            tip.classList.add('on');
          });
          host.addEventListener('mouseleave', () => tip.classList.remove('on'));
        }
      }
    },

    /* ---------- candidates ---------- */
    candidates() {
      const rows = document.querySelectorAll('#candTable tbody tr');
      rows.forEach((r) => r.addEventListener('click', () => this.openCandidate(r.dataset.rank)));
    },
    openCandidate(rank) {
      const inv = CTX.inv();
      const v = (inv.candidates.list || [])[+rank - 1] || DATA.investigations['INV-2026-001'].candidates.list[+rank - 1];
      if (!v) return;
      const top = v.rank === 1;
      const visual = top
        ? '<div style="border-radius:12px;overflow:hidden;border:1px solid var(--border-0);margin-bottom:22px;position:relative;height:190px"><img src="assets/images/vessel-top.png" style="width:100%;height:100%;object-fit:cover" alt=""/><div style="position:absolute;inset:0;background:linear-gradient(180deg,transparent 40%,rgba(5,5,5,.75))"></div><div class="meta" style="position:absolute;left:14px;bottom:12px;color:rgba(245,245,242,.8)">OPTICAL REF · TOP CANDIDATE</div></div>'
        : '<div style="border-radius:12px;border:1px solid var(--border-0);margin-bottom:22px;height:120px;display:grid;place-items:center;color:var(--text-3);background:var(--bg-2)">' + ic('ship', 'ic') .replace('class="ic', 'style="width:34px;height:34px" class="ic') + '</div>';
      openDrawer(
        '<div class="drawer-head"><div><div class="meta">Candidate #' + String(v.rank).padStart(2, '0') + '</div><div class="h-title" style="font-size:22px;margin-top:6px">' + v.name + '</div></div><button class="tb-btn" data-close-drawer>' + ic('x') + '</button></div>' +
        '<div class="drawer-body">' + visual +
        '<div class="row" style="margin-bottom:20px">' + pill(v.status) + pill(v.ais, 'AIS ' + v.ais) + '</div>' +
        '<div class="specs">' +
        [['MMSI', v.mmsi], ['IMO', v.imo], ['Vessel type', v.type], ['Flag', v.flag], ['Minimum distance', v.distance], ['Entry', v.entry], ['Exit', v.exit], ['AIS coverage', v.ais], ['Temporal overlap', v.overlap], ['Evidence score', v.score != null ? v.score.toFixed(2) : '—']]
          .map((s) => '<div class="spec"><span class="k">' + s[0] + '</span><span class="v">' + s[1] + '</span></div>').join('') +
        '</div>' +
        '<div class="chain-detail" id="drawerEvidence" style="max-height:0"><div class="inner">' +
        '<div class="meta" style="margin-bottom:12px">Evidence breakdown</div>' +
        (DATA.investigations['INV-2026-001'].attribution.compare[v.name] || [0.4, 0.4, 0.4, 0.5, 0.4]).map((val, i) => {
          const labels = ['Spatial', 'Temporal', 'Drift', 'AIS', 'Route'];
          return '<div class="sbar' + (val >= 0.8 ? ' hl' : val < 0.5 ? ' warn' : '') + '" style="--w:' + val + '"><div class="row"><span class="l" style="font-size:12px">' + labels[i] + '</span><span class="v">' + val.toFixed(2) + '</span></div><div class="track"><div class="fill in" style="transform:scaleX(' + val + ')"></div></div></div>';
        }).join('') +
        '</div></div>' +
        '</div>' +
        '<div class="drawer-foot"><button class="btn btn-ghost" id="dwTrack" style="flex:1">' + ic('route') + 'Show Track</button><button class="btn btn-light" id="dwEvidence" style="flex:1">' + ic('shield') + 'Show Evidence</button></div>');
      document.getElementById('dwTrack').addEventListener('click', () => { closeDrawer(); go('map.html'); });
      document.getElementById('dwEvidence').addEventListener('click', function () {
        const el = document.getElementById('drawerEvidence');
        const open = el.style.maxHeight !== '520px';
        el.style.maxHeight = open ? '520px' : '0';
        this.innerHTML = open ? ic('shield') + 'Hide Evidence' : ic('shield') + 'Show Evidence';
      });
    },

    /* ---------- attribution ---------- */
    attribution() {
      const hasIO = 'IntersectionObserver' in window;
      /* bars reveal */
      if (hasIO) {
        const io = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } }), { threshold: .4 });
        document.querySelectorAll('.sbar').forEach((b) => io.observe(b));
      } else document.querySelectorAll('.sbar').forEach((b) => b.classList.add('in'));
      /* gauge */
      const g = document.getElementById('gaugeArc');
      if (g && g.getTotalLength) {
        const L = g.getTotalLength();
        g.style.strokeDasharray = L;
        g.style.strokeDashoffset = L;
        const set = () => {
          if (window.gsap && !Anim.reduced) gsap.to(g, { strokeDashoffset: L * (1 - 0.81), duration: 1.8, ease: 'power2.out' });
          else g.style.strokeDashoffset = L * (1 - 0.81);
        };
        if (hasIO) {
          const io2 = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) { set(); io2.disconnect(); } }), { threshold: .4 });
          io2.observe(g);
        } else set();
      }
      /* score tooltips */
      const tip = document.getElementById('scoreTip');
      if (tip) {
        document.querySelectorAll('[data-note]').forEach((el) => {
          el.addEventListener('mousemove', (e) => {
            tip.innerHTML = '<b>' + (el.dataset.label || '') + '</b><br>' + el.dataset.note;
            tip.style.left = Math.min(e.clientX + 14, innerWidth - 280) + 'px';
            tip.style.top = (e.clientY + 16) + 'px';
            tip.classList.add('on');
          });
          el.addEventListener('mouseleave', () => tip.classList.remove('on'));
        });
      }
      /* compare */
      const cmpBtn = document.getElementById('cmpBtn');
      const cmpZone = document.getElementById('cmpZone');
      if (cmpBtn && cmpZone) cmpBtn.addEventListener('click', () => {
        if (cmpZone.style.display === 'block') { cmpZone.style.display = 'none'; return; }
        cmpZone.style.display = 'block';
        const comp = CTX.inv().attribution.compare;
        const labels = ['Spatial Compatibility', 'Temporal Compatibility', 'Drift Consistency', 'AIS Coverage', 'Route Continuity'];
        cmpZone.innerHTML = '<div class="cmp-grid">' + Object.keys(comp).map((name, ni) => {
          const vals = comp[name];
          const score = [0.81, 0.63, 0.57][ni];
          return '<div class="cmp-card' + (ni === 0 ? ' top' : '') + '"><div class="spread"><span class="nm">' + name + '</span>' + (ni === 0 ? pill('qualified', 'Top') : '') + '</div><div class="sc num">' + (score || '—').toFixed ? (score || 0).toFixed(2) : score + '</div>' +
            vals.map((v, i) => '<div class="sbar in" style="--w:' + v + ';margin-bottom:12px"><div class="row"><span class="l" style="font-size:11px">' + labels[i] + '</span><span class="v">' + v.toFixed(2) + '</span></div><div class="track"><div class="fill" style="transform:scaleX(' + v + ')"></div></div></div>').join('') +
            '</div>';
        }).join('') + '</div>';
        if (window.gsap) gsap.fromTo(cmpZone.children[0].children, { y: 16, opacity: 0 }, { y: 0, opacity: 1, stagger: .12, duration: .6, ease: 'power2.out' });
        cmpZone.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
    },

    /* ---------- evidence ---------- */
    evidence() {
      const root = document.getElementById('chainRoot');
      if (root && !root.dataset.built) {
        root.dataset.built = '1';
        root.insertAdjacentHTML('beforeend', DATA.evidenceChain.map((n) => {
          const tm = (n.timestamp.split(' ')[1] || '').slice(0, 5);
          return '<div class="chain-node"><button class="chain-card">' +
            '<div class="top"><span class="mid">' + n.mid + ' · ' + n.module + '</span><span class="tm">' + tm + ' UTC</span></div>' +
            '<div class="nm" style="margin-top:8px">' + n.name + '</div>' +
            '<div class="row" style="margin-top:12px;gap:10px">' + pill('verified') +
            '<span class="copybtn" data-copy="' + n.entityId + '">' + ic('copy') + '<span class="meta-sm">' + n.entityId.slice(0, 18) + '…</span></span></div>' +
            '</button><div class="chain-detail"><div class="inner"><div class="specs">' +
            '<div class="spec"><span class="k">Entity ID</span><span class="v copybtn" data-copy="' + n.entityId + '" style="color:var(--text-1)">' + n.entityId + ' ' + ic('copy').replace('class="ic', 'style="width:12px;height:12px" class="ic') + '</span></div>' +
            '<div class="spec"><span class="k">Module</span><span class="v">' + n.module + '</span></div>' +
            '<div class="spec"><span class="k">Version</span><span class="v">' + n.version + '</span></div>' +
            '<div class="spec"><span class="k">Timestamp</span><span class="v">' + n.timestamp + '</span></div>' +
            '<div class="spec"><span class="k">Dataset</span><span class="v">' + n.dataset + '</span></div>' +
            '<div class="spec"><span class="k">Checksum</span><span class="v copybtn" data-copy="' + n.checksum + '" style="color:var(--text-1)">' + n.checksum + '</span></div>' +
            '<div class="spec"><span class="k">Artifact URI</span><span class="v">' + n.uri + '</span></div>' +
            '<div class="spec"><span class="k">Model version</span><span class="v">' + n.model + '</span></div>' +
            '</div></div></div></div>';
        }).join(''));
      }
      const nodes = document.querySelectorAll('.chain-node');
      nodes.forEach((n) => n.querySelector('.chain-card').addEventListener('click', () => {
        const open = n.classList.contains('open');
        nodes.forEach((o) => o.classList.remove('open'));
        if (!open) n.classList.add('open');
      }));
      const flow = document.querySelector('.chain .flowline');
      if (flow && window.gsap && !Anim.reduced) {
        gsap.to(flow, { height: '100%', duration: 2.6, ease: 'power1.inOut', scrollTrigger: window.ScrollTrigger ? { trigger: '.chain', start: 'top 70%' } : undefined });
      } else if (flow) flow.style.height = '100%';
      document.querySelectorAll('.copybtn').forEach((b) => b.addEventListener('click', (e) => { e.stopPropagation(); copyText(b.dataset.copy); }));
    },

    /* ---------- reports ---------- */
    reports() {
      const view = document.getElementById('viewReport');
      if (view) view.addEventListener('click', () => this.reportPreview());
      document.querySelectorAll('[data-simdl]').forEach((b) => b.addEventListener('click', () => toast('Simulated download — ' + b.dataset.simdl, 'download')));
      const gen = document.getElementById('genBtn');
      if (gen) gen.addEventListener('click', () => this.reportGen());
      if (location.hash === '#generate') setTimeout(() => this.reportGen(), 500);
    },
    reportGen() {
      const stages = DATA.report.stages;
      const root = openModal(
        '<div class="modal-head"><div><div class="meta">M12 · Reports & Audit</div><div class="h-title" style="font-size:20px;margin-top:6px">Generate Evidence Pack</div></div><button class="tb-btn" data-close-modal>' + ic('x') + '</button></div>' +
        '<div class="modal-body"><div id="genStages">' + stages.map((s, i) => '<div class="gen-stage" data-i="' + i + '">' + (i === stages.length - 1 ? ic('check') : ic('spin')) + '<span>' + s + '</span></div>').join('') + '</div>' +
        '<div class="gen-bar"><i id="genBar"></i></div><div class="row" style="justify-content:flex-end;margin-top:20px"><button class="btn btn-light" id="genDone" disabled>Open Report Preview</button></div></div>');
      let i = 0;
      const els = root.querySelectorAll('.gen-stage');
      const bar = root.querySelector('#genBar');
      els[0].classList.add('run');
      const t = setInterval(() => {
        els[i].classList.remove('run'); els[i].classList.add('done');
        i++;
        bar.style.width = (i / stages.length) * 100 + '%';
        if (i < stages.length) els[i].classList.add('run');
        else {
          clearInterval(t);
          const done = root.querySelector('#genDone');
          done.disabled = false;
          done.addEventListener('click', () => { closeModal(); this.reportPreview(); });
        }
      }, 750);
    },
    reportPreview() {
      const inv = CTX.inv();
      openModal(
        '<div class="modal-head"><div><div class="meta">Preview</div><div class="h-title" style="font-size:20px;margin-top:6px">Final Evidence Pack · v1.0</div></div><button class="tb-btn" data-close-modal>' + ic('x') + '</button></div>' +
        '<div class="modal-body" style="padding:16px"><div class="report-doc">' +
        '<div class="cov"><div class="wm">SpillTrace</div><div class="meta" style="color:#8a8d90;margin-top:8px">SATELLITE-TO-VESSEL OIL SPILL ANALYSIS</div><h3>' + inv.title + '</h3><div class="meta" style="color:#8a8d90">' + inv.id + ' · GENERATED 26 AUG 2026 · v1.0</div><div style="position:absolute;right:44px;bottom:44px;text-align:right" class="meta">sha256:3f91c0ab…b7e2<br>24 PAGES · JSON 4.2 MB</div></div>' +
        '<div class="sec"><h4>Spill Summary</h4><div class="rk"><span>Detected area</span><span class="sc">18.6 km²</span></div><div class="rk"><span>Detection confidence</span><span class="sc">0.92</span></div><div class="rk"><span>Scene</span><span class="sc" style="font-size:11px">S1A_IW_GRDH_1SDV</span></div><div class="rk"><span>Source corridor</span><span class="sc">21.36 km²</span></div></div>' +
        '<div class="sec"><h4>Candidate Ranking</h4>' + inv.candidates.list.slice(0, 3).map((c) => '<div class="rk"><span style="color:#7C8084;font-family:var(--font-mono);font-size:11px">#' + String(c.rank).padStart(2, '0') + '</span><span>' + c.name + ' · ' + c.type + '</span><span class="sc">' + c.score.toFixed(2) + '</span></div>').join('') + '</div>' +
        '<div class="sec"><h4>Evidence Chain</h4>' + DATA.evidenceChain.map((n) => '<div class="rk"><span style="font-family:var(--font-mono);font-size:11px;color:#7C8084">' + n.mid + '</span><span>' + n.name + '</span><span class="sc" style="font-size:10px;color:#79B98A">VERIFIED</span></div>').join('') + '</div>' +
        '<div class="sec" style="display:flex;gap:10px;justify-content:flex-end"><button class="btn btn-ghost btn-sm" data-simdl="evidence_pack_v1.0.pdf" data-close-modal>' + ic('download') + 'Download PDF</button><button class="btn btn-ghost btn-sm" data-simdl="evidence_pack_v1.0.json" data-close-modal>' + ic('download') + 'Download JSON</button></div>' +
        '</div></div>', true);
      document.querySelectorAll('[data-simdl]').forEach((b) => b.addEventListener('click', () => toast('Simulated download — ' + b.dataset.simdl, 'download')));
    },

    /* ---------- settings ---------- */
    settings() {
      document.querySelectorAll('.switch').forEach((s) => s.addEventListener('click', () => {
        s.classList.toggle('on');
        toast((s.dataset.name || 'Setting') + (s.classList.contains('on') ? ' enabled' : ' disabled'), 'settings');
      }));
    },

    /* ---------- map ---------- */
    map() {
      const f = document.getElementById('focusBtn');
      if (f) f.addEventListener('click', () => document.body.classList.toggle('focus-mode'));
    }
  };
})();
