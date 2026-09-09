import TouchControlButton from "./TouchControlButton";
import styles from "../styles/TouchControls.module.css";

/**
 * On-screen controls for coarse-pointer devices.
 * Pointer events + touch-action: none — no passive preventDefault needed.
 */
export default function TouchControls({ setTouch }) {
  return (
    <div className={styles.bar} role="group" aria-label="Game controls">
      <div className={styles.dpad}>
        <TouchControlButton direction="left" label="Move left" setTouch={setTouch} />
        <TouchControlButton direction="right" label="Move right" setTouch={setTouch} />
        <TouchControlButton
          direction="down"
          label="Drop down"
          setTouch={setTouch}
          className={styles.downBtn}
        />
      </div>
      <TouchControlButton
        direction="jump"
        label="Jump"
        setTouch={setTouch}
        className={styles.jumpBtn}
      />
    </div>
  );
}
