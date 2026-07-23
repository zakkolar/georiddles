<template>
  <div class="page">
    <header class="hero">
      <div class="hero__brand">
        <GeoMark />
        <h1 class="hero__title">GeoRiddles</h1>
      </div>
      <p class="hero__eyebrow">Geometry riddle generator</p>
      <p class="hero__lede">
        Pick a shape, choose the math, then hand the clues to your class.
        After students solve the math, they can program a robot to follow the steps and draw the shape.
      </p>
    </header>

    <main class="builder">
      <section class="panel panel--shape" aria-labelledby="shape-heading">
        <header class="panel__head">
          <h2 id="shape-heading" class="panel__title">Shape</h2>
          <svg class="panel__glyph" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="10" fill="currentColor" />
          </svg>
        </header>
        <div class="panel__body">
          <label class="field-label" for="shape-select">Draw a&hellip;</label>
          <div class="select-shell">
            <select id="shape-select" class="select" v-model="currentShapeKey">
              <optgroup v-for="category of shapeCategories" :key="category" :label="category">
                <option
                  v-for="shape of shapes.filter(item => item.category === category)"
                  :key="shape.label"
                  :value="shape.label"
                >
                  {{ shape.label }} ({{ shape.shape.numSteps() }} steps)
                </option>
              </optgroup>
            </select>
          </div>

          <div class="thumbnail">
            <div class="canvas-frame">
              <span class="canvas-frame__tick canvas-frame__tick--tl" aria-hidden="true"></span>
              <span class="canvas-frame__tick canvas-frame__tick--tr" aria-hidden="true"></span>
              <span class="canvas-frame__tick canvas-frame__tick--br" aria-hidden="true"></span>
              <canvas id="preview" width="200" height="200"></canvas>
            </div>
          </div>

          <details class="sources">
            <summary>Where these shapes come from</summary>
            <ul class="sources__list">
              <li v-for="source in shapeSources" :key="source.name">
                <span class="sources__name">{{ source.name }}</span>
                <ul class="sources__links">
                  <li v-for="link in source.links" :key="link.url">
                    <a :href="link.url" target="_blank" rel="noopener">{{ link.text }}</a>
                  </li>
                </ul>
              </li>
            </ul>
          </details>
        </div>
      </section>

      <section class="panel panel--math" aria-labelledby="math-heading">
        <header class="panel__head">
          <h2 id="math-heading" class="panel__title">Math</h2>
          <svg class="panel__glyph" viewBox="0 0 24 24" aria-hidden="true">
            <rect x="4" y="4" width="16" height="16" fill="currentColor" />
          </svg>
        </header>
        <div class="panel__body">
          <p class="field-label">Include these problem types</p>
          <div class="checkbox-grid">
            <label class="check" v-for="item of transformations" :key="item.label">
              <input class="check__input" type="checkbox" :value="item.label" v-model="chosenTransformationKeys">
              <span class="check__box" aria-hidden="true"></span>
              <span class="check__text">{{ item.label }}</span>
            </label>
          </div>
        </div>
      </section>

      <section class="panel panel--clues" aria-labelledby="clues-heading">
        <header class="panel__head">
          <h2 id="clues-heading" class="panel__title">Clues</h2>
          <div class="clue-actions">
            <button v-if="showRegenerate && currentSteps.length" class="regen-btn" type="button" @click.prevent="generateSteps">
              Regenerate
            </button>
            <button
              class="copy-btn"
              type="button"
              :disabled="!currentSteps.length"
              @click.prevent="copyClues"
            >
              {{ copyLabel }}
            </button>
          </div>
        </header>
        <div class="panel__body">
          <ol v-if="currentSteps.length" class="clue-list">
            <li v-for="(step, index) of currentSteps" :key="index" v-html="step"></li>
          </ol>
          <p v-else class="clue-empty">
            <span class="live-dot" aria-hidden="true"></span>
            <span>Pick a shape to see its clues.</span>
          </p>
        </div>
      </section>
    </main>
  </div>
</template>

<script lang="ts">
// @ts-nocheck
import Vue from 'vue'
import {SHAPES} from "~/models/Shapes";
import {Renderer} from "~/models/Renderer";
import {NO_TRANSFORMATION, TRANSFORMATIONS} from "~/models/Transformations";

