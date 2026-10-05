# Footer logo links to the homepage

## Context
The footer lockup (`Lockup` in `src/components/sections/Footer.tsx`) is a plain SVG, so clicking it does nothing. The header logo already links home. The user wants the footer logo to link to the website too.

## Change
In `src/components/sections/Footer.tsx`, wrap `<Lockup />` in a `next/link` to `/#top`, the same as the header logo (`Header.tsx:196`). A plain `/` would leave the scroll position unchanged on the homepage.

```tsx
{/* "/#top", like the header logo: a plain "/" keeps the scroll position on the homepage. */}
<Link href="/#top" className="inline-flex min-h-11 items-center">
  <Lockup />
</Link>
```

- **Accessible name:** the link takes the name "ecommercewisers" from the SVG's existing `role="img"` + `aria-label={brand}`. No new text is needed.
- **Tap target:** the lockup is 48px tall, but only 32px (`md:h-8`) from 768 to 1023. `min-h-11` keeps the link at least 44px tall there. It is 142px or more wide.
- **Focus:** the global `:focus-visible` ring (gold inside `.theme-dark`, from `globals.css`) applies. Nothing to add.
- **No hover effect.** This matches the header logo, which has none.
- `Link` is already imported. Footer stays a Server Component.

## Docs
- `docs/DESIGN.md` → Logo → "The footer lockup": add a line saying it links to `/#top` like the header logo, with a link at least 44px tall (it matters at the `md` 32px size).
- `docs/PROGRESS.md`: log the change (2026-10-05, at the user's request).

## Verification
- `npm run check` (typecheck, lint, build) passes.
- `/ew-test` sweeps are clean.
- On `npm run dev`, scroll to the footer and click the logo: the page goes back to the top. Tab to it: the gold focus ring shows, and Enter does the same.
- Check at 375, 768, 1024 and 1440: the layout is unchanged, there is no horizontal scroll, and at 768 the link box is at least 44px tall.
