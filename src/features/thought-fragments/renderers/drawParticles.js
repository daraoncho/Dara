import { COLORS } from "../constants/colors";

/** Draw collect spark particles in document space. */
export function drawParticles(ctx, particles, scrollY) {
  particles.forEach((particle) => {
    const screenY = particle.y - scrollY;
    if (screenY < -20 || screenY > ctx.canvas.height + 20) return;

    const alpha = Math.max(0, particle.life / particle.maxLife);
    ctx.save();
    ctx.globalAlpha = alpha * 0.9;
    ctx.fillStyle = COLORS.brandBright;
    ctx.fillRect(Math.round(particle.x), Math.round(screenY), 3, 3);
    ctx.restore();
  });
}
