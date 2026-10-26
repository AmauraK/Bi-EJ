// Conteúdo das páginas de serviço. Cada item gera uma página em public/<url>/index.html.
// A ordem define a ordem em "Outras soluções" e no rodapé.
// `chave` é o valor do desafio no formulário da home (#challenge) e em /?desafio=<chave>#contato.
// Textos derivados de ejfgv.com (27/09/2026); revisar com a EJFGV antes da publicação comercial.

export const cases = {
  audio: {
    titulo: 'Um novo plano de negócios para uma empresa de áudio consolidada no mercado',
    url: '/cases/um-novo-plano-de-negocios-para-uma-empresa-de-audio-consolidada-no-mercado/',
    segmento: 'Musical',
    problema: 'Criar uma plataforma para aquisição rápida de trilhas brancas',
    solucao: 'Plano de negócios e MVP',
    destaque: 'Novo negócio estruturado em 30 dias úteis',
  },
  ricaVida: {
    titulo: 'Ajudando o Rica Vida a tirar um sonho do papel',
    url: '/cases/ajudando-o-rica-vida-a-tirar-um-sonho-do-papel/',
    segmento: 'Saúde e bem-estar',
    problema: 'Gestão operacional e financeira do negócio',
    solucao: 'Plano operacional e financeiro',
    destaque: 'Operação inicial estruturada e viabilidade analisada',
  },
  maCerise: {
    titulo: 'Como a confeitaria Ma Cerise aumentou sua demanda',
    url: '/cases/como-a-confeitaria-ma-cerise-aumentou-em-1124-sua-demanda/',
    segmento: 'Alimentação',
    problema: 'Expandir a clientela de uma confeitaria delivery',
    solucao: 'Plano de marketing',
    destaque: 'Faturamento 10 vezes maior nos 3 meses seguintes',
  },
  talent: {
    titulo: 'Como auxiliamos a Talent Academy a alavancar sua área de marketing e comunicação',
    url: '/cases/como-auxiliamos-a-talent-academy-a-alavancar-sua-area-de-marketing-e-comunicacao/',
    segmento: 'Recursos humanos',
    problema: 'Prospecção de clientes',
    solucao: 'Plano de marketing',
    destaque: 'Do reposicionamento da marca às redes sociais',
  },
  comunik: {
    titulo: 'Como foi conduzida a reestruturação financeira da Comunik',
    url: '/cases/como-foi-conduzida-a-reestruturacao-financeira-da-comunik-para-melhores-resultados/',
    segmento: 'Publicidade e propaganda',
    problema: 'Precificação do serviço e prejuízo financeiro',
    solucao: 'Planilhas de precificação e controle',
    destaque: 'Preços condizentes com as despesas da agência',
  },
  cafe: {
    titulo: 'A análise de viabilidade que evitou um prejuízo de milhões na compra de uma fazenda de café',
    url: '/cases/a-analise-de-viabilidade-que-evitou-um-prejuizo-de-milhoes-de-reais-na-compra-de-uma-fazenda-de-cafe/',
    segmento: 'Agronegócio',
    problema: 'Pouco entendimento sobre o investimento',
    solucao: 'Modelagem financeira',
    destaque: 'Prejuízo de milhões evitado e alternativa rentável indicada',
  },
  eventos: {
    titulo: 'A análise de viabilidade que evitou um prejuízo de milhões em um novo negócio',
    url: '/cases/a-analise-de-viabilidade-que-evitou-um-prejuizo-de-milhoes-de-reais-em-um-novo-negocio/',
    segmento: 'Eventos',
    problema: 'Pouco entendimento sobre o investimento',
    solucao: 'Modelagem financeira',
    destaque: 'Investimento redirecionado para uma alternativa lucrativa',
  },
  menezes: {
    titulo: 'Por que uma reestruturação operacional e financeira foi essencial para a Menezes e Emídio Advogados',
    url: '/cases/por-que-uma-reestruturacao-operacional-e-financeira-foi-essencial-para-a-menezes-e-emidio-advogados/',
    segmento: 'Advocacia',
    problema: 'Processos mal definidos e precificação sem embasamento',
    solucao: 'Plano operacional e financeiro',
    destaque: 'Processos redesenhados, indicadores e precificação automatizada',
  },
};

