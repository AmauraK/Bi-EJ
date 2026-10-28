# Plano de ação: novo site da EJFGV (Astro)

> **Status:** aguardando aprovação, ainda não executado · **Data:** 26/10/2026
> **Base:** `EJFGV Mudanças Site.docx` (fonte da verdade) e a landing page em `landing-page/` (design de referência)

## Contexto
O **EJFGV Mudanças Site.docx** consolida o feedback sobre o ejfgv.com (WordPress) e aponta a landing de BI em `landing-page/` como o estilo desejado.

Objetivo: construir, nesse mesmo projeto Astro, um site novo com a estrutura e as URLs do site atual: Home, Sobre, 5 landings de Soluções, Cases de sucesso e Conteúdo. O site:
- segue o design system da landing;
- usa as informações do docx;
- não usa imagens fictícias: no lugar delas ficam espaços em branco reservados;
- tem, em cada solução, um botão que leva ao formulário.

**Como será executado:** pelo Claude Code. Um agente principal monta a base compartilhada e depois aciona **um subagente diferente para cada página**. Nada muda fora de `landing-page/`.

**Estado atual**
- **`landing-page/`:** Astro 7.4.2 (Node 24 ok, sem `node_modules`), com uma única página.
  - `src/pages/index.astro`: HTML cru da LP de BI.
  - `src/styles/styles.css`: tokens e componentes do design system.
  - `public/main.js`: cursor, slider, modal Vimeo e máscara de telefone. O formulário **não envia nada e mostra uma mensagem de sucesso falsa**.
- **Falhas da LP:**
  - links quebrados: `<link href="styles.css">`, o link para `DS%20EJFGV.html` (que não existe) e o `onerror` apontando para uma imagem que também não existe;
  - consentimento LGPD já vem marcado;
  - `data-count` sem código de contador;
  - menu some abaixo de 767 px;
  - 2º depoimento só existe no JS;
  - hero gerado por IA (Gemini) e fotos Unsplash;
  - sobras do starter: Layout, Welcome, assets e os favicons com a logo do Astro.
- **Conteúdo real reaproveitável:**
  - `site/conteudo/solucoes.mjs`: 5 soluções, 8 cases (problema, solução e destaque) e a citação de Thiago Caruso;
  - `site/conteudo/sobre.mjs`;
  - `site/layout.mjs`: contatos;
  - inventário de URLs e posts do site atual no repositório `celulabi-prog/site-ejfgv`, em `docs/referencia/` (`MAPA_SITE.md` e `inventario-urls.csv`).

## Decisões
- **Design**
  - `landing-page/src/styles/styles.css` é a fonte da verdade.
  - `EJFGVreferences/DS EJFGV.html` diverge na nav e nos botões e só inspira o que falta.
  - **Cores: a fonte da verdade é o `EJFGV Brandbook 2026 (1).pdf`**, com só 4 cores: Laranja `#e38e33`, Chumbo `#252832`, Cinza Claro `#dadae4` e Menta `#f9fffc`. Estão no `:root` como `--brand-laranja`, `--brand-chumbo`, `--brand-cinza` e `--brand-menta`.
  - Todo outro token de cor (`--primary*`, `--gray*`, `--graywarm*`, status) é uma dessas 4 cores ou uma mistura entre elas (`color-mix`). Os nomes antigos ficam para não quebrar os componentes.
  - Cor nova fora do brandbook (azul, verde, vermelho, preto, branco puro) não entra. `--white` vale Menta; status de sucesso e erro usam Chumbo e Laranja escurecido.
  - Texto sobre fundo laranja é Chumbo (5,73:1). Menta sobre laranja dá 2,53:1 e não passa.
  - Componentes novos usam só os tokens existentes e a convenção de nomes do CSS.
  - Os botões grandes da Home (64 px, texto de 19 px em negrito) passam no contraste AA, com texto Chumbo sobre o Laranja.
- **Imagens**
  - Toda foto vira `ImagemReservada`: espaço vazio no tamanho da imagem original, com um rótulo discreto do que entra ali.
  - Ficam só ativos reais: logos de clientes, ícones, a logo da EJ (CDN Webflow da EJ) e as fotos reais dos clientes nos depoimentos.
  - Saem as imagens do Gemini e do Unsplash e as fotos provisórias de `public/fotos/`.
