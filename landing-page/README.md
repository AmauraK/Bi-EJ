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

## Landing de BI (`/consultoria-business-intelligence/`, PRO-19)

A página segue a estrutura e a copy de [conteudo.ejfgv.com/business-intelligence-dados](https://www.conteudo.ejfgv.com/business-intelligence-dados):
hero → formulário → serviços → método → para quem é → CTA → quem somos → logos → depoimentos → números. Ela usa o
`Layout` direto (não o `SolucaoLayout`), porque essa ordem é outra. FAQ e "Outras soluções" não estão na referência e saíram da página.

**Decisões**
- **Método:** na ordem da jornada (Contato → Diagnóstico → Proposta → Solução), como no resto do site. A referência mostra a lista invertida. Textos e o nome "Solução" vêm da referência.
- **Formulário:** `LeadForm lp`. Campos Nome, E-mail corporativo, Empresa, Telefone e Mensagem; obrigatórios só nome, e-mail e telefone, como na referência. O serviço vai num campo oculto. O aceite usa o texto da referência ("informações e ofertas personalizadas"), com link para a política. Ele vem **desmarcado e é opcional**: o consentimento para marketing não pode ser condição para pedir o diagnóstico (LGPD). O envio real continua pendente (`FORMULARIOS.contato` vazio): o formulário valida e mostra WhatsApp e e-mail, sem mensagem de sucesso.
- **Imagens:** as fotos da referência são de banco ou de IA e viraram `ImagemReservada`. A foto da equipe (`…_ejfgv.avif`) também, porque ainda não é usada no site. O vídeo de introdução e os dos depoimentos são os Vimeo reais da referência.
- **Logos:** URLs do CDN Webflow da própria EJ, como o resto do site. O hero usa os 5 logos monocromáticos da referência; a grade usa `LOGOS_LP_BI` (`src/consts.ts`), com os 35 logos "-cor" da referência. Com `prefers-reduced-motion`, a faixa vira uma grade parada com todos os logos.
- **Rodapé:** é o padrão do site. A referência credita "Astrolab"; esse crédito não foi trazido. Confirmar se o crédito de desenvolvimento deve ser do time atual do site.

**Dados a confirmar com a EJ**
- **"+700 clientes" e "800+ projetos" convivem nesta página.** Não são a mesma métrica: o selo de clientes vem da referência e só aparece aqui (`NUMEROS.clientes`). O `verificar` libera o termo apenas nesta rota.
- NPS 90 e 70 setores: a EJ deve confirmar. Nenhum outro número foi acrescentado.
