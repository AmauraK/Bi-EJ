// Confere o site gerado em dist/ (rode depois de `npm run build`). Sem dependências: só Node.
//
//   node scripts/verificar.mjs             checagens + relatório de marcadores "A preencher"
//   node scripts/verificar.mjs --publicar  também falha se sobrar marcador ou espaço de imagem reservado
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(RAIZ, 'dist');
const publicar = process.argv.includes('--publicar');
const IGNORAR = new Set(['/kit/']); // página temporária da Fase 0

const SOLUCOES = ['/plano-de-negocios/', '/consultoria-mercadologica/', '/consultoria-financeira/', '/consultoria-operacional/', '/consultoria-business-intelligence/'];
const PROIBIDOS = [/data science/i, /work hard/i, /\bUSP\b/, /gemini/i, /unsplash/i, /700 clientes/i, /\+500/, /Getúlio/, /contato@ejfgv/i, /maior faculdade/i, /Astro Basics/, /enviada com sucesso/i];

if (!existsSync(DIST)) {
	console.error('dist/ não existe. Rode antes: npm run build');
	process.exit(1);
}

const arquivos = (dir) => readdirSync(dir).flatMap((nome) => {
	const p = path.join(dir, nome);
	return statSync(p).isDirectory() ? arquivos(p) : [p];
});

const rotaDe = (arquivo) => {
	const rel = '/' + path.relative(DIST, arquivo).split(path.sep).join('/');
	return rel.endsWith('/index.html') ? rel.slice(0, -'index.html'.length) : rel;
};

const paginas = new Map(); // rota -> html
for (const arquivo of arquivos(DIST).filter((a) => a.endsWith('.html'))) {
	paginas.set(rotaDe(arquivo), readFileSync(arquivo, 'utf8'));
}

const falhas = [];
const falha = (rota, msg) => falhas.push(`${rota} → ${msg}`);
const ehRedirect = (html) => /<meta http-equiv="refresh"/i.test(html);
const ids = (html) => new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));

// Redirects declarados no astro.config.mjs
const config = readFileSync(path.join(RAIZ, 'astro.config.mjs'), 'utf8');
const bloco = config.match(/redirects:\s*{([\s\S]*?)\n\t}/)?.[1] ?? '';
for (const [, de, para] of bloco.matchAll(/'(\/[^']*)':\s*'([^']*)'/g)) {
	const html = paginas.get(de.replace(/\/?$/, '/'));
	if (!html || !html.includes(`url=${para}`)) falha(de, `redirect para ${para} não foi gerado`);
}

const titulos = new Map();
const descricoes = new Map();
const marcadores = [];

for (const [rota, html] of paginas) {
	if (IGNORAR.has(rota) || ehRedirect(html)) continue;
	const noindex = /<meta name="robots" content="noindex"/.test(html);

	if (!/<html lang="pt-BR"/.test(html)) falha(rota, 'sem lang="pt-BR"');
	const h1 = (html.match(/<h1[\s>]/g) || []).length;
	if (h1 !== 1) falha(rota, `${h1} <h1> (deve ser 1)`);

	const titulo = html.match(/<title>([^<]*)<\/title>/)?.[1];
	const descricao = html.match(/<meta name="description" content="([^"]*)"/)?.[1];
	if (!titulo) falha(rota, 'sem <title>');
	if (!descricao) falha(rota, 'sem meta description');
	if (titulo) titulos.set(titulo, [...(titulos.get(titulo) || []), rota]);
	if (descricao) descricoes.set(descricao, [...(descricoes.get(descricao) || []), rota]);
	if (!noindex && !/<link rel="canonical" href="https:\/\/ejfgv\.com\//.test(html)) falha(rota, 'sem canonical');

	for (const img of html.match(/<img\b[^>]*>/g) || []) {
		if (!/\salt="/.test(img)) falha(rota, `<img> sem alt: ${img.slice(0, 90)}`);
	}

	for (const json of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
		try { JSON.parse(json[1]); } catch { falha(rota, 'JSON-LD inválido'); }
	}

	// Links internos: precisam existir e terminar em "/" (ou ser um arquivo); âncoras precisam existir.
	const proprios = ids(html);
	for (const [, attr, valor] of html.matchAll(/\s(href|src)="([^"]*)"/g)) {
		if (valor.startsWith('#')) {
			if (valor.length > 1 && !proprios.has(valor.slice(1))) falha(rota, `âncora ${valor} não existe na página`);
			continue;
		}
		if (!valor.startsWith('/') || valor.startsWith('//')) continue;
		const [semQuery] = valor.split('?');
		const [caminho, ancora] = semQuery.split('#');
		if (/\.[a-z0-9]+$/i.test(caminho)) {
			if (!existsSync(path.join(DIST, decodeURIComponent(caminho)))) falha(rota, `${attr} para arquivo inexistente: ${valor}`);
			continue;
		}
		if (!caminho.endsWith('/')) {
			falha(rota, `link interno sem "/" no fim: ${valor}`);
			continue;
		}
		const destino = paginas.get(caminho);
		if (!destino) falha(rota, `link para página inexistente: ${valor}`);
		else if (ancora && !ids(destino).has(ancora)) falha(rota, `âncora #${ancora} não existe em ${caminho}`);
	}

	// Texto e atributos (ex.: src de imagem), sem o conteúdo de <script> e <style>.
	const visivel = html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ');
	for (const termo of PROIBIDOS) {
		if (termo.test(visivel)) falha(rota, `termo proibido: ${termo}`);
	}

	for (const input of html.match(/<input\b[^>]*name="Consentimento"[^>]*>/g) || []) {
		if (/\schecked\b/.test(input)) falha(rota, 'consentimento vem marcado');
	}

	const preencher = (html.match(/class="preencher"/g) || []).length;
	const imagens = (html.match(/data-imagem-reservada=/g) || []).length;
	if (preencher || imagens) marcadores.push({ rota, preencher, imagens });
}

for (const rota of SOLUCOES) {
	const html = paginas.get(rota);
	if (!html) { falha(rota, 'página de solução não existe'); continue; }
	if (!/id="formulario"[\s\S]*?<form\b/.test(html)) falha(rota, 'sem formulário em #formulario');
	const ctas = (html.match(/href="#formulario"/g) || []).length;
	if (ctas < 2) falha(rota, `só ${ctas} link(s) para #formulario (mínimo 2)`);
}

for (const [valor, rotas] of titulos) if (rotas.length > 1) falha(rotas.join(', '), `<title> repetido: "${valor}"`);
for (const [valor, rotas] of descricoes) if (rotas.length > 1) falha(rotas.join(', '), `description repetida: "${valor.slice(0, 60)}…"`);

console.log('Marcadores por página (A preencher · imagens reservadas):');
for (const m of marcadores.sort((a, b) => a.rota.localeCompare(b.rota))) {
	console.log(`  ${m.rota.padEnd(60)} ${String(m.preencher).padStart(3)} · ${m.imagens}`);
}
const total = marcadores.reduce((s, m) => s + m.preencher + m.imagens, 0);
console.log(`  Total: ${total}`);
if (publicar && total) falha('site', `${total} marcador(es) ainda no site; preencha antes de publicar`);

if (falhas.length) {
	console.error(`\n${falhas.length} problema(s):\n  ${falhas.join('\n  ')}`);
	process.exit(1);
}
console.log(`\nOK: ${paginas.size} arquivos HTML conferidos.`);
