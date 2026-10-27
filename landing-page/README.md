# Site EJFGV (Astro)

Site da EJFGV, a Empresa Júnior da Fundação Getulio Vargas, com as mesmas URLs do ejfgv.com. O plano está em [../PLANO-NOVO-SITE.md](../PLANO-NOVO-SITE.md).

## Comandos

```sh
npm ci                          # instala as dependências
npm run dev                     # servidor local em http://localhost:4321
npm run build                   # gera o site estático em dist/
npm run verificar               # confere o dist/ e lista os marcadores "A preencher"
npm run verificar -- --publicar # falha se ainda houver marcador (use antes de publicar)
```

## Onde mexer

| Quero mudar… | Arquivo |
| --- | --- |
| Números, contatos, soluções, cases, depoimentos, logos | `src/consts.ts` |
| Cabeçalho, menu, rodapé, SEO | `src/layouts/Layout.astro` |
| Estrutura das 5 páginas de solução | `src/layouts/SolucaoLayout.astro` |
| Blocos reutilizáveis (formulário, FAQ, depoimentos…) | `src/components/` |
| Páginas | `src/pages/` |
| Estilos (design system) | `src/styles/styles.css` |
| Interações | `public/main.js` |

## Regras

- **Sem fotos fictícias:** onde falta foto real, use `ImagemReservada`.
- **Nada inventado:** o que falta vira `<span class="preencher">A preencher: …</span>`.
- **Formulários:** os endpoints ficam em `FORMULARIOS` (`src/consts.ts`). Vazio = o formulário não envia e mostra WhatsApp e e-mail.
