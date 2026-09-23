/* SpillTrace — landing cinematic system */
(function () {
  'use strict';
  document.addEventListener('DOMContentLoaded', () => {
    if (window.__otLandingBooted) return;
    window.__otLandingBooted = true;
    const hasGsap = typeof window.gsap !== 'undefined';
    if (hasGsap && window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
    const reduced = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

    /* nav scroll state */
    const nav = document.querySelector('.lnav');
    const onScroll = () => nav && nav.classList.toggle('scrolled', scrollY > 40);
    addEventListener('scroll', onScroll, { passive: true }); onScroll();

    /* ---------- scroll-controlled hero video ---------- */
    const track = document.querySelector('.hero-track');
    const video = document.getElementById('heroVideo');
    const fallback = document.querySelector('.hero-fallback');
    let dur = 0, target = 0, current = 0, videoOk = false;

    if (video) {
      video.muted = true; video.playsInline = true;
      video.addEventListener('loadedmetadata', () => { dur = video.duration || 0; videoOk = true; video.classList.add('ok'); video.pause(); });
      video.addEventListener('error', () => { videoOk = false; video.style.display = 'none'; });
      /* some browsers need a data availability nudge */
      video.addEventListener('canplaythrough', () => { if (!dur && video.duration) { dur = video.duration; videoOk = true; video.classList.add('ok'); } });
    }

    if (hasGsap && window.ScrollTrigger && track && !reduced) {
      ScrollTrigger.create({
        trigger: track, start: 'top top', end: 'bottom bottom',
        onUpdate: (self) => { target = self.progress; }
      });
    }
    (function frame() {
      current += (target - current) * 0.075;
      if (Math.abs(target - current) > 0.0001) {
        if (videoOk && dur) {
          const t = current * Math.max(0, dur - 0.12);
          if (Math.abs(video.currentTime - t) > 0.01) { try { video.currentTime = t; } catch (e) {} }
        }
        if (fallback) fallback.style.transform = 'scale(' + (1.08 - current * 0.1) + ') translateY(' + (current * -2) + '%)';
      }
      requestAnimationFrame(frame);
    })();

    /* hero title line reveal */
    if (hasGsap && !reduced) {
      gsap.to('.hero-title .ln > span', { y: 0, duration: 1.2, stagger: .14, ease: 'power3.out', delay: .3 });
      gsap.from('.hero-eyebrow,.hero-body,.hero-ctas,.hero-side,.scroll-cue', { opacity: 0, y: 18, duration: 1, stagger: .1, delay: .7, ease: 'power2.out' });
    } else {
      document.querySelectorAll('.hero-title .ln > span').forEach((s) => s.style.transform = 'none');
    }

    /* drifting coordinates */
    const coords = document.getElementById('coords');
    if (coords && !reduced) {
      let lat = 26.184, lon = -91.245;
      setInterval(() => {
        lat += (Math.random() - .5) * .002; lon += (Math.random() - .5) * .002;
        coords.innerHTML = lat.toFixed(3) + '° N<br>' + lon.toFixed(3) + '° W';
      }, 1600);
    }

    /* ---------- statement word lighting ---------- */
    const st = document.getElementById('statement');
    if (st) {
      const words = st.textContent.trim().split(/\s+/);
      st.innerHTML = words.map((w) => '<span class="w">' + w + '</span>').join(' ');
      const spans = st.querySelectorAll('.w');
      if (hasGsap && window.ScrollTrigger && !reduced) {
        ScrollTrigger.create({
          trigger: st, start: 'top 75%', end: 'bottom 55%', scrub: .5,
          onUpdate: (self) => {
            const n = Math.floor(self.progress * spans.length);
            spans.forEach((s, i) => s.classList.toggle('lit', i <= n));
          }
        });
      } else spans.forEach((s) => s.classList.add('lit'));
    }

    /* ---------- pipeline stages ---------- */
    if (hasGsap && window.ScrollTrigger && !reduced) {
      gsap.from('.stage', {
        opacity: 0, y: 34, duration: .9, stagger: .14, ease: 'power2.out',
        scrollTrigger: { trigger: '.flow-row', start: 'top 80%' },
        onStart: () => document.querySelectorAll('.stage').forEach((s) => s.classList.add('in'))
      });
    } else document.querySelectorAll('.stage').forEach((s) => s.classList.add('in'));

    /* ---------- pseudomap draw ---------- */
    document.querySelectorAll('.pmap-wrap .draw').forEach((p) => {
      if (!p.getTotalLength) return;
      const L = p.getTotalLength();
      p.style.strokeDasharray = L;
      if (hasGsap && window.ScrollTrigger && !reduced) {
        p.style.strokeDashoffset = L;
        gsap.to(p, { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: '.pmap-wrap', start: 'top 75%', end: 'bottom 45%', scrub: .6 } });
      } else p.style.strokeDashoffset = 0;
    });

    /* watch evidence flow anchor */
    const w = document.getElementById('watchFlow');
    if (w) w.addEventListener('click', (e) => {
      e.preventDefault();
      document.getElementById('eflow').scrollIntoView({ behavior: 'smooth' });
    });
  });
})();
