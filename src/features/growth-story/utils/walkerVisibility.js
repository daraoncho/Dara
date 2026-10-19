import { STORY_ANIMATION, STORY_KEYFRAME, STORY_KEYFRAME_NARROW } from "../constants/animation.js";
import { STORY_DAY_COUNT, STORY_DAY_NUMBERS, STORY_UNKNOWN_DAY } from "../constants/days.js";
import { STORY_BEAT_LOOP_INDEX } from "../constants/storyBeats.js";
import { masterPercent, storyDaySlotWindows } from "./storyDayMasterPercent.js";

/** Master timeline length (ms) — must match CSS `story-day-count × story-duration`. */
export function storyMasterDurationMs() {
  return STORY_DAY_COUNT * STORY_ANIMATION.durationMs;
}

/**
 * Master-cycle hide window for walking protagonist (Day 35 + loop-end reset).
 * Must match GrowthStoryStage `protagonistHideBeats*` keyframes.
 */
export function day35WalkerMasterHideWindow(narrow) {
  const day35Loop = STORY_BEAT_LOOP_INDEX.day35;
  const unknownLoop = STORY_DAY_NUMBERS.indexOf(STORY_UNKNOWN_DAY);
  if (day35Loop < 1 || unknownLoop < 0) {
    return null;
  }

  const keyframe = narrow ? STORY_KEYFRAME_NARROW : STORY_KEYFRAME;
  const slots = storyDaySlotWindows(keyframe);
  const hideStart = masterPercent(day35Loop - 1, keyframe.resetAtStart);
  const fadeInStart = slots[unknownLoop].fadeInStart;
  const hideEnd = fadeInStart - 0.001;

  return {
    hideStart,
    hideEnd,
    showAt: fadeInStart,
    fadeInEnd: slots[unknownLoop].fadeInEnd,
  };
}
