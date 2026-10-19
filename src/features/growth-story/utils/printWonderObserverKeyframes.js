/**
 * Wonder day — three observers walk-in + dialogue for StoryBeat.module.css.
 *   node src/features/growth-story/utils/printWonderObserverKeyframes.js
 */
import { STORY_KEYFRAME, STORY_KEYFRAME_NARROW } from "../constants/animation.js";
import { STORY_BEAT_LOOP_INDEX } from "../constants/storyBeats.js";
import {
  OBSERVER_WALK_IN_OFFSET_PX,
  WONDER_WALK_DURATION_PHASE,
  WONDER_WALK_START_PHASE,
} from "../constants/wonderObserver.js";
import { storyDaySlotWindows } from "./storyDayMasterPercent.js";

const f3 = (v) => `${Math.round(v * 1000) / 1000}`;

function slotT(slot, phase) {
  return slot.fadeInStart + (slot.visibleEnd - slot.fadeInStart) * phase;
}

function beatBlock(name, slot, startPhase) {
  const start = slotT(slot, startPhase);
  console.log(`@keyframes ${name} {
  0%,
  ${f3(start - 0.001)}% {
    opacity: 0;
  }
  ${f3(start)}% {
    opacity: 1;
  }
  ${f3(slot.fadeOutEnd - 0.001)}% {
    opacity: 1;
  }
  ${f3(slot.fadeOutEnd)}%,
  100% {
    opacity: 0;
  }
}
`);
}

function walkBlock(name, slot, startPhase, offsetPx) {
  const start = slotT(slot, startPhase);
  const walkEnd = slotT(slot, startPhase + WONDER_WALK_DURATION_PHASE);

  console.log(`@keyframes ${name} {
  0%,
  ${f3(start - 0.001)}% {
    transform: translateX(${offsetPx}px);
  }
  ${f3(start)}% {
    transform: translateX(${offsetPx}px);
  }
  ${f3(walkEnd)}% {
    transform: translateX(0);
  }
  ${f3(slot.fadeOutEnd - 0.001)}% {
    transform: translateX(0);
  }
  ${f3(slot.fadeOutEnd)}%,
  100% {
    transform: translateX(${offsetPx}px);
  }
}
`);
}

function lineBlock(name, slot, startPhase) {
  const show = slotT(slot, startPhase);
  const hide = slot.fadeOutEnd;
  console.log(`@keyframes ${name} {
  0%,
  ${f3(show - 0.001)}% {
    opacity: 0;
  }
  ${f3(show)}% {
    opacity: 1;
  }
  ${f3(hide - 0.001)}% {
    opacity: 1;
  }
  ${f3(hide)}%,
  100% {
    opacity: 0;
  }
}
`);
}

function legBlock(name, slot, startPhase, side) {
  const start = slotT(slot, startPhase);
  const walkEnd = slotT(slot, startPhase + WONDER_WALK_DURATION_PHASE);
  const amp = side === "left" ? 11 : -11;
  const land = side === "left" ? -5 : 5;
  const steps = 6;

  console.log(`@keyframes ${name} {`);
  console.log(`  0%, ${f3(start - 0.001)}% { transform: rotate(0deg); }`);

  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps;
    const p = start + (walkEnd - start) * t;
    const rot = i % 2 === 0 ? amp : land;
    console.log(`  ${f3(p)}% { transform: rotate(${rot}deg); }`);
  }

  console.log(`  ${f3(walkEnd + 0.001)}%, 100% { transform: rotate(0deg); }`);
  console.log(`}\n`);
}

const OBSERVERS = [
  ["Red", "red"],
  ["Green", "green"],
  ["Blue", "blue"],
];

const wonderLoop = STORY_BEAT_LOOP_INDEX.wonderDay;

for (const [suffix, kf] of [
  ["Wide", STORY_KEYFRAME],
  ["Narrow", STORY_KEYFRAME_NARROW],
]) {
  const slot = storyDaySlotWindows(kf)[wonderLoop];
  console.log(`\n/* === Wonder observers ${suffix} (loop ${wonderLoop}) === */`);

  for (const [label, key] of OBSERVERS) {
    const startPhase = WONDER_WALK_START_PHASE[key];
    console.log(`\n/* ${label} */`);
    beatBlock(`storyBeatWonder${label}${suffix}`, slot, startPhase);
    walkBlock(
      `observerWonderWalk${label}${suffix}`,
      slot,
      startPhase,
      OBSERVER_WALK_IN_OFFSET_PX,
    );
    lineBlock(`storyLineWonder${label}${suffix}0`, slot, startPhase);
    legBlock(
      `observerWonderLeg${label}Left${suffix}`,
      slot,
      startPhase,
      "left",
    );
    legBlock(
      `observerWonderLeg${label}Right${suffix}`,
      slot,
      startPhase,
      "right",
    );
  }
}
