export const STORY_ANIMATION = {
  durationMs: 8000,
};

/** Walk ends ~20%; pour only after stop; fade after pour completes. */
export const STORY_KEYFRAME = {
  pauseAtStart: 0.04,
  walkToSoilEnd: 0.2,
  pourStart: 0.3,
  pourEnd: 0.66,
  fadeOutStart: 0.68,
  fadeOutEnd: 0.72,
  resetAtStart: 0.76,
  fadeInEnd: 0.84,
};

/** Small viewports: longer settle, longer pour, later fade (same wall-clock loop). */
export const STORY_KEYFRAME_NARROW = {
  ...STORY_KEYFRAME,
  pourStart: 0.27,
  pourEnd: 0.74,
  fadeOutStart: 0.76,
  fadeOutEnd: 0.8,
  resetAtStart: 0.82,
  fadeInEnd: 0.9,
};