- **Conteúdo**
  - Ordem de prioridade das fontes:
    1. o docx;
    2. o legado em `site/` e a LP;
    3. as páginas atuais do ejfgv.com (cases, e-books, política e depoimentos).
  - Nada é inventado: lacunas viram um marcador visível `<span class="preencher">A preencher: …</span>`.
- **Correções sobre o docx**
  - "a USP" → FGV; a frase "maior faculdade da América Latina" sai.
  - "Data Science" → "Business Intelligence", em tudo.
  - O valor "Work hard, play harder" → "Inovação".
  - Um único e-mail: comercial@ejfgv.com.
  - Grafia oficial: "Fundação Getulio Vargas".
  - Método: Contato → Diagnóstico → Proposta → Projeto.
  - Números: +800 projetos, NPS 90 (2026), desde 1988 (anos calculados no build), 70 setores.
  - Ma Cerise: +1154%, como no docx, marcado para confirmar.
- **Formulário** (decidido em 26/10: integrar depois)
  - O `LeadForm` lê o endpoint de `FORMULARIOS`, que por enquanto fica vazio.
  - Sem endpoint: valida os campos e mostra o WhatsApp pré-preenchido e o e-mail. Nunca diz "enviado com sucesso".
  - Com endpoint: envia com `fetch` e só mostra sucesso se `res.ok`.
  - Campos: nome, e-mail, WhatsApp, serviço (pré-selecionado) e mensagem (opcional).
  - Consentimento vem desmarcado e com link para a política; há um campo honeypot contra spam.
  - Os `name` dos campos da LP são mantidos.
- **BI** (decidido em 26/10): o conteúdo da LP atual vira `/consultoria-business-intelligence/`, e a Home nova ocupa o `index.astro`.
- **Filtros de Cases** (decidido em 26/10): Todos · Plano de Negócios · Business Intelligence · Operacional · Mercadológica · Financeira. BI ainda não tem case e mostra um card "a preencher".
- **Blog** (decidido em 26/10): hub em `/blog/` e `/materiais-ricos/`, com posts reais que levam ao WordPress atual. A migração dos 356 posts fica para outra etapa.
- **Vídeo:** o Vimeo atual fica numa constante até o vídeo novo chegar.
- **Fora do escopo:** migração do blog, integração real dos formulários, GTM e cookies, chatbot, Ad Grants, vídeo novo, deploy e domínio, commit e push.

## Arquivos e rotas (dentro de `landing-page/`)
```
astro.config.mjs        site 'https://ejfgv.com', trailingSlash 'always', redirects
package.json            + script "verificar"
scripts/verificar.mjs
public/                 main.js (refatorado) · favicon.ico da EJ (de ../public/) · robots.txt
src/consts.ts           fonte única de fatos
src/layouts/            Layout.astro · SolucaoLayout.astro
src/components/         PageHeader LeadForm StatsStrip LogoWall CaseCard Depoimentos Metodo CtaBanner Faq Credibilidade ImagemReservada
src/components/{home,sobre,solucoes/<slug>,cases,conteudo}/      exclusivos de cada página
src/pages/              index · sobre-nos · plano-de-negocios · consultoria-mercadologica · consultoria-financeira ·
                        consultoria-operacional · consultoria-business-intelligence · cases-de-sucesso · cases/[slug] ·
                        blog · materiais-ricos                                    ← subagentes
                        contato · politica-de-privacidade · mapa-do-site · 404 · sitemap.xml.ts · llms.txt.ts   ← agente principal
src/styles/styles.css   novo bloco "9. SITE MULTIPÁGINA" no fim
```
- **Remover:**
  - `src/components/Welcome.astro` e `src/assets/`;
  - os favicons do Astro;
  - `public/Gemini_Generated_Image_….jpg`;
  - o README do starter, que dá lugar a um README curto.
- **Redirects:**
  - os do WordPress: `/financeiro/`, `/operacional/` e `/mercadologia/`;
  - `/data-science/` e `/consultoria-data-science/` → BI;
  - `/cases-de-sucesso/2/` → `/cases-de-sucesso/`;
  - os 3 `/materiais-ricos/<slug>/` → `/materiais-ricos/`.

  No modo estático, eles viram meta refresh. O 301 de verdade fica a cargo do host.

