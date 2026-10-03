# Commit, push to GitHub, private preview on Vercel

## Context
You asked to commit today's work, push it to GitHub, then deploy on Vercel.

**State**
- `main` is 1 commit ahead of `origin` (`6e9cc45 WIP: hover and spacing polish (unreviewed)`).
- Today's changes are uncommitted: error-scan fix, Process v3, phone tabs, one file per section, phone carousels, footer lockup and favicon, contact SMTP.
- The remote is the private repo `GMustafa1697/ecommercewisers`, the same setup as the 2026-10-02 push.
- Vercel CLI 60.0.0 is logged in as `gmustafa1697-1161`. The project isn't linked yet (no `.vercel/`).

**Your choices**
- **Deploy a private preview, not production.** The documented deploy blockers are still open:
  - the stock-actor review videos
  - the placeholder `hello@example.com`
  - the contact form's SMTP login fails (`EAUTH`)
  - no rate limiting
  - the platform-logo trademark check
- **Keep `.claude/reference/` local.** Your earlier `.gitignore` edit had un-ignored it; I restore the ignore line.
- **I copy the 7 SMTP settings to Vercel with the CLI**, the password never printed.

**Findings that shape the plan**
- The Vercel CLI uploads every file except its built-in list, which already skips `.env.local`, `.next` and `node_modules`, plus whatever a `.vercelignore` adds. It does **not** read `.gitignore`.
- Without a `.vercelignore`, it would upload `.claude/settings.loca.json` (an Anthropic token) and `.claude/plans/CLAUDE.md` (your saved GitHub page). A `.vercelignore` adds to the built-in list rather than replacing it, which I checked in the CLI's code.
- If the Vercel project gets connected to the GitHub repo, every push to `main` becomes a **public production** deployment. That contradicts "preview only", so it must stay unconnected for now.

## Steps
1. **`.gitignore`:** restore `/.claude/reference/` (uncomment your edit). Nothing else changes. `.env.local`, `.claude/settings.loca.json` and `.claude/plans/CLAUDE.md` stay ignored, as I've already checked.
2. **New `.vercelignore`:** `.claude/` and `.env*`, with a comment saying why (CLI uploads ignore `.gitignore`).
3. **Pre-commit checks** (CLAUDE.md):
   - `npm run check`, and the `/ew-test` sweeps.
   - `git status` after `git add -A`: the staged list must have no `.env.local`, no `.claude/settings*`, no `.claude/reference/`.
   - A scan of the staged diff for secrets: any non-empty `SMTP_PASS=` and token-like strings.
4. **One commit** (as with the 2026-10-02 commit, since the docs and several files carry changes from several tasks). No Co-Authored-By trailer, per CLAUDE.md.
   - Title: `Homepage: Process v3, one file per section, phone carousels, footer lockup, favicon and contact SMTP`
   - A short body listing each part.
   - It includes your three new logo files in `public/logo/`, `.env.example`, `.vercelignore` and this plan file.
5. **`git push origin main`.** It pushes the WIP commit and the new one. I'll show the raw output.
6. **`vercel link --yes`:** links or creates the project `ecommercewisers` under your default scope. `.vercel/` is already gitignored. Then I check whether a Git repository got connected. If so, `vercel git disconnect --yes`, so pushes don't publish production.
7. **Env vars, Preview environment only** (production gets them when you go live). One `vercel env add <KEY> preview --yes` per key, each value piped on stdin from `.env.local` by a small script, so no value appears in a command or in output. `SMTP_PASS` uses `--sensitive` (stored as a secret).
8. **`vercel deploy`** (no `--prod`): a preview deployment built on Vercel. I'll show the raw output and the preview URL.
9. **Check the live preview:**
   - The deployment is `READY` (`vercel inspect`).
   - Fetched without a Vercel login, the URL should answer 401 or a redirect to the Vercel login (Deployment Protection is on by default). If it's publicly reachable instead, I'll report that and stop; turning protection on is a dashboard setting.
10. **Docs:** `PROGRESS.md` (Phase 9 push, Phase 10 Vercel preview, decisions) and `PLAN.md` (Phase 10: host Vercel, preview only). They go in a small follow-up commit, `Docs: Vercel preview deploy`, and push. The project isn't connected to Git, so this push deploys nothing.

## Notes
- **The contact form on the preview** will still fail with `EAUTH` until the right password is in place. To update it later: `vercel env add SMTP_PASS preview --force` (or the dashboard), then redeploy.
- **Vercel Toolbar:** on preview deployments Vercel tries to load its toolbar script from `vercel.live`. The site's CSP (`script-src 'self'`) blocks it, so a logged-in viewer may see one blocked-script console error. The site itself is unaffected.
- **Not done:** no production deployment, no domain, and no GitHub auto-deploys. Those come once the blockers are cleared.
