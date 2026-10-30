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

## Regras do repo

- Branch nova a partir de `main`; PR para `main`; **merge só com autorização do Bruno**.
- Não inventar números, clientes, depoimentos ou métricas; dados vêm de `landing-page/src/consts.ts`.
- Fotos só as reais da equipe (`src/assets/fotos/`, `FOTOS` em `consts.ts`); nada de banco de imagens ou IA.
- Não commitar prints, builds ou arquivos de trabalho (`prints-*`, `BRIEF*.md`).
