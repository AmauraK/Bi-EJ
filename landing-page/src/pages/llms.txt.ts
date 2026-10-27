// /llms.txt: resumo de quem é a EJFGV, serviços e links principais, para leitura por LLMs (docx: GEO).
// Gerado a partir de consts.ts, então os números e contatos são sempre os mesmos do site.
import type { APIRoute } from 'astro';
import { SITE, CONTATO, NUMEROS, SOLUCOES } from '../consts';

export const GET: APIRoute = ({ site }) => {
	const url = (caminho: string) => new URL(caminho, site).href;
	const texto = `# ${SITE.nome} — ${SITE.nomeCompleto}

> A ${SITE.nome} é a ${SITE.nomeCompleto}, a primeira empresa júnior da América Latina, fundada em ${NUMEROS.fundacao}. Faz consultoria estratégica com alunos da graduação da FGV e orientação de professores da FGV. São mais de ${NUMEROS.projetos} projetos entregues e NPS ${NUMEROS.nps} (${NUMEROS.npsAno}). Propósito: ${SITE.proposito}.

## Soluções

${SOLUCOES.map((s) => `- [${s.nome}](${url(s.url)}): ${s.descricao}`).join('\n')}

## Cases e conteúdo

- [Cases de sucesso](${url('/cases-de-sucesso/')}): projetos com problema, solução e resultado.
- [Blog](${url('/blog/')}): artigos sobre gestão, empreendedorismo e consultoria.
- [Materiais ricos](${url('/materiais-ricos/')}): e-books gratuitos.

## Institucional

- [Sobre a EJFGV](${url('/sobre-nos/')})
- [Contato](${url('/contato/')}): diagnóstico gratuito, retorno em até ${NUMEROS.retornoDiasUteis} dia útil.
- E-mail: ${CONTATO.email}
- WhatsApp: ${CONTATO.whatsapp}
`;
	return new Response(texto, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
