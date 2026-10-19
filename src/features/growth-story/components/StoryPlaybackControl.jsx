import {
  DEFAULT_STORY_PLAYBACK_SPEED,
  STORY_PLAYBACK_SPEED_MAX,
  STORY_PLAYBACK_SPEED_MIN,
  clampStoryPlaybackSpeed,
} from "../constants/playback";
import styles from "../styles/StoryPlaybackControl.module.css";

const PRESETS = [
  { label: "0.75×", value: 0.75 },
  { label: "1×", value: 1 },
  { label: "1.5×", value: 1.5 },
  { label: "2×", value: 2 },
];

export default function StoryPlaybackControl({
  speed = DEFAULT_STORY_PLAYBACK_SPEED,
  onSpeedChange,
  className = "",
}) {
  const clamped = clampStoryPlaybackSpeed(speed);
  const rootClass = [styles.root, className].filter(Boolean).join(" ");

  return (
    <div className={rootClass}>
      <label className={styles.label} htmlFor="story-playback-speed">
        Story pace
      </label>
      <div className={styles.row}>
        <input
          id="story-playback-speed"
          type="range"
          className={styles.slider}
          min={STORY_PLAYBACK_SPEED_MIN}
          max={STORY_PLAYBACK_SPEED_MAX}
          step={0.25}
          value={clamped}
          onChange={(e) => onSpeedChange(Number(e.target.value))}
          aria-valuetext={`${clamped} times normal speed`}
        />
        <span className={styles.value} aria-hidden="true">
          {clamped}×
        </span>
      </div>
      <div className={styles.presets} role="group" aria-label="Story pace presets">
        {PRESETS.map(({ label, value }) => (
          <button
            key={label}
            type="button"
            className={[
              styles.preset,
              Math.abs(clamped - value) < 0.001 ? styles.presetActive : "",
            ]
              .filter(Boolean)
              .join(" ")}
            onClick={() => onSpeedChange(value)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
