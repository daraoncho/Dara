import {
  PROTAGONIST_COLORS,
  PROTAGONIST_GRIP,
  PROTAGONIST_SIZE,
  PROTAGONIST_VIEWBOX,
} from "../constants/characters";
import {
  WATERING_CAN_ANCHOR,
  WATERING_CAN_HAND_SIZE,
  WATERING_CAN_VIEWBOX,
} from "../constants/wateringCan";
import styles from "../styles/Protagonist.module.css";
import surpriseStyles from "../styles/SurpriseDayBeat.module.css";
import { computePourPlacement } from "../utils/pourPlacement";
import WateringCan from "./WateringCan";
import WaterSprinkle from "./WaterSprinkle";

function computeHandCanPlacement(protagonistWidth, protagonistHeight) {
  const canW =
    protagonistWidth *
    (WATERING_CAN_HAND_SIZE.width / PROTAGONIST_SIZE.width);
  const canH =
    protagonistHeight *
    (WATERING_CAN_HAND_SIZE.height / PROTAGONIST_SIZE.height);

  const gripPxX =
    (PROTAGONIST_GRIP.x / PROTAGONIST_VIEWBOX.width) * protagonistWidth;
  const gripPxY =
    (PROTAGONIST_GRIP.y / PROTAGONIST_VIEWBOX.height) * protagonistHeight;

  const left =
    gripPxX -
    (WATERING_CAN_ANCHOR.gripX / WATERING_CAN_VIEWBOX.width) * canW;
  const top =
    gripPxY -
    (WATERING_CAN_ANCHOR.gripY / WATERING_CAN_VIEWBOX.height) * canH;

  return { canW, canH, left, top };
}

/**
 * Story protagonist — stands at the far right of the rail, facing left.
 */
