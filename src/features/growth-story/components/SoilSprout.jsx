import { SOIL_PILE_SIZE, SOIL_SHAPE } from "../constants/stage";
import { SPROUT_COLORS, SPROUT_SHAPE } from "../constants/sprout";
import { WONDER_TREE } from "../constants/tree";
import styles from "../styles/SoilSprout.module.css";
import WonderTree from "./WonderTree";

/** Sprout at soil peak; grows into wonder tree on the final wonder-day loop. */
export default function SoilSprout({
  animated = false,
  timelineNarrow = false,
  className = "",
}) {
  const c = SPROUT_COLORS;
  const { peakX, peakY, drawScale } = SPROUT_SHAPE;
  const sproutTransform = `translate(${peakX} ${peakY + 4}) scale(${drawScale}) translate(${-peakX} ${-(peakY + 4)})`;
  const { groundY: G } = SOIL_SHAPE;

  const masterBeat = animated ? styles.plantMaster : "";

  const revealClass = [
    styles.reveal,
    masterBeat,
    animated
      ? timelineNarrow
        ? styles.revealNarrow
        : styles.revealWide
      : "",
  ]
    .filter(Boolean)
    .join(" ");

  const sproutUnderClass = animated
    ? timelineNarrow
      ? styles.sproutUnderTreeNarrow
      : styles.sproutUnderTreeWide
    : "";

  const treeGrowClass = [
    styles.treeLayer,
    masterBeat,
    animated
      ? timelineNarrow
        ? styles.wonderTreeGrowNarrow
        : styles.wonderTreeGrowWide
      : "",
  ]
    .filter(Boolean)
    .join(" ");

  const rootClass = [styles.root, className].filter(Boolean).join(" ");

  const treeBottomOffset = SOIL_PILE_SIZE.height - G;

  return (
    <div
      className={rootClass}
      style={{
        width: SOIL_PILE_SIZE.width,
        height: SOIL_PILE_SIZE.height,
      }}
      aria-hidden="true"
    >
      <div
        className={styles.plantCanvas}
        style={{
          width: WONDER_TREE.width,
          height: WONDER_TREE.height,
          bottom: -treeBottomOffset + 2,
        }}
      >
        <div className={treeGrowClass}>
          <WonderTree />
        </div>

        <svg
          className={[revealClass, styles.sproutLayer, sproutUnderClass]
            .filter(Boolean)
            .join(" ")}
          width={SOIL_PILE_SIZE.width}
          height={SOIL_PILE_SIZE.height}
          viewBox="0 0 112 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: "absolute",
            left: 0,
            bottom: treeBottomOffset - 2,
          }}
        >
          <g transform={sproutTransform}>
            <path
              d={`M${peakX - 4} ${peakY + 5} L${peakX} ${peakY + 1.5} L${peakX + 4} ${peakY + 5}`}
              stroke={c.crack}
              strokeWidth="0.85"
              strokeLinecap="round"
            />
            <path
              d={`M${peakX} ${peakY + 5} L${peakX} ${peakY - 1.5}`}
              stroke={c.stemShadow}
              strokeWidth="1.15"
              strokeLinecap="round"
            />
            <path
              d={`M${peakX} ${peakY + 4} L${peakX} ${peakY - 2}`}
              stroke={c.stem}
              strokeWidth="0.95"
              strokeLinecap="round"
            />
            <path
              d={`M${peakX} ${peakY - 1.5} C${peakX - 4} ${peakY - 3.2} ${peakX - 4.8} ${peakY - 5.5} ${peakX - 2.5} ${peakY - 6.2}`}
              stroke={c.leaf}
              strokeWidth="1.05"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d={`M${peakX - 0.8} ${peakY - 3} C${peakX - 3.5} ${peakY - 3.8} ${peakX - 4.5} ${peakY - 5.2} ${peakX - 3} ${peakY - 6.2}`}
              fill={c.leaf}
              opacity="0.35"
            />
            <path
              d={`M${peakX} ${peakY - 1.2} C${peakX + 3.8} ${peakY - 3} ${peakX + 4.8} ${peakY - 5.2} ${peakX + 2.6} ${peakY - 6.4}`}
              stroke={c.leafHighlight}
              strokeWidth="0.95"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d={`M${peakX + 0.8} ${peakY - 3.2} C${peakX + 3.2} ${peakY - 4} ${peakX + 4.2} ${peakY - 5.4} ${peakX + 2.8} ${peakY - 6.4}`}
              fill={c.leafHighlight}
              opacity="0.32"
            />
          </g>
          <ellipse
            cx={peakX}
            cy={G + 0.5}
            rx="2.8"
            ry="0.65"
            fill="rgba(28, 20, 14, 0.22)"
          />
        </svg>
      </div>
    </div>
  );
}
