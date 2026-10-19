import { DAY_THIRTY_FIVE_COPY } from "../constants/storyBeats";
import styles from "../styles/Day35Beat.module.css";
import ProtagonistSitting from "./ProtagonistSitting";

function beatFadeClass({ animate, timelineNarrow }) {
  return [
    styles.beatFade,
    animate ? styles.beatAnimate : "",
    animate
      ? timelineNarrow
        ? styles.beatDay35Narrow
        : styles.beatDay35Wide
      : "",
  ]
    .filter(Boolean)
    .join(" ");
}

/** Italic line under “Day 35” — lives in the story header stack. */
export function Day35Caption({ animate = false, timelineNarrow = false }) {
  const fadeClass = beatFadeClass({ animate, timelineNarrow });

  return (
    <p
      className={`${styles.caption} ${fadeClass}`}
      aria-hidden={animate ? undefined : true}
    >
      {DAY_THIRTY_FIVE_COPY.text}
    </p>
  );
}

/** Day 35 — protagonist seated at pour spot (thinking pose). */
export default function Day35Beat({
  animate = false,
  timelineNarrow = false,
}) {
  const fadeClass = beatFadeClass({ animate, timelineNarrow });

  return (
    <div className={styles.beatRoot} aria-hidden={animate ? undefined : true}>
      <div className={`${styles.sitAnchor} ${fadeClass}`}>
        <ProtagonistSitting />
      </div>
    </div>
  );
}