export default Vue.extend({
  data() : {
    renderer: Renderer | null,
    shapes: typeof SHAPES,
    transformations: typeof TRANSFORMATIONS,
    chosenTransformationKeys: String[],
    currentSteps: String[],
    currentShapeKey: string | null,
    copyState: string,
    shapeSources: []
  } {
    return {
      shapes: SHAPES,
      transformations: TRANSFORMATIONS,
      chosenTransformationKeys: [],
      renderer: null,
      currentSteps: [],
      currentShapeKey: null,
      copyState: 'idle',
      shapeSources: [
        {
          name: 'iRobot',
          links: [
            {
              url: 'https://edu.irobot.com/learning-library/ice-skate-shapes',
              text: 'Root - Ice Skate Shapes'
            },
            {
              url: 'https://shop.edu.irobot.com/blogs/stories/root-alphabet-guide',
              text: 'Root Alphabet Guide'
            }
          ]

        },
        {
          name: 'Heidi MacGregor',
          links: [
            {
              url: 'https://docs.google.com/presentation/d/1hB0rm63zTsxP8HFe8TcEdT6IbGJEcKLZkratZtRoCE4/edit#slide=id.gad514305c7_0_24',
              text: 'GeoRiddles 1'
            },
            {
              url: 'https://docs.google.com/presentation/d/1cwEnqvj2BHCvo3T0IDmbqe1Y_QgQY2ZckWH7aihynxg/edit#slide=id.gad9e89dbdd_0_56',
              text: 'More GeoRiddles'
            },
            {
              url: 'https://docs.google.com/presentation/d/1iLwJAtFU2XUDUFym61fDVqK3m-sYiN_loPqj10ik4F4/edit#slide=id.ga57901608d_0_5',
              text: 'Level 2 GeoRiddles'
            }
          ]
        }
      ]
    }
  },
  mounted() {
    const c = document.getElementById('preview');
    const dpr = window.devicePixelRatio || 1;
    // @ts-ignore
    c.width = 200 * dpr;
    // @ts-ignore
    c.height = 200 * dpr;
    // @ts-ignore
    this.renderer = new Renderer(c, {scale: 5 * dpr});
    this.resetCanvas();

  },

  computed: {
    currentTransformations(){
      if(this.chosenTransformationKeys.length === 0){
        return [NO_TRANSFORMATION];
      }
      else{
        // @ts-ignore
        return this.transformations
          // @ts-ignore
          .filter(item => this.chosenTransformationKeys.indexOf(item.label) > -1)
          // @ts-ignore
          .map(item => item.transformation);
      }
    },

    currentShape(){
      // @ts-ignore
      const shape = this.shapes.find(shape => shape.label == this.currentShapeKey);
      if(shape){
        return shape.shape;
      }
      return null;
    },

    showRegenerate(){
      // @ts-ignore
      return this.currentTransformations.length > 1 || this.currentTransformations[0] !== NO_TRANSFORMATION;
    },

    shapeCategories(){
      // @ts-ignore
      return this.shapes.map(item => item.category).filter((value, index, self) => self.indexOf(value) === index);
    },

    copyLabel(){
      if(this.copyState === 'copied') return 'Copied!';
      if(this.copyState === 'error') return 'Copy failed';
      return 'Copy clues';
    }
  },
  watch: {
    currentShape(oldShape, newShape){
      this.generateSteps();
      this.renderPreview();
    },
    currentTransformations(oldTransformation, newTransformation){
      this.generateSteps();
    }
  },
  methods: {
    generateSteps(){
      if(this.currentShape && this.currentTransformations.length > 0){
        this.currentSteps = this.currentShape.generateStepList(this.currentTransformations);
      }
      else {
        this.currentSteps = [];
      }
    },
    resetCanvas(){
      // @ts-ignore
      this.renderer.penUp();
      // @ts-ignore
      this.renderer.clear();
    },
    renderPreview(){
      this.resetCanvas();
      if(this.currentShape){
        this.renderer.goTo(this.currentShape.startX, this.currentShape.startY);
        this.renderer.rotateTo(0);
        this.renderer.rotateLeft(this.currentShape.startAngle);
        this.currentShape.render(this.renderer);
      }
    },
    async copyClues(){
      if(!this.currentSteps.length){
        return;
      }

      const container = document.createElement('div');
      container.innerHTML = `<ol>${this.currentSteps.map(step => `<li>${step}</li>`).join('')}</ol>`;

      // Strip anything that could carry page styling (colors, fonts, classes)
      // while keeping the list structure and bolded phrases intact.
      container.querySelectorAll('*').forEach(el => {
        el.removeAttribute('style');
        el.removeAttribute('class');
      });

      const html = container.innerHTML;
      const text = this.cluesToPlainText(container.querySelector('ol'));

      try {
        if(navigator.clipboard && window.ClipboardItem){
          await navigator.clipboard.write([
            new ClipboardItem({
              'text/html': new Blob([html], {type: 'text/html'}),
              'text/plain': new Blob([text], {type: 'text/plain'})
            })
          ]);
        }
        else {
          await navigator.clipboard.writeText(text);
        }
        this.copyState = 'copied';
      }
      catch(e){
        this.copyState = 'error';
      }

      setTimeout(() => { this.copyState = 'idle'; }, 2000);
    },
    cluesToPlainText(ol, depth = 0){
      const items = Array.from(ol.children).filter(child => child.tagName === 'LI');
      const lines = [];

      items.forEach((li, index) => {
        const marker = depth === 0 ? `${index + 1}.` : `${String.fromCharCode(97 + index)}.`;
        const clone = li.cloneNode(true);
        const nestedOl = clone.querySelector('ol');
        if(nestedOl){
          nestedOl.remove();
        }
        const indent = '  '.repeat(depth);
        lines.push(`${indent}${marker} ${clone.textContent.trim()}`);

        const originalNestedOl = li.querySelector(':scope > ol');
        if(originalNestedOl){
          lines.push(...this.cluesToPlainText(originalNestedOl, depth + 1));
        }
      });

      return lines.join('\n');
    }
  }
})
</script>

