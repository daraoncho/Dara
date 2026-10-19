import {
  WATERING_CAN_ANCHOR,
  WATERING_CAN_COLORS,
  WATERING_CAN_SIZE,
  WATERING_CAN_SPOUT,
} from "../constants/wateringCan";

const BASE_Y = WATERING_CAN_ANCHOR.baseY;

/** Rose face holes — concentric sprinkle pattern (profile view). */
const ROSE_HOLES = [
  [0, 0],
  [-0.55, 0],
  [0.55, 0],
  [0, -0.45],
  [0, 0.45],
  [-0.9, -0.35],
  [0.9, -0.35],
  [-0.9, 0.35],
  [0.9, 0.35],
];

/**
 * Side-profile watering can — angled spout + rose (reference-style sprinkle head).
 */
export default function WateringCan({
  width = WATERING_CAN_SIZE.width,
  height = WATERING_CAN_SIZE.height,
  className = "",
  showGroundShadow = true,
}) {
  const c = WATERING_CAN_COLORS;
  const rose = WATERING_CAN_SPOUT;

  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 72 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {showGroundShadow ? (
        <ellipse cx="36" cy={BASE_Y + 0.5} rx="22" ry="2" fill={c.shadow} />
      ) : null}

      {/* Tank */}
      <path
        d="M28 30 L50 30 C56 30 60 34 60 40 C60 41 59 42 58 42 L30 42
           C28 42 26 40 26 38 L26 32 C26 31 27 30 28 30 Z"
        fill={c.body}
      />
      <path
        d="M30 32 L48 32 C52 32 55 35 55 39 C55 40 54 41 53 41 L32 41
           C30 41 29 39 29 37 L29 33 C29 32 29 32 30 32 Z"
        fill={c.bodyMid}
      />
      <path
        d="M32 33 L46 33 C49 33 51 35 51 38 C51 39 50 39 49 39 L34 39
           C33 39 32 38 32 36 L32 33 Z"
        fill={c.bodyLight}
        opacity="0.55"
      />

      <rect x="40" y="28" width="8" height="3" rx="1" fill={c.rim} />
      <rect x="42" y="27" width="4" height="2" rx="0.5" fill={c.cap} />

      {/* Angled spout shaft (toward soil / left) */}
      <path
        d="M26 34 L26 32 C26 31 27 30 28 30 L30 30 C31 30 32 31 32 32
           L20 22 C18 20 16 20 14 21 L12 22 C10 23 10 25 11 26 L26 34 Z"
        fill={c.spoutDark}
      />
      <path
        d="M28 31 L18 23 L14 24 L24 32 Z"
        fill={c.spout}
      />
      <rect
        x="15"
        y="21.5"
        width="14"
        height="3"
        rx="1"
        fill={c.spout}
        transform="rotate(-38 22 23)"
      />

      {/* Rose — funnel + flat perforated face */}
      <path
        d="M12 23 L8 21 L5 19.5 L8 17.8 L12 19.2 Z"
        fill={c.spoutDark}
      />
      <ellipse
        cx={rose.x}
        cy={rose.y}
        rx="3.4"
        ry="2.6"
        fill={c.rose}
      />
      <ellipse
        cx={rose.x - 0.3}
        cy={rose.y - 0.2}
        rx="2.5"
        ry="1.85"
        fill={c.bodyLight}
        opacity="0.35"
      />
      {ROSE_HOLES.map(([dx, dy], i) => (
        <circle
          key={i}
          cx={rose.x + dx}
          cy={rose.y + dy}
          r={i === 0 ? 0.35 : 0.28}
          fill={c.hole}
        />
      ))}

      <path
        d="M50 30 C56 28 60 22 58 17 C56 13 52 12 48 14 C46 15 45 17 46 19
           C47 21 49 22 51 21 C53 20 54 18 53 16"
        stroke={c.handle}
        strokeWidth="2.8"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M51 19 C54 17 55 14 53 12"
        stroke={c.handleHighlight}
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
        opacity="0.6"
      />

      <rect x="27" y="40" width="30" height="2" rx="1" fill={c.rim} />
    </svg>
  );
}
