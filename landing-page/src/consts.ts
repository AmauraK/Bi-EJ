// Fonte única de fatos do site. Nada aqui é inventado: cada dado indica de onde veio.
// Fontes: docx "EJFGV Mudanças Site" (verdade), legado em ../site/conteudo/*.mjs, a LP original
// (git show HEAD:landing-page/src/pages/index.astro) e o site atual ejfgv.com (26/10/2026).
import equipeCompleta from './assets/fotos/equipe-completa.jpg';
import equipeEscadaria from './assets/fotos/equipe-escadaria.jpg';
import equipeConvite from './assets/fotos/equipe-convite.jpg';
import consultoresNotebook from './assets/fotos/consultores-notebook.jpg';
import consultorasDocumento from './assets/fotos/consultoras-documento.jpg';
import equipeAuditorio from './assets/fotos/equipe-auditorio.jpg';
import retratoAuditorio1 from './assets/fotos/retrato-auditorio-1.jpg';
import retratoAuditorio2 from './assets/fotos/retrato-auditorio-2.jpg';
import retratoAuditorio3 from './assets/fotos/retrato-auditorio-3.jpg';
import retratoAuditorio4 from './assets/fotos/retrato-auditorio-4.jpg';
// Reunião de trabalho (IMG_4709): já vinha otimizada do site estático, em public/fotos/img-4709-2400.webp
import equipeReuniao from './assets/fotos/equipe-reuniao.webp';

export const CDN = 'https://cdn.prod.website-files.com/67184b3e7b6cf7353f064e7a';

// Fotos reais da equipe: originais na raiz do repositório, reduzidas para src/assets/fotos (o Astro gera
// WebP no build). `posicao` é o object-position do recorte no quadro do cabeçalho.
export interface Foto {
  src: ImageMetadata;
  alt: string;
  posicao?: string;
}

export const FOTOS = {
  equipeCompleta: { src: equipeCompleta, alt: 'Equipe atual da EJFGV reunida em uma escadaria ao ar livre', posicao: 'center 55%' },
  equipeEscadaria: { src: equipeEscadaria, alt: 'Consultores da EJFGV reunidos ao ar livre', posicao: 'center 70%' },
  equipeConvite: { src: equipeConvite, alt: 'Consultores da EJFGV sorrindo e apontando para a câmera', posicao: 'center 60%' },
  consultoresNotebook: { src: consultoresNotebook, alt: 'Quatro consultores da EJFGV analisando dados juntos em um notebook', posicao: 'center 45%' },
  consultorasDocumento: { src: consultorasDocumento, alt: 'Duas consultoras da EJFGV revisando um documento de projeto', posicao: 'center 52%' },
  equipeAuditorio: { src: equipeAuditorio, alt: 'Consultores da EJFGV reunidos em um auditório de poltronas laranja', posicao: 'center 52%' },
  // Retratos recortados da mesma foto do auditório (IMG_4043), um rosto por quadro
  retratoAuditorio1: { src: retratoAuditorio1, alt: 'Consultor da EJFGV sorrindo' },
  retratoAuditorio2: { src: retratoAuditorio2, alt: 'Consultora da EJFGV sorrindo' },
  retratoAuditorio3: { src: retratoAuditorio3, alt: 'Consultor da EJFGV de óculos sorrindo' },
  retratoAuditorio4: { src: retratoAuditorio4, alt: 'Consultora da EJFGV sorrindo' },
  equipeReuniao: { src: equipeReuniao, alt: 'Quatro consultores da EJFGV em reunião de trabalho, com notebooks e documentos sobre a mesa' },
} satisfies Record<string, Foto>;

export const SITE = {
  nome: 'EJFGV',
  nomeCompleto: 'Empresa Júnior da Fundação Getulio Vargas',
  url: 'https://ejfgv.com',
  proposito: 'Transformar realidades',
  logo: `${CDN}/671fb0e60ebabd3e4785e9ab_EJFGV-darktheme.svg`,
};

