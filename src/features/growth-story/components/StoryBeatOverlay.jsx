import { SPEECH_BUBBLE_TAIL } from "../constants/speechBubble";
import {
  DAY_SEVEN_DIALOGUE,
  DAY_TWENTY_DIALOGUE,
  STORY_BEAT_LOOP_INDEX,
  WONDER_DAY_DIALOGUE,
} from "../constants/storyBeats";
import styles from "../styles/StoryBeat.module.css";
import legStyles from "../styles/ObserverFigure.module.css";
import ObserverFigure from "./ObserverFigure";

const DAY7_LINE_WIDE = [styles.lineDay7Wide0, styles.lineDay7Wide1];
const DAY7_LINE_NARROW = [styles.lineDay7Narrow0, styles.lineDay7Narrow1];
const DAY20_LINE_WIDE = [styles.lineDay20Wide0];
const DAY20_LINE_NARROW = [styles.lineDay20Narrow0];

const WONDER_OBSERVERS = [
  {
    color: "Red",
    variant: "naysayer",
    positionClass: "observerWonderRed",
    dialogueIndex: 0,
    speechClass: "observerSpeechPeer",
    toneClass: "bubbleNaysayerTone",
  },
  {
    color: "Green",
    variant: "peer",
    positionClass: "observerWonderGreen",
    dialogueIndex: 1,
    speechClass: "observerSpeechPeer",
    toneClass: "bubblePeerTone",
  },
  {
    color: "Blue",
    variant: "skeptic",
    positionClass: "observerWonderBlue",
    dialogueIndex: 2,
    speechClass: "observerSpeechSkeptic",
    toneClass: "bubbleSkepticTone",
  },
];

function wonderLineClass(color, timelineNarrow) {
  const suffix = timelineNarrow ? "Narrow" : "Wide";
  return styles[`lineWonder${color}${suffix}0`];
}

function ObserverSpeech({
  line,
  lineClass,
  speechClass,
  speechExtraClass = "",
  toneClass,
  animate,
}) {
  const tailClass =
    line?.speechAlign && styles[SPEECH_BUBBLE_TAIL[line.speechAlign]];

  const speechClassName = [
    styles.bubble,
    speechClass,
    speechExtraClass,
    toneClass,
    tailClass,
    animate ? styles.lineAnimate : "",
    animate ? lineClass : "",
  ]
    .filter(Boolean)
    .join(" ");

  return <p className={speechClassName}>{line.text}</p>;
}

function ObserverSlot({
  variant,
  positionClass,
  line,
  lineClass,
  speechClass,
  toneClass,
  animate,
  groupFadeClass,
  walkLayerClass = "",
  legLeftClass = "",
  legRightClass = "",
  speechExtraClass = "",
}) {
  return (
    <div
      className={`${styles.observerSlot} ${positionClass} ${groupFadeClass}`}
    >
      <div className={walkLayerClass || styles.observerWalkLayer}>
        {line ? (
          <ObserverSpeech
            line={line}
            lineClass={lineClass}
            speechClass={speechClass}
            speechExtraClass={speechExtraClass}
            toneClass={toneClass}
            animate={animate}
          />
        ) : null}
        <ObserverFigure
          variant={variant}
          className={styles.figure}
          legLeftClass={legLeftClass}
          legRightClass={legRightClass}
        />
      </div>
    </div>
  );
}

