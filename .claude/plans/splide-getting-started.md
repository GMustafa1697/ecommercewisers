# Splide: Getting Started

## Installation

There are 4 ways to include Splide on your site.

### NPM

NPM is the recommended installation method. Install the latest version with:

```bash
npm install @splidejs/splide
```

### Hosting Files

Download the Splide package, go to the `dist/js` directory, and load `splide.min.js` with a `<script>` tag:

```html
<script src="path-to-the-file/splide.min.js"></script>
```

### CDN

You can also include the library from a CDN (jsDelivr).

> For production, use a specific version number instead of `latest` to avoid unexpected breakage from future updates.

### Integration

Integration packages are available for React, Vue and Svelte:

- React Splide
- Vue Splide
- Svelte Splide

> The latest Vue Splide only supports Vue 3. For Vue 2 you have to use the old version (`0.3.5`), which also ships an outdated Splide version.

## Importing CSS

Next, pick a CSS file and link it to your site.

### Files

The `dist/css` and `dist/css/themes` directories contain several CSS files:

| File | Description |
| --- | --- |
| `splide.min.css` | All styles. Same content as `splide-default.min.css` |
| `splide-[theme].min.css` | All styles, with the given theme |
| `splide-core.min.css` | Core styles only |

If you want to fully customize the carousel's appearance, use `splide-core.min.css`. It doesn't include arrow, pagination or progress bar styles, so there's less to override. Otherwise, use `splide.min.css` or `splide-[theme].min.css`.

### Linking the Style Sheet

Link the file with a `<link>` element:

```html
<!-- File hosted on your server -->
<link rel="stylesheet" href="path-to-the-file/splide.min.css">

<!-- or from the CDN -->
<link rel="stylesheet" href="url-to-cdn/splide.min.css">
```

Or import it if your bundler supports CSS:

```js
// Default theme
import '@splidejs/splide/css';

// or other themes
import '@splidejs/splide/css/skyblue';
import '@splidejs/splide/css/sea-green';

// or core styles only
import '@splidejs/splide/css/core';
```

## HTML

There are two base structures, depending on whether the carousel is part of your main content.

### Main content carousel

For banners, galleries, cards, product lists and similar content, use `<section>`:

```html
<section class="splide" aria-label="Splide Basic HTML Example">
  <div class="splide__track">
    <ul class="splide__list">
      <li class="splide__slide">Slide 01</li>
      <li class="splide__slide">Slide 02</li>
      <li class="splide__slide">Slide 03</li>
    </ul>
  </div>
</section>
```

### Decorative carousel

If the carousel isn't related to your main content, use a `<div>` with `role="group"`:

```html
<div class="splide" role="group" aria-label="Splide Basic HTML Example">
  <div class="splide__track">
    <ul class="splide__list">
      <li class="splide__slide">Slide 01</li>
      <li class="splide__slide">Slide 02</li>
      <li class="splide__slide">Slide 03</li>
    </ul>
  </div>
</div>
```

Put any content (images, text, etc.) inside the `.splide__slide` elements. You can use `<div>` instead of `<section>`, `<ul>` and `<li>`.

### Labelling

Always give the root element a concise label. If the carousel has a visible heading, associate it with `aria-labelledby` instead of `aria-label`:

```html
<section class="splide" aria-labelledby="carousel-heading">
  <h2 id="carousel-heading">Splide Basic HTML Example</h2>

  <div class="splide__track">
    <ul class="splide__list">
      <li class="splide__slide">Slide 01</li>
      <li class="splide__slide">Slide 02</li>
      <li class="splide__slide">Slide 03</li>
    </ul>
  </div>
</section>
```

## Applying Splide

### Using Import

Import the `Splide` class, create an instance, and call `mount()`. The constructor's first argument accepts a CSS selector or an element.

```js
import Splide from '@splidejs/splide';

new Splide('.splide').mount();
```

> Don't forget to call `mount()`, or nothing will appear in the browser.

### Using the Global Class

If you load the library with a `<script>` tag, `Splide` is available globally:

```html
<script>
  new Splide('.splide').mount();
</script>
```

The target element must exist before you create the instance. If you initialize in `<head>`, wait for `DOMContentLoaded`:

```html
<script>
  document.addEventListener('DOMContentLoaded', function () {
    var splide = new Splide('.splide');
    splide.mount();
  });
</script>
```

## Multiple Carousels

Each Splide instance creates only one carousel. Even if you pass a class name, Splide only applies to the first matching element. Create one instance per carousel:

```js
new Splide('#slider1').mount();
new Splide('#slider2').mount();
new Splide('#slider3').mount();
```

Or initialize them in a loop:

```js
var elms = document.getElementsByClassName('splide');

for (var i = 0; i < elms.length; i++) {
  new Splide(elms[i]).mount();
}
```
