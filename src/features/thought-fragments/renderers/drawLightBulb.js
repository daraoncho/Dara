import { COLORS } from "../constants/colors";

/**
 * Draw a pulsing thought-fragment light bulb in document space.
 */
export function drawLightBulb(ctx, x, docY, scrollY, index, reducedMotion = false) {
  const screenY = docY - scrollY;
  if (screenY < -32 || screenY > ctx.canvas.height + 32) return;

  const t = Date.now() * 0.002 + index * 1.2;
  const bob = reducedMotion ? 0 : Math.sin(t) * 2;
  const cx = Math.round(x + 8);
  const cy = Math.round(screenY + bob + 10);

  ctx.save();

  ctx.globalAlpha = reducedMotion ? 0.2 : 0.15 + 0.08 * Math.sin(t * 1.5);
  ctx.fillStyle = COLORS.bulbGlow;
  ctx.beginPath();
  ctx.ellipse(cx, cy - 2, 14, 16, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.globalAlpha = 0.95;
  ctx.fillStyle = COLORS.bulbGlass;
  ctx.beginPath();
  ctx.ellipse(cx, cy - 3, 7, 9, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = COLORS.bulbFilament;
  ctx.fillRect(cx - 1, cy - 5, 2, 5);

  ctx.fillStyle = COLORS.robotBodyLight;
  ctx.fillRect(cx - 4, cy + 5, 8, 3);
  ctx.fillRect(cx - 3, cy + 8, 6, 2);

  ctx.globalAlpha = 0.35;
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.ellipse(cx - 2, cy - 6, 2, 3, -0.4, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}
