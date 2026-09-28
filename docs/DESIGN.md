# ecommercewisers design system

Each item carries a status:
- **Locked** is decided. Change it only with your approval, and record the change in `docs/PROGRESS.md`.
- **Proposed** is a starting point. It becomes Locked, or is changed, in Phase 5. Don't treat it as final.

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
- No blue, purple, green, red or any other hue. Tailwind's default palette is removed, so those classes do not exist.
- No gradients unless explicitly approved.

## Theme: Locked
- **Dark-first.** The page is `#000`, and surfaces (cards, the header on scroll) are `#111`.
- **Light bands** (`#F3F3F3`) are used between dark sections for rhythm. A band is a section with `className="theme-light"`. Inside it, the same semantic utilities switch to light values.
- No `prefers-color-scheme` switching and no `dark:` variants. The site always looks the same.

## Semantic variables: Locked
These are the guide §4 names. Components use only these, through their utilities.

| Variable | Utility | Dark (default) | Light band (`.theme-light`) |
|---|---|---|---|
| `--background` | `bg-background` | black #000 | light-gray #F3F3F3 |
| `--foreground` | `text-foreground` | white #FFF | black #000 |
| `--surface` | `bg-surface` | dark-surface #111 | white #FFF |
| `--surface-muted` | `bg-surface-muted` | light-gray #F3F3F3 | light-gray #F3F3F3 |
| `--primary` | `bg-primary`, `text-primary` | #E6AC0E | #E6AC0E (fill only, never text) |
| `--primary-foreground` | `text-primary-foreground` | black #000 | black #000 |
| `--muted` | `text-muted` | secondary-text #8A8A8A | black at 70% (≈ #494949) |
| `--border` | `border-border` | dark-border #2A2A2A | black at 12% (≈ #D6D6D6) |

On a light band, #8A8A8A is only 3.1:1 against #F3F3F3, which fails AA for body text. That is why `--muted` switches to black at 70% there. It is the same colour at a different opacity, so no new colour is added.

## Contrast: Locked
WCAG 2.2 AA needs 4.5:1 for body text, and 3:1 for large text and UI.

| Foreground | Background | Ratio | Verdict |
|---|---|---|---|
| white #FFF | black #000 | 21:1 | ✅ all text |
| white #FFF | dark-surface #111 | 18.9:1 | ✅ all text |
| gold #E6AC0E | black #000 | 10.3:1 | ✅ all text |
| gold #E6AC0E | dark-surface #111 | 9.2:1 | ✅ all text |
| black #000 | gold #E6AC0E | 10.3:1 | ✅ button labels |
| secondary-text #8A8A8A | black #000 | 6.1:1 | ✅ body text |
| secondary-text #8A8A8A | dark-surface #111 | 5.5:1 | ✅ body text |
| black #000 | light-gray #F3F3F3 | 18.9:1 | ✅ all text |
| light-band muted (black 70%) | light-gray #F3F3F3 | ≈ 8.1:1 | ✅ body text |
| secondary-text #8A8A8A | light-gray #F3F3F3 | 3.1:1 | ❌ never use it for text on light bands |
| **gold #E6AC0E** | **light-gray #F3F3F3** | **1.8:1** | ❌ **never gold text on light bands.** Gold only as a fill with black text. |
| dark-border #2A2A2A | black #000 | 1.5:1 | ⚠️ decorative dividers only (see Borders) |

