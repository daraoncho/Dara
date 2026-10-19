import {
  STORY_DAY_NUMBERS,
  STORY_SURPRISE_DAY,
  STORY_WONDER_DAY,
} from "./days.js";

/** Loop index (0-based) for each beat day — keep in sync with headline slots. */
export const STORY_BEAT_LOOP_INDEX = {
  day7: STORY_DAY_NUMBERS.indexOf(7),
  day20: STORY_DAY_NUMBERS.indexOf(20),
  day35: STORY_DAY_NUMBERS.indexOf(35),
  surpriseDay: STORY_DAY_NUMBERS.indexOf(STORY_SURPRISE_DAY),
  wonderDay: STORY_DAY_NUMBERS.indexOf(STORY_WONDER_DAY),
};

export const DAY_THIRTY_FIVE_COPY = {
  id: "doubtCreeps",
  text: "doubt creeps in",
};

/** @deprecated Use STORY_BEAT_LOOP_INDEX.day7 */
export const DAY_SEVEN_LOOP_INDEX = STORY_BEAT_LOOP_INDEX.day7;

/** Day 7 — two onlookers. */
export const DAY_SEVEN_DIALOGUE = [
  {
    id: "doubt",
    text: "are you sure something's growing?",
    observerId: "skeptic",
    speechAlign: "tailAtHead",
  },
  {
    id: "suggest",
    text: "maybe plant something else.",
    observerId: "peer",
    speechAlign: "headToRight",
  },
];

/** Day 20 — single voice. */
export const DAY_TWENTY_DIALOGUE = [
  {
    id: "giveup",
    text: "Give up!!!",
    observerId: "naysayer",
    speechAlign: "headToRight",
  },
];

/** Wonder day — walk in one after another (red → green → blue). */
export const WONDER_DAY_DIALOGUE = [
  {
    id: "knewIt",
    text: "I always knew you could do it",
    observerId: "naysayer",
    speechAlign: "headToRight",
  },
  {
    id: "wonderfulGrowing",
    text: "i just knew something wonderful was growing",
    observerId: "peer",
    speechAlign: "headToRight",
  },
  {
    id: "greatSeed",
    text: "wow, great choice of seed",
    observerId: "skeptic",
    speechAlign: "tailAtHead",
  },
];