export const CONTATO = {
  email: 'comercial@ejfgv.com',
  whatsapp: '+55 31 98650-6120', // a confirmar (DDD 31)
  whatsappUrl: 'https://wa.me/5531986506120',
  instagram: 'https://www.instagram.com/ejfgv/',
  linkedin: 'https://www.linkedin.com/company/ejfgv/',
  endereco: 'Av. Nove de Julho, 2029 (FGV EAESP)', // da LP; a confirmar
  razaoSocial: 'Empresa Júnior Associação Civil', // rodapé e política do site atual
  cnpj: '61.846.754/0001-00', // rodapé do site atual
};

export const NUMEROS = {
  projetos: 800, // docx: "+800 projetos"
  nps: 90, // docx: NPS médio hoje é 90
  npsAno: 2026,
  fundacao: 1988, // docx
  anos: new Date().getFullYear() - 1988, // calculado no build
  setores: 70, // LP
  professores: 40, // site atual: "+40 professores renomados da FGV"; a confirmar
  prazoMedioMeses: 3, // citação de Thiago Caruso (legado)
  retornoDiasUteis: 1, // LP: "retorno em até 1 dia útil"
};

export interface ItemEscopo {
  item: string;
  href?: string;
}

export interface Solucao {
  slug: string;
  url: string;
  nome: string;
  rotulo: string; // nome curto (filtros, abas)
  descricao: string;
  seo: { titulo: string; descricao: string };
  quandoFazSentido: { titulo: string; texto: string }[];
  escopo: ItemEscopo[];
  cases: string[]; // slugs de CASES
  chamada: string;
  icone: string;
}

