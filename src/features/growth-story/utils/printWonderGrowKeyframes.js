/**
 * Wonder day — sprout → tree grow keyframes for SoilSprout.module.css.
 *   node src/features/growth-story/utils/printWonderGrowKeyframes.js
 */
import { STORY_KEYFRAME, STORY_KEYFRAME_NARROW } from "../constants/animation.js";
import {
  STORY_DAY_NUMBERS,
  STORY_SURPRISE_DAY,
  STORY_WONDER_DAY,
} from "../constants/days.js";
import { storyDaySlotWindows } from "./storyDayMasterPercent.js";

const f3 = (v) => `${Math.round(v * 1000) / 1000}`;

function printTreeGrow(suffix, slot) {
  const growStart = slot.fadeInStart;
  const growEnd = slot.visibleEnd;
  const hideAfter = slot.fadeOutEnd;
  const steps = 14;

  console.log(`@keyframes wonderTreeGrow${suffix} {
  0%,
  ${f3(growStart - 0.001)}% {
    opacity: 0;
    transform: scale(0.05);
  }`);

  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps;
    const eased = 1 - (1 - t) ** 2.45;
    const p = growStart + (growEnd - growStart) * t;
    const scale = 0.06 + 0.94 * eased;
    const opacity = Math.min(1, 0.18 + 0.82 * eased);
    console.log(`  ${f3(p)}% {
    opacity: ${f3(opacity)};
    transform: scale(${f3(scale)});
  }`);
  }

  console.log(`  ${f3(hideAfter - 0.001)}% {
    opacity: 1;
    transform: scale(1);
  }
  ${f3(hideAfter)}%,
  100% {
    opacity: 0;
    transform: scale(0.05);
  }
}
`);
}

/** Opacity only — surprise → Day **; hidden for entire wonder-day slot. */
function printSproutUnderTree(suffix, wonderSlot, surpriseSlot) {
  const revealStart = surpriseSlot.fadeInStart;
  const revealEnd = surpriseSlot.fadeInEnd;
  const wonderStart = wonderSlot.fadeInStart;
  const loopReset = wonderSlot.fadeOutEnd;

  console.log(`@keyframes sproutUnderTree${suffix} {
  0%,
  ${f3(revealStart - 0.001)}% {
    opacity: 0;
  }
  ${f3(revealStart)}% {
    opacity: 0;
  }
  ${f3(revealEnd)}% {
    opacity: 1;
  }
  ${f3(wonderStart - 0.001)}% {
    opacity: 1;
  }
  ${f3(wonderStart)}%,
  ${f3(loopReset - 0.001)}% {
    opacity: 0;
  }
  ${f3(loopReset)}%,
  100% {
    opacity: 0;
  }
}
`);
}

const surpriseLoop = STORY_DAY_NUMBERS.indexOf(STORY_SURPRISE_DAY);
const wonderLoop = STORY_DAY_NUMBERS.indexOf(STORY_WONDER_DAY);

for (const [suffix, kf] of [
  ["Wide", STORY_KEYFRAME],
  ["Narrow", STORY_KEYFRAME_NARROW],
]) {
  const windows = storyDaySlotWindows(kf);
  const wonderSlot = windows[wonderLoop];
  const surpriseSlot = windows[surpriseLoop];
  console.log(`\n/* === Wonder grow ${suffix} (loop ${wonderLoop}) === */`);
  printTreeGrow(suffix, wonderSlot);
  printSproutUnderTree(suffix, wonderSlot, surpriseSlot);
}
