/** Core physics and layout tuning for Thought Fragments (Phase 1). */
export const SCALE = 2;
export const ROBOT_PX_W = 16;
export const ROBOT_PX_H = 18;
export const ROBOT_W = ROBOT_PX_W * SCALE;
export const ROBOT_H = ROBOT_PX_H * SCALE;

export const GRAVITY = 0.22;
export const JUMP_FORCE = -7;
export const DROP_FORCE = 2.5;
export const MAX_SPEED = 1.8;
export const FRICTION = 0.82;
export const BLOCK_H = 8;
export const SPAWN_INTERVAL = 22;
/** Re-exported from fragments — see constants/fragments.js */
export { COLLECTIBLE_TOTAL, FRAGMENT_COUNT, IDEA_FRAGMENT_COUNT } from "./fragments";

export const DESKTOP_BREAKPOINT = 992;

/**
 * Stage 1 uses generated ledges only — not portfolio text as platforms.
 * Text collision caused floating and blocked downward movement.
 */
export const USE_DOM_PLATFORMS = false;

export const PLATFORM_SELECTORS = [
  "#home h1",
  "#home h2",
  "#home p",
];

/** Platform cache scroll bucket size (px) — see utils/platformCache.js */
export const PLATFORM_CACHE_SCROLL_BUCKET = 120;
