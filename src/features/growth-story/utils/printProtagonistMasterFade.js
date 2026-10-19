/**
 * Print walking protagonist master visibility (Day 35 hide + wonder still-figure swap).
 *   node src/features/growth-story/utils/printProtagonistMasterFade.js
 */
import {
  STORY_DAY_COUNT,
  STORY_DAY_NUMBERS,
  STORY_UNKNOWN_DAY,
  STORY_WONDER_DAY,
} from "../constants/days.js";
import { STORY_KEYFRAME, STORY_KEYFRAME_NARROW } from "../constants/animation.js";

const SHARE = 100 / STORY_DAY_COUNT;
const mp = (loop, phase) => loop * SHARE + phase * SHARE;
const f3 = (v) => `${Math.round(v * 1000) / 1000}`;

function buildSlots(keyframe) {
  const slots = [];
  for (let loop = 0; loop < STORY_DAY_COUNT; loop += 1) {
    slots.push({
      fadeInStart: mp(loop - 1, keyframe.resetAtStart),
      fadeOutEnd: mp(loop, keyframe.fadeOutEnd),
    });
  }
  return slots;
}

function printVisibility(suffix, kf) {
  const slots = buildSlots(kf);
  const day35 = STORY_DAY_NUMBERS.indexOf(35);
  const unknown = STORY_DAY_NUMBERS.indexOf(STORY_UNKNOWN_DAY);
  const wonder = STORY_DAY_NUMBERS.indexOf(STORY_WONDER_DAY);

  const hide35Start = mp(day35 - 1, kf.resetAtStart);
  const hide35End = slots[unknown].fadeInStart - 0.001;
  const wonderStart = slots[wonder].fadeInStart - 0.001;
  const wonderEnd = slots[wonder].fadeOutEnd;

  console.log(`@keyframes protagonistHideBeats${suffix} {
  0%,
  ${f3(hide35Start - 0.001)}% {
    opacity: 1;
  }
  ${f3(hide35Start)}%,
  ${f3(hide35End)}% {
    opacity: 0;
  }
  ${f3(hide35End + 0.001)}%,
  ${f3(wonderStart)}% {
    opacity: 1;
  }
  ${f3(wonderStart + 0.001)}%,
  ${f3(wonderEnd)}% {
    opacity: 0;
  }
  ${f3(wonderEnd + 0.001)}%,
  100% {
    opacity: 1;
  }
}
`);
}

for (const [suffix, kf] of [
  ["Wide", STORY_KEYFRAME],
  ["Narrow", STORY_KEYFRAME_NARROW],
]) {
  console.log(`\n/* === ${suffix} === */`);
  printVisibility(suffix, kf);
}
