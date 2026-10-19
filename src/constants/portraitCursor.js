/** Pixel portrait pointer — size and spin toggles. */
export const PORTRAIT_CURSOR = {
  /** When true, crosshair spins while over the portrait; when false, uses static `crosshair`. */
  rotate: true,
  /** Half-length of each crosshair arm (px in cursor bitmap). */
  armPx: 6,
  /** Cursor bitmap width/height (px). */
  bitmapSize: 24,
  /** Rotations per second when `rotate` is true. */
  spinHz: 1.25,
};
