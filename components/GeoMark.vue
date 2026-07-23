<template>
  <svg class="geo-mark" viewBox="8 4 44 50" role="img" aria-label="GeoRiddles mark">
    <polygon class="geo-mark__triangle" points="24,4 42,4 33,20" />
    <rect class="geo-mark__square" x="32" y="14" width="18" height="18" transform="rotate(12 41 23)" />
    <circle class="geo-mark__circle" cx="24" cy="38" r="16" />
  </svg>
</template>

<style scoped>
.geo-mark {
  width: auto;
  height: var(--geo-mark-size, 44px);
  flex-shrink: 0;
  overflow: visible;
}

.geo-mark__triangle {
  fill: var(--yellow);
}

.geo-mark__square {
  fill: var(--red);
}

.geo-mark__circle {
  fill: var(--blue);
}
</style>
