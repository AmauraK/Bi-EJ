// Gera as páginas do site em public/ a partir de site/.
//
//   node scripts/gerar-paginas.mjs              gera os arquivos
//   node scripts/gerar-paginas.mjs --verificar  só confere se public/ está atualizado (usado nos testes)
//
// Sem dependências: apenas Node.js 18+.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC = path.join(ROOT, 'public');
const verificar = process.argv.includes('--verificar');
const load = file => import(pathToFileURL(path.join(ROOT, file)).href);

const { pagina, SITE_URL } = await load('site/layout.mjs');
const { solucoes } = await load('site/conteudo/solucoes.mjs');
const { servico } = await load('site/modelos/servico.mjs');
const { sobre } = await load('site/conteudo/sobre.mjs');
const { paginaSobre } = await load('site/modelos/sobre.mjs');

const arquivoDaUrl = url => path.join(PUBLIC, ...url.split('/').filter(Boolean), 'index.html');

const paginas = [];

// URLs geradas nesta execução. Links e itens de menu só apontam para o que existe.
const urlsGeradas = new Set(['/', '/sobre-nos/', ...solucoes.map(s => s.url)]);
const existe = url => urlsGeradas.has(url) || existsSync(arquivoDaUrl(url));

// Início
const urlDaChave = chave => {
  const s = solucoes.find(item => item.chave === chave);
  if (!s) throw new Error(`site/paginas/inicio.html usa {{url:${chave}}}, que não existe em solucoes.mjs`);
  return s.url;
};
const inicio = (await readFile(path.join(ROOT, 'site/paginas/inicio.html'), 'utf8'))
  .replace(/\r\n/g, '\n')
  .replace(/\{\{url:([a-z]+)\}\}/g, (_, chave) => urlDaChave(chave));
paginas.push({
  url: '/',
  html: pagina({
    url: '/',
    titulo: 'Consultoria Estratégica da Empresa Júnior FGV - EJFGV',
    descricao: 'Consultoria feita por alunos da FGV para pequenas e médias empresas: plano de negócios, marketing, finanças, operação e data science.',
    css: ['/recursos/css/inicio-solucoes.css', '/recursos/css/inicio-indicadores.css'],
    js: ['/recursos/js/inicio.js'],
    corpo: inicio,
    existe,
  }),
});

// Sobre
paginas.push({
  url: '/sobre-nos/',
  html: pagina({
    url: '/sobre-nos/',
    titulo: sobre.seo.titulo,
    descricao: sobre.seo.descricao,
    css: ['/recursos/css/servico.css', '/recursos/css/sobre.css'],
    js: ['/recursos/js/site.js', '/recursos/js/galeria.js', '/recursos/js/sobre.js'],
    estiloBody: `--svc-tone:${sobre.tom}`,
    corpo: paginaSobre(sobre),
    existe,
  }),
});

// Serviços
for (const s of solucoes) {
  paginas.push({
    url: s.url,
    html: pagina({
      url: s.url,
      titulo: s.seo.titulo,
      descricao: s.seo.descricao,
      css: ['/recursos/css/servico.css'],
      js: ['/recursos/js/site.js'],
      chave: s.chave,
      estiloBody: `--svc-tone:${s.tom}`,
      corpo: servico(s, { existe }),
      existe,
    }),
  });
}

// Página 404: o Cloudflare a serve, com status 404, em qualquer endereço sem página (not_found_handling
// "404-page"). Fica em public/404.html, fora do sitemap. Os links são absolutos, porque ela aparece em
// qualquer profundidade de URL.
paginas.push({
  url: '/404.html',
  arquivo: path.join(PUBLIC, '404.html'),
  foraDoSitemap: true,
  html: pagina({
    url: '/404.html',
    titulo: 'Página não encontrada - EJFGV',
    descricao: 'Esta página não existe no site da EJFGV.',
    js: ['/recursos/js/site.js'],
    indexavel: false,
    corpo: (await readFile(path.join(ROOT, 'site/paginas/nao-encontrada.html'), 'utf8')).replace(/\r\n/g, '\n'),
    existe,
  }),
});

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paginas.filter(p => !p.foraDoSitemap).map(p => `  <url><loc>${SITE_URL}${p.url}</loc></url>`).join('\n')}
</urlset>
`;
const saidas = [
  ...paginas.map(p => ({ arquivo: p.arquivo ?? arquivoDaUrl(p.url), conteudo: p.html })),
  { arquivo: path.join(PUBLIC, 'sitemap.xml'), conteudo: sitemap },
];

// Todo link interno (href/src/srcset começando com "/") precisa apontar para algo que exista.
const faltando = [];
for (const p of paginas) {
  const refs = [...p.html.matchAll(/(?:href|src)="(\/[^"]*)"/g)].map(m => m[1]);
  for (const m of p.html.matchAll(/srcset="([^"]*)"/g)) refs.push(...m[1].split(',').map(part => part.trim().split(/\s+/)[0]));
  for (const ref of refs) {
    const alvo = ref.split(/[?#]/)[0];
    if (!alvo.startsWith('/') || alvo.startsWith('//')) continue;
    const ok = alvo.endsWith('/')
      ? urlsGeradas.has(alvo) || existsSync(arquivoDaUrl(alvo))
      : existsSync(path.join(PUBLIC, decodeURIComponent(alvo))) && statSync(path.join(PUBLIC, decodeURIComponent(alvo))).isFile();
    if (!ok) faltando.push(`${p.url} → ${ref}`);
  }
}
if (faltando.length) {
  console.error(`Links internos sem destino:\n  ${[...new Set(faltando)].join('\n  ')}`);
  process.exit(1);
}

const desatualizados = [];
for (const { arquivo, conteudo } of saidas) {
  const atual = existsSync(arquivo) ? await readFile(arquivo, 'utf8') : null;
  // O git no Windows pode converter os finais de linha; a verificação ignora essa diferença.
  if (verificar ? atual?.replace(/\r\n/g, '\n') === conteudo : atual === conteudo) continue;
  desatualizados.push(path.relative(ROOT, arquivo));
  if (!verificar) {
    await mkdir(path.dirname(arquivo), { recursive: true });
    await writeFile(arquivo, conteudo, 'utf8');
  }
}

if (verificar) {
  if (desatualizados.length) {
    console.error(`public/ está desatualizado. Rode: node scripts/gerar-paginas.mjs\n  ${desatualizados.join('\n  ')}`);
    process.exit(1);
  }
  console.log(`OK: ${saidas.length} arquivos gerados estão atualizados.`);
} else {
  console.log(desatualizados.length ? `Atualizados:\n  ${desatualizados.join('\n  ')}` : 'Nada mudou.');
  console.log(`${paginas.length} páginas: ${paginas.map(p => p.url).join(' ')}`);
}
