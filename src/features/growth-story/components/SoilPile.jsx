import { SOIL_COLORS, SOIL_PILE_SIZE, SOIL_SHAPE } from "../constants/stage";

/** Dust specks — y values are tuned for default peakHeight; nudge if you change peak a lot. */
const specksForPeak = (groundY, peakHeight) => {
  const peakY = groundY - peakHeight;
  return [
    [32, peakY + 4.2, 0.7],
    [44, peakY + 2.7, 0.55],
    [56, peakY + 1.8, 0.65],
    [64, peakY + 2.2, 0.5],
    [72, peakY + 4.5, 0.6],
    [48, peakY + 5.5, 0.45],
    [58, peakY + 4, 0.4],
  ];
};

const CRUMBS = [
  [14, 23.5, 1.1],
  [22, 24, 0.9],
  [38, 23.2, 1.3],
  [52, 22.8, 1],
  [68, 23.4, 1.2],
  [82, 24, 0.85],
  [94, 23.6, 1.15],
];

/**
 * Low soil heap — bottom flush with the story baseline; center peak from SOIL_SHAPE.peakHeight.
 */
export default function SoilPile({
  width = SOIL_PILE_SIZE.width,
  height = SOIL_PILE_SIZE.height,
  className = "",
}) {
  const c = SOIL_COLORS;
  const { groundY: G, peakHeight: PH } = SOIL_SHAPE;
  const peakY = G - PH;
  const specks = specksForPeak(G, PH);

  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 112 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <ellipse
        cx="52"
        cy={G + 1.5}
        rx="42"
        ry="2.2"
        fill={c.groundShadow}
      />

      <path
        d={`M6 ${G} C10 ${G} 14 ${G - 0.5} 20 ${G - 1}
           C28 ${G - 2} 36 ${G - 1.5} 44 ${G - 1}
           L68 ${G - 1} C76 ${G - 1.5} 84 ${G - 2} 92 ${G - 1}
           C98 ${G - 0.5} 102 ${G} 106 ${G}
           L106 ${G + 2} L6 ${G + 2} Z`}
        fill={c.deep}
      />

      <path
        d={`M12 ${G} C18 ${G - 3} 28 ${G - PH + 5} 40 ${peakY + 2}
           C48 ${peakY} 58 ${peakY + 0.5} 66 ${peakY + 3}
           C78 ${G - 7} 88 ${G - 3.5} 98 ${G}
           C88 ${G - 1} 72 ${G - 2} 56 ${G - 2.5}
           C40 ${G - 2} 24 ${G - 1} 12 ${G} Z`}
        fill={c.body}
      />

      <path
        d={`M22 ${G - 1} C30 ${G - 6} 42 ${peakY + 4.5} 54 ${peakY + 1.5}
           C62 ${peakY + 2} 70 ${peakY + 4} 78 ${G - 5}
           C68 ${G - 6.5} 58 ${G - 7.5} 48 ${G - 7}
           C36 ${G - 5.5} 28 ${G - 3} 22 ${G - 1} Z`}
        fill={c.dry}
      />

      <path
        d={`M38 ${G - 3} C44 ${peakY + 5} 52 ${peakY + 1.5} 58 ${peakY + 2}
           C64 ${peakY + 3.5} 68 ${peakY + 5.5} 72 ${G - 4.5}
           C64 ${G - 6.5} 54 ${G - 7.5} 44 ${G - 5.5}
           C40 ${G - 4.5} 38 ${G - 3} 38 ${G - 3} Z`}
        fill={c.top}
      />

      {CRUMBS.map(([cx, cy, r]) => (
        <circle key={`c-${cx}`} cx={cx} cy={cy} r={r} fill={c.crumb} />
      ))}

      {specks.map(([cx, cy, r]) => (
        <circle key={`s-${cx}-${cy}`} cx={cx} cy={cy} r={r} fill={c.speckDark} />
      ))}

      <circle cx="50" cy={peakY + 3.5} r="0.55" fill={c.speckLight} />
      <circle cx="61" cy={peakY + 2.2} r="0.45" fill={c.speckLight} />
      <circle cx="55" cy={peakY + 5.8} r="0.4" fill={c.speckLight} />
    </svg>
  );
}
