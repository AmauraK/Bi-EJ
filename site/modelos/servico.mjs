// Modelo das páginas de serviço (/plano-de-negocios/, /consultoria-*/).
import { esc, contatoHref } from '../layout.mjs';
import { cases as todosCases, etapas, depoimentoProjeto, solucoes } from '../conteudo/solucoes.mjs';

/**
 * @param {object} s     item de site/conteudo/solucoes.mjs
 * @param {object} ctx
 * @param {(url: string) => boolean} ctx.existe  indica se a URL já tem página no site novo.
 */
export function servico(s, { existe }) {
  const contato = contatoHref(s.chave);

  const quando = s.quandoFazSentido
    .map(item => `<article class="svc-glass reveal"><h3>${esc(item.titulo)}</h3><p>${esc(item.texto)}</p></article>`)
    .join('\n        ');

  const escopo = s.escopo.map(item => `<li>${esc(item)}</li>`).join('');

  const cases = s.cases.map(chave => {
    const c = todosCases[chave];
    if (!c) throw new Error(`Case "${chave}" não existe em solucoes.mjs (${s.url})`);
    // O link só aparece quando a página do case já existir no site novo.
    const titulo = existe(c.url) ? `<a href="${c.url}">${esc(c.titulo)}</a>` : esc(c.titulo);
    return `<article class="svc-case reveal">
          <p class="svc-case-segment">${esc(c.segmento)}</p>
          <h3>${titulo}</h3>
          <dl><div><dt>Desafio</dt><dd>${esc(c.problema)}</dd></div><div><dt>Solução</dt><dd>${esc(c.solucao)}</dd></div></dl>
          <p class="svc-case-result"><span aria-hidden="true">↗</span>${esc(c.destaque)}</p>
        </article>`;
  }).join('\n        ');

  const secaoCases = s.cases.length ? `
    <section class="svc-cases section-pad" aria-labelledby="cases-title">
      <h2 id="cases-title" class="reveal">Histórias que já<br><span>construímos.</span></h2>
      <div class="svc-case-grid">
        ${cases}
      </div>
    </section>` : '';

  const passos = etapas
    .map((e, i) => `<li class="reveal"><span class="svc-step-n">${String(i + 1).padStart(2, '0')}</span><p class="svc-step-name">${esc(e.nome)}</p><h3>${esc(e.titulo)}</h3><p>${esc(e.texto)}</p></li>`)
    .join('\n        ');

  const outras = solucoes
    .filter(o => o.url !== s.url)
    .map(o => `<li><a href="${o.url}"><span class="svc-other-challenge">${esc(o.desafio)}</span><span class="svc-other-area">${esc(o.area)}</span><span aria-hidden="true">↗</span></a></li>`)
    .join('\n        ');

  return `
  <main id="conteudo" class="svc">
    <section class="svc-hero section-pad" aria-labelledby="svc-title">
      <div class="svc-hero-copy">
        <nav class="svc-trail" aria-label="Você está em"><a href="/#solucoes">Soluções</a><span aria-hidden="true">/</span><span aria-current="page">${esc(s.area)}</span></nav>
        <h1 id="svc-title"><span class="svc-h1-area">${esc(s.area)}</span>${esc(s.desafio)}<span class="svc-dot">.</span></h1>
        <p class="svc-lead">${esc(s.lead)}</p>
        <p class="svc-description">${esc(s.descricao)}</p>
        <div class="svc-actions">
          <a class="button button-dark" href="${contato}">Conversar sobre este desafio <span aria-hidden="true">↗</span></a>
          <a class="svc-anchor" href="#escopo">Ver o que pode entrar no projeto <span aria-hidden="true">↓</span></a>
        </div>
      </div>
      <div class="svc-art" aria-hidden="true">
        <div class="svc-grid"></div>
        <div class="svc-orbit"></div>
        <div class="svc-cube"><i class="svc-face svc-front"><span>${esc(s.simbolo)}</span></i><i class="svc-face svc-back"></i><i class="svc-face svc-right"><span>${esc(s.categoria)}</span></i><i class="svc-face svc-left"></i><i class="svc-face svc-top"></i><i class="svc-face svc-bottom"></i></div>
        <p class="svc-caption">${esc(s.legenda)}</p>
      </div>
    </section>

    <section class="svc-fit section-pad" aria-labelledby="fit-title">
      <h2 id="fit-title" class="reveal">Quando faz<br><span>sentido.</span></h2>
      <div class="svc-fit-cards">
        ${quando}
      </div>
    </section>

    <section class="svc-scope section-pad" id="escopo" aria-labelledby="scope-title">
      <div class="svc-scope-head reveal">
        <h2 id="scope-title">O que pode entrar<br><span>no projeto.</span></h2>
        <p>Estes são os serviços mais pedidos nesta área. O escopo de cada projeto é definido na proposta, depois de entendermos o seu momento.</p>
      </div>
      <ul class="svc-scope-list">${escopo}</ul>
    </section>
${secaoCases}
    <section class="svc-process section-pad" aria-labelledby="process-title">
      <div class="svc-process-head">
        <h2 id="process-title" class="reveal">Como o projeto<br><span>acontece.</span></h2>
        <figure class="svc-quote reveal">
          <blockquote><p>“${esc(depoimentoProjeto.texto)}”</p></blockquote>
          <figcaption><strong>${esc(depoimentoProjeto.autor)}</strong>${esc(depoimentoProjeto.cargo)}</figcaption>
        </figure>
      </div>
      <ol class="svc-steps">
        ${passos}
      </ol>
    </section>

    <section class="svc-cta section-pad" aria-labelledby="cta-title">
      <h2 id="cta-title" class="reveal">${esc(s.chamada)}</h2>
      <div class="svc-cta-copy reveal">
        <p>Conte um pouco sobre o seu momento. O desafio “${esc(s.desafio)}” já chega selecionado no formulário.</p>
        <a class="button button-dark" href="${contato}">Começar a conversa <span aria-hidden="true">↗</span></a>
      </div>
    </section>

    <nav class="svc-others section-pad" aria-labelledby="others-title">
      <h2 id="others-title">Outras soluções</h2>
      <ul>
        ${outras}
      </ul>
    </nav>
  </main>`;
}
