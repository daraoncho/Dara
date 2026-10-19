import { STORY_DAY_COUNT } from "../constants/days.js";

const LOOP_SHARE = 100 / STORY_DAY_COUNT;

/** Map one loop phase (0–1) into the 4-loop master timeline (0–100%). */
export function masterPercent(loopIndex, phase) {
  return loopIndex * LOOP_SHARE + phase * LOOP_SHARE;
}

export function formatMasterPercent(value) {
  const rounded = Math.round(value * 1000) / 1000;
  return `${rounded}%`;
}

/** Day headline windows aligned to protagonist fade keyframes. */
export function storyDaySyncPercents(keyframe) {
  const {
    pauseAtStart: pause,
    fadeOutStart: outStart,
    fadeOutEnd: outEnd,
    resetAtStart: reset,
    fadeInEnd: inEnd,
  } = keyframe;

  return {
    pause: masterPercent(0, pause),
    fadeOutStart: masterPercent(0, outStart),
    fadeOutEnd: masterPercent(0, outEnd),
    fadeInStart: masterPercent(0, reset),
    fadeInEnd: masterPercent(0, inEnd),
    wrapFadeInStart: masterPercent(STORY_DAY_COUNT - 1, reset),
    wrapFadeInEnd: masterPercent(STORY_DAY_COUNT - 1, inEnd),
  };
}

/** Build slot windows for maintainability checks (slot 0 = Day 1, etc.). */
export function storyDaySlotWindows(keyframe) {
  const slots = [];
  for (let loop = 0; loop < STORY_DAY_COUNT; loop += 1) {
    slots.push({
      fadeInStart: masterPercent(loop - 1, keyframe.resetAtStart),
      fadeInEnd: masterPercent(loop - 1, keyframe.fadeInEnd),
      visibleEnd: masterPercent(loop, keyframe.fadeOutStart),
      fadeOutEnd: masterPercent(loop, keyframe.fadeOutEnd),
    });
  }
  slots[0].fadeInStart = masterPercent(0, keyframe.pauseAtStart);
  slots[0].fadeInEnd = masterPercent(0, keyframe.pauseAtStart);
  return slots;
}
