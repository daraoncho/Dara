/** Red (naysayer) — closest to the protagonist on wonder day. */
export const OBSERVER_WONDER_RED_RATIO = 0.46;

/** Gap between each observer in line (× protagonist width). */
export const OBSERVER_WONDER_LINE_GAP_RATIO = 0.38;

export const OBSERVER_WONDER_GREEN_RATIO =
  OBSERVER_WONDER_RED_RATIO + OBSERVER_WONDER_LINE_GAP_RATIO;

export const OBSERVER_WONDER_BLUE_RATIO =
  OBSERVER_WONDER_GREEN_RATIO + OBSERVER_WONDER_LINE_GAP_RATIO;

/** Walk-in starts this far off-screen to the right (px). */
export const OBSERVER_WALK_IN_OFFSET_PX = 76;

/** Fraction of wonder slot: when each observer starts walking (staggered). */
export const WONDER_WALK_START_PHASE = {
  red: 0,
  green: 0.07,
  blue: 0.14,
};

/** How long each walk-in takes within the wonder slot (0–1). */
export const WONDER_WALK_DURATION_PHASE = 0.17;

/** Lift green wonder bubble so it clears red/blue lines (px). */
export const WONDER_GREEN_SPEECH_LIFT_PX = 36;
