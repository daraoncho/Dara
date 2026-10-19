import { useRef, useState } from "react";
import { useReducedMotion } from "../../../hooks/useReducedMotion";
import { STORY_KEYFRAME_NARROW } from "../constants/animation";
import { PROTAGONIST_SIZE } from "../constants/characters";
import { STORY_DAY_COUNT } from "../constants/days";
import {
  OBSERVER_BEHIND_BLUE_RATIO,
  OBSERVER_BEHIND_NAYSAYER_RATIO,
  OBSERVER_BEHIND_RED_RATIO,
  OBSERVER_CHAT_GAP_PX,
  OBSERVER_HEAD_ANCHOR,
  OBSERVER_SIZE,
} from "../constants/observers";
import { STAGE } from "../constants/stage";
import { useStoryKeyframeSet } from "../hooks/useStoryKeyframeSet";
import { useStoryWalkTravel } from "../hooks/useStoryWalkTravel";
import styles from "../styles/GrowthStoryStage.module.css";
import playbackStyles from "../styles/StoryPlaybackControl.module.css";
import Day35Beat, { Day35Caption } from "./Day35Beat";
import StoryBeatOverlay from "./StoryBeatOverlay";
import Protagonist from "./Protagonist";
import SoilPile from "./SoilPile";
import SoilWetSpot from "./SoilWetSpot";
import StoryDayHeadline from "./StoryDayHeadline";
import StoryPlaybackControl from "./StoryPlaybackControl";
import SoilSprout from "./SoilSprout";
import {
  STORY_PLAYBACK,
  clampStoryPlaybackSpeed,
  storyDayDurationSec,
} from "../constants/playback";
import WateringCan from "./WateringCan";
import surpriseStyles from "../styles/SurpriseDayBeat.module.css";
import wonderStyles from "../styles/WonderDayBeat.module.css";
import { WATERING_CAN_HAND_SIZE } from "../constants/wateringCan";
import {
  WONDER_HEAD_LOOK_UP_DEG,
  WONDER_STAND_EXTRA_LEFT_PX,
} from "../constants/wonderDay";
import {
  OBSERVER_WONDER_BLUE_RATIO,
  OBSERVER_WONDER_GREEN_RATIO,
  OBSERVER_WONDER_RED_RATIO,
  WONDER_GREEN_SPEECH_LIFT_PX,
} from "../constants/wonderObserver";

const layoutVars = ({
  walkTravelPx,
  stopLeftPx,
  proWidthPx,
  storyDuration,
}) => ({
  "--story-duration": storyDuration,
  "--walk-travel": `${walkTravelPx}px`,
  "--stop-left-px": `${stopLeftPx}px`,
  "--pro-width-px": `${proWidthPx}px`,
  "--observer-blue-behind-ratio": OBSERVER_BEHIND_BLUE_RATIO,
  "--observer-red-behind-ratio": OBSERVER_BEHIND_RED_RATIO,
  "--observer-naysayer-behind-ratio": OBSERVER_BEHIND_NAYSAYER_RATIO,
  "--observer-wonder-red-ratio": OBSERVER_WONDER_RED_RATIO,
  "--observer-wonder-green-ratio": OBSERVER_WONDER_GREEN_RATIO,
  "--observer-wonder-blue-ratio": OBSERVER_WONDER_BLUE_RATIO,
  "--wonder-green-speech-lift": `${WONDER_GREEN_SPEECH_LIFT_PX}px`,
  "--observer-width-px": `${OBSERVER_SIZE.width}px`,
  "--observer-height-px": `${OBSERVER_SIZE.height}px`,
  "--observer-head-from-right-ratio": OBSERVER_HEAD_ANCHOR.fromFigureRightRatio,
  "--chat-gap-above-head-px": `${OBSERVER_CHAT_GAP_PX}px`,
  "--story-baseline-offset-px": `${STAGE.baselineOffsetPx}px`,
  "--wonder-extra-left": `${WONDER_STAND_EXTRA_LEFT_PX}px`,
  "--wonder-head-look-up-deg": `${WONDER_HEAD_LOOK_UP_DEG}deg`,
  "--wonder-head-look-up-num": String(WONDER_HEAD_LOOK_UP_DEG),
});

/**
 * Story rail: walk to soil → pour → fade out → reappear at start (loop).
 */
