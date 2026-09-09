/** User-facing strings for Thought Fragments. */
export const GAME_COPY = {
  toggleLabel: "game mode",
  toggleOnTitle: "Disable game mode",
  toggleOffTitle: "Enable game mode",
  infoTitle: "how to play",
  infoControlsTitle: "controls",
  infoControls: [
    { keys: "← →", label: "move" },
    { keys: "space", label: "jump" },
    { keys: "↓", label: "drop down" },
    { keys: "scroll", label: "explore" },
  ],
  infoGoal: "collect every spark, then step through the door",
  loseTitle: "you fell.",
  loseSubtitle: "idea lost in the void.",
  winTitle: "thoughts shipped.",
  winSubtitle: "A thought isn't real until you build it.",
  loseHint: "or press space",
  restart: "try again",
  playAgain: "play again",
  doorLocked: "Not yet; there are still thoughts left to find.",
};

/** Shown in the collect toast when a checkpoint is reached. */
export const COLLECT_QUIPS = {
  home: "First Spark",
  about: "Origin Thought",
  experience: "Builder Instinct",
  work: "Final Spark",
  finish: "A thought isn't real until you build it.",
};

export function getCollectQuip(fragment) {
  if (fragment.kind === "finish") return COLLECT_QUIPS.finish;
  return COLLECT_QUIPS[fragment.sectionId] ?? COLLECT_QUIPS.home;
}