export const solucoes = [
  {
    chave: 'estrategia',
    url: '/plano-de-negocios/',
    area: 'Plano de Negócios',
    categoria: 'Consultoria estratégica',
    desafio: 'Tirar uma ideia do papel',
    lead: 'Uma boa ideia. Um caminho para acontecer.',
    descricao: 'Construímos com você um plano de negócios completo, com direcionadores estratégicos de curto a longo prazo, como missão, visão e valores. O resultado é uma estratégia clara e sustentável, pronta para os desafios do mercado.',
    seo: {
      titulo: 'Plano de Negócios - EJFGV',
      descricao: 'Estruture um plano de negócios com a EJFGV: análise estratégica, modelagem financeira e visão de mercado para empresas novas e consolidadas.',
    },
    simbolo: '↗',
    legenda: 'Do potencial à direção.',
    tom: '#e8e7df',
    quandoFazSentido: [
      { titulo: 'Testar se a ideia se sustenta', texto: 'Para quem quer saber se existe demanda para um produto ou serviço. Fazemos pesquisas e elaboramos MVPs para testar a ideia antes do investimento.' },
      { titulo: 'Consolidar os fundamentos', texto: 'Comprovada a viabilidade, estruturamos as atividades iniciais, as finanças e a estratégia de marketing para a empresa começar a operar.' },
    ],
    escopo: ['Ideação, viabilidade e pesquisa de mercado', 'Elaboração e acompanhamento de MVP', 'Apresentação para investidores', 'Plano operacional', 'Plano financeiro', 'Plano de marketing'],
    cases: ['audio', 'ricaVida'],
    chamada: 'Tem uma ideia pedindo um plano?',
  },
  {
    chave: 'marketing',
    url: '/consultoria-mercadologica/',
    area: 'Consultoria Mercadológica',
    categoria: 'Consultoria mercadológica',
    desafio: 'Conquistar novos mercados',
    lead: 'Novos mercados. Conexões que fazem sentido.',
    descricao: 'Partimos de uma compreensão profunda do seu público para escolher, com critério, as estratégias de marketing mais eficazes. O processo otimiza custos e prepara lançamentos de alto impacto.',
    seo: {
      titulo: 'Consultoria Mercadológica - EJFGV',
      descricao: 'Consultoria mercadológica focada em análise de viabilidade, pesquisa de mercado e planos de marketing digital. Conheça o serviço da EJFGV.',
    },
    simbolo: '◎',
    legenda: 'De novos olhares a novos mercados.',
    tom: '#e3e8de',
    quandoFazSentido: [
      { titulo: 'Posicionar a marca', texto: 'Para quem quer entender onde se encaixa no mercado, conhecer melhor o público e descobrir oportunidades no próprio setor.' },
      { titulo: 'Vender mais', texto: 'Para quem quer crescer ou ampliar a clientela, com planos de marketing tradicional e digital para divulgar o produto ou serviço.' },
    ],
    escopo: ['Análise de mercado', 'Análise concorrencial', 'Pesquisa de público-alvo', 'Análise de viabilidade', 'Plano de marketing'],
    cases: ['maCerise', 'talent'],
    chamada: 'Qual mercado você quer conquistar?',
  },
  {
    chave: 'financas',
    url: '/consultoria-financeira/',
    area: 'Consultoria Financeira',
    categoria: 'Consultoria financeira',
    desafio: 'Decidir com segurança',
    lead: 'Números claros. Decisões bem fundamentadas.',
    descricao: 'Analisamos os demonstrativos financeiros para encontrar melhorias e oportunidades de redução de custos. Apoiamos a precificação de produtos e serviços, estimamos o valor da empresa e preparamos materiais para captar investimento.',
    seo: {
      titulo: 'Consultoria Financeira - EJFGV',
      descricao: 'Tome boas decisões financeiras. Consultoria financeira com foco em rentabilidade, análise de viabilidade e projeções precisas. Saiba Mais!',
    },
    simbolo: '↗',
    legenda: 'Dos números à clareza.',
    tom: '#e3e7e9',
    quandoFazSentido: [
      { titulo: 'Controlar melhor as finanças', texto: 'Para quem quer entender a saúde da empresa, estruturar demonstrativos de gestão e melhorar as margens.' },
      { titulo: 'Entender rentabilidade e valor', texto: 'Para quem precisa estudar a rentabilidade e o payback do negócio, ou de um valuation para buscar investimento.' },
    ],
    escopo: ['Gestão de caixa', 'Corte de custos', 'Precificação', 'Análise financeira', 'Modelagem financeira', 'Valuation e pitch para investidores'],
    cases: ['cafe', 'comunik', 'eventos'],
    chamada: 'Qual decisão financeira está na sua mesa?',
  },
  {
    chave: 'gestao',
    url: '/consultoria-operacional/',
    area: 'Consultoria Operacional',
    categoria: 'Consultoria operacional',
    desafio: 'Fazer a operação fluir',
    lead: 'Menos obstáculos. Mais espaço para crescer.',
    descricao: 'Definimos processos e funções com mapeamento e matriz de responsabilidades, e entregamos dashboards e instrumentos de controle. Também indicamos o sistema de gestão mais adequado e fortalecemos uma cultura motivadora e inclusiva.',
    seo: {
      titulo: 'Consultoria Operacional - EJFGV',
      descricao: 'Otimize processos e eficiência com a consultoria operacional da EJFGV. Diagnóstico e soluções práticas para resultados reais. Saiba mais!',
    },
    simbolo: '⇄',
    legenda: 'De processos a possibilidades.',
    tom: '#ede2d5',
    quandoFazSentido: [
      { titulo: 'Retomar o controle', texto: 'Para quem sente que está perdendo o controle da empresa: equipe desmotivada, funções sobrepostas ou mal divididas.' },
      { titulo: 'Preparar a operação para crescer', texto: 'Para quem quer rever cada detalhe da operação e deixá-la pronta para expandir e aumentar os resultados.' },
    ],
    escopo: ['Mapeamento de processos', 'Dashboards', 'Reformulação cultural', 'Estruturação de áreas', 'Definição de sistema', 'Benchmarks com especialistas'],
    cases: ['menezes', 'ricaVida'],
    chamada: 'O que está travando a sua operação?',
  },
  {
    chave: 'dados',
    url: '/consultoria-data-science/',
    area: 'Consultoria Data Science',
    categoria: 'Data science',
    desafio: 'Encontrar respostas nos dados',
    lead: 'Dados dispersos. Respostas conectadas.',
    descricao: 'Fazemos análises descritivas e preditivas para embasar decisões estratégicas. Com experiência em clusterização e análise de sentimentos, ajudamos sua empresa a chegar a resultados orientados por dados.',
    seo: {
      titulo: 'Consultoria Data Science - EJFGV',
      descricao: 'Compreenda as principais variáveis do seu negócio e obtenha insights pela análise de dados. Conheça a consultoria em Data Science da EJFGV.',
    },
    simbolo: '✳',
    legenda: 'Da informação à perspectiva.',
    tom: '#e5e2e9',
    quandoFazSentido: [
      { titulo: 'Decidir com respaldo de dados', texto: 'Para quem quer crescer com planos de ação embasados na análise de dados, inclusive de fontes externas ao negócio.' },
      { titulo: 'Entender as variáveis do negócio', texto: 'Para quem quer otimizar atividades com a modelagem das variáveis que mais pesam, ganhando eficiência e cortando custos.' },
    ],
    escopo: ['Análises descritivas', 'Análises preditivas', 'Clusterização', 'Análise do perfil do consumidor'],
    cases: [],
    chamada: 'Quais perguntas os seus dados podem responder?',
  },
];

