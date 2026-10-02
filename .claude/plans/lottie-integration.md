# Task: Add the `code_dark` Lottie animation (dotLottie player)

## Context

- Stack: Next.js (App Router), TypeScript, Tailwind CSS v4.
- Asset: `code_dark.lottie` (20 KB). It is a zipped copy of `code_dark.json` (297 KB), and the animation data is byte-identical. **Use the `.lottie` file only.** Do not commit the JSON.
- Animation specs:
  - Name: `soft_dev`
  - Size and timing: 1080×1080 (1:1), 30 fps, 480 frames (16 s)
  - Layers: 71
  - Background: transparent
  - Images: none embedded (vector only)
- Content: a three-monitor dev desk, rotating HTML/CSS/PHP/JS/C++ bubbles, typing code lines, and a phone mockup sliding in. Palette is dark grey plus amber/yellow.
- Purpose: decorative illustration (not content).

## Workflow rules

1. **Stop after the plan.** List the files you will create or edit and the exact placement, then wait for my approval before writing code.
2. Before planning, read the actual current state of every file you will touch. Do not assume structure.
3. Declare types and data inside the component file. Do not add a shared content layer, barrel files, or `.data.ts` files.
4. Prefer small, line-level edits to existing files over full rewrites.
5. For proof, give me raw command output (build output, grep results). "Checks pass" alone is not enough.

## Steps

### 1. Install

```
npm install @lottiefiles/dotlottie-react
```

Paste the resulting version from `package.json`.

### 2. Asset

Copy `code_dark.lottie` to `public/animations/code-dark.lottie`.

### 3. Component: `src/components/ui/CodeAnimation.tsx`

Requirements:

- Add `"use client"` at the top. The player renders to a canvas and loads a WASM renderer, so it is client-only.
- Import `DotLottieReact` from `@lottiefiles/dotlottie-react`.
  - **Verify the exported component name and prop names against the installed package's `.d.ts`** before using them. Do not rely on memory.
- Props:
  - `className?: string`
  - `priority?: boolean`
  - No other props unless needed.
- Wrapper: a `div` with `aspect-square w-full` plus the passed `className`. This reserves space so there is **no layout shift** before the canvas loads.
- Player settings:
  - `src="/animations/code-dark.lottie"`
  - `loop`
  - `autoplay`
- Accessibility:
  - The animation is decorative, so put `aria-hidden="true"` on the wrapper.
  - Respect `prefers-reduced-motion: reduce`. When it matches, do not autoplay; show a static frame instead.
    - Get the player instance via the ref-callback prop exposed by the package.
    - Use the static frame at ~frame 360, where all elements are visible (phone, code lines, bubbles).
- Off-screen behaviour: check the package types for a render config that freezes playback when off-screen.
  - If it exists, enable it.
  - If it doesn't, pause and play with an `IntersectionObserver`.
- Background: keep it transparent. Do not add a background to the component. The parent section controls it.

### 4. WASM loading (check this before finalizing)

By default the player may fetch its `.wasm` renderer from a public CDN at runtime.

1. Find out from the installed package whether it does, and which URL it uses.
2. Report the finding.
3. Propose two options and **ask which I want**:
   - (a) Leave the CDN default.
   - (b) Self-host the `.wasm` in `public/` and point the player at it with the package's WASM-URL setter.

### 5. Placement

**[FILL IN: page / section, e.g. homepage hero, right column]**

The parent section stays a Server Component and just renders `<CodeAnimation />`. Do not add `"use client"` to the parent. Suggested sizing is `max-w-md` or `max-w-lg`, centred, and never wider than about 560 px.

## Verification (paste raw output)

- [ ] `npm run build` completes with no errors or type errors.
- [ ] `grep -rn "use client" src/components/ui/CodeAnimation.tsx` shows the directive.
- [ ] The parent file does NOT contain `"use client"`.
- [ ] `ls -la public/animations/` shows `code-dark.lottie` (about 20 KB) and no `.json`.
- [ ] No hydration warnings in the browser console on first load.
- [ ] Reduced-motion check: with the OS or DevTools "prefers-reduced-motion: reduce" emulation on, the animation shows a static frame and does not play.
- [ ] No layout shift: the square space is reserved before the animation appears.

## Out of scope

- Do not edit the animation itself: no theming, colours, or state machines.
- Do not add other Lottie libraries (`lottie-web`, `lottie-react`).
