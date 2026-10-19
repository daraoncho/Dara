import { SOIL_PILE_SIZE, SOIL_SHAPE } from "../constants/stage";
import styles from "../styles/SoilWetSpot.module.css";
import surpriseStyles from "../styles/SurpriseDayBeat.module.css";

/** Damp spread on the mound — HTML layer so CSS transform/opacity animate reliably. */
export default function SoilWetSpot({
  animated = false,
  timelineNarrow = false,
  surpriseBeat = false,
  className = "",
}) {
  const { groundY: G, peakHeight: PH, peakX } = SOIL_SHAPE;
  const peakY = G - PH;

  const moundClip = `path("M12 ${G} C18 ${G - 3} 28 ${G - PH + 5} 40 ${peakY + 2} C48 ${peakY} 58 ${peakY + 0.5} 66 ${peakY + 3} C78 ${G - 7} 88 ${G - 3.5} 98 ${G} C88 ${G - 1} 72 ${G - 2} 56 ${G - 2.5} C40 ${G - 2} 24 ${G - 1} 12 ${G} Z")`;

  const blobClass = [
    styles.soakBlob,
    animated
      ? timelineNarrow
        ? styles.soakNarrow
        : styles.soakWide
      : "",
  ]
    .filter(Boolean)
    .join(" ");

  const soakSuppress = surpriseBeat
    ? [
        surpriseStyles.masterBeat,
        timelineNarrow
          ? surpriseStyles.soakSuppressNarrow
          : surpriseStyles.soakSuppressWide,
      ].join(" ")
    : "";

  const rootClass = [styles.root, soakSuppress, className]
    .filter(Boolean)
    .join(" ");

  const moundHeightPx = G;
  const belowGroundPx = SOIL_PILE_SIZE.height - G;

  return (
    <div
      className={rootClass}
      style={{
        width: SOIL_PILE_SIZE.width,
        height: moundHeightPx,
        bottom: belowGroundPx,
        clipPath: moundClip,
        WebkitClipPath: moundClip,
      }}
      aria-hidden="true"
    >
      <div
        className={blobClass}
        style={{
          left: `${(peakX / SOIL_PILE_SIZE.width) * 100}%`,
          top: `${((peakY + 2) / moundHeightPx) * 100}%`,
        }}
      />
    </div>
  );
}