// Textos de ../site/conteudo/solucoes.mjs. "Data Science" passou a "Business Intelligence" (docx).
export const SOLUCOES: Solucao[] = [
  {
    slug: 'plano-de-negocios',
    url: '/plano-de-negocios/',
    nome: 'Plano de Negócios',
    rotulo: 'Plano de Negócios',
    descricao: 'Construímos com você um plano de negócios completo, com direcionadores estratégicos de curto a longo prazo, como missão, visão e valores. O resultado é uma estratégia clara e sustentável, pronta para os desafios do mercado.',
    seo: {
      titulo: 'Plano de Negócios - EJFGV',
      descricao: 'Estruture um plano de negócios com a EJFGV: análise estratégica, modelagem financeira e visão de mercado para empresas novas e consolidadas.',
    },
    quandoFazSentido: [
      { titulo: 'Testar se a ideia se sustenta', texto: 'Para quem quer saber se existe demanda para um produto ou serviço. Fazemos pesquisas e elaboramos MVPs para testar a ideia antes do investimento.' },
      { titulo: 'Consolidar os fundamentos', texto: 'Comprovada a viabilidade, estruturamos as atividades iniciais, as finanças e a estratégia de marketing para a empresa começar a operar.' },
    ],
    escopo: [
      { item: 'Ideação, viabilidade e pesquisa de mercado' },
      { item: 'Elaboração e acompanhamento de MVP' },
      { item: 'Apresentação para investidores' },
      { item: 'Plano operacional', href: '/consultoria-operacional/' },
      { item: 'Plano financeiro', href: '/consultoria-financeira/' },
      { item: 'Plano de marketing', href: '/consultoria-mercadologica/' },
    ],
    cases: ['um-novo-plano-de-negocios-para-uma-empresa-de-audio-consolidada-no-mercado', 'ajudando-o-rica-vida-a-tirar-um-sonho-do-papel'],
    chamada: 'Tem uma ideia pedindo um plano?',
    icone: `${CDN}/672a37aed9b0d27f7453d2a3_novas-icon.svg`,
  },
  {
    slug: 'consultoria-mercadologica',
    url: '/consultoria-mercadologica/',
    nome: 'Consultoria Mercadológica',
    rotulo: 'Mercadológica',
    descricao: 'Partimos de uma compreensão profunda do seu público para escolher, com critério, as estratégias de marketing mais eficazes. O processo otimiza custos e prepara lançamentos de alto impacto.',
    seo: {
      titulo: 'Consultoria Mercadológica - EJFGV',
      descricao: 'Consultoria mercadológica focada em análise de viabilidade, pesquisa de mercado e planos de marketing digital. Conheça o serviço da EJFGV.',
    },
    quandoFazSentido: [
      { titulo: 'Posicionar a marca', texto: 'Para quem quer entender onde se encaixa no mercado, conhecer melhor o público e descobrir oportunidades no próprio setor.' },
      { titulo: 'Vender mais', texto: 'Para quem quer crescer ou ampliar a clientela, com planos de marketing tradicional e digital para divulgar o produto ou serviço.' },
    ],
    escopo: [
      { item: 'Análise de mercado' },
      { item: 'Análise concorrencial' },
      { item: 'Pesquisa de público-alvo' },
      { item: 'Análise de viabilidade' },
      { item: 'Plano de marketing' },
    ],
    cases: ['como-a-confeitaria-ma-cerise-aumentou-em-1124-sua-demanda', 'como-auxiliamos-a-talent-academy-a-alavancar-sua-area-de-marketing-e-comunicacao'],
    chamada: 'Qual mercado você quer conquistar?',
    icone: `${CDN}/672a37adab06278a78107c4a_expansao-icon.svg`,
  },
  {
    slug: 'consultoria-financeira',
    url: '/consultoria-financeira/',
    nome: 'Consultoria Financeira',
    rotulo: 'Financeira',
    descricao: 'Analisamos os demonstrativos financeiros para encontrar melhorias e oportunidades de redução de custos. Apoiamos a precificação de produtos e serviços, estimamos o valor da empresa e preparamos materiais para captar investimento.',
    seo: {
      titulo: 'Consultoria Financeira - EJFGV',
      descricao: 'Tome boas decisões financeiras. Consultoria financeira com foco em rentabilidade, análise de viabilidade e projeções precisas. Saiba Mais!',
    },
    quandoFazSentido: [
      { titulo: 'Controlar melhor as finanças', texto: 'Para quem quer entender a saúde da empresa, estruturar demonstrativos de gestão e melhorar as margens.' },
      { titulo: 'Entender rentabilidade e valor', texto: 'Para quem precisa estudar a rentabilidade e o payback do negócio, ou de um valuation para buscar investimento.' },
    ],
    escopo: [
      { item: 'Gestão de caixa' },
      { item: 'Corte de custos' },
      { item: 'Precificação' },
      { item: 'Análise financeira' },
      { item: 'Modelagem financeira' },
      { item: 'Valuation e pitch para investidores' },
    ],
    cases: [
      'a-analise-de-viabilidade-que-evitou-um-prejuizo-de-milhoes-de-reais-na-compra-de-uma-fazenda-de-cafe',
      'como-foi-conduzida-a-reestruturacao-financeira-da-comunik-para-melhores-resultados',
      'a-analise-de-viabilidade-que-evitou-um-prejuizo-de-milhoes-de-reais-em-um-novo-negocio',
    ],
    chamada: 'Qual decisão financeira está na sua mesa?',
    icone: `${CDN}/671c65bcad794eb512f4b579_visibility-icon.svg`,
  },
  {
    slug: 'consultoria-operacional',
    url: '/consultoria-operacional/',
    nome: 'Consultoria Operacional',
    rotulo: 'Operacional',
    descricao: 'Definimos processos e funções com mapeamento e matriz de responsabilidades, e entregamos dashboards e instrumentos de controle. Também indicamos o sistema de gestão mais adequado e fortalecemos uma cultura motivadora e inclusiva.',
    seo: {
      titulo: 'Consultoria Operacional - EJFGV',
      descricao: 'Otimize processos e eficiência com a consultoria operacional da EJFGV. Diagnóstico e soluções práticas para resultados reais. Saiba mais!',
    },
    quandoFazSentido: [
      { titulo: 'Retomar o controle', texto: 'Para quem sente que está perdendo o controle da empresa: equipe desmotivada, funções sobrepostas ou mal divididas.' },
      { titulo: 'Preparar a operação para crescer', texto: 'Para quem quer rever cada detalhe da operação e deixá-la pronta para expandir e aumentar os resultados.' },
    ],
    escopo: [
      { item: 'Mapeamento de processos' },
      { item: 'Dashboards', href: '/consultoria-business-intelligence/' },
      { item: 'Reformulação cultural' },
      { item: 'Estruturação de áreas' },
      { item: 'Definição de sistema' },
      { item: 'Benchmarks com especialistas' },
    ],
    cases: [
      'por-que-uma-reestruturacao-operacional-e-financeira-foi-essencial-para-a-menezes-e-emidio-advogados',
      'ajudando-o-rica-vida-a-tirar-um-sonho-do-papel',
    ],
    chamada: 'O que está travando a sua operação?',
    icone: `${CDN}/671c65bc0ece9976827460a6_speed-icon.svg`,
  },
  {
    slug: 'consultoria-business-intelligence',
    url: '/consultoria-business-intelligence/',
    nome: 'Consultoria de Business Intelligence',
    rotulo: 'Business Intelligence',
    // PRO-20: a área de BI hoje entrega 3 frentes (Power BI, sites com chatbot e automações). Fonte: brief PRO-20.
    descricao: 'Dashboards em Power BI para a gestão financeira e operacional, sites com chatbot e integrações, e automações com n8n e IA. Dados, sites e automações para a sua empresa decidir e operar melhor.',
    seo: {
      titulo: 'Business Intelligence, Sites e Automações - EJFGV',
      descricao: 'Dashboards em Power BI, sites com chatbot e automações com n8n e IA para pequenas e médias empresas. Feito por alunos da FGV. Agende um diagnóstico gratuito.',
    },
    quandoFazSentido: [
      { titulo: 'Decidir com os números na mão', texto: 'Para quem quer acompanhar vendas, custos, metas e caixa em painéis claros, sem juntar planilhas.' },
      { titulo: 'Atender e operar com menos esforço', texto: 'Para quem quer um site que capta clientes e quer tirar do caminho as tarefas repetitivas do time.' },
    ],
    escopo: [
      { item: 'Dashboards em Power BI', href: '/consultoria-business-intelligence/#dashboards' },
      { item: 'Sites com chatbot e integrações', href: '/consultoria-business-intelligence/#sites' },
      { item: 'Automações com n8n e IA', href: '/consultoria-business-intelligence/#automacoes' },
    ],
    cases: [],
    chamada: 'O que dados, um site ou uma automação mudariam na sua empresa?',
    icone: `${CDN}/672a37ae7609689739689139_transformacao-digital-icon.svg`,
  },
];

