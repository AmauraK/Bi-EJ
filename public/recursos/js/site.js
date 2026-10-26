// Comportamentos das páginas internas (a home usa inicio.js, que já inclui os mesmos recursos).
(() => {
  'use strict';
  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];
  const root = document.documentElement;
  root.classList.add('js');
  const clamp = (n, min = 0, max = 1) => Math.max(min, Math.min(n, max));
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  const desktop = matchMedia('(min-width: 761px)');

  // Entrada suave das seções.
  const reveals = $$('.reveal');
  if ('IntersectionObserver' in window && !reducedMotion.matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    }), { threshold: .08 });
    reveals.forEach(element => observer.observe(element));
  } else reveals.forEach(element => element.classList.add('visible'));

  // Barra de leitura e bloco 3D, atualizados sob demanda.
  const art = $('.svc-art');
  let pointerX = 0;
  let pointerY = 0;
  let framePending = false;
  function render() {
    framePending = false;
    const scrollable = root.scrollHeight - innerHeight;
    root.style.setProperty('--page-progress', scrollable > 0 ? clamp(scrollY / scrollable) : 0);
    if (!art) return;
    if (reducedMotion.matches) {
      ['--svc-mx', '--svc-my', '--svc-scroll'].forEach(name => art.style.setProperty(name, 0));
      return;
    }
    const rect = art.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > innerHeight) return;
    art.style.setProperty('--svc-scroll', clamp(scrollY / innerHeight).toFixed(3));
    art.style.setProperty('--svc-mx', pointerX.toFixed(3));
    art.style.setProperty('--svc-my', pointerY.toFixed(3));
  }
  function scheduleRender() {
    if (!framePending) { framePending = true; requestAnimationFrame(render); }
  }
  addEventListener('scroll', scheduleRender, { passive: true });
  addEventListener('resize', scheduleRender, { passive: true });
  reducedMotion.addEventListener('change', scheduleRender);
  if (art) {
    // O bloco segue o ponteiro em toda a abertura, não apenas sobre ele.
    const hero = art.closest('.svc-hero') || art;
    hero.addEventListener('pointermove', event => {
      if (reducedMotion.matches || !finePointer.matches) return;
      const rect = hero.getBoundingClientRect();
      pointerX = clamp((event.clientX - rect.left) / rect.width * 2 - 1, -1, 1);
      pointerY = clamp((event.clientY - rect.top) / rect.height * 2 - 1, -1, 1);
      scheduleRender();
    });
    hero.addEventListener('pointerleave', () => { pointerX = 0; pointerY = 0; scheduleRender(); });
  }
  scheduleRender();
})();
