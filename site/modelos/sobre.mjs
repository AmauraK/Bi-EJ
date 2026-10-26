// Modelo da página Sobre (/sobre-nos/). Reaproveita a abertura e a chamada das páginas de serviço
// (servico.css) e acrescenta os blocos próprios (sobre.css e recursos/js/sobre.js).
import { readdirSync } from 'node:fs';
import { esc, contatoHref } from '../layout.mjs';

// [trecho] → <mark>trecho</mark>, depois de escapar o texto.
const destacar = texto => esc(texto).replace(/\[([^\]]+)\]/g, '<mark>$1</mark>');

const fotos = id => [480, 960, 1600, 2400].map(w => `/fotos/img-${id}-${w}.webp ${w}w`).join(', ');

// Versões de uma foto da caixa. Os cartões têm até ~210 px, então bastam as larguras de até 960 px (telas 3x).
// As larguras vêm dos arquivos: scripts/otimizar-fotos.py não amplia fotos pequenas, e nem toda foto terá 960.
const ARQUIVOS_FOTOS = readdirSync(new URL('../../public/fotos/', import.meta.url));
function versoesCaixa(slug) {
  const larguras = ARQUIVOS_FOTOS
    .map(nome => nome.match(/^(.+)-(\d+)\.webp$/))
    .filter(m => m && m[1] === slug)
    .map(m => Number(m[2]))
    .sort((a, b) => a - b);
  if (!larguras.length) throw new Error(`sobre.caixa: /fotos/${slug}-<largura>.webp não existe. Otimize a foto com a skill otimizar-foto.`);
  const usadas = larguras.filter(w => w <= 960);
  if (!usadas.length) usadas.push(larguras[0]);
  return { src: `/fotos/${slug}-${usadas[0]}.webp`, srcset: usadas.map(w => `/fotos/${slug}-${w}.webp ${w}w`).join(', ') };
}

