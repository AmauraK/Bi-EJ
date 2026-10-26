// Página Sobre: dois comportamentos independentes, a história por capítulos e a caixa de fotos da abertura.

// História: avança um capítulo a cada clique no palco, no botão, pelas setas do teclado ou pelos anos no topo.
// O odômetro, o brilho e a barra seguem a variável --chapter (ver sobre.css).
(() => {
  'use strict';
  const section = document.querySelector('.about-history');
  if (!section) return;
  const stage = section.querySelector('.history-stage');
  const chapters = [...stage.querySelectorAll('.chapter')];
  const tabs = [...section.querySelectorAll('.history-tabs button')];
  const bars = [...stage.querySelectorAll('.history-progress span')];
  const next = stage.querySelector('.history-next');
  const nextLabel = next.querySelector('.history-next-label');
  const cursor = stage.querySelector('.history-cursor');
  const labels = tabs.map(tab => tab.textContent);
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  let current = 0;
  const leaveTimers = new Map();

  // Largura de cada caractere do odômetro em "em": a coluna assume a largura do caractere visível,
  // e "Hoje" fica com o espaçamento de uma palavra, não o de quatro dígitos.
  const odometer = stage.querySelector('.odometer');
  const columns = [...odometer.querySelectorAll('.odo-col')];
  let glyphWidths = null;
  function fitColumns() {
    if (!glyphWidths) {
      const size = parseFloat(getComputedStyle(odometer).fontSize);
      glyphWidths = columns.map(col => [...col.children].map(glyph => glyph.getBoundingClientRect().width / size));
    }
    columns.forEach((col, i) => { col.style.width = `${glyphWidths[i][current].toFixed(3)}em`; });
  }
  document.fonts.ready.then(fitColumns);

  function go(index) {
    index = (index + chapters.length) % chapters.length;
    if (index === current) return;
    const previous = chapters[current];
    previous.classList.remove('is-active');
    previous.classList.add('is-leaving');
    clearTimeout(leaveTimers.get(previous));
    leaveTimers.set(previous, setTimeout(() => previous.classList.remove('is-leaving'), 650));
    chapters[index].classList.remove('is-leaving');
    chapters[index].classList.add('is-active');
    current = index;
    stage.dataset.chapter = String(index);
    stage.style.setProperty('--chapter', index);
    if (glyphWidths) fitColumns();
    tabs.forEach((tab, i) => { if (i === index) tab.setAttribute('aria-current', 'step'); else tab.removeAttribute('aria-current'); });
    bars.forEach((bar, i) => bar.classList.toggle('is-done', i <= index));
    const last = index === chapters.length - 1;
    nextLabel.textContent = last ? 'Recomeçar a história' : `Próximo: ${labels[index + 1]}`;
    cursor.firstChild.textContent = last ? 'Recomeçar ' : 'Avançar ';
  }
  bars[0]?.classList.add('is-done');

  // Clique em qualquer ponto do palco avança; botões e links mantêm a própria ação.
  stage.addEventListener('click', event => {
    if (event.target.closest('button, a') || getSelection().toString()) return;
    go(current + 1);
  });
  next.addEventListener('click', () => go(current + 1));
  tabs.forEach((tab, i) => tab.addEventListener('click', () => go(i)));
  section.addEventListener('keydown', event => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    if (!event.target.closest('.history-tabs, .history-next')) return;
    event.preventDefault();
    go(current + (event.key === 'ArrowRight' ? 1 : -1));
    const tab = tabs[current];
    if (event.target.closest('.history-tabs')) tab.focus();
  });

  // Etiqueta "Avançar" que segue o mouse; some sobre os botões, onde o cursor já indica a ação.
  let frame = 0;
  let x = 0;
  let y = 0;
  stage.addEventListener('pointermove', event => {
    if (event.pointerType !== 'mouse' || !finePointer.matches) return;
    const rect = stage.getBoundingClientRect();
    x = event.clientX - rect.left + 18;
    y = event.clientY - rect.top + 18;
    stage.classList.toggle('is-hovering', !event.target.closest('button'));
    if (!frame) frame = requestAnimationFrame(() => { frame = 0; cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`; });
  });
  stage.addEventListener('pointerleave', () => stage.classList.remove('is-hovering'));
  stage.addEventListener('pointerdown', () => stage.classList.add('is-pressed'));
  addEventListener('pointerup', () => stage.classList.remove('is-pressed'));
})();

// Caixa da abertura: o 1º clique abre a tampa; cada clique seguinte solta uma foto, que sobe de dentro da caixa
// e entra no leque; depois da última, o clique seguinte recolhe as fotos e fecha. As fotos passam entre as duas
// camadas da caixa (ver sobre.css) e só baixam quando a caixa abre. Nada roda sem interação.
(() => {
  'use strict';
  const art = document.querySelector('.box-art');
  if (!art) return;
  const list = art.querySelector('.box-photos');
  const cards = [...list.children];
  const button = art.querySelector('.box-control');
  const label = button.querySelector('.box-control-label');
  const icon = button.querySelector('.box-control-icon');
  const status = art.querySelector('.box-status');
  const live = art.querySelector('.box-live');
  const rim = art.querySelector('.bx-rim');
  const walls = [...art.querySelectorAll('.box-front .bx')];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const tagline = status.textContent;
  const total = cards.length;
  // Durações em ms, iguais às transições de sobre.css.
  const OPEN = 750, RISE = 380, SETTLE = 600, GATHER = 420, SINK = 420, CLOSE = 700;
  // Cada foto sai um pouco torta, como posta à mão (graus).
  const HAND = [-1.6, 1.2, -0.7, 1.9, -1.1];
  const TEXT = {
    closed: ['Abrir a caixa', '↗'],
    first: ['Mostrar uma foto', '↑'],
    next: ['Mostrar outra foto', '↑'],
    last: ['Guardar as fotos', '↓'],
    closing: ['Guardando as fotos…', '↓'],
  };
  let state = 'closed';
  let out = 0;
  let pending = false;
  let lastOut = 0;
  let geo = null;

  // Com movimento reduzido, cada etapa acontece na hora.
  const later = (ms, fn) => (reduced.matches ? fn() : setTimeout(fn, ms));
  const fotos = n => (n === 1 ? '1 foto' : `${n} fotos`);
  const say = text => { live.textContent = text; };
  // Exibir o cartão faz a foto começar a baixar (a imagem é lazy).
  const arm = i => cards[i]?.classList.add('is-armed');

  function place(card, x, y, r, k) {
    card.style.setProperty('--x', `${x.toFixed(1)}px`);
    card.style.setProperty('--y', `${y.toFixed(1)}px`);
    card.style.setProperty('--r', `${r.toFixed(2)}deg`);
    card.style.setProperty('--k', k.toFixed(3));
  }

  function render() {
    art.dataset.state = state;
    art.dataset.out = String(out);
    const key = state === 'closed' ? 'closed' : state === 'closing' ? 'closing' : out === total ? 'last' : out ? 'next' : 'first';
    [label.textContent, icon.textContent] = TEXT[key];
    if (state === 'closing') button.setAttribute('aria-disabled', 'true');
    else button.removeAttribute('aria-disabled');
    status.textContent = state === 'closed' ? tagline : out && state !== 'closing' ? `Foto ${out} de ${total}` : `${fotos(total)} na caixa`;
  }

  // Medidas com a caixa aberta e parada, relativas à arte: centro e topo da boca, e a faixa coberta pelas paredes.
  function measure() {
    const a = art.getBoundingClientRect();
    const m = rim.getBoundingClientRect();
    const w = walls.map(el => el.getBoundingClientRect());
    geo = {
      width: a.width,
      x: (m.left + m.right) / 2 - a.left,
      mouth: m.top - a.top,
      top: Math.min(...w.map(r => r.top)) - a.top,
      bottom: Math.max(...w.map(r => r.bottom)) - a.top,
    };
  }
  // Ponto de partida: pequena e escondida atrás das paredes da frente.
  const start = card => ({ x: geo.x, y: geo.top + (geo.bottom - geo.top) * 0.55, k: Math.min(0.45, (geo.bottom - geo.top) * 0.6 / card.offsetHeight) });
  // Logo acima das paredes: a foto acabou de sair da caixa.
  const above = card => ({ x: geo.x, y: geo.top - card.offsetHeight * 0.4 - 8, k: 0.8 });

  // Leque das fotos que já saíram, acima da boca: a mais nova fica na ponta direita e por cima.
  function layout() {
    const shown = cards.filter(card => card.classList.contains('is-out'));
    const n = shown.length;
    if (!n) return;
    const pad = 8;
    const w = shown[0].offsetWidth;
    const h = Math.max(...shown.map(card => card.offsetHeight));
    const half = (n - 1) / 2;
    const turn = half ? Math.min(7, 24 / half) : 0;                  // graus entre vizinhas
    const edge = (half * turn + 2) * Math.PI / 180;
    const reach = w / 2 * Math.cos(edge) + h / 2 * Math.sin(edge);   // meia largura da foto da ponta, girada
    // Distância entre vizinhas: com poucas fotos, até 62% da largura (as de trás continuam à vista);
    // com muitas, o que couber na arte.
    const gap = half ? Math.max(0, Math.min(w * 0.62, (Math.min(geo.x, geo.width - geo.x) - pad - reach) / half)) : 0;
    const scale = Math.max(0.85, Math.min(1, (geo.mouth - 12 - pad) / (h + 8)));
    const top = geo.mouth - 12 - h * scale / 2;                      // a boca da caixa fica sempre à vista
    shown.forEach((card, i) => {
      const u = i - half;
      const r = u * turn + HAND[i % HAND.length];
      const rad = Math.abs(r) * Math.PI / 180;
      const vReach = (w / 2 * Math.sin(rad) + h / 2 * Math.cos(rad)) * scale;
      place(card, geo.x + u * gap, Math.max(pad + vReach, top + (u * gap) ** 2 / (w * 6)), r, scale);
    });
  }

  function open() {
    state = 'opening';
    list.hidden = false;
    arm(0);
    arm(1);
    art.classList.add('is-open', 'was-opened');
    render();
    say(`Caixa aberta. ${fotos(total)} dentro.`);
    later(OPEN, () => {
      state = 'open';
      measure();
      render();
      if (pending) { pending = false; step(); }
    });
  }

  function release() {
    const index = out;
    const card = cards[index];
    out += 1;
    lastOut = performance.now();
    arm(out);
    const from = start(card);
    const to = above(card);
    card.classList.add('is-snap');
    place(card, from.x, from.y, 0, from.k);
    card.getBoundingClientRect();                                   // aplica o ponto de partida antes de subir
    card.classList.remove('is-snap');
    card.classList.add('is-rising');
    place(card, to.x, to.y, HAND[index % HAND.length] / 2, to.k);
    later(RISE, () => {
      if (!card.classList.contains('is-rising')) return;
      card.classList.replace('is-rising', 'is-out');
      card.style.zIndex = String(10 + index);
      layout();
    });
    render();
    say(`Foto ${out} de ${total}: ${card.querySelector('img').alt}.${out === total ? ' Era a última; o botão agora guarda as fotos.' : ''}`);
  }

  function gather() {
    state = 'closing';
    render();
    const shown = cards.slice(0, out);
    shown.forEach((card, i) => {
      const to = above(card);
      card.style.zIndex = '';
      card.classList.add('is-gathering');
      place(card, to.x, to.y, HAND[i % HAND.length], to.k);
    });
    later(GATHER, () => {
      shown.forEach(card => { const from = start(card); place(card, from.x, from.y, 0, from.k); });   // afundam atrás das paredes
      later(SINK, () => {
        shown.forEach(card => card.classList.remove('is-out', 'is-rising', 'is-gathering'));
        out = 0;
        art.classList.remove('is-open');
        later(CLOSE, () => {
          list.hidden = true;
          state = 'closed';
          render();
          say('Fotos guardadas. A caixa está fechada.');
        });
      });
    });
  }

  function step() {
    if (state === 'opening') { pending = true; return; }             // vale quando a tampa terminar de abrir
    if (state === 'closing') return;
    if (state === 'closed') { open(); return; }
    if (out < total) { release(); return; }                          // subidas podem se sobrepor
    if (performance.now() - lastOut < SETTLE) return;                // quem clica rápido não guarda sem querer
    gather();
  }

  // Clique em qualquer ponto da arte avança, como no palco da história; o botão é o caminho pelo teclado.
  art.addEventListener('click', event => { if (!event.target.closest('button, a')) step(); });
  button.addEventListener('click', step);
  let frame = 0;
  addEventListener('resize', () => {
    if (state !== 'open' || frame) return;
    frame = requestAnimationFrame(() => { frame = 0; measure(); layout(); });
  }, { passive: true });
})();
