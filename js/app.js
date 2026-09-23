/* OILTRACE — bootstrap */
(function () {
  'use strict';
  /* OILTRACE ships light-only, per design direction */

  document.addEventListener('DOMContentLoaded', () => {
    if (window.__otBooted) return;
    window.__otBooted = true;
    const page = document.body.dataset.page || 'landing';
    if (page !== 'landing' && page !== 'login') window.buildShell(page);
    window.Router.init();
    window.Anim.init();
    if (page === 'map') window.MapMock.init();
    window.Interactions.init(page);
  });
})();
