// Barra de navegação. Segue a árvore de páginas do WordPress (docs/referencia/MAPA_SITE.md).
//
// Um item só entra no menu quando a sua página já existe no site novo. Enquanto não existe,
// usa a seção `provisorio` da home (se houver) ou fica de fora. Assim, ao gerar
// /cases-de-sucesso/, /sobre-nos/, /blog/ etc., o menu se completa sozinho.
//
// `solucoes: true` monta o submenu a partir de site/conteudo/solucoes.mjs.
export const navegacao = [
  { rotulo: 'Soluções', solucoes: true, provisorio: 'solucoes' },
  { rotulo: 'Cases', url: '/cases-de-sucesso/', prefixo: '/cases/' },
  { rotulo: 'Sobre', url: '/sobre-nos/' },
  {
    rotulo: 'Conteúdos',
    itens: [
      { rotulo: 'Blog', url: '/blog/' },
      { rotulo: 'Materiais ricos', url: '/materiais-ricos/' },
    ],
  },
];
