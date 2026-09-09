import { GAME_COPY } from "../constants/copy";
import { useFocusTrap } from "../hooks/useFocusTrap";
import styles from "../styles/GameStatusOverlay.module.css";

export default function GameStatusOverlay({ status, onRestart, reducedMotion = false }) {
  const isOpen = status === "dead" || status === "won";
  const containerRef = useFocusTrap(isOpen);
  const isWin = status === "won";

  if (!isOpen) return null;

  return (
    <div
      ref={containerRef}
      className={`${styles.overlay} ${isWin ? styles.win : styles.lose} ${reducedMotion ? styles.reducedMotion : ""}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="game-status-title"
    >
      <div id="game-status-title" className={styles.title}>
        {isWin ? GAME_COPY.winTitle : GAME_COPY.loseTitle}
      </div>
      <div className={styles.subtitle}>
        {isWin ? GAME_COPY.winSubtitle : GAME_COPY.loseSubtitle}
      </div>
      <button type="button" className={styles.button} onClick={onRestart}>
        {isWin ? GAME_COPY.playAgain : GAME_COPY.restart}
      </button>
      {!isWin && <div className={styles.hint}>{GAME_COPY.loseHint}</div>}
    </div>
  );
}