<style scoped>
.page {
  max-width: 1180px;
  margin: 0 auto;
  padding: 2.75rem 1.5rem 4.5rem;
}

/* ---------- Hero ---------- */

.hero {
  margin-bottom: 2.5rem;
  --geo-mark-size: clamp(1.8rem, 4.5vw, 3rem);
  --hero-indent: calc(var(--geo-mark-size) * 0.88 + 0.4rem);
}

.hero__brand {
  display: flex;
  align-items: baseline;
  gap: 0.4rem;
}

.hero__eyebrow {
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-size: 0.72rem;
  opacity: 0.65;
  margin-top: 0.3rem;
  margin-bottom: 1rem;
  margin-left: calc(var(--hero-indent) + 0.5rem);
}

.hero__title {
  font-family: var(--font-display);
  font-size: clamp(2.4rem, 6vw, 4rem);
  line-height: 0.92;
  letter-spacing: -0.01em;
  text-transform: uppercase;
}

.hero__lede {
  font-size: 1.05rem;
  line-height: 1.55;
  max-width: 52ch;
  opacity: 0.85;
  margin-left: var(--hero-indent);
}

/* ---------- Builder grid ---------- */

.builder {
  border: var(--rule) solid var(--ink);
  background: var(--panel);
  display: grid;
  grid-template-columns: 1fr;
}

.panel {
  border-top: var(--rule) solid var(--ink);
  min-width: 0;
}

.builder > .panel:first-child {
  border-top: none;
}

.panel--clues {
  display: flex;
  flex-direction: column;
  min-height: 0;
}

@media (min-width: 900px) {
  .builder {
    grid-template-columns: minmax(230px, 0.85fr) minmax(230px, 0.85fr) minmax(360px, 1.5fr);
  }

  .panel--shape {
    grid-column: 1;
    border-top: none;
  }

  .panel--math {
    grid-column: 2;
    border-top: none;
    border-left: var(--rule) solid var(--ink);
  }

  .panel--clues {
    grid-column: 3;
    border-top: none;
    border-left: var(--rule) solid var(--ink);
    max-height: 78vh;
  }
}

/* ---------- Panel chrome ---------- */

.panel__head {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  height: 3.35rem;
  padding: 0 1.1rem;
  border-bottom: var(--rule-thin) solid var(--ink);
}

.panel--shape .panel__head {
  background: var(--blue);
  color: #fff;
}

.panel--math .panel__head {
  background: var(--yellow);
  color: var(--ink);
}

.panel--clues .panel__head {
  background: var(--red);
  color: #fff;
}

.panel__title {
  font-family: var(--font-display);
  text-transform: uppercase;
  font-size: 1.05rem;
  letter-spacing: 0.02em;
  flex: 1;
}

.panel__glyph {
  width: 18px;
  height: 18px;
  opacity: 0.9;
}

.panel__body {
  padding: 1.25rem 1.1rem 1.6rem;
}

.panel--clues .panel__body {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.field-label {
  display: block;
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.75rem;
  margin-bottom: 0.55rem;
  opacity: 0.7;
}

/* ---------- Shape select ---------- */

.select-shell {
  position: relative;
}

.select {
  width: 100%;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 500;
  padding: 0.65rem 2.2rem 0.65rem 0.8rem;
  border: var(--rule-thin) solid var(--ink);
  background: var(--panel);
  color: var(--ink);
  cursor: pointer;
}

.select-shell::after {
  content: '';
  position: absolute;
  right: 0.95rem;
  top: 50%;
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 7px solid var(--ink);
  transform: translateY(-35%);
  pointer-events: none;
}

.sources {
  margin-top: 1.15rem;
  font-size: 0.9rem;
}

.sources summary {
  cursor: pointer;
  font-family: var(--font-mono);
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--blue);
}

