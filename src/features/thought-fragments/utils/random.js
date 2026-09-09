/** Seeded PRNG — same seed yields the same layout (stable per game session). */
export function createRng(seed = 1) {
  let state = Math.abs(Math.floor(seed)) || 1;

  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 0x100000000;
  };
}

export function randomRange(rng, min, max) {
  return min + rng() * (max - min);
}

export function pickColumn(cols, index, rng) {
  const offset = Math.floor(rng() * cols.length);
  return cols[(index + offset) % cols.length];
}
