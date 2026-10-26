// Barra de navegação de todas as páginas: menu mobile e submenus (Soluções, Conteúdos).
(() => {
  'use strict';
  const menu = document.querySelector('#navigation');
  const menuButton = document.querySelector('.menu-toggle');
  if (!menu || !menuButton) return;
  const groups = [...menu.querySelectorAll('.nav-group')];
  // A partir de 761 px o menu fica aberto na barra e os submenus viram painéis (ver site.css).
  const wide = matchMedia('(min-width: 761px)');
  const mouse = matchMedia('(hover: hover) and (pointer: fine)');

  const toggleOf = group => group.querySelector('.nav-group-toggle');
  const isOpen = group => toggleOf(group).getAttribute('aria-expanded') === 'true';
  function setGroup(group, open) {
    toggleOf(group).setAttribute('aria-expanded', String(open));
    if (!open) delete group.dataset.hover;
  }
  const closeGroups = except => groups.forEach(group => { if (group !== except) setGroup(group, false); });
  function closeMenu() {
    closeGroups();
    menu.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  }

  menuButton.addEventListener('click', () => {
    const expanded = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(expanded));
    menu.classList.toggle('open', expanded);
    if (!expanded) closeGroups();
  });

  groups.forEach(group => {
    const toggle = toggleOf(group);
    let leaveTimer = 0;
    toggle.addEventListener('click', () => {
      // Aberto pelo mouse: o clique confirma, em vez de fechar logo em seguida.
      if (group.dataset.hover) { delete group.dataset.hover; return; }
      closeGroups(group);
      setGroup(group, !isOpen(group));
    });
    // No desktop com mouse, o painel abre ao passar por cima.
    group.addEventListener('pointerenter', event => {
      if (event.pointerType !== 'mouse' || !wide.matches || !mouse.matches) return;
      clearTimeout(leaveTimer);
      if (isOpen(group)) return;
      closeGroups(group);
      setGroup(group, true);
      group.dataset.hover = 'true';
    });
    group.addEventListener('pointerleave', event => {
      if (event.pointerType !== 'mouse' || !group.dataset.hover) return;
      leaveTimer = setTimeout(() => { if (group.dataset.hover) setGroup(group, false); }, 180);
    });
    // Tab para fora do painel fecha o submenu.
    group.addEventListener('focusout', event => {
      if (wide.matches && !group.contains(event.relatedTarget)) setGroup(group, false);
    });
  });

  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    const open = groups.find(isOpen);
    if (open) { setGroup(open, false); toggleOf(open).focus(); }
    else if (menu.classList.contains('open')) { closeMenu(); menuButton.focus(); }
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.header')) closeMenu();
    else if (!event.target.closest('.nav-group')) closeGroups();
  });
  wide.addEventListener('change', closeMenu);
})();
