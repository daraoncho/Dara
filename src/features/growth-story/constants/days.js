/** Label for routine days with no special beat — “he keeps going”. */
export const STORY_UNKNOWN_DAY = "**";

/** Surprise payoff — sprout, no pour, celebration jump. */
export const STORY_SURPRISE_DAY = "***";

/** Wonder day — tree + observers; no day headline. */
export const STORY_WONDER_DAY = "day-wonder";

/** Day labels — one per story loop, then repeat. Number or symbolic day tokens. */
export const STORY_DAY_NUMBERS = [
  1,
  2,
  4,
  7,
  20,
  35,
  STORY_UNKNOWN_DAY,
  STORY_SURPRISE_DAY,
  STORY_WONDER_DAY,
];

export const STORY_DAY_COUNT = STORY_DAY_NUMBERS.length;

export function formatStoryDayLabel(day) {
  if (day === STORY_UNKNOWN_DAY) {
    return "Day **";
  }
  if (day === STORY_SURPRISE_DAY) {
    return "Day ***";
  }
  if (day === STORY_WONDER_DAY) {
    return "";
  }
  return `Day ${day}`;
}
