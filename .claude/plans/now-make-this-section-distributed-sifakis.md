# Plan: a dark Contact section with a light panel

## Context
You asked for the Contact section's background to be dark and its inner panel light. Today it's the
reverse: a white section with a black panel (`theme-dark`, since 2026-10-22). Your choices:
- **White panel** (`theme-light`, like the Services cards on their dark section).
- **Gold "Send message" button**: the dark secondary can't stay black on a light panel without a
  gold focus ring on white (2.0:1).
- **Divider lines above and below** Contact. Reviews, Contact and the footer become three dark
  blocks in a row, and neighbouring dark sections get 1px #3D3D3D lines.

## Change: `src/components/sections/Contact.tsx`
- `<Section id="contact">` → `<Section id="contact" dark className="border-y border-border">`. The
  border resolves to #3D3D3D because the section carries `.theme-dark` itself (as Portfolio did when
  it was dark).
- The panel: `theme-dark` → `theme-light` (white, black text, black-12% border, black accent and
  focus ring). The rest of its classes stay.
- What follows from the light scope, with no other class changes:
  - The eyebrow chip, label, intro and email turn to their light values (black, muted black at 70%,
    5.9:1).
  - The fields (`bg-surface border-muted`) become #F3F3F3 boxes with a black-70% outline (more than
    3:1 against white). The black text is 13.9:1 on them. On focus the border goes transparent and the
    black 2px focus ring frames the field.
  - The sent and failed notes (`noteClass`, `bg-surface`) become light-grey pills with black text.
- The submit: `buttonClass({ variant: "secondary" })` → `buttonClass({ variant: "primary" })`. Gold,
  black label 7.8:1, its ring black on light (`.btn-primary`'s `--btn-ring: var(--foreground)`). The
  focus outline is black. The disabled/pending classes stay.
- Update the comments: `fieldClass` ("on the white panel"), `noteClass` ("light-grey pills"), and the
  `Contact` doc comment (a dark section with a white panel, 2026-10-23, your request; history kept short).

## Comments elsewhere
- `src/app/globals.css`: comments only. Section 2 notes `.theme-light` is also the Contact panel.
  Section 3's list of dark `<Section>`s becomes Services, Process, Reviews and Contact (Portfolio
  went white with your edit).

## Docs
- `CLAUDE.md` → Theme rule:
  - Contact joins the dark sections, with its `border-y`.
  - `theme-light` makes the Contact panel white, as with the Services cards.
  - "The reverse" no longer lists the Contact panel.
  - Note that Reviews, Contact and the footer are dark in a row, split by divider lines.
- `docs/DESIGN.md`:
  - Homepage rhythm: Contact dark, white panel.
  - The Contact entry (panel, fields, notes, submit).
  - The Buttons table: Contact's submit is now primary, so the Hero's isn't the only gold button.
- `docs/PLAN.md`: row 7's theme.
- `docs/PROGRESS.md`: a new Latest entry and a Decisions log row.

## Verification
1. `npm run check` passes with no warnings. Run the `/ew-test` sweeps.
2. Headless Chrome against the dev server (a CDP script in the scratchpad), at 375, 768, 1024 and 1440:
   - The computed colours:
     - the section #222 with 1px #3D3D3D top and bottom borders
     - the panel white
     - the eyebrow chip, labels and text black or muted
     - the fields #F3F3F3 with their outline
     - the submit gold with a black label
   - Focus: Tab into a field, then to the submit. The outline is 2px black. The field's border goes
     transparent.
   - **The invalid state**, without sending anything: turn off the browser checks (`noValidate`) and
     submit a bad email. The server's error shows under the field, plus "Check the fields marked
     above."
   - **The sent note**, also without sending: fill the honeypot field, which `sendMessage` answers
     with "sent" and no email. The pill shows light grey.
   - No horizontal scroll and no console errors.
3. Crops of Reviews → Contact → footer at 375, 1024 and 1440.
