# ecommercewisers design system

Each item carries a status:
- **Locked** is decided. Change it only with your approval, and record the change in `docs/PROGRESS.md`.
- **Proposed** is a starting point, not a final decision.

As of Phase 5 (2026-09-29), everything below is **Locked**.

The character of the site: modern, technical, clean, professional, focused on e-commerce, reliable and fast. Never "premium".

## Colours: Locked
The guide's official palette. **No other colours, no gradients.**

| Palette name | Hex | Role |
|---|---|---|
| `primary` | #E6AC0E | Golden yellow accent: primary buttons, highlights, active states, icons, key UI. Use it sparingly. |
| `black` | #000000 | Main background |
| `light-gray` | #F3F3F3 | Light band background |
| `white` | #FFFFFF | Text on dark; surfaces on light bands |
| `dark-surface` | #111111 | Cards and raised areas on dark |
| `secondary-text` | #8A8A8A | Muted text on dark |
| `dark-border` | #2A2A2A | Borders and dividers on dark |

- Gold is an accent, not a theme. Roughly one gold element per view: the primary CTA, an icon set, or an active state.
- **Only one gold button above the fold:** the hero's "Start a project". The header CTA is secondary (outlined).
- No blue, purple, green, red or any other hue. Tailwind's default palette is removed, so those classes do not exist.
- No gradients unless explicitly approved.

## Theme: Locked
- **Dark-first.** The page is `#000`, and surfaces (cards, the CTA panel, the footer) are `#111`.
- **Light bands** (`#F3F3F3`) are used between dark sections for rhythm. A band is a section with `className="theme-light"`. Inside it, the same semantic utilities switch to light values.
- **Homepage rhythm:** Header (dark) → Hero (dark) → Services (**light**) → Why ecommercewisers (dark) → Process (**light**) → Portfolio Preview (dark) → CTA (dark, surface panel) → Footer (surface).
- No `prefers-color-scheme` switching and no `dark:` variants. The site always looks the same.

## Semantic variables: Locked
These are the guide §4 names, plus `--accent`, which was added in Phase 5. Components use only these, through their utilities.

| Variable | Utility | Dark (default) | Light band (`.theme-light`) |
|---|---|---|---|
| `--background` | `bg-background` | black #000 | light-gray #F3F3F3 |
| `--foreground` | `text-foreground` | white #FFF | black #000 |
| `--surface` | `bg-surface` | dark-surface #111 | white #FFF |
| `--surface-muted` | `bg-surface-muted` | light-gray #F3F3F3 | light-gray #F3F3F3 |
| `--primary` | `bg-primary` | #E6AC0E | #E6AC0E (as a fill only) |
| `--primary-foreground` | `text-primary-foreground` | black #000 | black #000 |
| `--muted` | `text-muted` | secondary-text #8A8A8A | black at 70% (≈ #494949) |
| `--border` | `border-border` | dark-border #2A2A2A | black at 12% (≈ #D6D6D6) |
| `--accent` | `text-accent`, `outline-accent` | **gold #E6AC0E** | **black #000** |

- **`--accent` is the only way to get gold text.** Use `text-accent` for eyebrows, icons and step numbers, and for the focus ring. It turns black inside `.theme-light`, so the design system itself enforces "no gold text on light bands". Never use `text-primary` for text.
- On a light band, #8A8A8A is only 3.1:1 against #F3F3F3, which fails AA for body text. That is why `--muted` switches to black at 70% there. It is the same colour at a different opacity, so no new colour is added.

## Contrast: Locked
WCAG 2.2 AA needs 4.5:1 for body text, and 3:1 for large text and UI.

| Foreground | Background | Ratio | Verdict |
|---|---|---|---|
| white #FFF | black #000 | 21:1 | ✅ all text |
| white #FFF | dark-surface #111 | 18.9:1 | ✅ all text |
| gold #E6AC0E | black #000 | 10.3:1 | ✅ all text, focus ring |
| gold #E6AC0E | dark-surface #111 | 9.2:1 | ✅ all text, focus ring |
| black #000 | gold #E6AC0E | 10.3:1 | ✅ button labels |
| secondary-text #8A8A8A | black #000 | 6.1:1 | ✅ body text |
| secondary-text #8A8A8A | dark-surface #111 | 5.5:1 | ✅ body text |
| black #000 | light-gray #F3F3F3 | 18.9:1 | ✅ all text, light-band accent and focus ring |
| light-band muted (black 70%) | light-gray #F3F3F3 | ≈ 8.1:1 | ✅ body text |
| secondary-text #8A8A8A | light-gray #F3F3F3 | 3.1:1 | ❌ never use it for text on light bands |
| **gold #E6AC0E** | **light-gray #F3F3F3** | **1.8:1** | ❌ **never gold text on light bands.** Gold only as a fill with black text. |
| dark-border #2A2A2A | black #000 | 1.5:1 | ⚠️ decorative dividers only (see Borders) |