export default function GrowthStoryStage({
  defaultPlaybackSpeed = STORY_PLAYBACK.defaultSpeed,
  showPlaybackControl = STORY_PLAYBACK.showControl,
}) {
  const [playbackSpeed, setPlaybackSpeed] = useState(() =>
    clampStoryPlaybackSpeed(defaultPlaybackSpeed),
  );
  const storyDuration = storyDayDurationSec(playbackSpeed);
  const reducedMotion = useReducedMotion();
  const trackRef = useRef(null);
  const soilRef = useRef(null);
  const protagonistRef = useRef(null);
  const timelineNarrow =
    useStoryKeyframeSet() === STORY_KEYFRAME_NARROW;
  const {
    travelPx: walkTravelPx,
    pourReachPx,
    stopLeftPx,
    proWidthPx,
  } = useStoryWalkTravel(trackRef, soilRef, protagonistRef);

  const animate = !reducedMotion && walkTravelPx > 0;
  const surpriseBeat = animate;
  const wonderStandClass = [
    wonderStyles.wonderStandAnchor,
    animate ? wonderStyles.masterBeat : "",
    animate
      ? timelineNarrow
        ? wonderStyles.wonderShowNarrow
        : wonderStyles.wonderShowWide
      : "",
  ]
    .filter(Boolean)
    .join(" ");

  const groundCanClass = [
    surpriseStyles.groundCanAnchor,
    surpriseBeat ? surpriseStyles.masterBeat : "",
    surpriseBeat
      ? timelineNarrow
        ? surpriseStyles.groundCanNarrow
        : surpriseStyles.groundCanWide
      : "",
  ]
    .filter(Boolean)
    .join(" ");
  const proW = proWidthPx || PROTAGONIST_SIZE.width;
  const proH = (proW * PROTAGONIST_SIZE.height) / PROTAGONIST_SIZE.width;
  const groundCanW = Math.round(
    proW * (WATERING_CAN_HAND_SIZE.width / PROTAGONIST_SIZE.width),
  );
  const groundCanH = Math.round(
    proH * (WATERING_CAN_HAND_SIZE.height / PROTAGONIST_SIZE.height),
  );
  const trackClass = [
    styles.track,
    animate ? styles.animating : "",
    timelineNarrow ? styles.timelineNarrow : styles.timelineWide,
    reducedMotion && walkTravelPx > 0 ? styles.staticAtSoil : "",
  ]
    .filter(Boolean)
    .join(" ");

  const sceneVars = layoutVars({
    walkTravelPx,
    stopLeftPx,
    proWidthPx,
    storyDuration,
  });

  return (
    <div
      className={styles.wrapper}
      style={{
        minHeight: STAGE.minHeightPx,
        "--story-rail-height": `${STAGE.minHeightPx}px`,
        "--story-duration": storyDuration,
        "--story-day-count": STORY_DAY_COUNT,
        ...sceneVars,
      }}
      aria-label="Growth story scene"
    >
      <div className={styles.storyHeader}>
        {showPlaybackControl && animate ? (
          <StoryPlaybackControl
            speed={playbackSpeed}
            onSpeedChange={setPlaybackSpeed}
            className={[styles.playbackAboveHeadline, playbackStyles.topRightOnNarrow]
              .filter(Boolean)
              .join(" ")}
          />
        ) : null}
        <StoryDayHeadline
          animate={animate}
          timelineNarrow={timelineNarrow}
          className={styles.dayHeadline}
        />
        <Day35Caption animate={animate} timelineNarrow={timelineNarrow} />
      </div>

      {walkTravelPx > 0 ? (
        <div className={styles.observerOverlay} style={sceneVars}>
          <div className={styles.observerLayer}>
            <StoryBeatOverlay
              animate={animate}
              timelineNarrow={timelineNarrow}
            />
            <Day35Beat
              animate={animate}
              timelineNarrow={timelineNarrow}
            />
          </div>
        </div>
      ) : null}

      <div
        ref={trackRef}
        className={trackClass}
        style={{
          minHeight: STAGE.minHeightPx,
          ...sceneVars,
        }}
        role="img"
        aria-hidden="true"
      >
        <div
          className={styles.baseline}
          style={{ bottom: STAGE.baselineOffsetPx }}
          aria-hidden="true"
        />

        <div
          className={styles.startCluster}
          style={{ bottom: STAGE.baselineOffsetPx }}
        >
          <div ref={soilRef} className={styles.soilAnchor}>
            <div className={styles.soilStack}>
              <SoilPile />
              <SoilWetSpot
                animated={animate}
                timelineNarrow={timelineNarrow}
                surpriseBeat={surpriseBeat}
                className={styles.soilWet}
              />
              <SoilSprout
                animated={animate}
                timelineNarrow={timelineNarrow}
              />
            </div>
          </div>

          {surpriseBeat ? (
            <div className={groundCanClass} aria-hidden="true">
              <WateringCan
                width={groundCanW}
                height={groundCanH}
                showGroundShadow
              />
            </div>
          ) : null}

          <div
            ref={protagonistRef}
            className={styles.protagonistAnchor}
            style={{
              minWidth: proWidthPx || PROTAGONIST_SIZE.width,
            }}
          >
            <div className={styles.protagonistWalkFade}>
              <div className={styles.protagonistMasterFade}>
                <div className={styles.protagonistMotion}>
                  <Protagonist
                    holdsWateringCan
                    animate={animate}
                    pourReachPx={pourReachPx}
                    timelineNarrow={timelineNarrow}
                    surpriseBeat={surpriseBeat}
                  />
                </div>
              </div>
            </div>
          </div>

          {animate ? (
            <div className={wonderStandClass} aria-hidden="true">
              <Protagonist
                width={proW}
                height={proH}
                wonderBeat
                holdsWateringCan={false}
                animate={false}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
