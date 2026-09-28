---
description: Review the current changes for tokens, consistency, responsiveness, a11y, performance and duplication. No edits.
argument-hint: [optional path or section to focus on]
allowed-tools: Read, Glob, Grep, Bash(git status:*), Bash(git diff:*), Bash(git log:*)
---

Review the current changes in ecommercewisers. Focus, if given: $ARGUMENTS

**Do not edit any file.**

1. Run `git status` and `git diff` (plus `git diff --staged`). Read each changed file in full, plus `CLAUDE.md` and `docs/DESIGN.md`.
2. Check against the project rules:
   - **Tokens**: only the semantic utilities from `globals.css` (`bg-background`, `bg-surface`, `text-muted`, `border-border`, `bg-primary text-primary-foreground` and so on). No raw hex, no arbitrary colour values, no gradients, no other hues. Gold is used sparingly and never as text on a `.theme-light` band.
   - **Consistency**: spacing, radius, type scale and button/card patterns match `DESIGN.md` and the existing components.
   - **Responsive**: works from 320px up. No horizontal scroll, readable line lengths, and tap targets of at least 44px.
   - **Accessibility**: landmarks, one `h1`, heading order, alt text, visible focus, keyboard reachability, labels, contrast, and `prefers-reduced-motion`.
   - **Performance**: `next/image` with sizes for images, no client components without a reason, no unneeded dependencies, no layout shift.
   - **Duplication**: repeated markup that should be a shared component, and dead code.
   - **Copy**: brand is `ecommercewisers`, no "premium", no invented clients, metrics or reviews.
   - **Scope**: nothing outside the approved task or the homepage milestone.
3. Report the findings ranked by severity (**blocker**, **major**, **minor**, **nit**). Give each one file:line, the problem and a suggested fix. If nothing is found, say so plainly.
