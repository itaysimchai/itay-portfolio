(function () {
  'use strict';

  /* ── Parallax orbs on mouse move ── */
  const orbs = document.querySelectorAll('.orb');
  const hero = document.getElementById('hero');

  if (hero && orbs.length && window.matchMedia('(pointer: fine)').matches) {
    let rafId = null;
    let mx = 0, my = 0;

    hero.addEventListener('mousemove', (e) => {
      mx = (e.clientX / window.innerWidth  - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    function tick() {
      orbs.forEach((orb, i) => {
        const depth  = (i + 1) * 10;
        const tx = mx * depth;
        const ty = my * depth;
        orb.style.transform = `translate(${tx}px, ${ty}px)`;
      });
      rafId = requestAnimationFrame(tick);
    }

    tick();

    hero.addEventListener('mouseleave', () => {
      cancelAnimationFrame(rafId);
      orbs.forEach(orb => { orb.style.transform = ''; });
    });

    hero.addEventListener('mouseenter', tick);
  }

  /* ── Smooth-scroll the scroll indicator ── */
  const scrollBtn = document.querySelector('.scroll-indicator');
  if (scrollBtn) {
    scrollBtn.addEventListener('click', () => {
      const nextSection = hero.nextElementSibling;
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
      }
    });
  }

  /* ── Nav active state on scroll ── */
  const navLinks = document.querySelectorAll('.nav__link');

  function updateNav() {
    const scrollY = window.scrollY;
    navLinks.forEach(link => {
      const targetId = link.getAttribute('href');
      if (!targetId || !targetId.startsWith('#')) return;
      const section = document.querySelector(targetId);
      if (!section) return;
      const top    = section.offsetTop - 80;
      const bottom = top + section.offsetHeight;
      link.classList.toggle('nav__link--active', scrollY >= top && scrollY < bottom);
    });
  }

  window.addEventListener('scroll', updateNav, { passive: true });

})();
