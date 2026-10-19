import {
  STORY_DAY_COUNT,
  STORY_DAY_NUMBERS,
  STORY_WONDER_DAY,
  formatStoryDayLabel,
} from "../constants/days";
import styles from "../styles/StoryDayHeadline.module.css";

const SLOT_CLASS = STORY_DAY_NUMBERS.map((_, index) => styles[`slot${index}`]);

/**
 * Cycles story days each round; next day appears with protagonist fade-in.
 */
export default function StoryDayHeadline({
  animate = false,
  timelineNarrow = false,
  className = "",
}) {
  const rootClass = [
    styles.headline,
    animate ? (timelineNarrow ? styles.cycleNarrow : styles.cycleWide) : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <p
      className={rootClass}
      style={{ "--story-day-count": STORY_DAY_COUNT }}
      aria-live="polite"
    >
      {STORY_DAY_NUMBERS.map((day, index) => {
        if (day === STORY_WONDER_DAY) {
          return null;
        }

        const labelClass = [
          styles.label,
          animate ? styles.labelAnimate : "",
          animate ? SLOT_CLASS[index] : "",
          !animate && index === 0 ? styles.labelVisible : "",
        ]
          .filter(Boolean)
          .join(" ");

        return (
          <span key={`${day}-${index}`} className={labelClass}>
            {formatStoryDayLabel(day)}
          </span>
        );
      })}
    </p>
  );
}