export default function Protagonist({
  width = PROTAGONIST_SIZE.width,
  height = PROTAGONIST_SIZE.height,
  className = "",
  holdsWateringCan = false,
  animate = false,
  pourReachPx = 36,
  timelineNarrow = false,
  surpriseBeat = false,
  wonderBeat = false,
}) {
  const c = PROTAGONIST_COLORS;
  const canPlacement = holdsWateringCan
    ? computeHandCanPlacement(width, height)
    : null;
  const pourPlacement =
    holdsWateringCan && canPlacement
      ? computePourPlacement(canPlacement, pourReachPx)
      : null;
  const rootClass = [
    styles.root,
    animate ? styles.storyAnimate : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const masterBeat = surpriseBeat ? surpriseStyles.masterBeat : "";
  const jumpClass = [
    styles.figureLift,
    masterBeat,
    surpriseBeat
      ? timelineNarrow
        ? surpriseStyles.figureJumpNarrow
        : surpriseStyles.figureJumpWide
      : "",
  ]
    .filter(Boolean)
    .join(" ");

  const handCanClass = surpriseBeat
    ? [
        masterBeat,
        timelineNarrow ? surpriseStyles.handCanNarrow : surpriseStyles.handCanWide,
      ].join(" ")
    : "";

  const pourSuppressClass = surpriseBeat
    ? [
        masterBeat,
        timelineNarrow
          ? surpriseStyles.pourSuppressNarrow
          : surpriseStyles.pourSuppressWide,
      ].join(" ")
    : "";

  const armsClass = [
    styles.celebrateArms,
    masterBeat,
    surpriseBeat
      ? timelineNarrow
        ? surpriseStyles.celebrateArmsNarrow
        : surpriseStyles.celebrateArmsWide
      : "",
  ]
    .filter(Boolean)
    .join(" ");

  const defaultArmsHideClass = surpriseBeat
    ? [
        masterBeat,
        timelineNarrow
          ? surpriseStyles.defaultArmsHideNarrow
          : surpriseStyles.defaultArmsHideWide,
      ].join(" ")
    : "";

  return (
    <div className={rootClass} style={{ width, height }}>
      <div className={jumpClass}>
      <svg
        className={styles.layer}
        width={width}
        height={height}
        viewBox="0 0 88 104"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <ellipse cx="44" cy="100" rx="24" ry="3" fill="rgba(0,0,0,0.3)" />

        <g className={styles.legGroupLeft}>
          <rect x="32" y="76" width="9" height="20" rx="2" fill={c.pants} />
          <rect x="31" y="94" width="11" height="4" rx="1" fill={c.shoe} />
        </g>
        <g className={styles.legGroupRight}>
          <rect x="47" y="76" width="9" height="20" rx="2" fill={c.pants} />
          <rect x="46" y="94" width="11" height="4" rx="1" fill={c.shoe} />
        </g>

        <path d="M26 50 L62 50 L59 76 L29 76 Z" fill={c.hoodie} />
        <path d="M33 54 L55 54 L53 66 L35 66 Z" fill={c.hoodieLight} />
        <rect
          x="40"
          y="56"
          width="5"
          height="8"
          rx="1"
          fill={c.hoodieAccent}
          opacity="0.85"
        />

        <g className={wonderBeat ? styles.wonderLookUp : undefined}>
          <circle cx="40" cy="36" r="13" fill={c.skin} />
          <path
            d="M40 24 C32 24 26 29 26 36 C26 41 29 44 34 44 L40 40 Z"
            fill={c.skinShadow}
            opacity="0.35"
          />
          <path
            d="M42 22 C37 19 30 21 27 28 C26 33 28 38 33 38 L37 36 Z"
            fill={c.hair}
          />
          {wonderBeat ? (
            <path
              d="M26 30 Q30 24 35 25"
              fill="none"
              className={styles.browLine}
            />
          ) : null}
          <circle
            cx="32"
            cy="35"
            r="1.4"
            fill={c.eye}
            className={wonderBeat ? styles.eyeGaze : undefined}
          />
          {wonderBeat ? (
            <circle cx="31.5" cy="33.8" r="0.35" fill="rgba(255,255,255,0.45)" />
          ) : null}
          {wonderBeat ? (
            <g className={styles.wonderSmile} aria-hidden="true">
              <path
                d="M26.5 39.8 Q30.2 43.2 34.8 40.6"
                stroke={c.skinShadow}
                strokeWidth="0.95"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M27.2 40.5 Q30.2 43.8 33.8 41.2 Q30.2 42.6 27.8 41.4 Z"
                fill="rgba(74, 48, 36, 0.45)"
              />
              <rect x="28.1" y="41" width="1.15" height="1.55" rx="0.2" fill="#f6f1ea" />
              <rect x="29.45" y="41.15" width="1.1" height="1.45" rx="0.2" fill="#faf6f0" />
              <rect x="30.75" y="41.05" width="1.05" height="1.4" rx="0.2" fill="#f6f1ea" />
              <path
                d="M27.5 40.2 Q30 41.8 33.2 40.5"
                stroke="rgba(255,255,255,0.25)"
                strokeWidth="0.45"
                strokeLinecap="round"
                fill="none"
              />
            </g>
          ) : null}
        </g>

      </svg>

      <div
        className={[styles.defaultArmsPanel, defaultArmsHideClass]
          .filter(Boolean)
          .join(" ")}
        aria-hidden="true"
      >
        <svg
          className={styles.defaultArmsSvg}
          width={width}
          height={height}
          viewBox="0 0 88 104"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="54"
            y="52"
            width="7"
            height="16"
            rx="2"
            fill={c.hoodie}
            transform="rotate(-6 57 60)"
          />

          {!holdsWateringCan ? (
            <>
              <rect
                x="27"
                y="52"
                width="7"
                height="16"
                rx="2"
                fill={c.hoodie}
                transform="rotate(6 30 60)"
              />
              <rect
                x="24"
                y="62"
                width="6"
                height="10"
                rx="2"
                fill={c.skin}
                transform="rotate(8 27 67)"
              />
            </>
          ) : (
            <rect
              x="27"
              y="52"
              width="7"
              height="12"
              rx="2"
              fill={c.hoodie}
              transform="rotate(4 30 58)"
            />
          )}

          <rect
            x="55"
            y="64"
            width="6"
            height="8"
            rx="2"
            fill={c.skin}
            transform="rotate(-10 58 68)"
          />

          {holdsWateringCan ? (
            <rect
              x="22"
              y="64"
              width="7"
              height="9"
              rx="2"
              fill={c.skin}
              transform="rotate(12 25 68)"
            />
          ) : null}
        </svg>
      </div>

      <svg
        className={armsClass}
        width={width}
        height={height}
        viewBox="0 0 88 104"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect
          x="18"
          y="38"
          width="7"
          height="18"
          rx="2"
          fill={c.hoodie}
          transform="rotate(-52 21 47)"
        />
        <rect
          x="14"
          y="32"
          width="6"
          height="10"
          rx="2"
          fill={c.skin}
          transform="rotate(-48 17 37)"
        />
        <rect
          x="58"
          y="38"
          width="7"
          height="18"
          rx="2"
          fill={c.hoodie}
          transform="rotate(52 61 47)"
        />
        <rect
          x="64"
          y="32"
          width="6"
          height="10"
          rx="2"
          fill={c.skin}
          transform="rotate(48 67 37)"
        />
      </svg>

      </div>

      {canPlacement ? (
        <>
          <div
            className={[styles.canMount, handCanClass].filter(Boolean).join(" ")}
            style={{
              left: canPlacement.left,
              top: canPlacement.top,
              width: canPlacement.canW,
              height: canPlacement.canH,
            }}
          >
            <WateringCan
              width={canPlacement.canW}
              height={canPlacement.canH}
              showGroundShadow={false}
              className={styles.canArt}
            />
            {animate && pourPlacement ? (
              <div
                className={[styles.pourMount, pourSuppressClass]
                  .filter(Boolean)
                  .join(" ")}
                style={{
                  left: pourPlacement.left,
                  top: pourPlacement.top,
                  width: pourPlacement.width,
                  height: pourPlacement.height,
                }}
              >
                <WaterSprinkle
                  animated
                  timelineNarrow={timelineNarrow}
                  geometry={pourPlacement.geometry}
                />
              </div>
            ) : null}
          </div>
        </>
      ) : null}
    </div>
  );
}
