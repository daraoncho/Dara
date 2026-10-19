import { STORY_ANIMATION, STORY_KEYFRAME, STORY_KEYFRAME_NARROW } from "../constants/animation.js";
import { STORY_BEAT_LOOP_INDEX } from "../constants/storyBeats.js";
import { STORY_DAY_COUNT } from "../constants/days.js";
import { masterPercent, storyDaySlotWindows } from "./storyDayMasterPercent.js";

export function storyMasterDurationMs() {
  return STORY_DAY_COUNT * STORY_ANIMATION.durationMs;
}

/** Slot windows for Day *** (surprise loop). */
export function surpriseDaySlot(narrow) {
  const keyframe = narrow ? STORY_KEYFRAME_NARROW : STORY_KEYFRAME;
  const loop = STORY_BEAT_LOOP_INDEX.surpriseDay;
  if (loop < 0) {
    return null;
  }
  const slots = storyDaySlotWindows(keyframe);
  return { loop, slot: slots[loop], keyframe };
}

/** Map loop-local phase (0–1) into master timeline percent. */
export function surpriseMasterPhase(narrow, phase) {
  const info = surpriseDaySlot(narrow);
  if (!info) {
    return 0;
  }
  return masterPercent(info.loop, phase);
}

export function formatPct(value) {
  return `${Math.round(value * 1000) / 1000}%`;
}
