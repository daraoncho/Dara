import { OBSERVER_PALETTES, OBSERVER_SIZE } from "../constants/observers";
import styles from "../styles/ObserverFigure.module.css";

/**
 * Compact rail spectator — faces left toward the soil.
 */
export default function ObserverFigure({
  variant = "skeptic",
  width = OBSERVER_SIZE.width,
  height = OBSERVER_SIZE.height,
  className = "",
  legLeftClass = "",
  legRightClass = "",
}) {
  const c = OBSERVER_PALETTES[variant] ?? OBSERVER_PALETTES.skeptic;
  const rootClass = [className].filter(Boolean).join(" ");
  const legL = [styles.legLeft, legLeftClass].filter(Boolean).join(" ");
  const legR = [styles.legRight, legRightClass].filter(Boolean).join(" ");

  return (
    <svg
      className={rootClass}
      width={width}
      height={height}
      viewBox="0 0 48 62"
      preserveAspectRatio="xMidYMax meet"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <ellipse cx="24" cy="59" rx="14" ry="2" fill="rgba(0,0,0,0.28)" />
      <g className={legL}>
        <rect x="17" y="42" width="6" height="14" rx="1.5" fill={c.pants} />
        <rect x="16" y="54" width="8" height="3" rx="1" fill={c.shoe} />
      </g>
      <g className={legR}>
        <rect x="25" y="42" width="6" height="14" rx="1.5" fill={c.pants} />
        <rect x="24" y="54" width="8" height="3" rx="1" fill={c.shoe} />
      </g>
      <path d="M14 28 L34 28 L32 42 L16 42 Z" fill={c.top} />
      <path d="M18 30 L30 30 L29 38 L19 38 Z" fill={c.topLight} />
      {c.accent ? (
        <rect x="22" y="32" width="4" height="5" rx="1" fill={c.accent} />
      ) : null}
      <circle cx="22" cy="20" r="9" fill={c.skin} />
      <path d="M23 12 C19 10 14 12 13 17 L16 16 Z" fill={c.hair} />
      <circle cx="19" cy="20" r="1.1" fill="#1a1a1a" />
    </svg>
  );
}
