import { useCallback } from "react";
import styles from "../styles/TouchControls.module.css";

/**
 * Pointer-based control button — avoids passive touch listener warnings.
 * Uses setPointerCapture so drag-off still releases cleanly.
 */
export default function TouchControlButton({ direction, label, setTouch, className }) {
  const setPressed = useCallback(
    (pressed) => setTouch(direction, pressed),
    [direction, setTouch],
  );

  const handlePointerDown = (event) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    setPressed(true);
  };

  const handlePointerUp = (event) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    setPressed(false);
  };

  return (
    <button
      type="button"
      className={className ?? styles.btn}
      aria-label={label}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={() => setPressed(false)}
    >
      {direction === "jump" ? "↑" : direction === "left" ? "←" : direction === "down" ? "↓" : "→"}
    </button>
  );
}