## Typography
- **Locked:** Geist (sans) for all text and Geist Mono for technical accents, both via `next/font`. There are no other fonts and no external font links.
- **Proposed** (it uses Tailwind's default scale, so no custom tokens are needed yet):

| Role | Classes | Notes |
|---|---|---|
| H1 (hero only) | `text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight` | exactly one per page |
| H2 (section title) | `text-3xl lg:text-4xl font-semibold tracking-tight` | |
| H3 (card title) | `text-xl font-semibold` | |
| Body | `text-base lg:text-lg leading-relaxed` | measure ≤ 65ch (`max-w-prose`) |
| Small / meta | `text-sm text-muted` | |
| Eyebrow / label | `font-mono text-xs uppercase tracking-widest` | gold only on dark; `text-muted` on light bands |

## Spacing and layout: Proposed
- Tailwind's 4px spacing scale, with no custom spacing tokens.
- The container is `mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8`. It may become a `--container-page` token or a `Container` component in Phase 5.
- Sections use `py-16 md:py-24`, and the hero may use more.
- Grids are `grid gap-6 md:gap-8`, with 1 column on mobile, 2 on tablet and 2–4 on desktop depending on the section.

## Buttons: Proposed
| Variant | Classes | Use |
|---|---|---|
| Primary | `bg-primary text-primary-foreground hover:bg-primary/90 font-medium h-12 px-6 rounded-md` | The main CTA. One per view. The same on dark and light bands. |
| Secondary | `border border-border text-foreground hover:bg-surface font-medium h-12 px-6 rounded-md` | The second CTA |
| Text link | `text-foreground underline-offset-4 hover:underline` | Inline and nav. Gold text links on dark only. |

- The minimum height is 44px (`h-12` = 48px). The label is a verb, e.g. "Start a project".
- Focus: see Accessibility.

## Cards: Proposed
- `bg-surface border border-border rounded-lg p-6`. On a light band this becomes a white card with a light border automatically.
- The icon is gold on dark and `text-foreground` on light bands. Then a title (H3) and body text in `text-muted`.
- No shadows on dark. On light bands a subtle `shadow-sm` is optional.

## Borders: Proposed
- 1px `border-border`. Use them for dividers, card outlines and the header's bottom edge.
- `dark-border` is 1.5:1 against black, so it is **decorative only**. A boundary that users need in order to find a control, such as a form input, uses `border-muted` (6.1:1) instead.

## Radius: Proposed
- `rounded-md` (6px) for buttons and inputs, `rounded-lg` (8px) for cards and images.
- No pill buttons and no fully rounded cards. It may be locked as `--radius-*` tokens in Phase 5.

## Icons: Proposed
- Inline SVG components with a 24px viewBox, a 1.5px stroke and `currentColor`, sized `size-5` or `size-6`.
- Decorative icons get `aria-hidden="true"`. Icon-only buttons get an `aria-label`.
- There is no icon library. Adding one (such as `lucide-react`) needs approval.

## Animation: Proposed
- Transitions are limited to colour, background and border (`transition-colors`), at 150ms or less, ease-out.
- No scroll-triggered animation, parallax, auto-playing carousels or animation libraries.
- A global `prefers-reduced-motion: reduce` guard turns off transitions and animations.

## Responsive: Proposed
- Build mobile-first, using Tailwind's default breakpoints:
  - Mobile is the base, below 640px.
  - Tablet is `sm`/`md`, from 640 to 1023px.
  - Desktop is `lg`+, from 1024px up.
- Check at 320, 375, 768, 1024 and 1440 px. There must be no horizontal scroll at any of these widths.
- Nav: inline links from `md`, and a disclosure menu below `md` with a toggle button that has `aria-expanded` and `aria-controls`.

## Accessibility: Locked
- WCAG 2.2 AA; follow the contrast table above.
- Use the landmarks `header`, `nav`, `main` and `footer`, with exactly one `h1` and headings in order. Add a skip link to `#main` in Phase 6.
- Everything must work by keyboard, and focus must stay visible.
- **Focus ring (Proposed):** `outline-2 outline-offset-2`. It is gold on dark and `outline-foreground` (black) on light bands, because gold is only 1.8:1 there.
- Images get meaningful `alt` text, or `alt=""` if they are decorative. Icon-only controls get an `aria-label`.
- Tap targets are at least 44×44px, and `prefers-reduced-motion` is respected.

## Implementation
The tokens are implemented in Phase 4 in `src/app/globals.css`. Phase 4 fills in this section with where each token lives and how components use it.
