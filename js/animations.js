/* OILTRACE — GSAP animation system (reveals, counts, parallax) */
(function () {
  'use strict';
  const reduced = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  window.Anim = {
    init() {
      const hasGsap = typeof window.gsap !== 'undefined';
      if (hasGsap && window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

      /* scroll reveals */
      const revs = document.querySelectorAll('[data-reveal]');
      revs.forEach((el, i) => {
        if (reduced || !hasGsap || !window.ScrollTrigger) { el.classList.add('rv-in'); return; }
        ScrollTrigger.create({
          trigger: el, start: 'top 88%', once: true,
          onEnter: () => {
            setTimeout(() => el.classList.add('rv-in'), (+(el.getAttribute('data-delay') || 0)) * 1000);
          }
        });
      });

      /* metric count-up */
      document.querySelectorAll('[data-count]').forEach((el) => {
        const to = parseFloat(el.getAttribute('data-count'));
        const dec = +(el.getAttribute('data-dec') || 0);
        const pad = +(el.getAttribute('data-pad') || 0);
        if (reduced || !hasGsap || !window.ScrollTrigger) {
          el.textContent = pad ? to.toFixed(dec).padStart(pad, '0') : to.toFixed(dec);
          return;
        }
        ScrollTrigger.create({
          trigger: el, start: 'top 92%', once: true,
          onEnter: () => countUp(el, to, { decimals: dec, pad: pad })
        });
      });

      /* parallax imagery */
      if (hasGsap && window.ScrollTrigger && !reduced) {
        document.querySelectorAll('[data-parallax]').forEach((el) => {
          const amt = +(el.getAttribute('data-parallax') || 60);
          gsap.fromTo(el, { y: -amt / 2 }, {
            y: amt / 2, ease: 'none',
            scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true }
          });
        });
        /* slow image zoom on scroll for selected sections */
        document.querySelectorAll('[data-zoomscroll]').forEach((el) => {
          gsap.fromTo(el, { scale: 1.05 }, {
            scale: 1.18, ease: 'none',
            scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true }
          });
        });
      }
    },
    get reduced() { return reduced; }
  };
})();
