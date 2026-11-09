# SEO do site da EJFGV — contexto para o claude-seo

Leia este arquivo antes de qualquer comando `/seo`. O plugin foi escrito para sites genéricos em inglês; aqui valem as regras abaixo.

## O que é o site

- **Negócio:** Empresa Júnior da Fundação Getulio Vargas (EJFGV), consultoria para empresas, de PMEs a grandes. Para o plugin, o tipo é **serviços profissionais B2B** (perfil de agência/consultoria). Não trate como SaaS, e-commerce ou publisher.
- **Local:** R. Itapeva, 432, Bela Vista, São Paulo, SP. O atendimento cobre o Brasil todo, então o SEO local (`/seo local`, `/seo maps`) é secundário.
- **Idioma:** só pt-BR (`<html lang="pt-BR">`, `og:locale pt_BR`). Não há versões em outros idiomas: pule o `/seo hreflang`.
- **Conversão:** formulário de `/contato/`, WhatsApp e e-mail `comercial@ejfgv.com`. É por esses canais que o site gera reuniões.
- **Páginas que importam:** Home; as landings de soluções (`/consultoria-financeira/`, `/consultoria-operacional/`, `/consultoria-mercadologica/`, `/consultoria-business-intelligence/`, `/plano-de-negocios/`); `/cases-de-sucesso/` e `/cases/<slug>/`; `/sobre-nos/`; `/materiais-ricos/`; `/blog/`; `/contato/`.
- **Termos de busca de partida** (hipóteses a validar com dados, não metas): consultoria financeira para pequenas empresas, consultoria empresarial em São Paulo, empresa júnior FGV, plano de negócios, consultoria de business intelligence/Power BI, pesquisa de mercado.

## Situação do domínio (importante)

- `https://ejfgv.com` **ainda é o site antigo em WordPress**. O site novo deste repositório está em produção provisória em `https://ejfgv-site-novo.vercel.app`, com `site: 'https://ejfgv.com'` no `astro.config.mjs`. O canonical, o `sitemap.xml`, o `robots.txt` e o `llms.txt` já apontam para `ejfgv.com`, à espera da migração.
- **O que auditar:** o site novo, em `https://ejfgv-site-novo.vercel.app` ou no preview local (`cd landing-page && npm run build && npx astro preview`). O canonical apontando para outro domínio é **esperado** até a migração: registre como nota, não como erro crítico.
- O WordPress em `ejfgv.com` serve só de **linha de base para a migração**: URLs que precisam de redirect (os redirects ficam em `astro.config.mjs`), títulos e conteúdos que já ranqueiam. Não proponha mudanças no WordPress.

## Onde cada correção mora no código

| Achado | Arquivo |
|---|---|
| title, description, canonical, Open Graph, `noindex` | `landing-page/src/layouts/Layout.astro` (props `titulo`, `descricao`, `jsonLd`, `noindex`) e o frontmatter de cada página em `src/pages/` |
| Schema.org (Organization etc.) | `Layout.astro` (objeto `organizacao` + `jsonLd` extra por página); FAQ em `src/components/Faq.astro` |
| Dados da empresa (nome, endereço, contatos, números, cases) | `landing-page/src/consts.ts` — **fonte única**. O schema tem de ler daqui, nunca repetir valores à mão |
| Sitemap, robots, llms.txt | `src/pages/sitemap.xml.ts`, `public/robots.txt`, `src/pages/llms.txt.ts` |
| Redirects das URLs antigas | `landing-page/astro.config.mjs` (`redirects`). O site é estático: os redirects viram `meta refresh`, e um 301 de verdade depende do host |
| Imagens (alt, peso, LCP) | `src/assets/` e os componentes; fotos só as reais da equipe (`FOTOS` em `consts.ts`) |

## Regras ao usar o plugin aqui

1. **Primeiro o diagnóstico, depois a correção.** Os relatórios vão para `seo/relatorios/AAAA-MM-DD-<comando>.md`; resuma em português no topo (o que corrigir primeiro, em qual arquivo). A correção vem depois, numa branch nova a partir de `main`, com PR e **merge só com autorização do Bruno**.
2. **Nada inventado.** Não crie avaliações, notas (`aggregateRating`), números de projetos, prêmios, clientes, depoimentos ou FAQs que não estejam em `consts.ts` ou aprovados. O hook de schema do plugin bloqueia placeholders: preencha com dados reais ou deixe o campo de fora.
3. **Textos:** sugestões de título, descrição e conteúdo em pt-BR natural. Passe pela skill `humanizer` (padrões que valem em português) e não mude fatos, números ou promessas. Limites de referência: title até ~60 caracteres, description até ~155.
4. **Sem serviços pagos nem chaves de terceiros.** Não ative as extensões DataForSEO, Ahrefs, SE Ranking, Profound, Firecrawl ou Banana (`/seo image-gen`). Imagem gerada por IA também não entra (regra de fotos do repo). Google (`/seo google`: PageSpeed, CrUX, Search Console, GA4) só com a credencial do próprio Bruno, configurada por ele. Sem ela, os Core Web Vitals são estimativas de laboratório: diga isso no relatório.
5. **Não publique.** O deploy é manual (skill `publicar`); o plugin não roda deploy nem `indexnow_submit`/`indexing_notify`.
6. **Verifique antes do PR:** `cd landing-page && npm run build && npm run verificar`, mais prints desktop e 390 px do preview (skill `browser-testing-with-devtools`).

## Comandos mais úteis para este site

- `/seo audit https://ejfgv-site-novo.vercel.app/` — auditoria completa com plano priorizado (gasta mais do plano Claude: 5 agentes em Opus).
- `/seo page <url>` — uma página em profundidade, para a landing que for mexer.
- `/seo schema <url>` — conferir e gerar o JSON-LD (Organization, Service, FAQPage) a partir de `consts.ts`.
- `/seo technical <url>` e `/seo sitemap <url>` — indexação, sitemap, redirects da migração.
- `/seo geo <url>` e `/seo agentic <url>` — prontidão para AI Overviews/ChatGPT; o `llms.txt` já existe.
- `/seo content-brief "<tema>"` — pauta de post do blog ou material rico.
- `/seo drift baseline <url>` antes da migração para `ejfgv.com` e `/seo drift compare <url>` depois.