## Logo: Locked
- The logo is a **text wordmark**: `ecommercewisers` in Geist, `font-semibold tracking-tight`, `text-foreground`. It lives in one `Wordmark` component, used in the Header and Footer.
- The old SVG logos say "ecomwisers" and are not used. Swap in a real logo only through `Wordmark`.

## Typography: Locked
- Geist (sans) for all text and Geist Mono for technical accents, both via `next/font`. There are no other fonts and no external font links.
- The scale uses Tailwind's defaults, so there are no custom `--text-*` tokens:

| Role | Classes | Notes |
|---|---|---|
| H1 (hero only) | `text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight` | exactly one per page |
| H2 (section title) | `text-3xl lg:text-4xl font-semibold tracking-tight` | |
| H3 (card title) | `text-xl font-semibold` | |
| Body | `text-base lg:text-lg leading-relaxed` | measure ≤ 65ch (`max-w-prose`) |
| Small / meta | `text-sm text-muted` | |
| Eyebrow / label | `font-mono text-xs uppercase tracking-widest text-accent` | gold on dark, black on light bands (automatic) |
| Code panel (hero) | `font-mono text-xs sm:text-sm` | lines ≤ 36 characters, so nothing scrolls at 320px |

## Spacing and layout: Locked
- Tailwind's 4px spacing scale, with no custom spacing tokens.
- **`Container` component:** `mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8`. There is no `--container-page` token.
- Sections use `py-16 md:py-24`. The hero uses `py-20 md:py-32`.
- Grids are `grid gap-6 md:gap-8`. The column counts per section are in `docs/PLAN.md`.
- The header is sticky, `h-16`. Anchor targets clear it through `scroll-padding-top: 4rem` on `html`.

## Buttons: Locked
One `ButtonLink` component. Every CTA on the homepage is a link: an in-page anchor or `mailto:`.

| Variant | Classes | Use |
|---|---|---|
| Primary | `bg-primary text-primary-foreground hover:bg-primary/90` | The main CTA. One per view. The same on dark and light bands. |
| Secondary | `border border-border text-foreground hover:bg-surface` | The header CTA and the second hero CTA |
| Text link | `text-foreground underline-offset-4 hover:underline` | Inline, nav and footer links |

| Size | Classes | Where |
|---|---|---|
| `md` | `h-11 px-5 text-sm` (44px) | Header |
| `lg` | `h-12 px-6 text-base` (48px) | Everything else |

- Every button shares `inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors`.
- The label is a verb, e.g. "Start a project" or "Explore services".

## Cards: Locked
- `bg-surface border border-border rounded-lg p-6`. On a light band this becomes a white card with a light border automatically.
- The icon is `text-accent`, then a title (H3), then body text in `text-muted`.
- No shadows on dark. On light bands a subtle `shadow-sm` is optional.
- **Why ecommercewisers** deliberately doesn't use cards. Its items sit on a top border (`border-t border-border pt-6`), which sets it apart from Services.

## Borders: Locked
- 1px `border-border`. Use them for dividers, card outlines, the header's bottom edge and the footer's top edge.
- `dark-border` is 1.5:1 against black, so it is **decorative only**. A boundary that users need in order to find a control, such as a form input, uses `border-muted` (6.1:1) instead.

## Radius: Locked
- `rounded-md` (6px) for buttons and inputs, `rounded-lg` (8px) for cards, panels and images. These are Tailwind's defaults, so there are no custom `--radius-*` tokens.
- No pill buttons and no fully rounded cards.

## Icons: Locked
- Generic inline SVG line icons, all in `src/components/ui/icons.tsx` (the one file allowed to hold several components). Each has a 24px viewBox, a 1.5px stroke and `currentColor`, sized `size-5` or `size-6`.
- **No brand marks.** The Shopify, WordPress, WooCommerce, Figma and Next.js logos are off-palette and trademarked.
- The set is: bag (Shopify), layout (WordPress), code (Next.js), pen (Figma to Web), check (Why), menu and close (mobile nav).
- Decorative icons get `aria-hidden="true"`. Icon-only buttons get an `aria-label`.
- There is no icon library. Adding one needs approval.

## Images: Locked
- Use `next/image` with `width`/`height` (or `fill`) and `sizes`.
- **`priority` is deprecated in Next 16.** Use `preload` only for an above-the-fold image. The hero is a code panel, so the homepage preloads nothing.
- The only raster images are the portfolio shots in `public/images/work/`. They are cropped (top of the page) and resized before they're committed: at most about 1200px wide, WebP or JPEG, roughly 300 KB or less each. The 6.7 MB and 12 MB screen captures are never committed.
- Alt text names the project and what is shown, e.g. "Ella jewelry store homepage".