/** @param {object} s  objeto `sobre` de site/conteudo/sobre.mjs */
export function paginaSobre(s) {
  const contato = contatoHref();
  if (!s.caixa?.length) throw new Error('sobre.mjs: a caixa precisa de pelo menos uma foto');
  s.caixa.forEach((f, i) => {
    if (!f.foto || !f.alt || !f.legenda) throw new Error(`sobre.mjs: caixa[${i}] precisa de foto, alt e legenda`);
  });
  const capitulos = s.historia;
  const largura = capitulos[0].rotulo.length;
  if (capitulos.some(c => c.rotulo.length !== largura)) throw new Error('sobre.mjs: os rótulos da história precisam ter o mesmo número de caracteres');

  // Odômetro: uma coluna por caractere, com o caractere de cada capítulo empilhado.
  const colunas = Array.from({ length: largura }, (_, i) =>
    `<span class="odo-col">${capitulos.map(c => `<span>${esc(c.rotulo[i])}</span>`).join('')}</span>`).join('');

  const abas = capitulos
    .map((c, i) => `<button type="button" data-chapter="${i}"${i === 0 ? ' aria-current="step"' : ''}>${esc(c.rotulo)}</button>`)
    .join('');

  const textos = capitulos.map((c, i) => `<article class="chapter${i === 0 ? ' is-active' : ''}" data-chapter="${i}">
            <p class="chapter-when">${esc(c.rotulo)}</p>
            <h3>${esc(c.titulo)}</h3>
            <p>${esc(c.texto)}</p>${c.nota ? `\n            <p class="chapter-note">${esc(c.nota)}</p>` : ''}
          </article>`).join('\n          ');

  const valores = s.valores
    .map((v, i) => `<li class="value reveal" style="--d:${i * 70}ms"><span class="value-block" aria-hidden="true"></span>${esc(v)}</li>`)
    .join('\n          ');

  // Cartões da caixa, na ordem de saída. Ficam ocultos (e sem baixar) até a caixa abrir.
  const fotosCaixa = s.caixa.map(f => {
    const { src, srcset } = versoesCaixa(f.foto);
    const recorte = f.enquadramento ? ` style="--pos:${esc(f.enquadramento)}"` : '';
    return `<li class="box-photo"${recorte}><figure><img src="${src}" srcset="${srcset}" sizes="(max-width: 370px) 132px, (max-width: 760px) 148px, 208px" width="480" height="360" loading="lazy" decoding="async" alt="${esc(f.alt)}"><figcaption><span class="box-legend">${esc(f.legenda)}</span><span aria-hidden="true">✳</span></figcaption></figure></li>`;
  }).join('\n          ');

  const abertura = `
    <section class="svc-hero section-pad" aria-labelledby="sobre-title">
      <div class="svc-hero-copy">
        <nav class="svc-trail" aria-label="Você está em"><a href="/">Início</a><span aria-hidden="true">/</span><span aria-current="page">Sobre</span></nav>
        <h1 id="sobre-title"><span class="svc-h1-area">Sobre a EJFGV</span>${esc(s.titulo)}<span class="svc-dot">.</span></h1>
        <p class="svc-description">${esc(s.objetivo)}</p>
        <div class="svc-actions">
          <a class="button button-dark" href="${contato}">Conversar com a EJFGV <span aria-hidden="true">↗</span></a>
          <a class="svc-anchor" href="#historia">Conhecer nossa história <span aria-hidden="true">↓</span></a>
        </div>
      </div>
      <div class="svc-art box-art" data-state="closed" data-out="0">
        <div class="svc-grid" aria-hidden="true"></div>
        <div class="svc-orbit" aria-hidden="true"></div>
        <div class="box-layer box-back" aria-hidden="true"><i class="bx bx-back-in"></i><i class="bx bx-left-in"></i><i class="bx bx-floor"></i><i class="bx bx-rim"></i><span class="bx-lid"><i class="bx bx-lid-top"></i><i class="bx bx-lid-front"></i><i class="bx bx-lid-right"></i><i class="bx bx-lid-under"></i></span></div>
        <div class="box-glow" aria-hidden="true"></div>
        <ol class="box-photos" id="caixa-fotos" aria-label="Fotos da EJFGV" hidden>
          ${fotosCaixa}
        </ol>
        <div class="box-layer box-front" aria-hidden="true"><i class="bx bx-front"><span>✳</span></i><i class="bx bx-right"><span>Desde 1988</span></i></div>
        <div class="box-ui">
          <button class="box-control" type="button" aria-controls="caixa-fotos"><span class="box-control-label">Abrir a caixa</span> <span class="box-control-icon" aria-hidden="true">↗</span></button>
          <p class="box-status" aria-hidden="true">Pioneira na América Latina.</p>
          <p class="box-live" role="status"></p>
        </div>
      </div>
    </section>`;

  const origem = `
    <section class="about-history section-pad" id="historia" aria-labelledby="history-title">
      <div class="history-head">
        <h2 id="history-title" class="reveal">Da sala de aula<br><span>para o mercado.</span></h2>
        <div class="history-tabs" role="group" aria-label="Ir para um capítulo">${abas}</div>
      </div>
      <div class="history-stage" data-chapter="0" style="--chapter:0">
        <p class="odometer" aria-hidden="true">${colunas}</p>
        <div class="history-copy" aria-live="polite">
          ${textos}
        </div>
        <div class="history-foot">
          <div class="history-progress" aria-hidden="true">${capitulos.map(() => '<span></span>').join('')}</div>
          <button class="history-next" type="button"><span class="history-next-label">Próximo: ${esc(capitulos[1].rotulo)}</span> <span aria-hidden="true">→</span></button>
        </div>
        <span class="history-cursor" aria-hidden="true">Avançar <span>→</span></span>
      </div>
    </section>`;

  const proposito = `
    <section class="about-compass section-pad" aria-labelledby="compass-title">
      <h2 id="compass-title" class="purpose reveal"><span class="about-label">Nosso propósito</span><span class="purpose-text">${esc(s.proposito).replace(' ', '<br><span>')}</span></span></h2>
      <div class="compass-grid">
        <div class="vision reveal">
          <h3 class="about-label">Visão</h3>
          <p>${esc(s.visao)}</p>
        </div>
        <div class="values">
          <h3 class="about-label reveal">Valores</h3>
          <ul>
          ${valores}
          </ul>
        </div>
      </div>
    </section>`;

  const porQue = `
    <section class="about-why section-pad" aria-labelledby="why-title">
      <h2 id="why-title" class="reveal">Por que<br><span>EJFGV?</span></h2>
      <div class="about-why-copy">
        <p class="about-why-lead reveal">${destacar(s.porQue[0])}</p>
        <p class="reveal">${destacar(s.porQue[1])}</p>
      </div>
    </section>`;

  const equipe = `
    <section class="team section-pad" id="equipe" aria-labelledby="team-title">
      <div class="section-top reveal"><span class="small-note">CONHECIMENTO FGV. ENERGIA PARA IR ALÉM.</span></div>
      <div class="section-heading reveal"><h2 id="team-title">O nosso diferencial<br><span class="muted">tem muita gente.</span></h2></div>
      <div class="team-gallery reveal">
        <button class="gallery-main" data-photo="2" aria-label="Ampliar foto da equipe reunida"><img id="gallery-image" src="/fotos/img-4732-1600.webp" srcset="${fotos(4732)}" sizes="(max-width: 760px) calc(100vw - 48px), 62vw" alt="Integrantes da equipe da EJFGV reunidos" width="1200" height="800" loading="lazy"><span class="gallery-open" aria-hidden="true">↗</span><span class="gallery-caption"><span id="gallery-caption">Gente que soma. Juntos, vamos além.</span><span id="gallery-count">03 / 03</span></span></button>
        <div class="gallery-side"><div class="team-quote"><span aria-hidden="true">✳</span><p>Novos olhares.<br>Boas perguntas.<br><strong>Grandes possibilidades.</strong></p></div><div class="gallery-thumbnails" aria-label="Escolha uma imagem"><button data-photo="0" aria-pressed="false" aria-label="Ver equipe trabalhando"><img src="/fotos/img-4644-480.webp" srcset="${fotos(4644)}" sizes="(max-width: 760px) 30vw, 15vw" width="300" height="200" loading="lazy" alt=""></button><button data-photo="1" aria-pressed="false" aria-label="Ver reunião da equipe"><img src="/fotos/img-4709-480.webp" srcset="${fotos(4709)}" sizes="(max-width: 760px) 30vw, 15vw" width="300" height="200" loading="lazy" alt=""></button><button data-photo="2" aria-pressed="true" aria-label="Ver equipe reunida"><img src="/fotos/img-4732-480.webp" srcset="${fotos(4732)}" sizes="(max-width: 760px) 30vw, 15vw" width="300" height="200" loading="lazy" alt=""></button></div><p class="gallery-hint">Três olhares sobre quem faz acontecer.<br>Escolha uma imagem para explorar.</p></div>
      </div>
    </section>`;

  const convite = `
    <section class="svc-cta section-pad" aria-labelledby="cta-title">
      <h2 id="cta-title" class="reveal">Vamos transformar a realidade do seu negócio?</h2>
      <div class="svc-cta-copy reveal">
        <p>Conte um pouco sobre o seu momento. Uma boa conversa pode abrir novos caminhos.</p>
        <a class="button button-dark" href="${contato}">Começar a conversa <span aria-hidden="true">↗</span></a>
      </div>
    </section>`;

  // A ordem conta uma história em dois atos, e cada título responde à pergunta que o anterior deixa:
  //   Quem somos:   abertura ("Conheça a empresa júnior") → origem ("Da sala de aula para o mercado",
  //                 o destino do link "Conhecer nossa história") → propósito ("Transformar realidades").
  //   Para você:    por que a EJFGV → as pessoas que fazem ("O nosso diferencial tem muita gente") →
  //                 convite ("Vamos transformar a realidade do seu negócio?", que retoma o propósito).
  // O objetivo da abertura e o "Por que EJFGV?" dizem coisas parecidas; por isso ficam distantes.
  const narrativa = [abertura, origem, proposito, porQue, equipe, convite];

  return `
  <main id="conteudo" class="svc sobre">${narrativa.join('\n')}
  </main>
  <dialog class="photo-dialog" aria-label="Galeria de imagens da equipe"><button class="dialog-close" aria-label="Fechar galeria">×</button><img alt="" sizes="(max-width: 1032px) calc(100vw - 68px), 964px"><div class="dialog-photo-bottom"><button class="photo-prev" aria-label="Imagem anterior">←</button><p></p><button class="photo-next" aria-label="Próxima imagem">→</button></div></dialog>`;
}
