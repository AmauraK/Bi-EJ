// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://ejfgv.com',
	trailingSlash: 'always',
	// Site estático sem adaptador: viram <meta http-equiv="refresh">. O 301 de verdade fica a cargo do host.
	redirects: {
		// Atalhos que já existem no WordPress
		'/financeiro': '/consultoria-financeira/',
		'/operacional': '/consultoria-operacional/',
		'/mercadologia': '/consultoria-mercadologica/',
		// Data Science passou a se chamar Business Intelligence
		'/data-science': '/consultoria-business-intelligence/',
		'/consultoria-data-science': '/consultoria-business-intelligence/',
		// Os 8 cases cabem numa página só
		'/cases-de-sucesso/2': '/cases-de-sucesso/',
		// As páginas próprias dos e-books foram reunidas em /materiais-ricos/
		'/materiais-ricos/projecoes-e-modelagem-financeira': '/materiais-ricos/',
		'/materiais-ricos/power-bi-instrucoes-para-iniciante': '/materiais-ricos/',
		'/materiais-ricos/google-ads-o-que-voce-precisa-saber-para-comecar': '/materiais-ricos/',
	},
});
