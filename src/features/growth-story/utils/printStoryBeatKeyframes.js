/**
 * Print StoryBeat.module.css observer + Day 20 line keyframes.
 * Run when STORY_DAY_COUNT or STORY_KEYFRAME changes:
 *   node src/features/growth-story/utils/printStoryBeatKeyframes.js
 */
import { STORY_KEYFRAME, STORY_KEYFRAME_NARROW } from "../constants/animation.js";
import { STORY_BEAT_LOOP_INDEX } from "../constants/storyBeats.js";
import { DAY20_BEAT_LOOP_PHASE } from "../constants/storyBeatPhases.js";
import { masterPercent, storyDaySlotWindows } from "./storyDayMasterPercent.js";

const f3 = (v) => `${Math.round(v * 1000) / 1000}`;

const LINE0 = 0.32;
const LINE1 = 0.4;

function beatBlock(name, slot) {
  console.log(`@keyframes ${name} {
  0%,
  ${f3(slot.fadeInStart - 0.001)}% {
    opacity: 0;
  }
  ${f3(slot.fadeInEnd)}% {
    opacity: 1;
  }
  ${f3(slot.visibleEnd)}% {
    opacity: 1;
  }
  ${f3(slot.fadeOutEnd)}% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}
`);
}

function day7Line(name, loop, phase, fadeOutEnd) {
  const show = masterPercent(loop, phase);
  console.log(`@keyframes ${name} {
  0%,
  ${f3(show - 0.001)}% {
    opacity: 0;
  }
  ${f3(show)}% {
    opacity: 1;
  }
  ${f3(fadeOutEnd - 0.001)}% {
    opacity: 1;
  }
  ${f3(fadeOutEnd)}% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}
`);
}

function day20Line(name, loop, showPhase, hidePhase) {
  const show = masterPercent(loop, showPhase);
  const hide = masterPercent(loop, hidePhase);
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
  ${f3(hide)}% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}
`);
}

const day7 = STORY_BEAT_LOOP_INDEX.day7;
const day20 = STORY_BEAT_LOOP_INDEX.day20;

for (const [suffix, kf] of [
  ["Wide", STORY_KEYFRAME],
  ["Narrow", STORY_KEYFRAME_NARROW],
]) {
  const slots = storyDaySlotWindows(kf);
  console.log(`\n/* === Beats ${suffix} === */`);
  beatBlock(`storyBeatDay7${suffix}`, slots[day7]);
  beatBlock(`storyBeatDay20${suffix}`, slots[day20]);

  const d7 = slots[day7];
  day7Line(`storyLineDay7${suffix}0`, day7, LINE0, d7.fadeOutEnd);
  day7Line(`storyLineDay7${suffix}1`, day7, LINE1, d7.fadeOutEnd);

  const hidePhase =
    suffix === "Wide"
      ? DAY20_BEAT_LOOP_PHASE.hideWide
      : DAY20_BEAT_LOOP_PHASE.hideNarrow;
  day20Line(
    `storyLineDay20${suffix}0`,
    day20,
    DAY20_BEAT_LOOP_PHASE.show,
    hidePhase,
  );
}
