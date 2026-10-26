// Estrutura comum a todas as páginas: <head>, cabeçalho e rodapé.
import { solucoes } from './conteudo/solucoes.mjs';
import { navegacao } from './conteudo/navegacao.mjs';

export const SITE_URL = 'https://ejfgv.com';
export const CONTATO = {
  email: 'comercial@ejfgv.com',
  whatsapp: '+55 31 98650-6120',
  whatsappUrl: 'https://wa.me/5531986506120',
  instagram: 'https://www.instagram.com/ejfgv/',
  linkedin: 'https://www.linkedin.com/company/ejfgv/',
};

const ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
export const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ESCAPES[char]);

export const contatoHref = chave => (chave ? `/?desafio=${encodeURIComponent(chave)}#contato` : '/#contato');

function cabecalho({ inicio, chave, url, existe }) {
  // Na home, os links apontam para âncoras da própria página.
  const ancora = id => (inicio ? `#${id}` : `/#${id}`);
  const atual = href => (href === url ? ' aria-current="page"' : '');

  const itens = navegacao.map((item, i) => {
    if (item.solucoes || item.itens) {
      const filhos = item.solucoes
        ? solucoes.map(s => ({ href: s.url, rotulo: s.area }))
        : item.itens.filter(f => existe(f.url)).map(f => ({ href: f.url, rotulo: f.rotulo }));
      if (!filhos.length) return '';
      const lis = filhos
        .map(f => `<li><a href="${f.href}"${atual(f.href)}>${esc(f.rotulo)}</a></li>`)
        .join('');
      const visaoGeral = item.provisorio ? `<li class="nav-sub-all"><a href="${ancora(item.provisorio)}">Visão geral das ${esc(item.rotulo.toLowerCase())} <span aria-hidden="true">↗</span></a></li>` : '';
      const noGrupo = filhos.some(f => f.href === url);
      return `<div class="nav-group${noGrupo ? ' is-current' : ''}">
        <button class="nav-group-toggle" type="button" aria-expanded="false" aria-controls="nav-sub-${i}">${esc(item.rotulo)} <span aria-hidden="true">+</span></button>
        <ul class="nav-sub" id="nav-sub-${i}">${lis}${visaoGeral}</ul>
      </div>`;
    }
    if (existe(item.url)) {
      const naSecao = item.prefixo && url.startsWith(item.prefixo);
      return `<a href="${item.url}"${url === item.url ? ' aria-current="page"' : naSecao ? ' aria-current="true"' : ''}>${esc(item.rotulo)}</a>`;
    }
    return item.provisorio ? `<a href="${ancora(item.provisorio)}">${esc(item.rotulo)}</a>` : '';
  }).filter(Boolean);

  return `<header class="header">
    <a class="brand" href="${inicio ? '#inicio' : '/'}" aria-label="EJFGV — Início"><img src="/recursos/marca/logotipo.webp" width="180" height="42" alt="Empresa Júnior FGV"></a>
    <button class="menu-toggle" aria-expanded="false" aria-controls="navigation">Menu <span aria-hidden="true">+</span></button>
    <nav id="navigation" aria-label="Navegação principal">
      ${itens.join('\n      ')}
      <a class="nav-cta" href="${inicio ? '#contato' : contatoHref(chave)}">Vamos conversar <span aria-hidden="true">↗</span></a>
    </nav>
  </header>`;
}

function rodape({ inicio, url }) {
  const links = solucoes
    .map(s => `<li><a href="${s.url}"${s.url === url ? ' aria-current="page"' : ''}>${esc(s.area)}</a></li>`)
    .join('');
  return `<footer class="footer section-pad">
    <div class="footer-brand">
      <a class="brand" href="${inicio ? '#inicio' : '/'}" aria-label="EJFGV — Início"><img src="/recursos/marca/logotipo.webp" width="180" height="42" alt="Empresa Júnior FGV"></a>
      <p>Ideias em movimento.<br>Negócios em transformação.</p>
    </div>
    <nav class="footer-col" aria-label="Soluções">
      <p class="footer-title">Soluções</p>
      <ul>${links}</ul>
    </nav>
    <div class="footer-col">
      <p class="footer-title">Contato</p>
      <ul>
        <li><a href="mailto:${CONTATO.email}">${CONTATO.email}</a></li>
        <li><a href="${CONTATO.whatsappUrl}" rel="noopener">WhatsApp ${esc(CONTATO.whatsapp)}</a></li>
        <li><a href="${CONTATO.instagram}" rel="noopener">Instagram</a> · <a href="${CONTATO.linkedin}" rel="noopener">LinkedIn</a></li>
      </ul>
    </div>
    <div class="footer-bottom">
      <span class="footer-note">EJFGV · EMPRESA JÚNIOR FGV · DESDE 1988</span>
      <a href="${inicio ? '#inicio' : '#conteudo'}">De volta ao topo <span aria-hidden="true">↑</span></a>
    </div>
  </footer>`;
}

/**
 * Monta uma página completa.
 * @param {object} p
 * @param {string} p.url        URL pública, com barra final (ex.: '/consultoria-financeira/').
 * @param {string} p.titulo     <title>.
 * @param {string} p.descricao  meta description.
 * @param {string[]} p.css      folhas de estilo além de site.css.
 * @param {string[]} p.js       scripts (defer).
 * @param {string} p.corpo      conteúdo de <main> e elementos soltos (diálogos).
 * @param {string} [p.chave]    desafio pré-selecionado nos links de contato.
 * @param {string} [p.estiloBody] propriedades CSS inline do <body> (ex.: tom da página).
 * @param {(url: string) => boolean} p.existe  indica se a URL já tem página no site novo (monta o menu).
 * @param {boolean} [p.indexavel] false para páginas fora dos buscadores (404): sem canonical, com noindex.
 */
export function pagina({ url, titulo, descricao, css = [], js = [], corpo, chave, estiloBody, existe, indexavel = true }) {
  const inicio = url === '/';
  const enderecos = indexavel
    ? `<link rel="canonical" href="${SITE_URL}${url}">`
    : '<meta name="robots" content="noindex">';
  const ogUrl = indexavel ? `\n  <meta property="og:url" content="${SITE_URL}${url}">` : '';
  const estilos = ['/recursos/css/site.css', ...css].map(href => `  <link rel="stylesheet" href="${href}">`).join('\n');
  const scripts = ['/recursos/js/navegacao.js', ...js].map(src => `  <script src="${src}" defer></script>`).join('\n');
  return `<!doctype html>
<!-- Gerado por scripts/gerar-paginas.mjs a partir de site/. Edite a fonte, não este arquivo. -->
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#f3f1eb">
  <title>${esc(titulo)}</title>
  <meta name="description" content="${esc(descricao)}">
  ${enderecos}
  <meta property="og:type" content="website">
  <meta property="og:locale" content="pt_BR">
  <meta property="og:site_name" content="EJFGV">
  <meta property="og:title" content="${esc(titulo)}">
  <meta property="og:description" content="${esc(descricao)}">${ogUrl}
  <link rel="icon" href="/favicon.ico">
  <link rel="preload" href="/recursos/fontes/montserrat.woff2" as="font" type="font/woff2" crossorigin>
${estilos}
${scripts}
</head>
<body${estiloBody ? ` style="${esc(estiloBody)}"` : ''}>
  <a class="skip-link" href="#conteudo">Pular para o conteúdo</a>
  <div class="reading-progress" aria-hidden="true"></div>
  ${cabecalho({ inicio, chave, url, existe })}
${corpo.trim()}
  ${rodape({ inicio, url })}
</body>
</html>
`;
}
