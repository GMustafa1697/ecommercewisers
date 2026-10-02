# UGC video reviews section (Splide carousel)

## Context
You asked for a new homepage section: UGC video reviews in a carousel, matching `.claude/reference/image.png`. That's portrait video cards, each with its own play/pause and mute buttons, a caption, prev/next arrows, and a notice that the videos are placeholders. **Only one video may play at a time.**

Your answers:
- **Splide** for the carousel
- the **6 stock placeholder clips plus the visible notice**
- **install ffmpeg** to make the clips web-sized
- place it **after Portfolio as a light band**, with no nav link

What this changes in the project:
- It's a 9th section and a new dependency, so it also updates the CLAUDE.md milestone ("eight sections"), the "no new dependency" and "no animation libraries" rules, and the docs.

Facts that shape the plan:
- **Source clips** in `c:/Users/gm052/Desktop/ecomwiser/public/reviews/`:
  - Use these 6 stock clips (68 MB in total): `17781721-uhd…`, `7262665-uhd…`, `7414130-hd…`, `7644020-uhd…` (2160×4096, not 9:16), `8136218-hd…`, `8136220-hd…`.
  - **Never** use the two comedy clips. `rv-7.mp4` and `rv-8.mp4` are the same files renamed (identical sizes).
- **Splide:** `@splidejs/react-splide` was last published in 2022, before React 19. Use the core **`@splidejs/splide@4.1.4`** (MIT, no dependencies), mounted from a small client component.
- **Stylesheet:** Next 16 allows a package stylesheet to be imported in the component that uses it (`node_modules/next/dist/docs/01-app/01-getting-started/11-css.md` → External stylesheets).
- **Tools:** ffmpeg isn't installed; `winget` is available.

## Steps

### 1. Tools and dependency (approved)
- `winget install -e --id Gyan.FFmpeg --accept-source-agreements --accept-package-agreements` installs a system tool; it doesn't touch the repo. Call it by its full path under `%LOCALAPPDATA%\Microsoft\WinGet\Links` if PATH isn't refreshed.
- `npm install @splidejs/splide@4.1.4`. That's the only package change.

### 2. Videos → `public/videos/reviews/`
For each of the 6 clips, create `review-01…06.mp4`:
- 720×1280 (9:16, center crop), H.264 at CRF 28, 30 fps
- `+faststart`, `yuv420p`, AAC at 96k if the clip has audio
- aim for about 1–4 MB each

Also create a poster, `review-01…06.webp` (720×1280, a frame at about 1 s). The originals are never copied in. The scripts stay in the scratchpad.

### 3. Content: `src/content/site.ts`
- `export type ReviewVideo = { caption: string; src: string; poster: string; captions?: string }`. `captions` is a `.vtt` path, required for real, spoken reviews.
- `export const reviewsSection` holds:
  - eyebrow **"Video reviews"** and H2 **"In their own words"** (proposed copy)
  - `isPlaceholder: true`, marked `// PLACEHOLDER`
  - `notice`: "These are placeholders, not customers. Real video reviews will replace them."
  - 6 videos captioned **"Placeholder"**

### 4. Icons: `src/components/ui/icons.tsx`
Add `PlayIcon`, `PauseIcon`, `VolumeIcon`, `VolumeOffIcon`, `ChevronLeftIcon` and `ChevronRightIcon`. They use the same `Icon` base: a 24px viewBox, a 1.5px stroke, `currentColor` and `aria-hidden`.

### 5. Components (one per file)
**`sections/Reviews.tsx`** (server)
- `<Section id="reviews" light>` (reuses `ui/Section.tsx`) with `SectionHeading id="reviews-title"`
- a notice box when `isPlaceholder`: `mt-8 rounded-lg border border-border bg-surface p-4 text-sm text-muted`
- `<ReviewsCarousel videos>`

**`sections/ReviewsCarousel.tsx`** (`"use client"`, the only file that imports Splide)
- It imports `@splidejs/splide/css/core`, the core styles only. No theme, so every visible style comes from the tokens.
- Markup:
  - `div.splide.mt-8` with `aria-labelledby="reviews-title"`
  - custom `div.splide__arrows` with `button.splide__arrow--prev/--next`
    - classes: `size-11 rounded-md border border-border bg-surface text-foreground`, using `ChevronLeft/Right` icons
    - position: absolute at the vertical middle; disabled at the ends
  - `div.splide__track > ul.splide__list > li.splide__slide` (one `ReviewCard` each)
