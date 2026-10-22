# Animated gold primary button

## Context

The homepage's primary CTA has drifted from the locked design system. `docs/DESIGN.md` → Buttons
says the primary variant is `bg-primary text-primary-foreground hover:bg-primary/90` (gold fill,
black text), but `src/components/ui/ButtonLink.tsx:6` still carries the unreviewed WIP polish
classes `bg-white text-primary-foreground … hover:bg-black hover:text-white`, and the secondary
variant has lost its border entirely. `docs/PROGRESS.md:36` already flags this ("DESIGN.md's
Buttons table still lists the old classes").

On top of that, the primary button has no motion of its own — it is the one element on the page
that a visitor is meant to act on, and it currently only shifts a shade on hover.

**Outcome:** the primary button is gold again, per the locked spec, and gains a hover animation —
the arrow slides in and the label nudges right, with the button lifting. It applies to all three
primary CTAs (Hero, Services, Contact submit). No new dependency, no client JS.

**Decisions (yours, 2026-10-21):** animation = *arrow slide + lift*; colour = *gold, per
DESIGN.md*; scope = *all three primary CTAs*.

## What changes

### 1. `src/components/ui/ButtonLink.tsx` — the variants

```tsx
const variants = {
  primary: "group bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:shadow-md",
  secondary: "border border-border text-foreground hover:border-muted hover:bg-surface",
} as const;
```

- `group` on the primary, so the arrow and label can react to `group-hover:`.
- The base's `hover:-translate-y-px` becomes `hover:-translate-y-0.5` (2px, the lift you
  approved in the preview). It stays in the shared base, so the secondary keeps the same lift.
- `border border-border` comes off the primary (gold fill + a hairline is muddy) and goes onto
  the secondary, which restores its outline.

The secondary row is included because a gold primary next to the current *white* secondary reads
as two competing buttons, and the locked spec calls the secondary an outlined button ("The header
CTA is secondary (outlined)"). It also puts the header CTA back to spec. It is a one-line change
in the same string and can be dropped on its own if you disagree.

### 2. `src/components/ui/ButtonContent.tsx` — new file

One shared piece for all three CTAs, so nothing is copy-pasted (CLAUDE.md → no copy-pasted
blocks). It renders the label and the arrow as the button's two flex items, so the button's
existing `gap-2` spaces them:

```tsx
export function ButtonContent({ children }: { children: ReactNode }) {
  return (
    <>
      <span className="transition-transform duration-200 ease-out group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0">
        {children}
      </span>
      <ArrowRightIcon className="size-4 shrink-0 -translate-x-1 opacity-0 transition-all duration-200 ease-out group-hover:translate-x-0 group-hover:opacity-100 motion-reduce:translate-x-0 motion-reduce:group-hover:translate-x-0" />
    </>
  );
}
```

**The motion.** At rest the arrow is invisible but still takes its 16px + 8px gap, so the button
never changes size when hovered (no layout shift). On hover the arrow fades in while sliding 4px
right, and the label slides 4px right with it — the pair keeps its spacing and the whole content
shifts 4px inside the button. The button itself lifts 2px. One pass, on hover only, never
auto-playing.

**Reduced motion.** `motion-reduce:` variants neutralise both translations (the house pattern
from `ButtonLink.tsx:23` and `PortfolioPreview.tsx:121`); the global guard in `globals.css:122`
makes the remaining opacity change instant. The arrow still appears, it just doesn't travel.

`ButtonContent` has no `"use client"` — it is a plain presentational component, so it renders
inside the server sections (Hero, Services) and inside the client Contact form alike.

### 3. `src/components/ui/icons.tsx` — the arrow

No arrow icon exists (only chevrons). Add one, in the file's existing line-icon style:

```tsx
export function ArrowRightIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 12h15" />
      <path d="m13 6 6 6-6 6" />
    </Icon>
  );
}
```

It inherits `currentColor`, so it is black on the gold fill. Also update the file's header comment,
which says callers always use `size-5` or `size-6` — the button arrow is `size-4`, to sit level
with the 16px label.

### 4. The three call sites

Each wraps its label in `<ButtonContent>`:

- `src/components/sections/Hero.tsx:55` — `<ButtonLink href={startProject.href}><ButtonContent>{startProject.label}</ButtonContent></ButtonLink>`
- `src/components/sections/Services.tsx:66` — same, keeping `className="mt-8 w-full sm:w-auto"`
- `src/components/sections/Contact.tsx:112` — the real `<button>`; it uses `buttonClass()`, so it
  gets `group` from the same variant string and the same `<ButtonContent>` wrapper. The pending
  state ("Sending…") keeps the arrow.

## Files touched

| File | Change |
|---|---|
| `src/components/ui/ButtonLink.tsx` | the two variant strings, the 2px lift |
| `src/components/ui/ButtonContent.tsx` | **new** — the label + sliding arrow |
| `src/components/ui/icons.tsx` | `ArrowRightIcon` |
| `src/components/sections/Hero.tsx` | wrap the label |
| `src/components/sections/Services.tsx` | wrap the label |
| `src/components/sections/Contact.tsx` | wrap the label |
| `docs/DESIGN.md` | Buttons table, Animation section, component table |
| `docs/PROGRESS.md` | a "Now" entry, and close the two open items |

## Docs

`docs/DESIGN.md`:
- **Buttons table** — the primary row becomes the real classes; the secondary row becomes the
  outlined one. Add a line for the arrow and the hover behaviour: the arrow is in the flow (the
  button never resizes), it fades and slides 4px in on hover with the label, the button lifts 2px,
  and it is off under reduced motion.
- **Animation section** — the new motion goes in the approved-exceptions list, dated 2026-10-21,
  with the 200 ms ease-out timing and the reduced-motion behaviour. The page's 150 ms
  colour-only rule stays as it is for everything else.
- **Component table** — add `ButtonContent` and `ArrowRightIcon`.
- The primary button keeps its `shadow-sm` / `hover:shadow-md`, which the "no shadows inside
  `.theme-dark`" rule forbids — PROGRESS.md:35 already lists this as an open item. Recording the
  button as the one exception closes it. (The dark Portfolio cards' shadow is a separate section
  and stays open.)

`docs/PROGRESS.md`: a "Now" entry for the change, and the "DESIGN.md's Buttons table still lists
the old classes" item closed.

## Verification

1. `npm run check` (typecheck + lint + build) must pass.
2. `npm run dev`, then look at the three CTAs at **375, 768, 1024 and 1440**:
   - the Hero, Services and Contact buttons are gold with black text (7.8:1 — the pair
     `docs/DESIGN.md` already lists);
   - hover each one: the arrow fades and slides in, the label nudges right, the button lifts 2px,
     and **the button does not resize** (the arrow's space is reserved);
   - the header CTA and the second hero CTA are outlined, and the hero's gold button is the only
     gold button above the fold;
   - the focus ring is visible on every button, and the Contact submit still reads "Sending…"
     while sending.
3. Emulate `prefers-reduced-motion: reduce` in the browser: the arrow appears instantly, nothing
   slides, the lift is instant. Confirm the `motion-reduce:` variants win the cascade — if the
   label still nudges 4px, tighten the variant order.
4. No horizontal scroll at any of the four widths, and every button still at least 44×44.
5. Check the Contact panel on the light grey `#F3F3F3`: the gold fill with black text still reads
   as a button, and the gold button is the only gold thing in the first view.

## Out of scope

- No new dependency, no animation library, no client JS (the button stays a Server Component
  outside the Contact form).
- No change to the button sizes, the radius, the contact form's Server Action, or any other
  section.
- Not committed unless you ask.