export interface Case {
  slug: string;
  url: string;
  cliente: string;
  titulo: string;
  segmento: string;
  problema: string;
  solucao: string;
  destaque: string;
  solucoes: string[]; // slugs de SOLUCOES
}

// Os 8 cases de ../site/conteudo/solucoes.mjs, com as URLs atuais de ejfgv.com.
export const CASES: Case[] = [
  {
    slug: 'um-novo-plano-de-negocios-para-uma-empresa-de-audio-consolidada-no-mercado',
    url: '/cases/um-novo-plano-de-negocios-para-uma-empresa-de-audio-consolidada-no-mercado/',
    cliente: 'Empresa de áudio',
    titulo: 'Um novo plano de negócios para uma empresa de áudio consolidada no mercado',
    segmento: 'Musical',
    problema: 'Criar uma plataforma para aquisição rápida de trilhas brancas',
    solucao: 'Plano de negócios e MVP',
    destaque: 'Novo negócio estruturado em 30 dias úteis',
    solucoes: ['plano-de-negocios'],
  },
  {
    slug: 'ajudando-o-rica-vida-a-tirar-um-sonho-do-papel',
    url: '/cases/ajudando-o-rica-vida-a-tirar-um-sonho-do-papel/',
    cliente: 'Rica Vida',
    titulo: 'Ajudando o Rica Vida a tirar um sonho do papel',
    segmento: 'Saúde e bem-estar',
    problema: 'Gestão operacional e financeira do negócio',
    solucao: 'Plano operacional e financeiro',
    destaque: 'Operação inicial estruturada e viabilidade analisada',
    solucoes: ['plano-de-negocios', 'consultoria-operacional'],
  },
  {
    slug: 'como-a-confeitaria-ma-cerise-aumentou-em-1124-sua-demanda',
    url: '/cases/como-a-confeitaria-ma-cerise-aumentou-em-1124-sua-demanda/',
    cliente: 'Confeitaria Ma Cerise',
    titulo: 'Como a confeitaria Ma Cerise aumentou sua demanda',
    segmento: 'Alimentação',
    problema: 'Expandir a clientela de uma confeitaria delivery',
    solucao: 'Plano de marketing',
    // a confirmar: docx e depoimento dizem +1154% de demanda; título/URL do case dizem 1124%.
    destaque: 'Faturamento 10 vezes maior nos 3 meses seguintes',
    solucoes: ['consultoria-mercadologica'],
  },
  {
    slug: 'como-auxiliamos-a-talent-academy-a-alavancar-sua-area-de-marketing-e-comunicacao',
    url: '/cases/como-auxiliamos-a-talent-academy-a-alavancar-sua-area-de-marketing-e-comunicacao/',
    cliente: 'Talent Academy',
    titulo: 'Como auxiliamos a Talent Academy a alavancar sua área de marketing e comunicação',
    segmento: 'Recursos humanos',
    problema: 'Prospecção de clientes',
    solucao: 'Plano de marketing',
    destaque: 'Do reposicionamento da marca às redes sociais',
    solucoes: ['consultoria-mercadologica'],
  },
  {
    slug: 'como-foi-conduzida-a-reestruturacao-financeira-da-comunik-para-melhores-resultados',
    url: '/cases/como-foi-conduzida-a-reestruturacao-financeira-da-comunik-para-melhores-resultados/',
    cliente: 'Comunik',
    titulo: 'Como foi conduzida a reestruturação financeira da Comunik',
    segmento: 'Publicidade e propaganda',
    problema: 'Precificação do serviço e prejuízo financeiro',
    solucao: 'Planilhas de precificação e controle',
    destaque: 'Preços condizentes com as despesas da agência',
    solucoes: ['consultoria-financeira'],
  },
  {
    slug: 'a-analise-de-viabilidade-que-evitou-um-prejuizo-de-milhoes-de-reais-na-compra-de-uma-fazenda-de-cafe',
    url: '/cases/a-analise-de-viabilidade-que-evitou-um-prejuizo-de-milhoes-de-reais-na-compra-de-uma-fazenda-de-cafe/',
    cliente: 'Fazenda de café',
    titulo: 'A análise de viabilidade que evitou um prejuízo de milhões na compra de uma fazenda de café',
    segmento: 'Agronegócio',
    problema: 'Pouco entendimento sobre o investimento',
    solucao: 'Modelagem financeira',
    destaque: 'Prejuízo de milhões evitado e alternativa rentável indicada',
    solucoes: ['consultoria-financeira'],
  },
  {
    slug: 'a-analise-de-viabilidade-que-evitou-um-prejuizo-de-milhoes-de-reais-em-um-novo-negocio',
    url: '/cases/a-analise-de-viabilidade-que-evitou-um-prejuizo-de-milhoes-de-reais-em-um-novo-negocio/',
    cliente: 'Novo negócio de eventos',
    titulo: 'A análise de viabilidade que evitou um prejuízo de milhões em um novo negócio',
    segmento: 'Eventos',
    problema: 'Pouco entendimento sobre o investimento',
    solucao: 'Modelagem financeira',
    destaque: 'Investimento redirecionado para uma alternativa lucrativa',
    solucoes: ['consultoria-financeira'],
  },
  {
    slug: 'por-que-uma-reestruturacao-operacional-e-financeira-foi-essencial-para-a-menezes-e-emidio-advogados',
    url: '/cases/por-que-uma-reestruturacao-operacional-e-financeira-foi-essencial-para-a-menezes-e-emidio-advogados/',
    cliente: 'Menezes e Emídio Advogados',
    titulo: 'Por que uma reestruturação operacional e financeira foi essencial para a Menezes e Emídio Advogados',
    segmento: 'Advocacia',
    problema: 'Processos mal definidos e precificação sem embasamento',
    solucao: 'Plano operacional e financeiro',
    destaque: 'Processos redesenhados, indicadores e precificação automatizada',
    solucoes: ['consultoria-operacional'],
  },
];

