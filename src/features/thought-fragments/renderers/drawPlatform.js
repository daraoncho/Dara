import { BLOCK_H } from "../constants/gameConfig";
import { COLORS } from "../constants/colors";

/** Draw a visible generated platform ledge (ref-inspired, higher contrast). */
export function drawPlatform(ctx, x, screenY, width, alpha = 1, isGoal = false) {
  if (alpha <= 0) return;

  ctx.save();
  ctx.globalAlpha = alpha;

  ctx.fillStyle = "rgba(0,0,0,0.35)";
  ctx.fillRect(x + 2, screenY + BLOCK_H, width - 2, 4);

  ctx.fillStyle = COLORS.platformFill;
  ctx.fillRect(x, screenY, width, BLOCK_H);

  if (isGoal) {
    ctx.fillStyle = COLORS.platformAccent;
    ctx.fillRect(x, screenY, width, 2);
    ctx.fillStyle = "rgba(224, 247, 128, 0.2)";
    ctx.fillRect(x + 2, screenY + 3, width - 4, 2);
  } else {
    ctx.fillStyle = COLORS.platformAccent;
    ctx.fillRect(x, screenY, width, 3);
  }

  ctx.fillStyle = COLORS.platformGlow;
  for (let px = x + 6; px < x + width - 3; px += 10) {
    ctx.fillRect(px, screenY + 4, 3, 3);
  }

  ctx.fillStyle = COLORS.platformShadow;
  ctx.fillRect(x, screenY + BLOCK_H - 2, width, 2);

  ctx.restore();
}
