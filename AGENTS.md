# Instruções para agentes — site EJFGV (Bi-EJ)

O site fica em `landing-page/` (Astro). Leia também `landing-page/AGENTS.md` (comandos do Astro) e `PLANO-NOVO-SITE.md`.

## Skills instaladas (`.claude/skills/` para Claude Code, `.agents/skills/` para Codex)

Use quando a tarefa pedir; não carregue todas por padrão.

| Skill | Quando usar |
|---|---|
| `planning-and-task-breakdown`, `spec-driven-development` | Antes de redesenhar uma página ou seção: escreva o plano/spec curto (objetivo, critérios de aceite, o que não muda) e só então implemente. Evita rodadas de retrabalho. |
| `frontend-ui-engineering` | Componentes, layout responsivo, acessibilidade e estados da UI. |
| `browser-testing-with-devtools` | Verificar no navegador real: prints desktop/mobile, console sem erro, rolagem horizontal, foco. Prints sempre do build/preview, não só do código. |
| `performance-optimization` | Imagens, LCP/CLS, peso de JS/CSS; Lighthouse antes de entregar páginas novas. |
| `shipping-and-launch` | Checklist antes do merge/publicação. |
| `humanizer` | Revisar textos do site (títulos, aberturas, FAQs) para tirar marcas de texto gerado por IA. A skill foi escrita para inglês: aplique os padrões que valem em português (contrastes "não é X, é Y", tríades forçadas, travessões em excesso, jargão de vendas) e nunca mude fatos, números ou promessas. |
| `publicar` | Fluxo de publicação já existente no repo. |

Fontes e licenças: `addyosmani/agent-skills` e `blader/humanizer`, ambas MIT (`third_party/`). Versões fixadas em `skills-lock.json`.

## SEO: plugin `claude-seo` (só Claude Code)

O plugin [`AgriciDaniel/claude-seo`](https://github.com/AgriciDaniel/claude-seo) (MIT, `third_party/LICENSE-claude-seo`) é habilitado para este projeto em `.claude/settings.json`, fixado na **v2.5.0** (commit `219ff48`). Ele traz 26 skills (`/seo ...`) e 19 subagentes de auditoria: técnico, conteúdo/E-E-A-T, schema, sitemap, desempenho, GEO/busca por IA etc.

- **Instalar (uma vez por máquina, na raiz do repo):** abra o Claude Code aqui, aceite a confiança da pasta e rode `claude plugin install claude-seo@ejfgv-seo --scope project`; depois, dentro do Claude Code, `/seo setup` (cria um Python isolado e o Chromium headless fora do repo) e `/seo doctor` para conferir.
- **Antes de qualquer `/seo`, leia `seo/CONTEXTO.md`:** o domínio `ejfgv.com` ainda é o WordPress, então o que se audita é `https://ejfgv-site-novo.vercel.app`. O arquivo também diz onde cada correção mora no código, que dados não se inventam e quais extensões pagas ficam desligadas.
- Relatórios em `seo/relatorios/`; correções em branch + PR, merge só com autorização do Bruno.
- Codex não carrega plugins do Claude Code: para tarefas de SEO, use o Claude Code.
- Atualizar a versão: troque `ref`/`sha` em `.claude/settings.json` depois de ler o `CHANGELOG.md` do upstream.

## Regras do repo

- Branch nova a partir de `main`; PR para `main`; **merge só com autorização do Bruno**.
- Não inventar números, clientes, depoimentos ou métricas; dados vêm de `landing-page/src/consts.ts`.
- Fotos só as reais da equipe (`src/assets/fotos/`, `FOTOS` em `consts.ts`); nada de banco de imagens ou IA.
- Não commitar prints, builds ou arquivos de trabalho (`prints-*`, `BRIEF*.md`).
