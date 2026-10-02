# Codebase review (2026-10-02) and fix plan

## Context
You asked for a full review: bugs, performance, code quality, architecture, security and technical debt, ranked by severity.

**Payments, subscriptions, feature gating and authentication:** the site has none of these, so that part of the brief doesn't apply. The only data flow is the contact form.

**What I checked:**
- I read every file in `src/`, plus the configs and the `.gitignore`.
- I ran the dev server and a production build (`next start`) in headless Chrome:
  - no-JavaScript loads
  - a form submit, with and without JavaScript
  - mobile menu edge cases
  - response headers and caching
  - console output
- `npm run check` passes.

**What's healthy:**
- TypeScript is strict throughout: no `any`, no `@ts-ignore`, no `eslint-disable`, no `console`, no `dangerouslySetInnerHTML`.
- The production console is clean, with no failed requests.
- The form works without JavaScript too: it posts, and the page comes back with the "not sent" note.
- `/` is static.
- Layout shift is 0.

**Your choices for this plan:** all four fix groups (bugs and robustness, security and caching, form hardening, repo hygiene), and **remove the unused carousel arrow code**.

## Findings, most severe first
| # | Severity | Where | Problem | Fix |
|---|---|---|---|---|
| 1 | **Critical** (launch) | `sections/Contact.tsx:7`, `sections/sendMessage.ts` (the SMTP marker) | **No enquiry can reach you.** The form doesn't send, and the email is the placeholder `hello@example.com`. It's the site's only conversion path. | Already logged as blocking deploy. Needs the real address and SMTP: your input. |
| 2 | High (launch, legal) | `sections/Reviews.tsx:9-17` | Stock clips stand in as "reviews". There's a visible notice, but the stock licence forbids implying endorsement. | Logged as blocking deploy. Needs real, consented reviews with captions. |
| 3 | High (WCAG 2.2 AA, your stated standard) | `ui/LogoStrip.tsx`; the Process animation (`ProcessPlayer.tsx`) on phones and from `xl` | Motion that starts by itself and lasts over 5 s, with no way to pause it (2.2.2). The Process step text is only on screen for about 3 s. | Your earlier calls (no pause button; list removed on phones). A small pause button would fix both. **Not in this plan.** |
| 4 | Medium | `ui/Carousel.tsx` (root), `ui/LogoStrip.tsx:105` | **Portfolio, Reviews and the logo strip are blank until JavaScript runs**, and forever without it: Splide's core CSS sets `.splide { visibility: hidden }` until mount. The pre-mount gap class `mr-6` (`Carousel.tsx:89`) never applies either, because Splide's unlayered `margin: 0` beats Tailwind's layered utilities (measured: 0px). | Fixed below (A1). |
| 5 | Medium | `next.config.ts` | No security headers: no CSP, `frame-ancestors`, `Referrer-Policy`, `nosniff` or `Permissions-Policy`. `X-Powered-By: Next.js` is sent. | Fixed below (B1). |
| 6 | Medium | `public/lottie/dotlottie-player.wasm`, `public/animations/*`, `public/videos/*` | The 1.24 MB WASM, the `.lottie` files and the videos are served with `Cache-Control: public, max-age=0`, Next's default for `public/` (measured). Every visit revalidates the heaviest asset on the page. | Fixed below (B2). |
| 7 | Medium (before SMTP) | `sections/sendMessage.ts:28-36` | Once SMTP sends, a crafted POST with line breaks in the name could inject email headers (the email pattern already rejects whitespace). There's no bot protection. | Fixed below (C1, C2). Rate limiting waits for the host. |
| 8 | Medium | the Process `.lottie` files (yours) | Dimmed canvas text is below AA: 1.87–2.77:1 from `xl`, about 2:1 on phones. | Logged. Your call; I can raise the greys. **Not in this plan.** |
| 9 | Medium (repo) | `.gitignore` | `.claude/reference/` (11 MB untracked, including an 8.7 MB screen recording with the old brand name in its file name) isn't ignored, so `git add .` would commit it. | Fixed below (D1). |
| 10 | Low | `sections/MobileNav.tsx:25-42` | Open the menu, then widen the window past `md`: the menu stays "open" (invisible), so the header can never hide on scroll (measured). | Fixed below (A2). |
| 11 | Low | `sections/ReviewsCarousel.tsx:31` | `void video.play()` leaves the promise unhandled. A quick play then pause (or a browser block) logs "Uncaught (in promise)". | Fixed below (A3). |
| 12 | Low (to confirm) | `sections/ReviewsCarousel.tsx:42-59` | When a breakpoint change makes Splide re-clone the slides, the clones copy a playing or unmuted card's `data-*` and `aria` attributes but not its video state, so their icons could show the wrong state. | Reproduce first, then fix (A4). |
| 13 | Low | `ui/Carousel.tsx`, `ui/icons.tsx` | Dead code since `arrows: false`: the arrow markup, `arrowClass`, `ChevronLeftIcon`/`ChevronRightIcon`, and the `prevLabel`/`nextLabel` props. | Remove (A5, your choice). |
| 14 | Low | `sections/ScrollHeader.tsx:6` | `ALWAYS_SHOWN_ABOVE = 68` repeats `--header-height` (4.25rem) by hand. | Measure the header (A6). |
| 15 | Low | `app/globals.css:46,84` | The `surface-muted` token isn't used anywhere. | Remove (A7). |
| 16 | Low | `README.md` | Still the create-next-app README. | Replace (D2). |
| 17 | Low | `app/favicon.ico`, `app/layout.tsx:17-21` | The default Next.js favicon (25,931 B, unchanged). The metadata has no `metadataBase`, Open Graph image, robots or sitemap. | These need a real logo and domain. **Logged, not in this plan.** |
| 18 | Low | `sections/Hero.tsx:9-10` | The copy names "Shopify apps" and "UI/UX", which aren't among the four services. | Logged, your call. |
| 19 | Low | `package.json` | `@types/node ^20` while the project runs on Node 24. Splide 4.1.4 hasn't been updated since 2022 (logged). | Mention only. |
| 20 | Low | `ser2.png` (repo root, untracked) | A stray screenshot. It isn't the same file as `.claude/reference/ser2.png`. | Mention only. I won't delete it without asking. |