## Fase 0: fundação (agente principal, antes dos subagentes)
1. Rodar `npm ci` e o build da LP atual, como linha de base.
2. Fazer a limpeza e configurar o `astro.config.mjs`. Conferir cada opção na doc do Astro 7, como pede o `AGENTS.md`.
3. Criar `src/consts.ts` com:
   - `SITE`;
   - `CONTATO`: comercial@, WhatsApp +55 31 98650-6120, Instagram, LinkedIn, endereço da LP, razão social e CNPJ do site atual ("a confirmar" onde couber);
   - `NUMEROS` e `NAV`;
   - `SOLUCOES` (5): slug, url, nome, descrição, seo, quandoFazSentido, escopo com links cruzados, cases, chamada e ícone;
   - `CASES`: os 8 de `solucoes.mjs`, com `solucoes[]`;
   - `DEPOIMENTOS`: Ricardo Piragini, Isadora Dias Munhoz e os da home atual, buscados via curl;
   - `CITACAO_PROJETO`;
   - `LOGOS` e `LOGOS_PENDENTES` (Docol, Warner Bros, Mandic, Época Cosméticos);
   - `METODO`, `VIDEO_INSTITUCIONAL`, `FORMULARIOS` e `ATUALIZADO_EM`.
4. Escrever o CSS novo, só com tokens existentes:
   - navegação: skip-link e dropdown e menu mobile da `.gz-nav`;
   - estrutura de seções: `.is-button-large`, `.eyebrow` e `.section_page-header(.is-dark)`;
   - marcadores: `.image-placeholder` e `.preencher`;
   - blocos: `.section_faq/.faq_*`, `.tag-chip`, `.metodo_icon`, `.beneficios_banner.is-dark`, colunas do `.footer` e `.whatsapp-float`;
   - formulário: `.form-feedback.is-error`;
   - acessibilidade: `:focus-visible` e `prefers-reduced-motion`.
5. Refatorar o `main.js`. Cada bloco só roda se o elemento existir na página.
   - Cursor.
   - Menu mobile e dropdowns, que fecham com Esc e com clique fora.
   - Vídeo dentro de um `<dialog>`.
   - Depoimentos lidos do DOM: todos no HTML, sem troca automática.
   - Contadores com IntersectionObserver; o valor final já vem no HTML.
   - Pausa da faixa de logos.
   - Máscara em `input[type=tel]`.
   - `form[data-form]` conforme a decisão acima. Ler o endpoint com `getAttribute('action')`, não com `form.action`.
   - Remover o scroll-spy, os dados fixos e a mensagem falsa.
6. Criar os layouts e os componentes compartilhados:
   - `Layout.astro`:
     - pt-BR; título, descrição, canonical e OG; fontes;
     - nav com Soluções e Conteúdo em dropdown e o botão "Fale com um Especialista";
     - footer com links rápidos para Sobre, Serviços, Blog, Contato, Política, Redes e Mapa do Site;
     - WhatsApp flutuante e JSON-LD ProfessionalService.
   - `SolucaoLayout.astro`: o esqueleto das soluções descrito abaixo, mais JSON-LD Service.
   - Componentes compartilhados extraídos do `index.astro`: eles embrulham as classes que já existem (`.resultados_*`, `.slider-clientes_*`, `.case_card`, `.depoimentos_*`, `.metodo_*`, `.beneficios_banner` e `.section_form/.form_*`).
   - `Faq` com `<details>`; o FAQPage só inclui as respostas já preenchidas.
7. Criar as páginas que ficam com o agente principal:
   - `contato`: PageHeader, Metodo e LeadForm;
   - `politica-de-privacidade`: texto atual via curl, com a data 10/11/2022; se o curl falhar, fica um marcador;
   - `mapa-do-site` e `404` (noindex);
   - `sitemap.xml.ts`, `llms.txt.ts` e `public/robots.txt`.
