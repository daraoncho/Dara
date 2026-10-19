import { SPROUT_COLORS } from "./sprout.js";
import { SOIL_COLORS } from "./stage.js";

/** Wonder-day tree — grows from soil mound peak (same anchor as sprout). */
export const WONDER_TREE = {
  width: 112,
  height: 156,
  anchorX: 56,
  anchorY: 142,
};

/** Warm trunk ties to soil; foliage continues the sprout greens. */
export const TREE_COLORS = {
  trunkDeep: SOIL_COLORS.deep,
  trunk: SOIL_COLORS.body,
  trunkLight: SOIL_COLORS.dry,
  trunkHighlight: SOIL_COLORS.top,
  root: "rgba(58, 42, 31, 0.85)",
  foliageDeep: SPROUT_COLORS.stemShadow,
  foliage: SPROUT_COLORS.leaf,
  foliageMid: "#62a06a",
  foliageLight: SPROUT_COLORS.leafHighlight,
  foliageBright: "#b8e8bf",
  rim: "rgba(45, 90, 56, 0.35)",
  glow: "rgba(255, 252, 240, 0.55)",
};
