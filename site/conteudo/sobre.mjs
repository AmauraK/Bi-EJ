// Conteúdo da página Sobre (/sobre-nos/). Textos de ejfgv.com/sobre-nos/ (27/09/2026).
// Revisar com a EJFGV: os números de "Hoje" são de 2023.
// A seção de reconhecimentos do site atual foi retirada a pedido do usuário; não reinserir.

export const sobre = {
  seo: {
    titulo: 'Sobre nós - EJFGV',
    descricao: 'Conheça a Empresa Júnior FGV: alunos da FGV que fazem consultoria estratégica para pequenas e médias empresas desde 1988.',
  },
  tom: '#ece3d8',
  titulo: 'Conheça a empresa júnior',
  objetivo: 'Nosso objetivo é impulsionar o crescimento de pequenas e médias empresas, promovendo a construção colaborativa de conhecimento e garantindo a excelência técnica da FGV.',

  // Os trechos entre [colchetes] estavam em negrito no site atual e recebem o marca-texto.
  porQue: [
    'Somos uma consultoria estratégica composta por alunos de todos os cursos de graduação da FGV, focada em [impulsionar o crescimento] de pequenas e médias empresas, gerando [impacto positivo] na sociedade. Nosso objetivo é ambicioso: aspiramos alcançar a [excelência] de uma empresa sênior mesmo sendo jovens empreendedores.',
    'Nossa equipe é formada por indivíduos apaixonados, preocupados com o [crescimento mútuo], e com a determinação de entregar [resultados de qualidade], satisfação e implementação comparáveis ao nível de qualquer outra empresa sênior.',
  ],

  proposito: 'Transformar realidades.',
  visao: 'Gerar valor para nossos clientes, membros e parceiros por meio de projetos de consultoria estratégica que proporcionam resultados significativos e duradouros.',
  valores: ['Foco no cliente', 'Ir além', 'Sentimento de dono', 'Comunidade', 'Work hard, play harder', 'Inconformismo'],

  // O rótulo aparece no odômetro; todos têm 4 caracteres para as colunas girarem juntas.
  historia: [
    { rotulo: '1967', titulo: 'O início', texto: 'Alunos da ESSEC (École Supérieure des Sciences Économiques et Commerciales), em Paris, fundaram a primeira empresa júnior do mundo, a ESSEC Conseil, para colocar em prática o conhecimento que acumulavam em sala de aula.' },
    { rotulo: '1988', titulo: 'Fundação', texto: 'Nós, da Empresa Júnior Fundação Getulio Vargas, tivemos o privilégio de ser a empresa pioneira do MEJ (Movimento Empresa Júnior) na América Latina, dando início a uma onda de inovação no país.' },
    { rotulo: 'Hoje', titulo: 'O movimento', texto: 'Hoje o movimento envolve mais de 900 empresas juniores e já faturou mais de 23 milhões de reais. A EJFGV se mantém como referência no movimento, com resultados grandiosos em seus projetos de consultoria estratégica.', nota: 'Números de 2023.' },
  ],

  // Caixa da abertura: cada clique solta uma foto, nesta ordem. Para incluir uma foto, otimize com a skill
  // otimizar-foto e acrescente um item. foto = slug em public/fotos/<slug>-<largura>.webp; alt descreve a cena
  // para leitores de tela; legenda aparece no cartão (curta, até ~40 caracteres). enquadramento (opcional) é o
  // object-position do recorte 4:3, por exemplo '50% 25%' para retratos.
  // As 3 fotos abaixo são provisórias, até chegarem as fotos novas de membros e da EJ.
  caixa: [
    { foto: 'img-4644', alt: 'Equipe trabalhando em conjunto diante de um computador', legenda: 'Conhecimento que se constrói em conjunto.' },
    { foto: 'img-4709', alt: 'Integrantes da EJFGV em uma reunião', legenda: 'Cada conversa abre uma nova perspectiva.' },
    { foto: 'img-4732', alt: 'Integrantes da equipe da EJFGV reunidos', legenda: 'Gente que soma. Juntos, vamos além.' },
  ],
};
