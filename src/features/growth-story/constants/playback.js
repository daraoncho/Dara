import { STORY_ANIMATION } from "./animation.js";

/**
 * Home / stage defaults — toggle control visibility and starting pace here.
 * Props on `GrowthStoryStage` can still override per usage.
 */
export const STORY_PLAYBACK = {
  /** When false, pace UI is hidden; animation still uses `defaultSpeed`. */
  showControl: false,
  /** Starting pace — 1 is normal; 2 is twice as fast. */
  defaultSpeed: 2,
};

/** Default story pace — 1 is normal; 2 is twice as fast. */
export const DEFAULT_STORY_PLAYBACK_SPEED = STORY_PLAYBACK.defaultSpeed;

export const STORY_PLAYBACK_SPEED_MIN = 0.5;
export const STORY_PLAYBACK_SPEED_MAX = 3;

export function clampStoryPlaybackSpeed(speed) {
  const n = Number(speed);
  if (!Number.isFinite(n)) {
    return DEFAULT_STORY_PLAYBACK_SPEED;
  }
  return Math.min(
    STORY_PLAYBACK_SPEED_MAX,
    Math.max(STORY_PLAYBACK_SPEED_MIN, n),
  );
}

/** Per-day loop length for CSS `--story-duration` (scales inversely with speed). */
export function storyDayDurationSec(speed = DEFAULT_STORY_PLAYBACK_SPEED) {
  const clamped = clampStoryPlaybackSpeed(speed);
  const seconds = STORY_ANIMATION.durationMs / 1000 / clamped;
  return `${seconds}s`;
}
