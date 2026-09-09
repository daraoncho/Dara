/** Active stage spans these portfolio sections (in scroll order). */
export const STAGE_SECTION_IDS = ["home", "about", "experience", "work"];

/** One idea fragment per section — positions randomized at runtime. */
export const FRAGMENT_BLUEPRINT = [
  { sectionId: "home" },
  { sectionId: "about" },
  { sectionId: "experience" },
  { sectionId: "work" },
];

export const IDEA_FRAGMENT_COUNT = FRAGMENT_BLUEPRINT.length;
/** Four idea fragments + one finish-line door. */
export const COLLECTIBLE_TOTAL = IDEA_FRAGMENT_COUNT + 1;

/** @deprecated Use COLLECTIBLE_TOTAL for HUD totals. */
export const FRAGMENT_COUNT = COLLECTIBLE_TOTAL;
