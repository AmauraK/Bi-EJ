// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://ejfgv.com',
  trailingSlash: 'always',
  redirects: {
    '/financeiro/': '/consultoria-financeira/',
    '/operacional/': '/consultoria-operacional/',
    '/mercadologia/': '/consultoria-mercadologica/',
    '/data-science/': '/consultoria-business-intelligence/',
    '/consultoria-data-science/': '/consultoria-business-intelligence/',
    '/cases-de-sucesso/2/': '/cases-de-sucesso/',
    '/materiais-ricos/power-bi-instrucoes-para-iniciante/': '/materiais-ricos/',
    '/materiais-ricos/projecoes-e-modelagem-financeira/': '/materiais-ricos/',
    '/materiais-ricos/google-ads-o-que-voce-precisa-saber-para-comecar/': '/materiais-ricos/',
  },
});
