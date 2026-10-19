import {
  PROTAGONIST_COLORS,
  PROTAGONIST_SIZE,
} from "../constants/characters";
import { WATERING_CAN_COLORS } from "../constants/wateringCan";
import styles from "../styles/ProtagonistSitting.module.css";

/** Ground line in viewBox units — feet + can sit flush on the rail baseline. */
const GROUND_Y = 66;
const VB_W = 78;
const VB_H = 68;

/** Seated thinker at pour spot — profile facing soil (left). */
export default function ProtagonistSitting({
  width = PROTAGONIST_SIZE.width,
  height = Math.round(
    (PROTAGONIST_SIZE.width * VB_H) / VB_W,
  ),
  className = "",
}) {
  const c = PROTAGONIST_COLORS;
  const can = WATERING_CAN_COLORS;
  const g = GROUND_Y;

  return (
    <svg
      className={`${styles.figure} ${className}`.trim()}
      width={width}
      height={height}
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <ellipse cx="40" cy={g - 1} rx="22" ry="2" fill="rgba(0,0,0,0.3)" />

      {/* Watering can — on the floor ahead (left), not in hand. */}
      <g>
        <ellipse cx="12" cy={g - 0.5} rx="9" ry="1.8" fill={can.shadow} />
        <path
          d={`M4 ${g - 4} L14 ${g - 10} L20 ${g - 5} L18 ${g - 1} L6 ${g - 1} Z`}
          fill={can.body}
        />
        <path d={`M6 ${g - 12} L14 ${g - 10} L16 ${g - 6} L8 ${g - 8} Z`} fill={can.bodyMid} />
        <path d={`M2 ${g - 7} L4 ${g - 9} L6 ${g - 5} L4 ${g - 3} Z`} fill={can.handle} />
        <path d={`M20 ${g - 6} L26 ${g - 8} L27 ${g - 5} L22 ${g - 4} Z`} fill={can.spout} />
      </g>

      {/* Back leg — bent, foot flat on ground (screen right). */}
      <path
        d={`M46 46 L54 50 L58 ${g - 2} L50 ${g - 2} L44 52 Z`}
        fill={c.pants}
      />
      <rect x="48" y={g - 4} width="12" height="4" rx="1" fill={c.shoe} />

      {/* Front leg — knee up, shin down to ground (toward soil). */}
      <path
        d={`M42 44 L30 48 L22 54 L20 ${g - 2} L28 ${g - 2} L32 52 L40 48 Z`}
        fill={c.pants}
      />
      <rect x="14" y={g - 4} width="14" height="4" rx="1" fill={c.shoe} />

      {/* Torso — upright-ish, hunched forward. */}
      <path
        d="M40 44 L52 44 L50 56 L38 56 L36 48 Z"
        fill={c.hoodie}
      />
      <path
        d="M40 46 L50 46 L48 52 L40 52 Z"
        fill={c.hoodieLight}
      />
      <rect
        x="43.5"
        y="47"
        width="5"
        height="7"
        rx="1"
        fill={c.hoodieAccent}
        opacity="0.85"
      />

      {/* Far arm on lap. */}
      <path
        d="M42 50 L50 52 L48 54 L40 52 Z"
        fill={c.hoodie}
      />
      <ellipse cx="49" cy="53" rx="2.8" ry="2" fill={c.skin} />

      {/* Thinking arm — elbow on raised knee, forearm to chin. */}
      <path
        d="M40 46 L32 48 L24 52 L26 54 L36 50 Z"
        fill={c.hoodie}
      />
      <path
        d="M24 52 L20 54 L22 58 L28 56 L26 52 Z"
        fill={c.skin}
      />
      <path
        d="M26 52 L28 46 L32 44 L30 50 Z"
        fill={c.skin}
      />

      {/* Head — profile left. */}
      <circle cx="32" cy="36" r="9.5" fill={c.skin} />
      <path
        d="M32 25 C27 24 22 27 21 33 C20 36 22 38 25 37 L28 35 Z"
        fill={c.skinShadow}
        opacity="0.25"
      />
      {/* Hair — top + front (same read as standing protagonist, profile left). */}
      <path
        d="M32 26 C28 25 24 27 23 32 C22 35 24 37 27 36 L31 34 Z"
        fill={c.hair}
      />
      <path
        d="M32 26 C30 25 27 26 26 29 C25 31 26 33 28 32 L30 30 Z"
        fill={c.hair}
      />
      <circle cx="26" cy="37" r="1.2" fill={c.eye} />

      {/* Hand on chin — drawn last so it reads clearly. */}
      <ellipse cx="28" cy="42" rx="4.2" ry="3.2" fill={c.skin} />
      <ellipse
        cx="28"
        cy="42"
        rx="4.2"
        ry="3.2"
        fill="none"
        stroke={c.skinShadow}
        strokeWidth="0.6"
        opacity="0.45"
      />
    </svg>
  );
}
