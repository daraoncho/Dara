import { SCALE } from "../constants/gameConfig";
import { COLORS } from "../constants/colors";

export function drawRobot(ctx, x, y, frame, onGround, isIdle, reducedMotion = false) {
  const { robotBody, robotBodyLight, robotDetail, robotEye, brand, brandBright } = COLORS;

  ctx.save();
  ctx.translate(Math.round(x), Math.round(y));
  ctx.scale(SCALE, SCALE);

  const walkFrame = reducedMotion ? 0 : !isIdle && onGround ? Math.floor(frame / 10) % 2 : 0;
  const bob = reducedMotion ? 0 : isIdle ? (Math.sin(frame * 0.06) > 0.3 ? 1 : 0) : 0;

  // Antenna
  ctx.fillStyle = robotDetail;
  ctx.fillRect(7, 0 + bob, 2, 2);
  ctx.fillStyle = brandBright;
  ctx.fillRect(7, 0 + bob, 2, 1);

  // Head
  ctx.fillStyle = robotBody;
  ctx.fillRect(3, 2 + bob, 10, 6);
  ctx.fillStyle = robotBodyLight;
  ctx.fillRect(4, 3 + bob, 8, 1);

  // Eyes
  ctx.fillStyle = robotEye;
  ctx.fillRect(4, 4 + bob, 3, 3);
  ctx.fillRect(9, 4 + bob, 3, 3);
  ctx.fillStyle = brand;
  ctx.fillRect(4, 4 + bob, 2, 2);
  ctx.fillRect(9, 4 + bob, 2, 2);

  // Body
  ctx.fillStyle = robotBody;
  ctx.fillRect(2, 8 + bob, 12, 5);
  ctx.fillStyle = brand;
  ctx.globalAlpha = 0.85;
  ctx.fillRect(6, 9 + bob, 4, 2);
  ctx.globalAlpha = 1;

  // Arms
  ctx.fillStyle = robotBodyLight;
  ctx.fillRect(0, 9 + bob, 2, 4);
  ctx.fillRect(14, 9 + bob, 2, 4);

  // Legs
  ctx.fillStyle = robotBody;
  const leftLeg = walkFrame;
  const rightLeg = 1 - walkFrame;
  ctx.fillRect(3, 13 + bob, 4, 2 + leftLeg);
  ctx.fillRect(9, 13 + bob, 4, 2 + rightLeg);
  ctx.fillRect(2, 14 + leftLeg + bob, 5, 2);
  ctx.fillRect(9, 14 + rightLeg + bob, 5, 2);

  ctx.restore();
}