export interface Depoimento {
  texto: string;
  autor: string;
  cargo?: string;
  imagem?: string;
  video?: string;
}

// Ricardo e Isadora: LP original (foto e vídeo reais). Os outros 3: home atual de ejfgv.com (logo do cliente).
export const DEPOIMENTOS: Depoimento[] = [
  {
    texto: 'Eles nos entregaram trabalhos de qualidade e recomendamos a EJFGV. Você não vai se arrepender!',
    autor: 'Ricardo Piragini',
    cargo: 'Sócio Sênior, Britânia Propriedade Intelectual',
    imagem: `${CDN}/671fa2204cbce7ba18851675_Ricardo%20Piragini.avif`,
    video: 'https://player.vimeo.com/video/1040821356?autoplay=1',
  },
  {
    texto: 'Desenvolveram o trabalho de forma célere, próxima e eficaz. Atendimento essencial para o desenvolvimento do escritório.',
    autor: 'Isadora Dias Munhoz',
    cargo: 'Fundadora, Dias Munhoz Advogados',
    imagem: `${CDN}/674091c31d9d903e53c981b6_depoimento-dias-munhoz.avif`,
    video: 'https://player.vimeo.com/video/1040826286?autoplay=1',
  },
  {
    texto: 'Belo trabalho realizado pela EJ em nossa empresa. Garra e motivação dos consultores contagiaram toda a empresa e nos conduziram a um ganho imediato pessoal elevando nosso faturamento em quase 20%.',
    autor: 'M Cassavia',
    imagem: 'https://b3068395.assetcdn.net/3068395/wp-content/uploads/2023/05/oie_transparent.png.webp?lossy=2&strip=1&webp=1',
  },
  {
    texto: 'A EJFGV aumentou em 1154% a nossa demanda nos 3 meses seguintes ao projeto, aumentando em 10X o faturamento.',
    autor: 'Confeitaria Ma Cerise',
    imagem: 'https://b3068395.assetcdn.net/3068395/wp-content/uploads/2023/05/oie_c7fzwrhbHqaJ.png.webp?lossy=2&strip=1&webp=1',
  },
  {
    texto: 'O projeto já foi 100% implementado. A cada entrega que fizeram, os consultores implementaram os planos de ação, seguindo à risca absolutamente tudo que a equipe passou!',
    autor: 'Talent Academy',
    imagem: 'https://b3068395.assetcdn.net/3068395/wp-content/uploads/2023/05/talent.png.webp?lossy=2&strip=1&webp=1',
  },
];

