/**
 * Print SurpriseDayBeat.module.css master keyframes (Day ***).
 * Run when STORY_DAY_COUNT or STORY_KEYFRAME changes:
 *   node src/features/growth-story/utils/printSurpriseBeatKeyframes.js
 */
import { STORY_KEYFRAME, STORY_KEYFRAME_NARROW } from "../constants/animation.js";
import { STORY_DAY_NUMBERS, STORY_SURPRISE_DAY } from "../constants/days.js";
import { masterPercent, storyDaySlotWindows } from "./storyDayMasterPercent.js";

const f3 = (v) => `${Math.round(v * 1000) / 1000}`;

/** Bounce peaks from pour start through loop fade-out (protagonist exit). */
function jumpCurve(loop, kf) {
  const mp = (phase) => masterPercent(loop, phase);
  const start = kf.pourStart;
  const end = kf.fadeOutEnd;
  const heights = [-16, -13, -11, -9, -8, -7, -6];
  const cycle = 0.065;
  const peaks = [];
  let phase = start + 0.04;
  let i = 0;

  while (phase < end - 0.008) {
    peaks.push({ p: mp(phase), y: heights[i % heights.length] });
    const landPhase = Math.min(phase + cycle * 0.48, end);
    peaks.push({ p: mp(landPhase), y: 0 });
    phase += cycle;
    i += 1;
  }

  return { pourStart: mp(start), fadeOutEnd: mp(end), peaks };
}

function printSprout(kf, suffix, loop, slot) {
  const fadeInStart = slot.fadeInStart;
  const fadeInEnd = slot.fadeInEnd;
  console.log(`@keyframes sproutReveal${suffix} {
  0%,
  ${f3(fadeInStart - 0.001)}% {
    transform: scale(0.72);
  }
  ${f3(fadeInStart)}% {
    transform: scale(0.72);
  }
  ${f3(fadeInEnd)}% {
    transform: scale(1);
  }
  100% {
    transform: scale(1);
  }
}
`);
}

function printPourSuppress(kf, suffix, loop) {
  const start = masterPercent(loop, kf.pourStart - 0.02);
  const end = masterPercent(loop, kf.pourEnd + 0.02);
  console.log(`@keyframes surprisePourSuppress${suffix} {
  0%,
  ${f3(start - 0.001)}% {
    opacity: 1;
  }
  ${f3(start)}%,
  ${f3(end)}% {
    opacity: 0;
  }
  ${f3(end + 0.001)}%,
  100% {
    opacity: 1;
  }
}
`);
}

function printHandCan(kf, suffix, loop) {
  const drop = masterPercent(loop, kf.pourStart);
  const end = masterPercent(loop, kf.fadeOutEnd);
  console.log(`@keyframes surpriseHandCan${suffix} {
  0%,
  ${f3(drop - 0.001)}% {
    opacity: 1;
    transform: translate(0, 0);
  }
  ${f3(drop)}% {
    opacity: 0;
    transform: translate(2px, 6px);
  }
  ${f3(end)}%,
  100% {
    opacity: 0;
    transform: translate(2px, 6px);
  }
}
`);
}

function printGroundCan(kf, suffix, loop, slot) {
  const drop = masterPercent(loop, kf.pourStart);
  const fadeOutEnd = slot.fadeOutEnd;
  console.log(`@keyframes surpriseGroundCan${suffix} {
  0%,
  ${f3(drop - 0.001)}% {
    opacity: 0;
    transform: translateY(4px);
  }
  ${f3(drop)}% {
    opacity: 1;
    transform: translateY(0);
  }
  ${f3(fadeOutEnd - 0.001)}% {
    opacity: 1;
    transform: translateY(0);
  }
  ${f3(fadeOutEnd)}%,
  100% {
    opacity: 0;
    transform: translateY(4px);
  }
}
`);
}

function printCelebrateArms(kf, suffix, loop) {
  const up = masterPercent(loop, kf.pourStart);
  const down = masterPercent(loop, kf.fadeOutEnd);
  console.log(`@keyframes surpriseCelebrateArms${suffix} {
  0%,
  ${f3(up - 0.001)}% {
    opacity: 0;
  }
  ${f3(up)}%,
  ${f3(down)}% {
    opacity: 1;
  }
  ${f3(down + 0.001)}%,
  100% {
    opacity: 0;
  }
}
`);
}

/** Inverse of surpriseCelebrateArms — hides walk/pour arms while celebrate overlay shows. */
function printDefaultArmsHide(kf, suffix, loop) {
  const up = masterPercent(loop, kf.pourStart);
  const down = masterPercent(loop, kf.fadeOutEnd);
  console.log(`@keyframes surpriseDefaultArmsHide${suffix} {
  0%,
  ${f3(up - 0.001)}% {
    opacity: 1;
  }
  ${f3(up)}%,
  ${f3(down)}% {
    opacity: 0;
  }
  ${f3(down + 0.001)}%,
  100% {
    opacity: 1;
  }
}
`);
}

function printJump(kf, suffix, loop) {
  const { pourStart, fadeOutEnd, peaks } = jumpCurve(loop, kf);
  console.log(`@keyframes surpriseCelebrateJump${suffix} {
  0%,
  ${f3(pourStart - 0.001)}% {
    transform: translateY(0);
  }`);
  peaks.forEach(({ p, y }) => {
    console.log(`  ${f3(p)}% {
    transform: translateY(${y}px);
  }`);
  });
  console.log(`  ${f3(fadeOutEnd)}%,
  100% {
    transform: translateY(0);
  }
}
`);
}

function printSoakSuppress(kf, suffix, loop) {
  const start = masterPercent(loop, kf.pourStart - 0.02);
  const end = masterPercent(loop, kf.pourEnd + 0.04);
  console.log(`@keyframes surpriseSoakSuppress${suffix} {
  0%,
  ${f3(start - 0.001)}% {
    opacity: 1;
  }
  ${f3(start)}%,
  ${f3(end)}% {
    opacity: 0;
  }
  ${f3(end + 0.001)}%,
  100% {
    opacity: 1;
  }
}
`);
}

const loop = STORY_DAY_NUMBERS.indexOf(STORY_SURPRISE_DAY);

for (const [suffix, kf] of [
  ["Wide", STORY_KEYFRAME],
  ["Narrow", STORY_KEYFRAME_NARROW],
]) {
  console.log(`\n/* === Surprise ${suffix} (loop ${loop}) === */`);
  const slots = storyDaySlotWindows(kf);
  const slot = slots[loop];
  printSprout(kf, suffix, loop, slot);
  printPourSuppress(kf, suffix, loop);
  printHandCan(kf, suffix, loop);
  printGroundCan(kf, suffix, loop, slot);
  printCelebrateArms(kf, suffix, loop);
  printDefaultArmsHide(kf, suffix, loop);
  printJump(kf, suffix, loop);
  printSoakSuppress(kf, suffix, loop);
}
