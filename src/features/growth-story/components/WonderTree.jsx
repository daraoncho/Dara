import { TREE_COLORS, WONDER_TREE } from "../constants/tree";

/**
 * Storybook wonder tree — soft layered crown, warm trunk, reads clearly at stage scale.
 */
export default function WonderTree({
  width = WONDER_TREE.width,
  height = WONDER_TREE.height,
}) {
  const c = TREE_COLORS;
  const ax = WONDER_TREE.anchorX;
  const base = WONDER_TREE.anchorY;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${WONDER_TREE.width} ${WONDER_TREE.height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="wonderTrunk" x1="56" y1="142" x2="56" y2="96" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={c.trunkDeep} />
          <stop offset="45%" stopColor={c.trunk} />
          <stop offset="100%" stopColor={c.trunkLight} />
        </linearGradient>
        <linearGradient id="wonderCrownBack" x1="56" y1="20" x2="56" y2="98" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={c.foliageLight} />
          <stop offset="55%" stopColor={c.foliage} />
          <stop offset="100%" stopColor={c.foliageDeep} />
        </linearGradient>
        <linearGradient id="wonderCrownFront" x1="40" y1="30" x2="78" y2="88" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={c.foliageBright} />
          <stop offset="50%" stopColor={c.foliageLight} />
          <stop offset="100%" stopColor={c.foliageMid} />
        </linearGradient>
      </defs>

      <ellipse cx={ax} cy={base + 1} rx="20" ry="3" fill="rgba(0,0,0,0.12)" />

      <g stroke={c.root} strokeWidth="1.1" strokeLinecap="round" opacity="0.75">
        <path d={`M${ax} ${base} Q${ax - 14} ${base + 2} ${ax - 22} ${base - 4}`} fill="none" />
        <path d={`M${ax} ${base} Q${ax + 14} ${base + 2} ${ax + 22} ${base - 4}`} fill="none" />
        <path d={`M${ax - 4} ${base} Q${ax - 10} ${base + 3} ${ax - 14} ${base + 1}`} fill="none" />
        <path d={`M${ax + 4} ${base} Q${ax + 10} ${base + 3} ${ax + 14} ${base + 1}`} fill="none" />
      </g>

      <path
        d={`M${ax - 11} ${base}
           C${ax - 13} ${base - 28} ${ax - 10} ${base - 52} ${ax - 6} ${base - 68}
           C${ax - 4} ${base - 78} ${ax - 2} ${base - 84} ${ax} ${base - 86}
           C${ax + 2} ${base - 84} ${ax + 4} ${base - 78} ${ax + 6} ${base - 68}
           C${ax + 10} ${base - 52} ${ax + 13} ${base - 28} ${ax + 11} ${base} Z`}
        fill="url(#wonderTrunk)"
      />
      <path
        d={`M${ax - 5} ${base - 8} C${ax - 6} ${base - 40} ${ax - 3} ${base - 72} ${ax} ${base - 84}`}
        stroke={c.trunkHighlight}
        strokeWidth="0.7"
        strokeLinecap="round"
        opacity="0.35"
      />

      <path
        d="M56 14
           C34 16 14 34 10 58
           C7 74 18 92 38 98
           C24 88 18 72 22 56
           C28 36 42 22 56 14 Z"
        fill={c.foliageDeep}
        opacity="0.88"
      />
      <path
        d="M56 14
           C78 16 98 34 102 58
           C105 74 94 92 74 98
           C88 88 94 72 90 56
           C84 36 70 22 56 14 Z"
        fill={c.foliageDeep}
        opacity="0.88"
      />

      <path
        d="M56 10
           C30 14 8 38 8 64
           C8 84 24 98 44 102
           C36 94 32 78 36 62
           C42 40 48 24 56 10 Z"
        fill="url(#wonderCrownBack)"
      />
      <path
        d="M56 10
           C82 14 104 38 104 64
           C104 84 88 98 68 102
           C76 94 80 78 76 62
           C70 40 64 24 56 10 Z"
        fill="url(#wonderCrownBack)"
      />

      <path
        d="M56 8
           C38 10 22 28 20 50
           C18 68 30 86 50 92
           C42 82 40 66 44 52
           C48 34 52 18 56 8 Z"
        fill="url(#wonderCrownFront)"
        opacity="0.95"
      />
      <path
        d="M56 8
           C74 10 90 28 92 50
           C94 68 82 86 62 92
           C70 82 72 66 68 52
           C64 34 60 18 56 8 Z"
        fill="url(#wonderCrownFront)"
        opacity="0.95"
      />

      <path
        d="M56 6
           C46 8 38 18 36 32
           C34 44 42 56 56 58
           C70 56 78 44 76 32
           C74 18 66 8 56 6 Z"
        fill={c.foliageBright}
        opacity="0.92"
      />

      <path
        d="M56 10 C28 16 12 42 14 66 C16 82 32 94 56 96 C80 94 96 82 98 66 C100 42 84 16 56 10 Z"
        stroke={c.rim}
        strokeWidth="0.65"
        fill="none"
        opacity="0.9"
      />

      <ellipse cx="42" cy="38" rx="7" ry="5" fill={c.glow} opacity="0.45" />
      <ellipse cx="68" cy="34" rx="6" ry="4.5" fill={c.glow} opacity="0.38" />
      <ellipse cx="56" cy="22" rx="5" ry="3.5" fill={c.foliageBright} opacity="0.5" />

      <circle cx="48" cy="28" r="1.1" fill={c.foliageBright} opacity="0.85" />
      <circle cx="62" cy="26" r="0.9" fill={c.glow} opacity="0.9" />
      <circle cx="54" cy="18" r="0.75" fill={c.foliageBright} opacity="0.8" />
    </svg>
  );
}
