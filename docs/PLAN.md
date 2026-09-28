# ecommercewisers roadmap

The milestone is the **homepage only**. Tick items as they are finished and committed. How each phase works is in `docs/GUIDE.md`.

## Phase 0: Project understanding
- [x] Inspect the scaffold: versions, App Router tree, dependencies, assets, config
- [x] Check the Tailwind major version (4.3.3 → CSS-first `@theme`)
- [x] Record the Project snapshot in `docs/PROGRESS.md`

## Phase 1: Next.js foundation
- [x] Add the `typecheck` (`next typegen && tsc --noEmit`) and `check` scripts
- [x] Gitignore `.claude/settings.local.json`, `.claude/settings.loca.json` and `.claude/plans/`
- [x] Remove the scaffold's public SVGs
- [x] Metadata: title and description, `lang="en"`
- [x] Placeholder `page.tsx` (not the homepage)
- [x] `npm run check` passes → commit `Phase 1: Next.js foundation`

## Phase 2: Claude Code configuration
- [x] `CLAUDE.md` project rules (under `@AGENTS.md`)
- [x] `/ew-plan`, `/ew-implement`, `/ew-test`, `/ew-review`, `/ew-status`
- [x] `.claude/agents/` and `.claude/skills/` (empty, with the rules in `GUIDE.md`)
- [x] `.claude/settings.json` permissions → commit `Phase 2: Claude Code configuration`

## Phase 3: Documentation
- [x] `docs/GUIDE.md`, `docs/PLAN.md`, `docs/DESIGN.md`, `docs/PROGRESS.md`
- [x] Cross-check the docs against `CLAUDE.md` → commit `Phase 3: documentation`

## Phase 4: Design system
- [ ] Raw palette in `@theme`, default palette wiped
- [ ] Semantic tokens in `:root`, `.theme-light` light band, `@theme inline` utilities
- [ ] Reduced-motion guard
- [ ] Placeholder page uses the semantic utilities
- [ ] `DESIGN.md` updated with the implementation and usage → commit `Phase 4: design system tokens`

## Phase 5: Homepage planning (next, needs approval)
- [ ] Confirm the Proposed design items (type scale, spacing, radius, buttons, cards, icons, focus ring)
- [ ] Plan each section: content, layout per breakpoint, components, a11y, dark or light band
- [ ] Decide the nav behaviour for the future pages (Services, About, Portfolio, Contact)
- [ ] List the images needed from the old repo, and the placeholders (logo, contact details)

## Phase 6: Homepage development (one section per cycle)
- [ ] Shared UI: container, button, section heading (as approved in Phase 5)
- [ ] Header: logo, navigation, CTA, mobile navigation
- [ ] Hero: headline, supporting text, primary and secondary CTA, hero visual
- [ ] Services: Shopify, WordPress, Next.js, Figma to Web
- [ ] Why ecommercewisers: clear client-value points
- [ ] Process: Discover, Design, Develop, Launch
- [ ] Portfolio Preview: selected projects (real projects only)
- [ ] CTA: a closing section focused on starting a project
- [ ] Footer: navigation, services, contact and social, copyright

## Phase 7: Testing
- [ ] `npm run check` and the `/ew-test` sweeps are clean
- [ ] Responsive at 320 / 375 / 768 / 1024 / 1440
- [ ] Keyboard, focus, landmarks and contrast
- [ ] No console errors; Lighthouse performance and a11y checked

## Phase 8: Review and polish
- [ ] `/ew-review` with no open blocker or major findings
- [ ] Duplication removed, spacing and type consistent with `DESIGN.md`

## Phase 9: Git and version control
- [ ] Milestone committed, tree clean, no secrets tracked
- [ ] Tag `homepage-v1` (proposed); decide on a remote

## Phase 10: Deployment
- [ ] Host chosen (to be decided), env vars set on the host
- [ ] Deployed; live smoke test on mobile and desktop

## Phase 11: Future pages (only after explicit approval)
- [ ] Services
- [ ] About
- [ ] Portfolio
- [ ] Contact

## Completion checklist (guide §15)
- [ ] Project runs locally
- [ ] Colour variables are centralised
- [ ] `CLAUDE.md` is present and accurate
- [ ] Documentation is up to date
- [ ] The homepage-only restriction is respected
- [ ] No unnecessary dependencies
- [ ] Responsive layout works on mobile, tablet and desktop
- [ ] Accessibility basics are checked
- [ ] No console errors
- [ ] Lint passes
- [ ] Production build passes
- [ ] Git milestone is committed