## Fix plan

### A. Bugs and robustness
1. **Carousels visible before JavaScript** (`ui/Carousel.tsx`, `ui/LogoStrip.tsx`):
   - Add `is-rendered` to each root's class. Splide's core CSS already shows `.splide.is-rendered`, and only its SSR renderer uses that class, so core behaviour doesn't change.
   - The slide gap becomes `mr-6!`, the important modifier, so it beats Splide's unlayered `margin: 0` before mount. After mount Splide's inline `margin-right: 1.5rem` matches it.
   - The pre-mount widths are already right (measured within 0.02px).
2. **Mobile menu after a resize** (`sections/MobileNav.tsx`): in the existing `open` effect, close the menu when `matchMedia("(min-width: 48rem)")` starts matching.
3. **`play()` rejections** (`sections/ReviewsCarousel.tsx`): `video.play().catch(() => {})`, with a comment. The UI follows the media events, so a rejected play has nothing to undo.
4. **Clone state** (`sections/ReviewsCarousel.tsx`):
   - First reproduce it: play and unmute a card, then resize across a breakpoint, and compare the clones' attributes with their videos.
   - If confirmed, add a `syncCard(card)` that sets `data-started`, `data-playing`, `data-unmuted`, `aria-pressed` and the play label from the card's own video. Use it in `onMedia`, and for every card on Splide's `refresh` event, which runs after the re-clone because it's registered after mount.
5. **Remove the arrows** (`ui/Carousel.tsx`, `ui/icons.tsx`, `sections/PortfolioPreview.tsx`, `sections/ReviewsCarousel.tsx`):
   - Delete the arrow markup, `arrowClass`, the two chevron icons, and the `prevLabel`/`nextLabel` props and their `i18n`.
   - `arrows: false` stays, or Splide would create its own arrows.
6. **Header threshold** (`sections/ScrollHeader.tsx`): a ref on `<header>`; "always shown above" becomes its `offsetHeight`, so it follows `--header-height`.
7. **Unused token** (`app/globals.css`): remove `--surface-muted` and `--color-surface-muted`, and the matching rows in CLAUDE.md and DESIGN.md.

