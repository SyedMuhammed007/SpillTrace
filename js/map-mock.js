/* SpillTrace — mock GIS interface (pure frontend simulation) */
(function () {
  'use strict';

  const LAYERS = [
    { key: 'sar', label: 'SAR Footprint', on: true },
    { key: 'spill', label: 'Spill Polygon', on: true },
    { key: 'corridor', label: 'Source Corridor', on: true },
    { key: 'drift', label: 'Drift Density', on: true },
    { key: 'tracks', label: 'Candidate Tracks', on: true },
    { key: 'approach', label: 'Closest Approach', on: true },
    { key: 'ais', label: 'All AIS Tracks', on: false }
  ];

  window.MapMock = {
    init() {
      const host = document.getElementById('gisMap');
      if (!host || host.dataset.built) return;
      host.dataset.built = '1';
      const svgNS = 'http://www.w3.org/2000/svg';

      host.insertAdjacentHTML('beforeend',
        '<div class="base" style="background-image:url(\'https://upload.wikimedia.org/wikipedia/commons/6/6b/The_oil_spill_in_the_Gulf_of_Mexico_pictured_by_Envisat.jpg\')"></div>' +
        '<svg id="gisSvg" viewBox="0 0 1000 640" preserveAspectRatio="xMidYMid slice"></svg>' +
        '<div class="layerbar" id="layerBar">' + LAYERS.map((l) =>
          '<button class="layer-toggle' + (l.on ? ' on' : '') + '" data-layer="' + l.key + '">' + l.label + '</button>').join('') + '</div>' +
        '<div class="map-hud tl">SENTINEL-1 · IW GRD<br>26.184° N, -91.245° W<br>2026-08-26 08:12 UTC</div>' +
        '<div class="map-hud tr">EPSG:4326<br>ZOOM 9.4<br>10 m / px</div>' +
        '<div class="map-hud bl">SpillTrace GIS · MOCK TILESTACK v0.9</div>' +
        '<div class="map-hud br">WIND 6.2 m/s NE<br>CURRENT 0.4 kn W</div>' +
        '<div class="legend">' +
          '<div class="row"><span class="sw" style="background:rgba(245,245,242,.35);border:1px dashed rgba(245,245,242,.6)"></span>SAR</div>' +
          '<div class="row"><span class="sw" style="background:rgba(91,140,255,.5)"></span>Spill</div>' +
          '<div class="row"><span class="sw" style="background:rgba(232,125,62,.5)"></span>Source corridor</div>' +
          '<div class="row"><span class="sw" style="background:#F5F5F2"></span>Candidate vessel</div>' +
          '<div class="row"><span class="sw" style="border:1px solid #5B8CFF;border-radius:50%;width:9px;height:9px;background:transparent"></span>Closest approach</div>' +
        '</div>' +
        '<div class="map-scale"><span>0</span><i></i><span>10 KM</span></div>' +
        '<div class="score-tip" id="mapTip"></div>');

      const svg = document.getElementById('gisSvg');
      svg.innerHTML =
        /* grid */
        '<g id="g-grid" opacity=".5">' + Array.from({ length: 11 }, (_, i) => '<line x1="' + (i * 100) + '" y1="0" x2="' + (i * 100) + '" y2="640" stroke="rgba(245,245,242,.05)"/>').join('') +
        Array.from({ length: 8 }, (_, i) => '<line x1="0" y1="' + (i * 80) + '" x2="1000" y2="' + (i * 80) + '" stroke="rgba(245,245,242,.05)"/>').join('') + '</g>' +
        /* SAR footprint */
        '<g id="g-sar" class="layerg"><polygon points="90,80 930,140 900,560 70,500" fill="rgba(245,245,242,.02)" stroke="rgba(245,245,242,.35)" stroke-dasharray="6 6"/><text x="100" y="70" fill="rgba(245,245,242,.45)" font-size="10" font-family="monospace" letter-spacing="2">S1A_IW_GRDH_1SDV · PASS 08:12 UTC</text></g>' +
        /* source corridor */
        '<g id="g-corridor" class="layerg"><polygon points="300,300 470,270 540,320 500,380 340,390 280,350" fill="rgba(232,125,62,.07)" stroke="#E87D3E" stroke-dasharray="5 5" stroke-opacity=".8"/><text x="300" y="412" fill="#E87D3E" opacity=".85" font-size="10" font-family="monospace" letter-spacing="2">PROBABLE SOURCE CORRIDOR · 21.36 KM²</text></g>' +
        /* drift density */
        '<g id="g-drift" class="layerg"><path id="driftPath1" d="M640,290 C580,300 540,310 470,330" fill="none" stroke="rgba(91,140,255,.35)" stroke-dasharray="3 6"/><path id="driftPath2" d="M630,310 C570,330 520,340 450,355" fill="none" stroke="rgba(91,140,255,.25)" stroke-dasharray="3 6"/><path id="driftPath3" d="M650,270 C590,275 540,290 480,305" fill="none" stroke="rgba(91,140,255,.25)" stroke-dasharray="3 6"/><g id="particles"></g><text x="560" y="255" fill="rgba(91,140,255,.8)" font-size="10" font-family="monospace" letter-spacing="2">BACKWARD DRIFT · 500 PARTICLES · 12 H</text></g>' +
        /* spill polygon */
        '<g id="g-spill" class="layerg"><path d="M610,255 C640,240 680,246 700,268 C722,290 718,320 695,338 C672,356 632,352 612,336 C590,318 588,272 610,255 Z" fill="rgba(91,140,255,.16)" stroke="#5B8CFF" stroke-width="1.4"/><circle cx="650" cy="296" r="3" fill="#5B8CFF"/><text x="712" y="262" fill="#5B8CFF" font-size="10" font-family="monospace" letter-spacing="2">SPILL · 18.6 KM² · 92%</text></g>' +
        /* all AIS */
        '<g id="g-ais" class="layerg off"><path d="M80,180 C300,220 620,180 940,240" stroke="rgba(245,245,242,.14)" fill="none"/><path d="M60,420 C300,470 700,430 950,470" stroke="rgba(245,245,242,.14)" fill="none"/><path d="M200,600 C400,520 700,560 920,520" stroke="rgba(245,245,242,.1)" fill="none"/><text x="80" y="170" fill="rgba(245,245,242,.3)" font-size="9" font-family="monospace" letter-spacing="2">AIS DENSITY · 72 H</text></g>' +
        /* candidate tracks */
        '<g id="g-tracks" class="layerg">' +
        '<path id="trackA" d="M180,520 C320,430 380,360 470,330 C560,300 700,250 840,180" fill="none" stroke="#F5F5F2" stroke-width="1.6"/><circle cx="840" cy="180" r="4" fill="#F5F5F2"/><text x="852" y="176" fill="#F5F5F2" font-size="10" font-family="monospace" letter-spacing="2">VESSEL A</text>' +
        '<path id="trackB" d="M240,140 C400,200 520,240 700,300 C800,333 880,370 940,400" fill="none" stroke="rgba(245,245,242,.4)" stroke-width="1.1"/><text x="900" y="420" fill="rgba(245,245,242,.4)" font-size="9" font-family="monospace" letter-spacing="2">VESSEL B</text>' +
        '<path id="trackC" d="M120,300 C260,320 420,380 560,430 C700,478 800,492 900,500" fill="none" stroke="rgba(245,245,242,.28)" stroke-width="1.1"/><text x="850" y="520" fill="rgba(245,245,242,.3)" font-size="9" font-family="monospace" letter-spacing="2">VESSEL C</text></g>' +
        /* closest approach */
        '<g id="g-approach" class="layerg"><line x1="470" y1="330" x2="640" y2="296" stroke="#5B8CFF" stroke-dasharray="2 4" opacity=".8"/><circle cx="470" cy="330" r="10" fill="none" stroke="#5B8CFF" stroke-width="1.2"/><circle cx="470" cy="330" r="2.5" fill="#5B8CFF"/><text x="430" y="362" fill="#5B8CFF" font-size="10" font-family="monospace" letter-spacing="2">CPA · 2.4 KM · 10:42 UTC</text></g>';

      /* layer toggles */
      const groups = { sar: 'g-sar', spill: 'g-spill', corridor: 'g-corridor', drift: 'g-drift', tracks: 'g-tracks', approach: 'g-approach', ais: 'g-ais' };
      document.getElementById('layerBar').addEventListener('click', (e) => {
        const b = e.target.closest('.layer-toggle');
        if (!b) return;
        const g = document.getElementById(groups[b.getAttribute('data-layer')]);
        const on = b.classList.toggle('on');
        g.classList.toggle('off', !on);
      });
      window.MapMock.setLayer = (key, on) => {
        const g = document.getElementById(groups[key]);
        const b = document.querySelector('.layer-toggle[data-layer="' + key + '"]');
        if (g) g.classList.toggle('off', !on);
        if (b) b.classList.toggle('on', on);
      };
      window.MapMock.pulseLayer = (key) => {
        const g = document.getElementById(groups[key]);
        if (!g) return;
        g.classList.add('pulse-g');
        if (window.gsap) gsap.fromTo(g, { opacity: .2 }, { opacity: 1, duration: .8, ease: 'power2.out' });
        setTimeout(() => g.classList.remove('pulse-g'), 900);
      };

      /* particles */
      const pg = document.getElementById('particles');
      const rnd = (a, b) => a + Math.random() * (b - a);
      const tip = document.getElementById('mapTip');
      for (let i = 0; i < 90; i++) {
        const t = Math.random();
        const x = 640 - t * rnd(140, 200) + rnd(-26, 26);
        const y = 296 + t * rnd(-30, 60) + rnd(-20, 20);
        const c = document.createElementNS(svgNS, 'circle');
        c.setAttribute('cx', x); c.setAttribute('cy', y);
        c.setAttribute('r', rnd(.9, 2).toFixed(1));
        c.setAttribute('fill', 'rgba(91,140,255,' + rnd(.25, .8).toFixed(2) + ')');
        c.setAttribute('data-lat',(26.1 + (300 - y) / 4000).toFixed(3));
        c.setAttribute('data-log',(-91.1 + (x - 500) / 4000).toFixed(3));
        c.setAttribute('data-p',t.toFixed(2));
        pg.appendChild(c);
        if (window.gsap && !Anim.reduced) {
          gsap.to(c, { x: rnd(-14, 6), y: rnd(-8, 8), duration: rnd(3, 7), repeat: -1, yoyo: true, ease: 'sine.inOut', delay: rnd(0, 2) });
        }
      }
      pg.addEventListener('mousemove', (e) => {
        const c = e.target.closest('circle');
        if (!c || !c.getAttribute('data-lat')) { tip.classList.remove('on'); return; }
        tip.innerHTML = '<b>' + c.getAttribute('data-lat') + '° N, ' + c.getAttribute('data-log') + '° W</b><br>particle p=' + c.getAttribute('data-p') + ' · backward step ' + Math.round(c.getAttribute('data-p') * 12) + ' h';
        tip.style.left = Math.min(e.clientX + 14, window.innerWidth - 270) + 'px';
        tip.style.top = (e.clientY + 16) + 'px';
        tip.classList.add('on');
      });
      pg.addEventListener('mouseleave', () => tip.classList.remove('on'));

      /* flow particles along drift paths */
      [1, 2, 3].forEach((n) => {
        const path = document.getElementById('driftPath' + n);
        if (!path || !path.getTotalLength) return;
        const L = path.getTotalLength();
        for (let i = 0; i < 4; i++) {
          const dot = document.createElementNS(svgNS, 'circle');
          dot.setAttribute('r', '2');
          dot.setAttribute('fill', '#5B8CFF');
          dot.setAttribute('opacity', '.9');
          document.getElementById('g-drift').appendChild(dot);
          const off = i / 4;
          const step = () => {
            const t0 = performance.now();
            const dur = 9000;
            (function fr(now) {
              const p = ((now - t0) / dur + off) % 1;
              const pt = path.getPointAtLength(p * L);
              dot.setAttribute('cx', pt.x); dot.setAttribute('cy', pt.y);
              dot.setAttribute('opacity', (0.9 - p * 0.5).toFixed(2));
              requestAnimationFrame(fr);
            })(t0);
          };
          if (!Anim.reduced) step(); else { const pt = path.getPointAtLength(off * L); dot.setAttribute('cx', pt.x); dot.setAttribute('cy', pt.y); }
        }
      });

      /* track draw-in */
      if (window.gsap && !Anim.reduced) {
        ['trackA', 'trackB', 'trackC'].forEach((id, i) => {
          const p = document.getElementById(id);
          if (!p || !p.getTotalLength) return;
          const L = p.getTotalLength();
          p.style.strokeDasharray = L;
          p.style.strokeDashoffset = L;
          gsap.to(p, { strokeDashoffset: 0, duration: 2.4, delay: .4 + i * .3, ease: 'power2.inOut' });
        });
      }

      /* timeline wiring */
      const layerFor = { sar: 'sar', spill: 'spill', drift: 'drift', tracks: 'tracks', approach: 'approach' };
      document.querySelectorAll('.tev').forEach((b) => {
        b.addEventListener('click', () => {
          document.querySelectorAll('.tev').forEach((o) => o.classList.remove('on'));
          b.classList.add('on');
          const key = b.getAttribute('data-layer');
          if (layerFor[key]) {
            window.MapMock.setLayer(layerFor[key], true);
            window.MapMock.pulseLayer(layerFor[key]);
          }
          const rail = document.querySelector('.rail-card[data-goto="' + key + '"]');
          if (rail && window.gsap) gsap.fromTo(rail, { borderColor: 'rgba(91,140,255,.6)' }, { borderColor: 'rgba(255,255,255,.06)', duration: 1.6 });
        });
      });
    }
  };

  /* CSS for layer fade */
  const st = document.createElement('style');
  st.textContent = '.layerg{transition:opacity .45s ease}.layerg.off{opacity:0;pointer-events:none}';
  document.head.appendChild(st);
})();