// Legado: publicado nas páginas de serviço de ejfgv.com.
export const CITACAO_PROJETO = {
  texto: 'Os projetos têm em média 3 meses e, durante esse período, a gente busca o maior alinhamento possível com o cliente e realiza um processo muito intenso de cocriação.',
  autor: 'Thiago Caruso',
  cargo: 'Coordenador de Projetos',
};

// Logos reais de clientes da LP original (CDN Webflow da EJ).
export const LOGOS = [
  { nome: 'TAM', src: `${CDN}/671f957f378760676376bcf1_tam-cor.svg` },
  { nome: 'Ambev', src: `${CDN}/671f957fc021fe1c6065785f_ambev-cor.svg` },
  { nome: 'Minerva Foods', src: `${CDN}/671f957f3bedd55c1b0c3e04_minervafoods-cor.svg` },
  { nome: 'Stone', src: `${CDN}/671f957fba043215ff0970c6_stone-cor.svg` },
  { nome: 'Samsung', src: `${CDN}/671f957f4e386ac26658a09a_samsung-cor.svg` },
  { nome: 'Votorantim', src: `${CDN}/671fe227bb810f49c0c556fc_votorantim-cor.svg` },
  { nome: 'Vigor', src: `${CDN}/672a0fa7d3465018106d967e_vigor-cor.svg` },
  { nome: 'Serasa', src: `${CDN}/672a0fa7ca6dc409900b584f_serasa-cor.png` },
  { nome: 'Oggi', src: `${CDN}/672a0fa756c652ecd3e46f9b_oggi-cor.svg` },
  { nome: 'Dengo', src: `${CDN}/672a0fa77776bc9906360bc0_dengo-cor.svg` },
  { nome: 'Braskem', src: `${CDN}/672a0fa8abbe0135296c278b_braskem-cor.svg` },
  { nome: 'Rappi', src: `${CDN}/672a0fa8c18ea7082c3958e3_rappi-cor.svg` },
  { nome: 'Sem Parar', src: `${CDN}/672a0fa85fce87be2cbd758d_sem%20parar-cor.svg` },
  { nome: 'Natura', src: `${CDN}/672a0fa8038f40e48b590c3b_natura-cor.svg` },
  { nome: 'Faber-Castell', src: `${CDN}/672a0faa28416fb4936c0982_faber%20castell-cor.svg` },
  { nome: 'Mondelez', src: `${CDN}/672a0faa796590697d979385_mondelez-cor.svg` },
];