### B. Security and caching (`next.config.ts`)
1. **Security headers:** `poweredByHeader: false`, plus `headers()` for every path. This is the Next 16 "without nonces" CSP from `node_modules/next/dist/docs/01-app/02-guides/content-security-policy.md`, because `/` stays static and nonces would force dynamic rendering.
   - **CSP:**
     - `default-src 'self'`
     - `script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval'`, plus `'unsafe-eval'` in dev only, per the Next docs. `'wasm-unsafe-eval'` is for dotLottie.
     - `style-src 'self' 'unsafe-inline'` (React's style attributes)
     - `img-src 'self' blob: data:`
     - `font-src 'self'`, `media-src 'self'`, `connect-src 'self'`
     - `object-src 'none'`, `base-uri 'self'`, `form-action 'self'`, `frame-ancestors 'none'`
   - **Other headers:** `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`, `X-Frame-Options: DENY`.
   - HSTS and `upgrade-insecure-requests` are left to the host, since they need HTTPS (logged).
2. **Caching:**
   - Rename the WASM to `public/lottie/dotlottie-player-0.80.0.wasm` (the version of the installed `@lottiefiles/dotlottie-web`), and update `setWasmUrl` in `ui/LottieAnimation.tsx`.
   - `/lottie/:path*` gets `public, max-age=31536000, immutable`.
   - `/animations/:path*`, `/videos/:path*` and `/images/platforms/:path*` get `public, max-age=86400`. These keep their names when you replace them, so a day, not forever.
   - CLAUDE.md's upgrade note: copy the new WASM under its new version's name.

### C. Form hardening (`sections/sendMessage.ts`, `sections/ContactForm.tsx`)
1. Reject control characters in the name, line breaks included, with "Enter your name on one line." Email already rejects whitespace, and a comment will say why that matters once SMTP sends.
2. **Honeypot:**
   - A text field named `website`, inside an `aria-hidden` visually hidden wrapper, with `tabIndex={-1}` and `autoComplete="off"`. It's not required, and people never see or reach it.
   - The action treats a filled honeypot as a bot: it sends nothing and gives the usual answer, so bots can't tell.

### D. Repo hygiene
1. `.gitignore`: add `/.claude/reference/`. Your files stay on disk, just never committed.
2. `README.md`: a short project README for developers:
   - what the site is
   - the stack
   - `npm run dev` and `npm run check`
   - the docs map
   - the brand rule

### Docs
- **CLAUDE.md:**
  - the token list
  - the WASM upgrade note
  - one Performance line on caching and security headers
- **DESIGN.md:**
  - carousels: visible before mount, no arrows
  - the icon set
  - the token table
  - Shared UI: `Carousel`'s props
- **PLAN.md:** the deploy checklist, with HSTS left to the host.
- **PROGRESS.md:**
  - the review entry: all 20 findings, what was fixed, what's left and why
  - decisions
  - known issues: the header items that need the host, and rate limiting with SMTP

### Not in this plan (need you or other inputs)
- #1, #2: the real email, SMTP and real reviews
- #3: pause controls
- #8: animation contrast
- #17: a favicon or logo, and the domain for the metadata
- #18: hero copy
- #20: the stray `ser2.png`

## Verification
- `npm run check`; `/` must stay static (○). The `/ew-test` sweeps.
- **Headless Chrome on the dev server:**
  - **Before JavaScript** (scripts disabled): the logo strip, Portfolio and Reviews are visible, and the slide gap is 24px.
  - **Mount:** the first slide's position is the same before and after mount (to the pixel). Layout shift is 0 when loading straight to `/#work`, `/#reviews` and the top. Dots, drag and keyboard still work.
  - **Resize:** with the menu open at 375, resize to 1280: the menu closes and the header hides on scroll down again.
  - **Videos:** a rapid play and pause logs no unhandled rejection. Clone state after a breakpoint change, if confirmed.
  - **Header threshold:** still shown within 68px of the top.
  - **Form:** a line break in the name (posted with JS) gives the error; a filled honeypot gives the usual answer. The normal submit is unchanged.
- **Production (`next start`):**
  - `curl -I` shows the CSP and the other headers, with no `X-Powered-By`.
  - The WASM is `immutable` under its new name; animations, videos and platform logos are `max-age=86400`.
  - Every Lottie plays, the carousels and videos work, the form submits, and the console shows **no CSP violations**.
- Then stop the `next start` server that is still running from the review (port 3100).
- No commit until you ask.