8. Criar os stubs das páginas dos subagentes (Layout e PageHeader) e um `src/pages/kit.astro` temporário com todos os componentes. Conferir com `npm run build` e `astro dev --background`. Extrair do inventário (`site-ejfgv/docs/referencia/inventario-urls.csv`) os 9 posts mais recentes e os 3 e-books para o brief do subagente de Conteúdo.
9. Criar o `scripts/verificar.mjs` (ver Verificação).

## Fase 1: um subagente por página (9 em paralelo)
| Subagente | Pode criar/editar só |
|---|---|
| Home | `src/pages/index.astro`, `src/components/home/*` |
| Sobre | `src/pages/sobre-nos.astro`, `src/components/sobre/*` |
| 5 subagentes de Soluções (Plano de Negócios, Mercadológica, Financeira, Operacional, BI) | `src/pages/<slug>.astro`, `src/components/solucoes/<slug>/*` |
| Cases | `src/pages/cases-de-sucesso.astro`, `src/pages/cases/[slug].astro`, `src/components/cases/*` |
| Conteúdo | `src/pages/blog.astro`, `src/pages/materiais-ricos.astro`, `src/components/conteudo/*` |

**Brief comum**: cada subagente recebe isto mais a seção da sua página.
- **Ler antes:**
  - o docx, com o comando de extração;
  - `consts.ts`, os layouts e as Props dos componentes;
  - o `styles.css`;
  - a LP original, via `git show HEAD:landing-page/src/pages/index.astro`;
  - `site/conteudo/*.mjs`.
- **Conteúdo:**
  - texto em pt-BR, sem nada inventado;
  - números só via `NUMEROS`;
  - lacunas com `.preencher`;
  - nenhuma foto, só `ImagemReservada`;
  - escrever "Business Intelligence", FGV e comercial@;
  - a abertura de cada página responde "o que é, para quem, desde quando";
  - um H1 por página, depois H2 e H3;
  - linguagem simples para PMEs.
- **Design:**
  - só classes do `styles.css` e componentes compartilhados;
  - estilo próprio no `<style>` do componente, usando `var(--token)`, sem hex e sem `style=`;
  - quebras em 1024 e 767 px;
  - respeitar o modo de menos movimento.
- **Técnica:**
  - HTML válido;
  - links internos terminam em `/`;
  - scripts próprios no `<script>` do componente;
  - nenhuma dependência nova.
- **Proibido:** editar arquivos fora da sua lista, rodar `npm install` ou `astro build`/`astro dev`, usar git. Pedidos de mudança em arquivos compartilhados vão no relatório.
- **Entrega:** arquivos criados, marcadores deixados, itens do docx feitos e não feitos, pedidos para os arquivos compartilhados e suposições feitas.

### Home `/`
1. **Hero centralizado** (o docx pede o H1 centralizado e sem a foto laranja):
   - selo "A primeira Empresa Júnior da América Latina · desde 1988";
   - H1 "Consultoria estratégica feita por alunos da FGV", com "+800 projetos entregues";
   - abertura "A EJFGV é a Empresa Júnior da Fundação Getulio Vargas…";
   - 2 CTAs grandes: "Solicite seu diagnóstico gratuito" (vai para `#formulario`) e "Conheça nossas soluções";
   - logos reais;
   - `ImagemReservada` larga para a foto da equipe, com botão de vídeo.
2. **`StatsStrip` animado:** +800 projetos, NPS 90, desde 1988 e 70 setores.
3. **História curta:**
   - título "A PRIMEIRA EMPRESA JÚNIOR DA AMÉRICA LATINA";
   - o texto do docx, com o trecho truncado como marcador;
   - "Transformando realidades de negócios desde 1988";
   - botão "Saiba mais" para `/sobre-nos/`.
4. **Soluções** (seção escura), com as abas `.frentes_tabs`/`.frente_tab` (o CSS já existe). Cada aba traz descrição, quando contratar, escopo e "Quero saber mais".
5. **`Metodo`** logo depois de Soluções, com um ícone por etapa.
6. **`CtaBanner`.**
7. **`LogoWall`:** os logos reais e os 4 pendentes como marcadores.
8. **Prova social:** 3 `CaseCard` com resultados reais, `Depoimentos` e vagas "Depoimento: a preencher".
9. **`Credibilidade`:** FGV, Bain e Brasil Júnior.
10. **"Resultados":** ícone, resultados reais dos cases e CTA.
11. **`Faq`:** rascunhos feitos só com fatos confirmados, marcados "validar".
12. **`LeadForm`**, com prova social ao lado.

