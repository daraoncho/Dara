/** Horizontal story stage — see constants/rail.js for walk band width. */
export const STAGE = {
  minHeightPx: 118,
  baselineOffsetPx: 24,
};

/** Warm, matte garden soil — avoid cool gray bands that read as rock. */
export const SOIL_COLORS = {
  groundShadow: "rgba(0, 0, 0, 0.22)",
  deep: "#3a2a1f",
  body: "#5a4332",
  dry: "#7d6249",
  top: "#9a7d5e",
  speckDark: "rgba(28, 20, 14, 0.45)",
  speckLight: "rgba(210, 180, 140, 0.35)",
  crumb: "rgba(90, 67, 50, 0.55)",
};

export const SOIL_PILE_SIZE = {
  width: 112,
  height: 28,
};

export const SOIL_SHAPE = {
  groundY: 24,
  peakHeight: 12,
  /** Mound tip in soil viewBox (112×28) — pour + wet overlay align here. */
  peakX: 56,
};
