/**
 * Tailwind's default breakpoints in rem (its `sm:`, `md:` and `lg:` variants), for the scripts that
 * must switch at the same widths as the CSS: the carousels, the logo strip and the mobile menu.
 */
const breakpoints = { sm: 40, md: 48, lg: 64 } as const;

type Breakpoint = keyof typeof breakpoints;

/** A media query that matches from the breakpoint up: the same condition as Tailwind's `md:`. */
export const atLeast = (breakpoint: Breakpoint) => `(width >= ${breakpoints[breakpoint]}rem)`;

/** The last pixel width below the breakpoint (at the default 16px rem), for Splide's max-width keys. */
export const maxPx = (breakpoint: Breakpoint) => breakpoints[breakpoint] * 16 - 1;
