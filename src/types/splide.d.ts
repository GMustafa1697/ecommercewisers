// Splide's core CSS is imported by its package subpath, which has no .css extension, so Next's
// `*.css` declaration doesn't cover it under `noUncheckedSideEffectImports` (TypeScript 6's default).
declare module "@splidejs/splide/css/core" {}
