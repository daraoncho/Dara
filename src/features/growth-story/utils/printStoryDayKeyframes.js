/**
 * Print headline slot keyframes for StoryDayHeadline.module.css.
 * Run when STORY_DAY_COUNT or STORY_KEYFRAME changes:
 *   node src/features/growth-story/utils/printStoryDayKeyframes.js
 */
import {
  STORY_DAY_COUNT,
  STORY_DAY_NUMBERS,
  STORY_UNKNOWN_DAY,
} from "../constants/days.js";
import {
  STORY_KEYFRAME,
  STORY_KEYFRAME_NARROW,
} from "../constants/animation.js";

const SHARE = 100 / STORY_DAY_COUNT;
const mp = (loop, phase) => loop * SHARE + phase * SHARE;
const f3 = (v) => `${Math.round(v * 1000) / 1000}`;

function buildSlots(keyframe) {
  const slots = [];
  for (let loop = 0; loop < STORY_DAY_COUNT; loop += 1) {
    slots.push({
      fadeInStart: mp(loop - 1, keyframe.resetAtStart),
      fadeInEnd: mp(loop - 1, keyframe.fadeInEnd),
      visibleEnd: mp(loop, keyframe.fadeOutStart),
      fadeOutEnd: mp(loop, keyframe.fadeOutEnd),
    });
  }
  slots[0].fadeInStart = mp(0, keyframe.pauseAtStart);
  slots[0].fadeInEnd = mp(0, keyframe.pauseAtStart);
  const wrapIn = mp(STORY_DAY_COUNT - 1, keyframe.resetAtStart);
  const wrapEnd = mp(STORY_DAY_COUNT - 1, keyframe.fadeInEnd);
  return { slots, wrapIn, wrapEnd };
}

function printSlot(i, slot, wrapIn, wrapEnd, suffix) {
  if (i === 0) {
    console.log(`@keyframes storyDay0${suffix} {
  0%,
  ${f3(slot.fadeInEnd)}% {
    opacity: 1;
  }
  ${f3(slot.visibleEnd)}% {
    opacity: 1;
  }
  ${f3(slot.fadeOutEnd)}% {
    opacity: 0;
  }
  ${f3(slot.fadeOutEnd + 0.001)}%,
  ${f3(wrapIn - 0.001)}% {
    opacity: 0;
  }
  ${f3(wrapEnd)}% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
`);
    return;
  }
  console.log(`@keyframes storyDay${i}${suffix} {
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

const day35Loop = STORY_DAY_NUMBERS.indexOf(35);
const unknownDayLoop = STORY_DAY_NUMBERS.indexOf(STORY_UNKNOWN_DAY);

for (const [suffix, kf] of [
  ["Wide", STORY_KEYFRAME],
  ["Narrow", STORY_KEYFRAME_NARROW],
]) {
  console.log(`\n/* === ${suffix} === */`);
  const { slots, wrapIn, wrapEnd } = buildSlots(kf);
  slots.forEach((slot, i) => printSlot(i, slot, wrapIn, wrapEnd, suffix));
  if (day35Loop >= 0 && unknownDayLoop >= 0) {
    const hideStart = mp(day35Loop - 1, kf.resetAtStart);
    const showAt = slots[unknownDayLoop].fadeInEnd;
    const fadeInStart = slots[unknownDayLoop].fadeInStart;
    console.log(
      `/* protagonistHideDay35${suffix}: hide ${f3(hideStart)}%–${f3(fadeInStart - 0.001)}%, show ${f3(fadeInStart)}% (walk + storyDay${unknownDayLoop} fade to ${f3(showAt)}%) */`,
    );
  }
}
