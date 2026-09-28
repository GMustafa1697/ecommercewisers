---
description: Run typecheck, lint, build and the project rule sweeps, then report pass or fail.
argument-hint: [optional focus, e.g. "hero"]
allowed-tools: Read, Glob, Grep, Bash(npm run typecheck), Bash(npm run lint), Bash(npm run build), Bash(npm run check), Bash(git status:*), Bash(git diff:*)
---

Test the current state of ecommercewisers. Focus, if given: $ARGUMENTS

Do not fix anything unless the user asks. Run each step even if an earlier one fails.

1. `npm run typecheck`
2. `npm run lint`
3. `npm run build`
4. Rule sweeps over `src/` (use the Grep tool). Each should find nothing:
   - the word `premium`, case-insensitive
   - raw hex colours (`#[0-9a-fA-F]{3,8}\b`) in `.ts` and `.tsx` files. Hex belongs only in `src/app/globals.css`.
   - `gradient`, `dark:`, or Tailwind palette classes such as `blue-500`, `zinc-100` or `gray-700`
   - `text-primary` used for text (`text-primary([^-]|$)`). Gold text is `text-accent`; `text-primary-foreground` is fine.
   - the deprecated `priority` prop on `<Image>`. Use `preload`.
   - the old brand spellings `Ecomwiser` or `ecomwisers`
5. `git status`: confirm that no `.claude/settings.local.json`, `.claude/settings.loca.json` or `.env*` file is staged or tracked.

Report a table with one row per step: **pass** or **fail**, with the relevant output lines for each failure (file:line for sweep hits). End with the overall result.
