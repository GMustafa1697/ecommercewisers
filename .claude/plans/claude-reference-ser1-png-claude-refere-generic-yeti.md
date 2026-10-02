# Inline data: every section owns its copy, and `src/content/site.ts` is removed

## Context
You asked to "make inline file structure: every section has its own data, no need for `site.ts`". Today all homepage copy and data sits in `src/content/site.ts`, and 14 files import from it. After this change:
- Each section file declares its own copy, data and types at the top, next to the markup that uses them.
- `site.ts` (and the `src/content/` folder) is deleted.

This reverses a CLAUDE.md rule ("All homepage copy and data … lives in typed exports in `src/content/site.ts`"), so that rule is rewritten. It matches the rule you wrote in your Lottie spec: "declare types and data inside the component file, no shared content layer".

**What doesn't change:** the page renders byte-for-byte the same text, links and images. This is a pure move.

## Shared data: exported by the section that owns it
Copying these into every user would let them drift (a renamed service wouldn't update the footer), so each lives in one owning file:

| Data | Lives in (exported) | Also used by |
|---|---|---|
| `startProject` ("Start a project" → `/#contact`), `contact` (placeholder email), `contactHref` | `sections/Cta.tsx`, the section they point to | Header, Hero, Services, Footer |
| `nav` (with "Work" hidden while there are no projects) | `sections/Header.tsx` | Footer |
| `projects` | `sections/PortfolioPreview.tsx` | Header (the `nav` filter) |
| `services` (the four cards) | `sections/Services.tsx` | Footer (the service names) |
| `brand` ("ecommercewisers") | `ui/Wordmark.tsx` | Footer (the copyright line) |

No import cycles: Cta, PortfolioPreview and Wordmark import nothing from the sections; Header imports Cta and PortfolioPreview; Footer imports Header, Services, Cta and Wordmark.

## Changes, file by file (data at the top of each file, after the imports)
- **Hero:** eyebrow, H1, intro, and the secondary CTA; the primary CTA is `startProject` from Cta.
- **Features:** `features` (four items with `animation: { src, stillFrame }`) and the sr-only title, typed inline. Also drop the stray `tex` class that appeared in its `className` ("border-b border-border tex"). It looks like a typo and matches no utility.
- **Services:** heading copy, `cta = startProject`, and `export const services`. The `icon` field holds the component itself (`BagIcon`, …) instead of a name.
- **WhyUs:** heading copy, the four points (icons as components: `BoltIcon`, `BagIcon`, `RouteIcon`, `CodeIcon`), and the code animation's `src`/`stillFrame`.
- **Process:** heading copy and the four steps.
- **PortfolioPreview:** heading copy and `export const projects` (with its `Project` type).
- **Reviews:** heading copy, the placeholder flag and notice, and the six stock clips.
- **ReviewCard:** now defines and exports `type ReviewVideo`; ReviewsCarousel imports it from there.
- **Cta:** title, text, and the exported `startProject`, `contact`, `contactHref`. The `// PLACEHOLDER` comment moves here.
- **Header:** `export const nav` (the filter on `projects.length` moves with it).
- **MobileNav:** its props are typed inline (`{ label; href }[]` and `{ label; href }`), with no shared type import.
- **Footer:** its own titles, the rights text, the description and `socials` (empty); imports `nav`, `services`, `contact`/`contactHref` and `brand`.
- **Wordmark:** `export const brand = "ecommercewisers"`.
- **icons.tsx:** remove the `serviceIcons` and `whyIcons` maps and the `ServiceIconName`/`WhyIconName` imports. They only existed to turn names from `site.ts` into components; the sections now reference the icon components directly.
- **Delete** `src/content/site.ts` (the folder is then empty and goes too).

## Docs and commands
- **`CLAUDE.md`:** "All homepage copy and data … in `src/content/site.ts`" becomes: each section declares its own typed copy and data at the top of its file; data used by several sections is exported by its owning section (the table above); no shared content file.
- **`/ew-test` (`.claude/commands/ew-test.md`):** the expected `example.com` placeholder hit moves from `src/content/site.ts` to `src/components/sections/Cta.tsx`.
- **`docs/DESIGN.md`, `docs/PLAN.md`, `docs/PROGRESS.md`:** replace the `site.ts` mentions (e.g. PLAN's Files list, "the data comes from `site.ts`"), and add a PROGRESS entry and decision.

## Verification (raw output in the report)
1. **Before any edit:** snapshot the rendered page in headless Chrome at 1440: the full `innerText`, every `href`, `src` and `alt`, and the heading list.
2. After:
   - `grep -rn "content/site" src` finds nothing, and `src/content/` is gone
   - `npm run check` passes
3. The same snapshot after the change **diffs empty**: identical text, links, images and headings. Plus the usual checks:
   - no console errors
   - no horizontal scroll at 375 and 1440
   - the `/ew-test` sweeps are clean (the placeholder email now reported in `Cta.tsx`)