- In `useEffect`, mount `new Splide(root, { … })` with these options, and `destroy()` on unmount:
  - `type: "slide"`: **no loop, because loop clones slides, which would break the React-owned DOM**
  - `perPage: 4`, `gap: "1.5rem"`, `breakpoints: { 1023: { perPage: 2 }, 639: { perPage: 1, padding: { right: "20%" } } }`
  - `pagination: false`, `arrows: true`, `drag: true`, `noDrag: "button"`, `keyboard: "focused"`
  - `speed: 300`; Splide's default `reducedMotion` sets the speed to 0 when the user prefers reduced motion
  - no autoplay
  - `i18n` labels: "Previous videos", "Next videos"
- **One at a time:**
  - The carousel keeps refs to all `<video>` elements.
  - Each card reports its `play` event, and the carousel then pauses every other video.
  - `splide.on("hidden", slide => slide.slide.querySelector("video")?.pause())` pauses any video whose slide scrolls out of view.
- Before Splide mounts, the slides get the same widths through classes (`basis-[80%] sm:basis-[calc(50%-.75rem)] lg:basis-[calc(25%-1.125rem)]`), so there's no layout jump.

**`sections/ReviewCard.tsx`** (`"use client"`)
- `<video preload="none" playsInline muted={muted} loop={false}>` with no native controls, plus a `<track kind="captions">` when `captions` is set
- A lazy `next/image` poster (`fill`, `sizes` to match the breakpoints) covers it until the first play, so nothing heavy loads before a tap.
- The frame is `aspect-9/16 overflow-hidden rounded-t-lg bg-surface`. Below it, the caption sits on `bg-surface p-4 font-semibold`, and the whole card is `rounded-lg border border-border`, as in the reference.
- Controls sit bottom-center over the video, two `size-11 rounded-md` buttons:
  - colours: `bg-background/70 text-foreground hover:bg-background` (light on the band, like the reference)
  - **Play/Pause**: `aria-label` "Play video: {caption}" or "Pause video: {caption}"
  - **Mute**: `aria-pressed={muted}`, `aria-label` "Mute video: {caption}"
- Sound starts **muted**, as in the reference; tapping unmutes. The state follows the video's `play`, `pause` and `ended` events.

`src/app/page.tsx`: render `<Reviews />` between `<PortfolioPreview />` and `<Cta />`.

### 6. Docs and rules (they record your decisions)
- **`CLAUDE.md`**:
  - nine sections, adding "Video reviews" after Portfolio Preview
  - stack: `@splidejs/splide` 4.1.4 (approved 2026-09-30)
  - Performance: exception to "no animation libraries" for this carousel only
- **`docs/PLAN.md`**: a row in the structure table, a section spec, Phase 6 cycle 10.
- **`docs/DESIGN.md`**: the review card, video controls and carousel. The Splide slide motion is the one exception to the 150 ms colour-only motion rule, and reduced motion turns it off. Theme rhythm: Portfolio (dark) → Reviews (light) → CTA (dark).
- **`docs/PROGRESS.md`**:
  - the decisions: Splide, placeholders, ffmpeg
  - Known issues:
    - **placeholder videos block deploy.** Real reviews need the customer's consent and `.vtt` captions (WCAG 1.2.2).
    - Splide hasn't been updated since 2022.

## Verification
- `npm run check`, plus the `/ew-test` sweeps (no hex, `text-primary`, etc. in `src`).
- Files: 6 MP4s at 720×1280 and 6 WebP posters, with their sizes listed. `git status` shows no originals.
- Headless Chrome against the dev server:
  - at 320, 375, 768, 1024 and 1440: 1 / 1 / 2 / 4 / 4 cards visible, no horizontal page overflow, controls and arrows at least 44×44
  - no video bytes load before a tap (`preload="none"`, poster only)
- Behaviour:
  - Play A, then play B: A pauses, and only one video plays at a time.
  - Mute toggles `muted` and `aria-pressed`.
  - Pause and `ended` reset the button.
  - Arrow and swipe (drag) move the carousel.
  - A playing video pauses when its slide leaves the view.
  - Keyboard: every control can be focused and shows a focus ring.
- Reduced motion: slides jump without animation.
- Whole page: one H1, no skipped headings, no console errors. The screenshots at 375 and 1440 are compared with the reference image.
- Commit only when you ask: `Phase 6: video reviews section`.
