const SPARK_COUNT = 10;

/** Spawn a short-lived burst when a fragment is collected. */
export function spawnCollectBurst(particles, x, docY) {
  for (let i = 0; i < SPARK_COUNT; i += 1) {
    const angle = (Math.PI * 2 * i) / SPARK_COUNT + Math.random() * 0.4;
    const speed = 1.2 + Math.random() * 2.4;
    particles.push({
      x,
      y: docY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 1.2,
      life: 28 + Math.floor(Math.random() * 10),
      maxLife: 38,
    });
  }
}

/** Advance particle simulation; mutates the array in place. */
export function updateParticles(particles) {
  for (let i = particles.length - 1; i >= 0; i -= 1) {
    const particle = particles[i];
    particle.x += particle.vx;
    particle.y += particle.vy;
    particle.vy += 0.08;
    particle.life -= 1;
    if (particle.life <= 0) particles.splice(i, 1);
  }
}
