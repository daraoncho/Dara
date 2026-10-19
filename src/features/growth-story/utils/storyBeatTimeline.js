import { STORY_KEYFRAME, STORY_KEYFRAME_NARROW } from "../constants/animation.js";
import { STORY_BEAT_LOOP_INDEX } from "../constants/storyBeats.js";
import { DAY20_BEAT_LOOP_PHASE } from "../constants/storyBeatPhases.js";
import {
  formatMasterPercent,
  masterPercent,
  storyDaySlotWindows,
} from "./storyDayMasterPercent.js";

/** Day 7 — lines appear during pour. */
const LINE0_LOOP_PHASE = 0.32;
const LINE1_LOOP_PHASE = 0.4;

function lineMasterPercent(loopIndex, loopPhase) {
  return formatMasterPercent(masterPercent(loopIndex, loopPhase));
}

function slotVisibility(loopIndex, narrow) {
  const keyframe = narrow ? STORY_KEYFRAME_NARROW : STORY_KEYFRAME;
  const slot = storyDaySlotWindows(keyframe)[loopIndex];
  const fadeIn = slot.fadeInEnd;
  const fadeOut = slot.fadeOutEnd;
  const show = fadeIn + 0.4;
  return {
    hiddenUntil: formatMasterPercent(fadeIn - 0.4),
    showFrom: formatMasterPercent(show),
    hideFrom: formatMasterPercent(fadeOut + 0.6),
  };
}

/**
 * Reference percents for StoryBeat.module.css.
 * Regenerate: node src/features/growth-story/utils/printStoryBeatKeyframes.js
 */
export const STORY_BEAT_CSS = {
  wide: {
    day7: {
      slot: storyDaySlotWindows(STORY_KEYFRAME)[STORY_BEAT_LOOP_INDEX.day7],
      observers: slotVisibility(STORY_BEAT_LOOP_INDEX.day7, false),
      line0: lineMasterPercent(STORY_BEAT_LOOP_INDEX.day7, LINE0_LOOP_PHASE),
      line1: lineMasterPercent(STORY_BEAT_LOOP_INDEX.day7, LINE1_LOOP_PHASE),
    },
    day20: {
      slot: storyDaySlotWindows(STORY_KEYFRAME)[STORY_BEAT_LOOP_INDEX.day20],
      observers: slotVisibility(STORY_BEAT_LOOP_INDEX.day20, false),
      lineShow: lineMasterPercent(
        STORY_BEAT_LOOP_INDEX.day20,
        DAY20_BEAT_LOOP_PHASE.show,
      ),
      lineHide: lineMasterPercent(
        STORY_BEAT_LOOP_INDEX.day20,
        DAY20_BEAT_LOOP_PHASE.hideWide,
      ),
    },
  },
  narrow: {
    day7: {
      observers: slotVisibility(STORY_BEAT_LOOP_INDEX.day7, true),
      line0: lineMasterPercent(
        STORY_BEAT_LOOP_INDEX.day7,
        LINE0_LOOP_PHASE + 0.02,
      ),
      line1: lineMasterPercent(
        STORY_BEAT_LOOP_INDEX.day7,
        LINE1_LOOP_PHASE + 0.02,
      ),
    },
    day20: {
      observers: slotVisibility(STORY_BEAT_LOOP_INDEX.day20, true),
      lineShow: lineMasterPercent(
        STORY_BEAT_LOOP_INDEX.day20,
        DAY20_BEAT_LOOP_PHASE.show + 0.02,
      ),
      lineHide: lineMasterPercent(
        STORY_BEAT_LOOP_INDEX.day20,
        DAY20_BEAT_LOOP_PHASE.hideNarrow,
      ),
    },
  },
};
