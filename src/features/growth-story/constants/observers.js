import { PROTAGONIST_SIZE } from "./characters";

/** Slightly shorter than the protagonist — same baseline via align-items. */
const HEIGHT_SCALE = 0.82;

export const OBSERVER_SIZE = {
  width: Math.round(PROTAGONIST_SIZE.width * HEIGHT_SCALE),
  height: Math.round(PROTAGONIST_SIZE.height * HEIGHT_SCALE),
};

/** Head in viewBox (48×62) — used to align bubbles above faces. */
export const OBSERVER_HEAD_ANCHOR = {
  /** Head center from figure’s right edge (viewBox width 48). */
  fromFigureRightRatio: (48 - 22) / 48,
  /** Head center from figure’s left edge — peer bubble starts here and runs right. */
  fromFigureLeftRatio: 22 / 48,
  /** Hairline from feet (SVG bottom) upward. */
  topFromFeetRatio: (62 - 11) / 62,
};

/** Space between figure head and bubble bottom (px). */
export const OBSERVER_CHAT_GAP_PX = 14;

/**
 * Distance past the stop edge (× protagonist width) toward the start line.
 * Blue sits where the pair used to end; red is further from the soil.
 */
export const OBSERVER_BEHIND_BLUE_RATIO = 0.72;
export const OBSERVER_BEHIND_RED_RATIO = 1.32;
/** Day 20 — further from soil than the Day 7 pair. */
export const OBSERVER_BEHIND_NAYSAYER_RATIO = 1.58;

export const OBSERVER_PALETTES = {
  skeptic: {
    skin: "#b88862",
    hair: "#252525",
    top: "#3a5878",
    topLight: "#4a6d92",
    pants: "#2c2c2c",
    shoe: "#161616",
  },
  /** Day 7 — green shirt. */
  peer: {
    skin: "#c49a72",
    hair: "#1a1a1a",
    top: "#4a6b52",
    topLight: "#5d8268",
    pants: "#262626",
    shoe: "#141414",
  },
  /** Day 20 — red shirt. */
  naysayer: {
    skin: "#b8926e",
    hair: "#2a2520",
    top: "#8b4545",
    topLight: "#a05555",
    pants: "#2a2a2a",
    shoe: "#161616",
  },
};
