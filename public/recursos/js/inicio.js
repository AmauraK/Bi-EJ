(() => {
  'use strict';
  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];
  const root = document.documentElement;
  root.classList.add('js');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const desktop = matchMedia('(min-width: 761px)');
  const immersiveScroll = matchMedia('(min-width: 761px) and (min-height: 760px)');
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  let paused = reducedMotion.matches;
  let framePending = false;
  let pointerX = 0;
  let pointerY = 0;
  let activeStep = 0;
  let solutionLayoutDirty = true;
  let scrollMotion = null;
  function stopScrollMotion() {
    if (scrollMotion) cancelAnimationFrame(scrollMotion.frame);
    scrollMotion = null;
  }
  function animateScroll(time) {
    const motion = scrollMotion;
    if (!motion) return;
    let position;
    let finished;
    if (motion.mode === 'wheel') {
      // A busy paint can deliver an RAF timestamp older than the input event.
      const elapsed = Math.max(0, Math.min(40, time - motion.lastTime));
      position = scrollY + (motion.target - scrollY) * (1 - Math.exp(-elapsed / 95));
      finished = Math.abs(motion.target - position) < 3;
      motion.lastTime = time;
    } else {
      const progress = Math.max(0, Math.min(1, (time - motion.startTime) / motion.duration));
      const eased = progress < .5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 3 / 2;
      position = motion.from + (motion.target - motion.from) * eased;
      finished = progress === 1;
    }
    scrollTo({top: finished ? motion.target : position, behavior:'instant'});
    if (finished) stopScrollMotion();
    else motion.frame = requestAnimationFrame(animateScroll);
  }
  function smoothScrollTo(top) {
    stopScrollMotion();
    const target = clamp(top, 0, Math.max(0, root.scrollHeight - innerHeight));
    if (paused || Math.abs(target - scrollY) < 2) { scrollTo({top:target,behavior:'instant'}); return; }
    // Stop any native anchor animation before starting a cancellable transition.
    scrollTo({top:scrollY,behavior:'instant'});
    scrollMotion = {mode:'navigation',from:scrollY,target,startTime:performance.now(),duration:clamp(500 + Math.sqrt(Math.abs(target - scrollY)) * 12, 650, 1300),frame:0};
    scrollMotion.frame = requestAnimationFrame(animateScroll);
  }
  const clamp = (n, min = 0, max = 1) => Math.max(min, Math.min(n, max));
  const method = $('.method');
  const hero = $('.hero');
  const art = $('.hero-art');
  const strip = $('.manifesto-strip');
  const motionButton = $('.motion-toggle');

  const clientsStrip = $('.clients-strip');
  const clientsTrack = $('.clients-track');
  const clientsToggle = $('.clients-toggle');
  const clientsCopy = $('.clients-group').cloneNode(true);
  clientsCopy.setAttribute('aria-hidden', 'true');
  clientsCopy.inert = true;
  clientsTrack.append(clientsCopy);
  clientsStrip.classList.add('clients-ready');
  clientsToggle.addEventListener('click', () => {
    const stopped = clientsStrip.classList.toggle('is-paused');
    clientsToggle.setAttribute('aria-pressed', String(stopped));
    const label = stopped ? 'Retomar faixa de clientes' : 'Pausar faixa de clientes';
    clientsToggle.setAttribute('aria-label', label);
    clientsToggle.title = label;
    $('span', clientsToggle).textContent = stopped ? '▷' : 'Ⅱ';
  });
  if ('IntersectionObserver' in window) {
    const clientsObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => clientsStrip.classList.toggle('is-visible', entry.isIntersecting));
    });
    clientsObserver.observe(clientsStrip);
  } else clientsStrip.classList.add('is-visible');


  const indicators = $('.indicators');
  const indicatorStage = $('.indicator-stage');
  const indicatorTrack = $('.indicator-track');
  const indicatorCards = $$('.indicator-card');
  let indicatorLayoutDirty = true;
  let indicatorDistance = 0;
  let indicatorTop = 100;
  let indicatorStep = 0;
  let indicatorPointer = null;
  function measureIndicators() {
    indicatorLayoutDirty = false;
    indicatorTop = $('.header').offsetHeight;
    indicators.style.setProperty('--indicator-top', indicatorTop + 'px');
    indicators.classList.toggle('is-traveling', !paused);
    indicatorPointer = null;
    indicatorCards.forEach(card => {
      card.style.setProperty('--card-scale', 1);
      card.style.setProperty('--card-angle', '0deg');
      card.style.setProperty('--shine-x', '25%');
      card.style.setProperty('--shine-y', '15%');
    });
    indicators.style.setProperty('--indicator-x', '0px');
    indicators.style.setProperty('--ambient-x', '0px');
    if (paused) return;
    indicators.style.setProperty('--indicator-heading-height', $('.indicator-heading').offsetHeight + 'px');
    indicators.style.setProperty('--clients-height', clientsStrip.offsetHeight + 'px');
    const fits = indicatorCards.every(card => card.offsetHeight + 48 <= $('.indicator-window').clientHeight);
    indicators.classList.toggle('is-traveling', fits);
    if (!fits) return;
    indicatorDistance = Math.max(0, indicatorTrack.scrollWidth - indicatorStage.clientWidth);
    indicatorStep = indicatorCards[0].offsetWidth + parseFloat(getComputedStyle(indicatorTrack).gap);
    indicators.style.setProperty('--indicator-distance', indicatorDistance + 'px');
  }
  function updateIndicators() {
    if (indicatorLayoutDirty) measureIndicators();
    if (!indicators.classList.contains('is-traveling')) return;
    const rect = indicators.getBoundingClientRect();
    if (rect.top > innerHeight || rect.bottom < 0) return;
    const progress = clamp((indicatorTop - rect.top) / Math.max(1, indicatorDistance));
    // Native vertical scroll controls every frame, with short reading holds.
    const travel = clamp((progress - .08) / .84) * indicatorDistance;
    indicators.style.setProperty('--indicator-x', -travel + 'px');
    indicators.style.setProperty('--ambient-x', (-travel * .12) + 'px');
    indicatorCards.forEach((card, i) => {
      const distance = clamp((i * indicatorStep - travel) / Math.max(1, indicatorStep), -1, 1);
      card.style.setProperty('--card-scale', 1 - Math.abs(distance) * .06);
      card.style.setProperty('--card-angle', distance * 4 + 'deg');
      const pointer = indicatorPointer?.card === card ? indicatorPointer : null;
      card.style.setProperty('--shine-x', (pointer ? pointer.x : 25) + '%');
      card.style.setProperty('--shine-y', (pointer ? pointer.y : 15) + '%');
    });
  }
  indicators.addEventListener('pointermove', event => {
    if (paused || !finePointer.matches || !indicators.classList.contains('is-traveling')) return;
    const card = event.target.closest('.indicator-card');
    if (!card) { indicatorPointer = null; scheduleRender(); return; }
    const rect = card.getBoundingClientRect();
    indicatorPointer = {card, x:clamp((event.clientX - rect.left) / rect.width) * 100, y:clamp((event.clientY - rect.top) / rect.height) * 100};
    scheduleRender();
  });
  indicators.addEventListener('pointerleave', () => { indicatorPointer = null; scheduleRender(); });


  const steps = [
    { title: 'Antes das respostas,\nas perguntas certas.', text: 'Uma conversa para entender seu momento, seus objetivos e os desafios que precisam de atenção.' },
    { title: 'Seu contexto.\nNossa perspectiva.', text: 'Conectamos o que aprendemos sobre o seu negócio ao conhecimento e às ferramentas que podem ajudar a transformá-lo.' },
    { title: 'Da investigação\nàs escolhas concretas.', text: 'Analisamos possibilidades, discutimos caminhos e construímos entregas alinhadas aos objetivos do projeto.' },
    { title: 'O projeto termina.\nO movimento continua.', text: 'Apresentamos as entregas e as recomendações para que sua equipe tenha clareza sobre os próximos passos.' },
  ];
  function setStep(index) {
    activeStep = index;
    const data = steps[index];
    $('.method-big-number').textContent = String(index + 1).padStart(2, '0');
    $('.method-card h3').replaceChildren(...data.title.split('\n').flatMap((line, i) => i ? [document.createElement('br'), document.createTextNode(line)] : [document.createTextNode(line)]));
    $('.method-card-copy>p:last-child').textContent = data.text;
    $$('.method-controls button').forEach((button, i) => {
      button.classList.toggle('active', i === index);
      button.setAttribute('aria-pressed', String(i === index));
    });
  }
  function render() {
    framePending = false;
    const scrollable = root.scrollHeight - innerHeight;
    root.style.setProperty('--page-progress', scrollable > 0 ? clamp(scrollY / scrollable) : 0);
    updateIndicators();
    updateSolutionScroll();
    if (paused) return;
    const heroRect = hero.getBoundingClientRect();
    if (heroRect.bottom > 0) {
      root.style.setProperty('--hero-scroll', clamp(-heroRect.top / heroRect.height));
      root.style.setProperty('--mx', pointerX.toFixed(3));
      root.style.setProperty('--my', pointerY.toFixed(3));
    }
    const stripRect = strip.getBoundingClientRect();
    if (stripRect.top < innerHeight && stripRect.bottom > 0) {
      strip.style.setProperty('--strip-x', `${-clamp((innerHeight - stripRect.top) / (innerHeight + stripRect.height)) * 230}px`);
    }
    const rect = method.getBoundingClientRect();
    if (immersiveScroll.matches && rect.top < innerHeight && rect.bottom > 0) {
      const progress = clamp((100 - rect.top) / Math.max(1, rect.height - innerHeight + 100));
      const index = Math.min(3, Math.floor(progress * 4));
      if (index !== activeStep) setStep(index);
      method.style.setProperty('--method-progress', Math.max(.015, progress));
      method.style.setProperty('--method-angle', `${progress * 180}deg`);
    }
  }
  function scheduleRender() {
    if (!framePending) { framePending = true; requestAnimationFrame(render); }
  }
  addEventListener('scroll', scheduleRender, { passive: true });
  addEventListener('resize', () => { stopScrollMotion(); solutionLayoutDirty = true; indicatorLayoutDirty = true; scheduleRender(); }, { passive: true });
  addEventListener('pointerdown', stopScrollMotion, {passive:true});
  addEventListener('touchstart', stopScrollMotion, {passive:true});
  addEventListener('keydown', event => {
    if (['ArrowUp','ArrowDown','PageUp','PageDown','Home','End',' ','Escape','Tab'].includes(event.key)) stopScrollMotion();
  }, {capture:true});
  document.addEventListener('visibilitychange', () => { if (document.hidden) stopScrollMotion(); });
  art.addEventListener('pointermove', event => {
    if (paused || !finePointer.matches) return;
    const rect = art.getBoundingClientRect();
    pointerX = clamp((event.clientX - rect.left) / rect.width * 2 - 1, -1, 1);
    pointerY = clamp((event.clientY - rect.top) / rect.height * 2 - 1, -1, 1);
    scheduleRender();
  });
  art.addEventListener('pointerleave', () => { pointerX = 0; pointerY = 0; scheduleRender(); });
  function setMotionState(value) {
    stopScrollMotion();
    paused = value;
    indicatorLayoutDirty = true;
    solutionLayoutDirty = true;
    document.body.classList.toggle('motion-paused', paused);
    root.style.scrollBehavior = paused ? 'auto' : '';
    motionButton.setAttribute('aria-pressed', String(paused));
    motionButton.setAttribute('aria-label', paused ? 'Ativar animações' : 'Pausar animações');
    motionButton.textContent = paused ? '▷' : 'Ⅱ';
    if (paused) {
      root.style.setProperty('--mx', 0);
      root.style.setProperty('--my', 0);
      root.style.setProperty('--hero-scroll', 0);
      $$('.magnetic').forEach(button => button.style.transform = '');
    }
    scheduleRender();
  }
  motionButton.addEventListener('click', () => setMotionState(!paused));
  reducedMotion.addEventListener('change', event => setMotionState(event.matches));
  setMotionState(paused);

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    }), { threshold: .08 });
    $$('.reveal').forEach(element => observer.observe(element));
  } else $$('.reveal').forEach(element => element.classList.add('visible'));

  $$('.magnetic').forEach(button => {
    button.addEventListener('pointermove', event => {
      if (paused || !finePointer.matches) return;
      const rect = button.getBoundingClientRect();
      button.style.transform = `translate(${(event.clientX - rect.left - rect.width / 2) * .08}px, ${(event.clientY - rect.top - rect.height / 2) * .12}px)`;
    });
    button.addEventListener('pointerleave', () => button.style.transform = '');
    button.addEventListener('blur', () => button.style.transform = '');
  });

  // O menu fica em navegacao.js, compartilhado com as outras páginas.
  desktop.addEventListener('change', scheduleRender);

  const solutions = {
    estrategia: { category: 'CONSULTORIA ESTRATÉGICA', title: 'Uma boa ideia.\nUm caminho para acontecer.', description: 'Transforme possibilidades em um plano consistente, com prioridades claras e uma visão do próximo passo.', deliverables: ['Plano de negócios', 'Planejamento estratégico'], caption: 'DO POTENCIAL À DIREÇÃO.', symbol: '↗' },
    marketing: { category: 'CONSULTORIA MERCADOLÓGICA', title: 'Novos mercados.\nConexões que fazem sentido.', description: 'Entenda quem são seus clientes, explore o cenário competitivo e descubra oportunidades para posicionar seu negócio.', deliverables: ['Pesquisa de mercado', 'Análise de viabilidade', 'Plano de marketing'], caption: 'DE NOVOS OLHARES A NOVOS MERCADOS.', symbol: '◎' },
    financas: { category: 'CONSULTORIA FINANCEIRA', title: 'Números claros.\nDecisões bem fundamentadas.', description: 'Enxergue a realidade financeira do negócio e avalie cenários para planejar o futuro com mais clareza.', deliverables: ['Valuation', 'Análise financeira', 'Projeções financeiras'], caption: 'DOS NÚMEROS À CLAREZA.', symbol: '↗' },
    gestao: { category: 'CONSULTORIA EM GESTÃO', title: 'Menos obstáculos.\nMais espaço para crescer.', description: 'Entenda como sua operação funciona e conecte processos e pessoas a uma forma mais eficiente de trabalhar.', deliverables: ['Mapeamento de processos', 'Cultura organizacional', 'Redução de custos'], caption: 'DE PROCESSOS A POSSIBILIDADES.', symbol: '⇄' },
    dados: { category: 'DATA SCIENCE', title: 'Dados dispersos.\nRespostas conectadas.', description: 'Explore os dados do seu negócio e transforme informação em análises que apoiam suas próximas decisões.', deliverables: ['Análise de dados', 'Visualização de informações'], caption: 'DA INFORMAÇÃO À PERSPECTIVA.', symbol: '✳' },
  };
  const tabs = $$('[data-solution]');
  const explorer = $('.solution-explorer');
  const stack = $('.solution-stack');
  const cardTemplate = $('.solution-panel').cloneNode(true);
  const positions = [];
  let activeSolution = -1;
  let solutionTop = 100;
  let solutionHeaderStep = 64;
  stack.replaceChildren();
  const cards = tabs.map((button, index) => {
    const key = button.dataset.solution;
    const data = solutions[key];
    const card = cardTemplate.cloneNode(true);
    card.id = `solution-panel-${key}`;
    card.dataset.solutionCard = key;
    card.style.setProperty('--card-index', index);
    $$('[id]', card).forEach(element => { element.id += `-${key}`; });
    card.setAttribute('aria-labelledby', `solution-title-${key}`);
    $('.solution-tab-caption>span', card).textContent = `0${index + 1} / ${$('small', button).textContent.toUpperCase()}`;
    $('.solution-content .eyebrow', card).textContent = data.category;
    $('h3', card).textContent = button.children[1].firstChild.textContent.trim() + '.';
    $('.solution-lead', card).textContent = data.title.replace('\n', ' ');
    $(`#solution-description-${key}`, card).textContent = data.description;
    $('.deliverables', card).replaceChildren(...data.deliverables.map(text => { const li = document.createElement('li'); li.textContent = text; return li; }));
    $('.solution-visual', card).dataset.visual = key;
    $('.visual-caption', card).textContent = data.caption;
    $('.visual-symbol', card).textContent = data.symbol;
    $('.visual-index', card).textContent = `0${index + 1} / 05`;
    $('.solution-page-number', card).textContent = `0${index + 1} / 05`;
    const next = $('.solution-next', card);
    next.firstChild.textContent = index < tabs.length - 1 ? `A seguir: ${$('small', tabs[index + 1]).textContent} ` : 'Conheça nosso jeito de fazer ';
    next.addEventListener('click', () => {
      if (index < cards.length - 1) navigateSolution(index + 1);
      else smoothScrollTo(scrollY + method.getBoundingClientRect().top - solutionTop);
    });
    $('.text-link', card).addEventListener('click', () => { $('#challenge').value = key; });
    $('.solution-page-link', card).href = button.dataset.page;
    card.addEventListener('focusin', () => {
      // Keyboard focus must reveal a card that is covered by a later card.
      if (index < activeSolution) navigateSolution(index, 'instant');
    });
    const position = document.createElement('span');
    position.className = 'solution-position';
    position.setAttribute('aria-hidden', 'true');
    positions.push(position);
    stack.append(position, card);
    return card;
  });
  function markSolution(index) {
    if (index === activeSolution) return;
    activeSolution = index;
    tabs.forEach((tab, i) => tab.setAttribute('aria-current', String(i === index)));
    $('.solution-tabs').style.setProperty('--active-solution', index);
    $('.solution-counter').textContent = `0${index + 1} / 05`;
  }
  function measureSolutions() {
    solutionLayoutDirty = false;
    solutionTop = $('.header').offsetHeight;
    explorer.style.setProperty('--solutions-top', `${solutionTop}px`);
    explorer.classList.remove('compact-stack');
    explorer.classList.toggle('can-stack', !paused);
    solutionHeaderStep = parseFloat(getComputedStyle(explorer).getPropertyValue('--header-step'));
    const needsSpace = !paused && cards.some((card, i) => card.offsetHeight + solutionTop + i * solutionHeaderStep > innerHeight + 2);
    explorer.classList.toggle('compact-stack', needsSpace);
    solutionHeaderStep = parseFloat(getComputedStyle(explorer).getPropertyValue('--header-step'));
    cards.forEach((card, i) => {
      const titleTop = solutionTop + i * solutionHeaderStep;
      const pinTop = Math.min(titleTop, innerHeight - card.offsetHeight);
      // Tall cards finish scrolling their body before pinning; their title stays
      // in the pile. Never disable every chapter because one is taller.
      card.style.setProperty('--pin-top', `${pinTop}px`);
      card.classList.toggle('has-long-content', !paused && pinTop < titleTop - 2);
    });
  }
  function solutionOffset(index) {
    return solutionTop + (explorer.classList.contains('can-stack') ? index * solutionHeaderStep : 0);
  }
  function updateSolutionScroll() {
    if (solutionLayoutDirty) measureSolutions();
    const rect = explorer.getBoundingClientRect();
    const navigation = $('.solution-navigation');
    const visible = rect.top < innerHeight * .65 && rect.bottom > innerHeight * .45;
    navigation.classList.toggle('is-visible', visible);
    navigation.inert = !visible;
    navigation.setAttribute('aria-hidden', String(!visible));
    if (rect.top > innerHeight || rect.bottom < 0) return;
    let index = 0;
    const tops = positions.map(position => position.getBoundingClientRect().top);
    tops.forEach((top, i) => {
      const offset = solutionOffset(i);
      const threshold = offset + (innerHeight - offset) * .4;
      if (top <= threshold) index = i;
    });
    // A small buffer prevents the selected chapter from flickering at a boundary.
    const candidateOffset = solutionOffset(index);
    const activeOffset = solutionOffset(Math.max(0, activeSolution));
    if (index > activeSolution && tops[index] > candidateOffset + (innerHeight - candidateOffset) * .36) index = Math.max(0, activeSolution);
    if (index < activeSolution && tops[activeSolution] < activeOffset + (innerHeight - activeOffset) * .44) index = activeSolution;
    markSolution(index);
    const animated = !paused && explorer.classList.contains('can-stack');
    cards.forEach((card, i) => {
      const covered = animated && i < cards.length - 1 ? clamp((innerHeight - tops[i + 1]) / (innerHeight - solutionOffset(i + 1))) : 0;
      const eased = covered * covered * (3 - 2 * covered);
      const offset = solutionOffset(i);
      const entering = animated ? clamp((tops[i] - offset) / (innerHeight - offset)) : 0;
      if (card.classList.contains('has-long-content')) {
        const titleTop = offset + Math.min(0, rect.bottom - innerHeight);
        card.style.setProperty('--title-top', `${titleTop}px`);
        card.style.setProperty('--crop-top', `${Math.max(0, titleTop - card.getBoundingClientRect().top)}px`);
      }
      card.style.setProperty('--content-scale', (1 - eased * .025).toFixed(4));
      card.style.setProperty('--content-shift', `${(-eased * 12).toFixed(2)}px`);
      card.style.setProperty('--content-opacity', (1 - eased * .25).toFixed(3));
      card.classList.toggle('is-covered', animated && covered >= 1);
      card.classList.toggle('is-transitioning', animated && (covered > 0 && covered < 1 || entering > 0 && entering < 1));
    });
  }
  function navigateSolution(index, behavior = paused ? 'instant' : 'smooth') {
    if (solutionLayoutDirty) measureSolutions();
    const target = scrollY + positions[index].getBoundingClientRect().top - solutionOffset(index);
    if (behavior === 'smooth') smoothScrollTo(target);
    else { stopScrollMotion(); scrollTo({top:target,behavior:'instant'}); }
  }
  function selectSolution(button) {
    const index = tabs.indexOf(button);
    $('#challenge').value = button.dataset.solution;
    navigateSolution(index);
  }
  tabs.forEach((button, index) => {
    button.addEventListener('click', () => selectSolution(button));
    button.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next !== undefined) { event.preventDefault(); tabs[next].focus({ preventScroll: true }); selectSolution(tabs[next]); }
    });
  });
  markSolution(0);
  addEventListener('wheel', event => {
    const amount = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? innerHeight : 1);
    const highResolution = event.deltaMode === 0 && Math.abs(event.deltaY) < 50;
    if (paused || !finePointer.matches || event.ctrlKey || event.metaKey || event.shiftKey || highResolution || Math.abs(event.deltaX) > Math.abs(event.deltaY) || !explorer.classList.contains('can-stack') || document.body.classList.contains('modal-open') || event.target.closest('input,select,textarea,[contenteditable],dialog')) {
      stopScrollMotion(); return;
    }
    const rect = explorer.getBoundingClientRect();
    if (rect.top > innerHeight * .65 || rect.bottom < innerHeight * .45 || !event.cancelable) { stopScrollMotion(); return; }
    event.preventDefault();
    if (scrollMotion?.mode !== 'wheel') {
      stopScrollMotion();
      scrollTo({top:scrollY,behavior:'instant'});
      scrollMotion = {mode:'wheel',target:scrollY,lastTime:performance.now(),frame:0};
      scrollMotion.frame = requestAnimationFrame(animateScroll);
    }
    // Reverse immediately instead of carrying momentum against the user's hand.
    if (Math.sign(amount) !== Math.sign(scrollMotion.target - scrollY)) scrollMotion.target = scrollY;
    scrollMotion.target = clamp(scrollMotion.target + amount, 0, Math.max(0, root.scrollHeight - innerHeight));
  }, {passive:false});
  document.fonts.ready.then(() => { indicatorLayoutDirty = true; solutionLayoutDirty = true; scheduleRender(); });
  $$('.method-controls button').forEach(button => button.addEventListener('click', () => {
    const index = Number(button.dataset.step);
    setStep(index);
    method.style.setProperty('--method-progress', (index + 1) / 4);
    method.style.setProperty('--method-angle', `${index * 50}deg`);
    if (immersiveScroll.matches && !paused) {
      const start = scrollY + method.getBoundingClientRect().top - 100;
      const length = Math.max(1, method.offsetHeight - innerHeight + 100);
      scrollTo({ top: start + length * (index + .4) / 4, behavior: 'smooth' });
    }
  }));

  // A galeria da equipe fica em galeria.js (página /sobre-nos/).
  function openDialog(dialog) { dialog.showModal(); document.body.classList.add('modal-open'); }
  $$('dialog').forEach(dialog => {
    $('.dialog-close', dialog).addEventListener('click', () => dialog.close());
    dialog.addEventListener('close', () => document.body.classList.remove('modal-open'));
    dialog.addEventListener('click', event => {
      const rect = dialog.getBoundingClientRect();
      if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
    });
  });

  $('.contact-form').addEventListener('submit', event => {
    event.preventDefault();
    const name = $('#name').value.trim();
    if (!name) { $('#name').setCustomValidity('Conte como podemos chamar você.'); $('#name').reportValidity(); return; }
    const challenge = $('#challenge').selectedOptions[0].textContent;
    $('#summary-text').textContent = `Nome: ${name}\nE-mail: ${$('#email').value.trim()}\nDesafio: ${challenge}\n\n${$('#message').value.trim() || 'Quero explorar os próximos passos para o meu negócio.'}`;
    $('.copy-status').textContent = '';
    openDialog($('.summary-dialog'));
  });
  $('#name').addEventListener('input', () => $('#name').setCustomValidity(''));
  // Links das páginas de serviço chegam como /?desafio=<chave>#contato.
  const requestedChallenge = new URLSearchParams(location.search).get('desafio');
  if (requestedChallenge && $(`#challenge option[value="${CSS.escape(requestedChallenge)}"]`)) $('#challenge').value = requestedChallenge;
  $('.copy-summary').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText($('#summary-text').textContent);
      $('.copy-status').textContent = 'Resumo copiado. Você pode colar onde preferir.';
    } catch {
      const selection = getSelection();
      const range = document.createRange();
      range.selectNodeContents($('#summary-text'));
      selection.removeAllRanges(); selection.addRange(range);
      $('.copy-status').textContent = 'Resumo selecionado. Use Ctrl+C ou o comando Copiar do seu dispositivo.';
    }
  });
  scheduleRender();
})();