function WonderObserverSlot({
  config,
  animate,
  timelineNarrow,
}) {
  const { color, variant, positionClass, dialogueIndex, speechClass, toneClass } =
    config;
  const speechExtra =
    color === "Green" ? styles.observerWonderSpeechGreen : "";
  const line = WONDER_DAY_DIALOGUE[dialogueIndex];
  const suffix = timelineNarrow ? "Narrow" : "Wide";

  const fadeClass = [
    styles.observerFade,
    animate ? styles.beatsAnimate : "",
    animate ? styles[`beatWonder${color}${suffix}`] : "",
  ]
    .filter(Boolean)
    .join(" ");

  const walkClass = [
    styles.observerWalkLayer,
    animate ? styles[`observerWonderWalk${color}${suffix}`] : "",
  ]
    .filter(Boolean)
    .join(" ");

  const legBase = legStyles.observerWonderLeg;
  const legLeftClass = animate
    ? `${legBase} ${styles[`observerWonderLeg${color}Left${suffix}`]}`
    : "";
  const legRightClass = animate
    ? `${legBase} ${styles[`observerWonderLeg${color}Right${suffix}`]}`
    : "";

  return (
    <ObserverSlot
      variant={variant}
      positionClass={styles[positionClass]}
      line={line}
      lineClass={wonderLineClass(color, timelineNarrow)}
      speechClass={styles[speechClass]}
      toneClass={styles[toneClass]}
      animate={animate}
      groupFadeClass={fadeClass}
      walkLayerClass={walkClass}
      legLeftClass={legLeftClass}
      legRightClass={legRightClass}
      speechExtraClass={speechExtra}
    />
  );
}

/** Dialogue beats (Day 7 pair, Day 20 naysayer, wonder trio) — CSS-timed to story loops. */
export default function StoryBeatOverlay({
  animate = false,
  timelineNarrow = false,
}) {
  const day7Fade = [
    styles.observerFade,
    animate ? styles.beatsAnimate : "",
    animate
      ? timelineNarrow
        ? styles.beatDay7Narrow
        : styles.beatDay7Wide
      : "",
  ]
    .filter(Boolean)
    .join(" ");

  const day20Fade = [
    styles.observerFade,
    animate ? styles.beatsAnimate : "",
    animate
      ? timelineNarrow
        ? styles.beatDay20Narrow
        : styles.beatDay20Wide
      : "",
  ]
    .filter(Boolean)
    .join(" ");

  const skepticLine = DAY_SEVEN_DIALOGUE.find((d) => d.observerId === "skeptic");
  const peerLine = DAY_SEVEN_DIALOGUE.find((d) => d.observerId === "peer");
  const naysayerLine = DAY_TWENTY_DIALOGUE[0];
  const showDay7 = STORY_BEAT_LOOP_INDEX.day7 >= 0;
  const showDay20 = STORY_BEAT_LOOP_INDEX.day20 >= 0;
  const showWonder = STORY_BEAT_LOOP_INDEX.wonderDay >= 0;

  return (
    <>
      {showDay7 ? (
        <ObserverSlot
          variant="skeptic"
          positionClass={styles.observerBlue}
          line={skepticLine}
          lineClass={
            animate
              ? timelineNarrow
                ? DAY7_LINE_NARROW[0]
                : DAY7_LINE_WIDE[0]
              : ""
          }
          speechClass={styles.observerSpeechSkeptic}
          toneClass={styles.bubbleSkepticTone}
          animate={animate}
          groupFadeClass={day7Fade}
        />
      ) : null}
      {showDay7 ? (
        <ObserverSlot
          variant="peer"
          positionClass={styles.observerRed}
          line={peerLine}
          lineClass={
            animate
              ? timelineNarrow
                ? DAY7_LINE_NARROW[1]
                : DAY7_LINE_WIDE[1]
              : ""
          }
          speechClass={styles.observerSpeechPeer}
          toneClass={styles.bubblePeerTone}
          animate={animate}
          groupFadeClass={day7Fade}
        />
      ) : null}
      {showDay20 ? (
        <ObserverSlot
          variant="naysayer"
          positionClass={styles.observerNaysayer}
          line={naysayerLine}
          lineClass={
            animate
              ? timelineNarrow
                ? DAY20_LINE_NARROW[0]
                : DAY20_LINE_WIDE[0]
              : ""
          }
          speechClass={styles.observerSpeechPeer}
          toneClass={styles.bubbleNaysayerTone}
          animate={animate}
          groupFadeClass={day20Fade}
        />
      ) : null}
      {showWonder
        ? WONDER_OBSERVERS.map((config) => (
            <WonderObserverSlot
              key={config.color}
              config={config}
              animate={animate}
              timelineNarrow={timelineNarrow}
            />
          ))
        : null}
    </>
  );
}
