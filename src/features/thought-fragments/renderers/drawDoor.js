import { COLORS } from "../constants/colors";

/**
 * Pixel-art door marker for the finish line — glows when all sparks are collected.
 */
export function drawDoor(ctx, x, docY, scrollY, unlocked = true, reducedMotion = false) {
  const screenY = docY - scrollY;
  if (screenY < -48 || screenY > ctx.canvas.height + 48) return;

  const t = Date.now() * 0.002;
  const bob = reducedMotion ? 0 : Math.sin(t) * 1;
  const doorW = 22;
  const doorH = 30;
  const dx = Math.round(x + 2);
  const dy = Math.round(screenY + bob - doorH + 10);

  ctx.save();

  if (!unlocked) {
    ctx.globalAlpha = 0.38;
  } else if (!reducedMotion) {
    ctx.globalAlpha = 0.88 + 0.08 * Math.sin(t * 1.6);
  }

  if (unlocked && !reducedMotion) {
    ctx.globalAlpha = 0.2 + 0.08 * Math.sin(t * 1.4);
    ctx.fillStyle = COLORS.brand;
    ctx.beginPath();
    ctx.ellipse(dx + doorW / 2, dy + doorH / 2, 18, 22, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 0.88 + 0.08 * Math.sin(t * 1.6);
  }

  ctx.fillStyle = COLORS.robotDetail;
  ctx.fillRect(dx - 3, dy - 4, doorW + 6, doorH + 6);
  ctx.fillRect(dx - 2, dy - 3, doorW + 4, 3);

  ctx.fillStyle = unlocked ? "#252525" : "#161616";
  ctx.fillRect(dx, dy, doorW, doorH);

  ctx.fillStyle = unlocked ? COLORS.brand : COLORS.robotBodyLight;
  ctx.fillRect(dx + 3, dy + 3, doorW - 6, 2);
  ctx.fillRect(dx + 3, dy + doorH - 5, doorW - 6, 2);

  if (unlocked) {
    ctx.fillStyle = COLORS.brandBright;
    ctx.globalAlpha = reducedMotion ? 0.7 : 0.55 + 0.25 * Math.sin(t * 2);
    ctx.fillRect(dx + doorW / 2 - 1, dy + 6, 2, doorH - 12);
  } else {
    ctx.fillStyle = COLORS.robotBodyLight;
    ctx.fillRect(dx + doorW / 2, dy + 5, 1, doorH - 10);
  }

  ctx.globalAlpha = unlocked ? 0.95 : 0.5;
  ctx.fillStyle = COLORS.brand;
  ctx.fillRect(dx + doorW - 5, dy + Math.floor(doorH / 2), 2, 2);

  ctx.restore();
}
