---
name: publicar
description: Commita tudo, faz push no GitHub e publica o site em produção na Vercel. Só roda quando o usuário digita /publicar.
argument-hint: "[mensagem do commit]"
disable-model-invocation: true
---

# /publicar

Commit, push e deploy em sequência. Pare na primeira etapa que falhar e diga ao usuário qual foi e o erro.

Caminhos relativos à raiz do repositório. O site Astro fica em `landing-page/`.

1. **Checagem**: em `landing-page/`, rode `npm run build` e depois `npm run verificar`. Se algum falhar, pare: não commite nem publique site quebrado.

2. **Commit** (pule se `git status --short` estiver vazio):
   - `git add -A` e confira `git diff --cached --stat`. Nunca commite `.env*`, `.vercel/`, chaves ou tokens; se aparecerem, tire do stage e avise.
   - Mensagem: use `$ARGUMENTS` se vier preenchido. Senão, escreva uma linha em português no estilo do histórico (verbo no presente: "Adiciona…", "Troca…", "Aplica…") resumindo o diff.
   - Termine a mensagem com a linha de atribuição de co-autoria que estiver valendo na sessão.

3. **Push**: `git push origin <branch atual>`.
   - Se for rejeitado por o remoto estar à frente: `git pull --rebase origin <branch>`, rode a checagem do passo 1 de novo e faça o push.
   - Conflito no rebase: pare e mostre os arquivos em conflito. Nunca use `--force`.

4. **Deploy**: em `landing-page/`, rode `npx vercel deploy --prod --yes` (o projeto `ejfgv-site-novo` já está linkado em `landing-page/.vercel/`).
   - Se a branch atual não for `main`, pergunte antes de publicar em produção.

5. **Relatório** curto: hash do commit (ou "nada para commitar"), branch enviada e a URL de produção https://ejfgv-site-novo.vercel.app.