// Etapas aprovadas na seção "Como fazemos" da home (recursos/js/inicio.js).
export const etapas = [
  { nome: 'Escutar', titulo: 'Antes das respostas, as perguntas certas.', texto: 'Uma conversa para entender seu momento, seus objetivos e os desafios que precisam de atenção.' },
  { nome: 'Conectar', titulo: 'Seu contexto. Nossa perspectiva.', texto: 'Conectamos o que aprendemos sobre o seu negócio ao conhecimento e às ferramentas que podem ajudar a transformá-lo.' },
  { nome: 'Construir', titulo: 'Da investigação às escolhas concretas.', texto: 'Analisamos possibilidades, discutimos caminhos e construímos entregas alinhadas aos objetivos do projeto.' },
  { nome: 'Impulsionar', titulo: 'O projeto termina. O movimento continua.', texto: 'Apresentamos as entregas e as recomendações para que sua equipe tenha clareza sobre os próximos passos.' },
];

// Depoimento publicado nas páginas de serviço de ejfgv.com. Confirmar se segue atual.
export const depoimentoProjeto = {
  texto: 'Os projetos têm em média 3 meses e, durante esse período, a gente busca o maior alinhamento possível com o cliente e realiza um processo muito intenso de cocriação.',
  autor: 'Thiago Caruso',
  cargo: 'Coordenador de Projetos',
};