// docx: logos a incluir, com fundo transparente. Arquivos ainda não recebidos.
export const LOGOS_PENDENTES = ['Docol', 'Warner Bros', 'Mandic', 'Época Cosméticos'];

// docx: Contato → Diagnóstico → Proposta → Projeto. Textos da LP original.
export const METODO = [
  { nome: 'Contato', texto: 'Onde ocorre o primeiro alinhamento da sua necessidade com o nosso time comercial.' },
  { nome: 'Diagnóstico', texto: 'Identificamos dores, desafios e oportunidades através de uma reunião gratuita de diagnóstico.' },
  { nome: 'Proposta', texto: 'Apresentação de escopo, prazos e soluções personalizadas para a realidade da sua empresa.' },
  { nome: 'Projeto', texto: 'Execução do projeto acompanhada por professores da FGV com implementação prática.' },
];

// Vídeo atual da LP, até o vídeo institucional novo chegar (docx pede refazer).
export const VIDEO_INSTITUCIONAL = {
  url: 'https://player.vimeo.com/video/1040818556?autoplay=1',
  duracao: '1:45',
};

// Endpoints dos formulários. Vazios = integração ainda não definida (decisão de 26/10/2026).
export const FORMULARIOS = {
  contato: '',
  material: '',
  newsletter: '',
};

export const NAV = [
  { rotulo: 'Sobre', href: '/sobre-nos/' },
  { rotulo: 'Soluções', itens: SOLUCOES.map((s) => ({ rotulo: s.nome, href: s.url })) },
  { rotulo: 'Cases de Sucesso', href: '/cases-de-sucesso/' },
  {
    rotulo: 'Conteúdo',
    itens: [
      { rotulo: 'Blog', href: '/blog/' },
      { rotulo: 'Materiais Ricos', href: '/materiais-ricos/' },
    ],
  },
];

export const ATUALIZADO_EM = '2026-10-26';
