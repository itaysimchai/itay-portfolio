(function () {
  'use strict';

  const root = document.documentElement;
  const toggle = document.querySelector('.theme-toggle');
  if (!toggle) return;

  function updateToggle() {
    const isDark = root.dataset.theme === 'dark';
    const label = isDark ? 'Switch to light mode' : 'Switch to dark mode';
    toggle.setAttribute('aria-label', label);
    toggle.setAttribute('title', label);
    toggle.setAttribute('aria-pressed', String(isDark));
  }

  toggle.addEventListener('click', function () {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try {
      localStorage.setItem('portfolio-theme', root.dataset.theme);
    } catch (_) {}
    updateToggle();
  });

  window.addEventListener('storage', function (event) {
    if (event.key === 'portfolio-theme') {
      root.dataset.theme = event.newValue === 'dark' ? 'dark' : 'light';
      updateToggle();
    }
  });

  updateToggle();
})();
