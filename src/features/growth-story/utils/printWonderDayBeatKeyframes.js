/**
 * Wonder day — still protagonist at soil, visible for the wonder slot.
 *   node src/features/growth-story/utils/printWonderDayBeatKeyframes.js
 */
import { STORY_KEYFRAME, STORY_KEYFRAME_NARROW } from "../constants/animation.js";
import { STORY_DAY_NUMBERS, STORY_WONDER_DAY } from "../constants/days.js";
import { storyDaySlotWindows } from "./storyDayMasterPercent.js";

const f3 = (v) => `${Math.round(v * 1000) / 1000}`;

function printWonderProtagonistShow(suffix, slot) {
  const start = slot.fadeInStart;
  const end = slot.fadeOutEnd;

  console.log(`@keyframes wonderProtagonistShow${suffix} {
  0%,
  ${f3(start - 0.001)}% {
    opacity: 0;
    visibility: hidden;
  }
  ${f3(start)}% {
    opacity: 1;
    visibility: visible;
  }
  ${f3(end - 0.001)}% {
    opacity: 1;
    visibility: visible;
  }
  ${f3(end)}%,
  100% {
    opacity: 0;
    visibility: hidden;
  }
}
`);
}

const wonderLoop = STORY_DAY_NUMBERS.indexOf(STORY_WONDER_DAY);

for (const [suffix, kf] of [
  ["Wide", STORY_KEYFRAME],
  ["Narrow", STORY_KEYFRAME_NARROW],
]) {
  const slot = storyDaySlotWindows(kf)[wonderLoop];
  console.log(`\n/* === Wonder protagonist ${suffix} (loop ${wonderLoop}) === */`);
  printWonderProtagonistShow(suffix, slot);
}