### Sobre `/sobre-nos/` (títulos simples)
1. **`PageHeader`**, com foto reservada e vídeo.
2. **Por que a EJFGV**, com o texto de `sobre.mjs`.
3. **Propósito, Visão e 6 valores**, já com **Inovação**. Os "quadradinhos" passam a usar as cores do brandbook.
4. **Linha do tempo** 1967 → 1988 → hoje. Os outros marcos ficam a preencher.
5. **Nosso impacto:** `StatsStrip`, mais os números X/Y/Z do docx e o projeto **Inmar** como marcadores.
6. **`Credibilidade`** e professores mentores (a preencher).
7. **Equipe:** cards com foto reservada e mini-bio a preencher.
8. **Serviços:** 5 cards com link de verdade, o que corrige os itens que pareciam clicáveis mas não levavam a lugar nenhum.
9. **`LogoWall`.**
10. **Banner "Seja consultor EJFGV"**, com os benefícios citados no docx. O link fica a preencher.
11. **`Faq`.**
12. **`CtaBanner`.**

### Soluções: esqueleto do `SolucaoLayout` (fundo geral `--gray50`)
1. **`PageHeader` escuro**: entrada em cinza, títulos maiores e menos cor quente.
   - H1 grande;
   - abertura: o que é, para quem e desde quando;
   - a frase "potência FGV" já corrigida;
   - "Fale com um Especialista" (vai para `#formulario`) e WhatsApp;
   - foto reservada.
2. **`Credibilidade`**, com Brasil Júnior logo abaixo do cabeçalho.
3. **Quando contratar e Benefícios principais.**
4. **Escopo com links cruzados**: por exemplo, "Plano financeiro" leva à Financeira e "Dashboards" leva ao BI.
5. **Slot `especifico`**, para o conteúdo próprio de cada solução.
6. **Prova social:** `StatsStrip`, `LogoWall`, os cases da solução, `Depoimentos` e a citação de Thiago Caruso.
7. **`Metodo`.**
8. **`CtaBanner`**, levando para `#formulario`.
9. **`Faq`** com 4 a 6 perguntas.
10. **`LeadForm`** com o serviço já selecionado.
11. **Outras soluções.**

O que é próprio de cada solução:
- **Plano de Negócios:**
  - seção "O que é necessário para um Plano de Negócios completo", vendendo o serviço completo: pesquisa, MVP explicado sem jargão e os planos operacional, financeiro e de marketing, cada um com link;
  - explicar por que a EJ faz o plano de mercado: diferencial, expertise e metodologia;
  - cases: áudio e Rica Vida.
- **Mercadológica:**
  - URL, title e description do WordPress ficam iguais, porque a página ranqueia;
  - os termos de busca aparecem nos H1 e H2;
  - cases: Ma Cerise e Talent.
- **Financeira:** caixa, custos, precificação, valuation e pitch. Cases: fazenda de café, Comunik e eventos.
- **Operacional:** processos, responsabilidades, dashboards (com link para BI) e cultura. Cases: Menezes e Emídio e Rica Vida.
- **Business Intelligence:** parte da LP original.
  - Os 3 blocos `.beneficios_item` ficam, com as fotos trocadas por espaços reservados.
  - A `.section_icp` também fica.
  - As frentes viram links para as outras soluções.
  - Depoimentos de Ricardo e Isadora.
  - Card "Case de BI: a preencher".
  - Nenhum "Data Science" na página.

### Cases `/cases-de-sucesso/` + `/cases/[slug]/`
- **Listagem:**
  - capa reservada;
  - chips `.tag-chip` com `aria-pressed` nos 6 filtros; sem JS, todos os cases aparecem;
  - cards com o resultado em destaque (o "spoiler");
  - `Depoimentos` e CTA.
