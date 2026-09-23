/* SpillTrace — micro router: page transitions for static multi-page prototype */
(function () {
  'use strict';
  window.Router = {
    init() {
      document.body.classList.add('page-enter');
      setTimeout(() => document.body.classList.remove('page-enter'), 700);
      document.addEventListener('click', (e) => {
        const a = e.target.closest('a[href]');
        if (!a) return;
        const href = a.getAttribute('href') || '';
        if (a.target === '_blank' || e.metaKey || e.ctrlKey || e.shiftKey) return;
        if (!/\.html($|#)/.test(href) && !href.startsWith('#')) return;
        if (href.startsWith('#')) return; // anchors handled natively
        e.preventDefault();
        document.body.classList.add('page-leave');
        setTimeout(() => { location.href = href; }, 210);
      });
    }
  };
})();
