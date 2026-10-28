// /sitemap.xml: todas as páginas .astro (menos rotas dinâmicas, 404 e o kit temporário) + os 8 cases.
import type { APIRoute } from 'astro';
import { CASES } from '../consts';

const paginas = Object.keys(import.meta.glob('./**/*.astro'));

export const GET: APIRoute = ({ site }) => {
	const rotas = paginas
		.filter((p) => !p.includes('[') && !p.endsWith('/404.astro') && !p.endsWith('/kit.astro'))
		.map((p) => p.replace(/^\./, '').replace(/(index)?\.astro$/, '').replace(/([^/])$/, '$1/'));
	const urls = [...rotas, ...CASES.map((c) => c.url)].sort();
	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${new URL(u, site).href}</loc></url>`).join('\n')}
</urlset>
`;
	return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