- **Detalhe** (as 8 URLs atuais):
  - índice fixo Problema Inicial · Nossa Solução · Resultados Finais, com a seção ativa em destaque;
  - texto com efeito de entrada, desligado no modo de menos movimento;
  - texto integral via curl; se falhar, usar as linhas de `solucoes.mjs` mais um marcador;
  - capa reservada e "Histórias como essa";
  - CTA para `/<solução>/#formulario`;
  - JSON-LD Article.

### Conteúdo `/blog/` + `/materiais-ricos/`
- **`/blog/`:**
  - abertura com propósito comercial;
  - os 9 posts reais mais recentes, com links absolutos para o WordPress;
  - categorias em chips, com "Business Intelligence" no lugar de "Data Science";
  - newsletter "Inscreva-se para receber nossos conteúdos e ficar à frente";
  - `Faq` e CTA comercial.
- **`/materiais-ricos/`:**
  - os 3 e-books reais, com capa reservada e texto via curl, cada um ligado a uma solução: Google Ads → Mercadológica, Power BI → BI, Modelagem → Financeira;
  - formulário antes do download; sem endpoint, mostra o link direto com um aviso honesto;
  - seção `#carta-de-servicos`, montada a partir de `SOLUCOES`, com o PDF a preencher;
  - newsletter e `Faq`.

## Fase 2: integração (agente principal)
1. Esperar os 9 subagentes terminarem e aplicar os pedidos aceitos para os arquivos compartilhados.
2. Rodar `npm run build` e `npm run verificar`.
3. Tratar os erros:
   - erro de conteúdo volta ao subagente dono da página;
   - erro mecânico o agente principal corrige;
   - repetir até passar, no máximo 3 rodadas.
4. Fazer o QA manual e apagar o `kit.astro`.
5. Entregar o relatório de pendências. Commit e push só com pedido explícito.

## Verificação
- **Comando:** `cd landing-page && npm ci && npm run build && npm run verificar`
- **`scripts/verificar.mjs`** lê o `dist/` e não tem dependências. Ele confere:
  - `lang="pt-BR"` e um único `<h1>` por página;
  - title e description únicos, mais canonical;
  - `alt` em toda `<img>`;
  - todo link interno existe e termina em `/`, e toda âncora `#id` existe;
  - JSON-LD válido;
  - termos proibidos: `data science`, `work hard`, `\bUSP\b`, `gemini`, `unsplash`, `700 clientes`, `+500`, `Getúlio`, `contato@ejfgv`, `maior faculdade`, `Astro Basics`, `enviada com sucesso`;
  - cada solução tem `id="formulario"` com `<form>` e pelo menos 2 links para `#formulario`;
  - o consentimento nunca vem marcado (`checked`);
  - os redirects foram gerados;
  - relatório de marcadores por página. Com `--publicar`, falha se sobrar algum.
- **Manual** (`astro dev --background`):
  - larguras de 360, 768, 1024 e 1280 px, com atenção ao menu entre 768 e 1100 px;
  - navegação só pelo teclado: skip-link, dropdowns, Esc no vídeo, abas, chips, FAQ e formulário;
  - modo de menos movimento;
  - o formulário sem endpoint nunca mostra sucesso.

## Pendências para o Marketing (aparecem como marcadores no site)
- **Conteúdo e mídia a enviar:**
  - todas as fotos e o vídeo novo;
  - logos de Docol, Warner Bros, Mandic e Época Cosméticos;
  - depoimentos novos e respostas do FAQ;
  - marcos da linha do tempo, equipe, professores mentores, Inmar e números de impacto;
  - selos e prêmios;
  - Carta de Serviços (PDF).
- **Dados a confirmar:**
  - WhatsApp (DDD 31) e endereço;
  - "+40 professores";
  - Ma Cerise: 1124% ou 1154%;
  - "+800 projetos" ou "+800 clientes";
  - a cor exata do cinza da logo.
- **Decisões pendentes:**
  - qual ferramenta recebe os formulários;
  - GTM e banner de cookies;
  - se os crawlers de IA serão liberados;
  - contraste do eyebrow e dos links em laranja escurecido sobre Menta: 3,58:1, abaixo do AA para texto pequeno;
  - como o `/blog/` vai conviver com o WordPress na troca de domínio. Isso bloqueia a publicação, não o build.
