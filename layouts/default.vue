<template>
  <div class="site">
    <div class="brand-strip" aria-hidden="true">
      <span class="brand-strip__seg brand-strip__seg--blue"></span>
      <span class="brand-strip__seg brand-strip__seg--yellow"></span>
      <span class="brand-strip__seg brand-strip__seg--red"></span>
    </div>
    <Nuxt />
  </div>
</template>

<style>
:root {
  /* Bauhaus / De Stijl inspired palette — see Kandinsky's Bauhaus
     colour-shape theory: circle=blue, triangle=yellow, square=red. */
  --ink: #16171d;
  --paper: #f6f2e7;
  --panel: #fffdf7;
  --blue: #1d4fd8;
  --blue-tint: #e4ecfd;
  --yellow: #f4c000;
  --yellow-tint: #fdf3cf;
  --red: #dd3b28;
  --red-tint: #fbe4e0;

  --font-display: 'Archivo Black', 'Arial Black', sans-serif;
  --font-body: 'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono: 'Space Mono', 'SFMono-Regular', Consolas, monospace;

  --rule: 3px;
  --rule-thin: 1.5px;
}

html {
  font-family: var(--font-body);
  font-size: 16px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  background: var(--paper);
  color: var(--ink);
}

body {
  background: var(--paper);
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

a {
  color: var(--blue);
}

a:hover {
  color: var(--red);
}

:focus-visible {
  outline: 3px solid var(--red);
  outline-offset: 2px;
}

button {
  font-family: inherit;
}

.site {
  min-height: 100vh;
}

.brand-strip {
  display: flex;
  height: 6px;
  width: 100%;
}

.brand-strip__seg {
  flex: 1;
}

.brand-strip__seg--blue { background: var(--blue); }
.brand-strip__seg--yellow { background: var(--yellow); }
.brand-strip__seg--red { background: var(--red); }

@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
  }
}
</style>