## Animation: Locked
- Transitions are limited to colour, background and border (`transition-colors`), at 150ms or less, ease-out.
- Anchor links scroll smoothly (`scroll-behavior: smooth` on `html`).
- No scroll-triggered animation, parallax, auto-playing carousels or animation libraries.
- The global `prefers-reduced-motion: reduce` guard turns off transitions, animations and smooth scrolling.

## Responsive: Locked
- Build mobile-first, using Tailwind's default breakpoints:
  - Mobile is the base, below 640px.
  - Tablet is `sm`/`md`, from 640 to 1023px.
  - Desktop is `lg`+, from 1024px up.
- Check at 320, 375, 768, 1024 and 1440 px. There must be no horizontal scroll at any of these widths.
- Nav: inline links from `md`, and a disclosure menu below `md` (`MobileNav`) with a toggle button that has `aria-expanded` and `aria-controls`. The menu closes on a link click or Escape.

## Accessibility: Locked
- WCAG 2.2 AA; follow the contrast table above.
- Use the landmarks `header`, `nav` (`aria-label="Main"` / `"Footer"`), `main` (`id="main"`) and `footer`, with exactly one `h1` and headings in order (h1 → h2 per section → h3).
- A skip link, "Skip to content", goes to `#main`. It stays visually hidden until it gets focus.
- Everything must work by keyboard, and focus must stay visible.
- **Focus ring:** `:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px }` is set once in `globals.css`. It is gold on dark and black on light bands.
- Images get meaningful `alt` text, or `alt=""` if they are decorative. Icon-only controls get an `aria-label`. The hero code panel is decorative (`aria-hidden="true"`), because the same information is in the text.
- Tap targets are at least 44×44px, and `prefers-reduced-motion` is respected.

## Implementation
Everything lives in **`src/app/globals.css`** (Tailwind 4.3, CSS-first, no `tailwind.config`).

| Block | What it holds | Why |
|---|---|---|
| `@import "tailwindcss" source("..")` | Tailwind, scanning `src/` only | Otherwise class names quoted in `docs/` and `CLAUDE.md` would be turned into CSS. |
| `@theme { --color-*: initial; … }` | The 7 raw palette colours (`--color-primary`, `--color-black`, …) | `initial` wipes Tailwind's default palette, so `bg-blue-500` generates nothing. |
| `:root { … }` | The guide §4 semantic variables, with dark values; `color-scheme: dark` | The one place to change the theme |
| `.theme-light { … }` (in `@layer components`) | The same variables with light values, plus the band's own background and text colour | One class turns a section into a light band. Utilities still override it. |
| `@theme inline { … }` | Maps `--color-background: var(--background)` and the rest, plus `--font-sans`/`--font-mono` → Geist | `inline` makes `.bg-background` compile to `background-color: var(--background)`, which resolves per element, so it flips inside `.theme-light`. |
| `@layer base` | The `body` background and colour; the `prefers-reduced-motion` guard | Tailwind's preflight applies Geist to `html` through `--font-sans`. |

Because the mapping is `inline`, the `--color-background` variables don't appear in the built CSS. The utilities point straight at `var(--background)` and the other variables. For custom CSS, use `var(--background)`, `var(--muted)` and so on.

**Added in Phase 6, cycle 1 (shared UI and tokens):**
- `--accent` in `:root` (`var(--color-primary)`) and in `.theme-light` (`var(--color-black)`), plus `--color-accent: var(--accent)` in `@theme inline`
- the global `:focus-visible` outline
- `html { scroll-padding-top: 4rem; scroll-behavior: smooth }`

### How components use the tokens
Use the semantic utilities with any colour prefix (`bg-`, `text-`, `border-`, `outline-`, `ring-`, `fill-`, `stroke-`): `background`, `foreground`, `surface`, `surface-muted`, `primary`, `primary-foreground`, `muted`, `border`, `accent`. Opacity modifiers work, for example `hover:bg-primary/90`.

```tsx
// Dark section (the default): nothing to add
<section className="py-16 md:py-24">
  <div className="rounded-lg border border-border bg-surface p-6">
    <BagIcon className="size-6 text-accent" aria-hidden="true" />
    <h3 className="text-xl font-semibold">Shopify Development</h3>
    <p className="text-muted">…</p>
  </div>
</section>

// Light band: the same utilities, light values (#F3F3F3 background, white cards, black accent)
<section className="theme-light py-16 md:py-24">
  <div className="rounded-lg border border-border bg-surface p-6">…</div>
</section>

// Primary CTA: gold fill with black text. It works on dark and on light bands.
<ButtonLink href="/#contact" variant="primary" size="lg">Start a project</ButtonLink>
```

- **Don't** use the raw palette utilities (`bg-black`, `text-white`, `bg-light-gray`, `text-secondary-text`, …) in components. They exist because the palette sits in `@theme`, but they don't flip inside `.theme-light`.
- **Don't** use `text-primary` for text. Use `text-accent`.
