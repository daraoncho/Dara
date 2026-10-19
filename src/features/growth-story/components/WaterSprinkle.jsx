import { POUR_STREAM } from "../constants/wateringCan";
import styles from "../styles/WaterSprinkle.module.css";

/**
 * Projectile pour — geometry from measured spout→soil reach (pourPlacement.js).
 */
export default function WaterSprinkle({
  animated = false,
  timelineNarrow = false,
  className = "",
  geometry,
}) {
  const rootClass = [
    styles.root,
    animated
      ? timelineNarrow
        ? styles.animatingNarrow
        : styles.animatingWide
      : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const { width, height } = POUR_STREAM.viewBox;
  const { trailArcs, droplets } = geometry ?? {
    trailArcs: [],
    droplets: [],
  };

  if (!trailArcs.length) return null;

  return (
    <svg
      className={rootClass}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g className={styles.streams}>
        {trailArcs.map((d, i) => (
          <path
            key={i}
            className={styles.stream}
            style={{ "--stream-i": i }}
            d={d}
            stroke="rgba(150, 210, 240, 0.45)"
            strokeWidth={i === 0 ? 2 : 1}
            strokeLinecap="round"
            fill="none"
          />
        ))}
      </g>

      <g className={styles.projectiles}>
        {droplets.map(({ cx, cy, i }) => (
          <circle
            key={i}
            className={styles.projectile}
            style={{ "--proj-i": i }}
            cx={cx}
            cy={cy}
            r={i === 5 ? 1.35 : 1}
            fill="rgba(195, 235, 255, 0.9)"
          />
        ))}
      </g>
    </svg>
  );
}