.sources summary:hover {
  color: var(--red);
}

.sources__list {
  list-style: none;
  padding: 0;
  margin: 0.85rem 0 0;
}

.sources__list > li {
  margin-bottom: 0.65rem;
}

.sources__name {
  font-weight: 600;
}

.sources__links {
  list-style: none;
  padding-left: 0.9rem;
  margin-top: 0.3rem;
  border-left: 2px solid var(--blue-tint);
}

.sources__links li {
  margin-top: 0.3rem;
}

.sources__links a {
  font-size: 0.85rem;
}

/* ---------- Math checkboxes ---------- */

.checkbox-grid {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.check {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  cursor: pointer;
  font-size: 0.92rem;
}

.check__input {
  position: absolute;
  opacity: 0;
  width: 1px;
  height: 1px;
}

.check__box {
  width: 20px;
  height: 20px;
  border: var(--rule-thin) solid var(--ink);
  background: var(--panel);
  flex-shrink: 0;
  position: relative;
}

.check__input:checked + .check__box {
  background: var(--ink);
}

.check__input:checked + .check__box::after {
  content: '';
  position: absolute;
  left: 5px;
  top: 1px;
  width: 6px;
  height: 11px;
  border: solid var(--yellow);
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.check__input:focus-visible + .check__box {
  outline: 3px solid var(--red);
  outline-offset: 2px;
}

/* ---------- Shape thumbnail ---------- */

.thumbnail {
  margin-top: 1.15rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.canvas-frame {
  position: relative;
  padding: 8px;
  border: var(--rule) solid var(--ink);
  background: #fff;
  max-width: 140px;
}


.canvas-frame__tick {
  position: absolute;
  width: 12px;
  height: 12px;
}

.canvas-frame__tick--tl {
  top: -3px;
  left: -3px;
  border-top: 3px solid var(--blue);
  border-left: 3px solid var(--blue);
}

.canvas-frame__tick--tr {
  top: -3px;
  right: -3px;
  border-top: 3px solid var(--yellow);
  border-right: 3px solid var(--yellow);
}

.canvas-frame__tick--br {
  bottom: -3px;
  right: -3px;
  border-bottom: 3px solid var(--red);
  border-right: 3px solid var(--red);
}

#preview {
  display: block;
  background: transparent;
  width: 100%;
  height: auto;
}

/* ---------- Clues ---------- */

.clue-actions {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.regen-btn,
.copy-btn {
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-size: 0.68rem;
  line-height: 1;
  padding: 0.35rem 0.6rem;
  cursor: pointer;
}

.regen-btn {
  background: var(--ink);
  color: #fff;
  border: 1.5px solid var(--ink);
}

.copy-btn {
  background: transparent;
  color: #fff;
  border: 1.5px solid #fff;
}

.copy-btn:hover:not(:disabled) {
  background: #fff;
  color: var(--red);
}

.copy-btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.regen-btn:hover {
  background: var(--yellow);
  color: var(--ink);
  border-color: var(--yellow);
}

.clue-list {
  list-style: none;
  counter-reset: clue;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding-right: 0.35rem;
}

.clue-empty {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  text-align: center;
  opacity: 0.75;
}

.live-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--red);
  flex-shrink: 0;
  animation: pulse 1.7s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

.clue-list > li {
  counter-increment: clue;
  position: relative;
  padding-left: 2.75rem;
  font-size: 1rem;
  line-height: 1.55;
}

.clue-list > li::before {
  content: counter(clue, decimal-leading-zero);
  position: absolute;
  left: 0;
  top: -0.05rem;
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 1rem;
  color: var(--red);
  width: 2.1rem;
}

.clue-list ::v-deep b {
  font-family: var(--font-mono);
  font-weight: 700;
  font-style: normal;
  background: var(--yellow-tint);
  padding: 0.05rem 0.3rem;
}

.clue-list ::v-deep ol {
  list-style: none;
  counter-reset: sub;
  margin: 0.65rem 0 0;
  padding: 0.6rem 0 0.6rem 1rem;
  border-left: 3px solid var(--yellow);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.clue-list ::v-deep ol li {
  counter-increment: sub;
  position: relative;
  padding-left: 1.6rem;
  font-size: 0.95rem;
}

.clue-list ::v-deep ol li::before {
  content: counter(sub, lower-alpha) '.';
  position: absolute;
  left: 0;
  font-family: var(--font-mono);
  color: var(--blue);
  font-weight: 700;
}
</style>
