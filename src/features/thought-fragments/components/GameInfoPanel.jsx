import { GAME_COPY } from "../constants/copy";
import styles from "../styles/GameToggle.module.css";

export default function GameInfoPanel({ onClose, className = "" }) {
  return (
    <div className={`${styles.infoPanelInner} ${className}`} role="tooltip">
      <button
        type="button"
        className={styles.infoClose}
        onClick={onClose}
        aria-label="Close game instructions"
      >
        ×
      </button>
      <div className={styles.infoTitle}>{GAME_COPY.infoTitle}</div>
      <div className={styles.infoControlsTitle}>{GAME_COPY.infoControlsTitle}</div>
      {GAME_COPY.infoControls.map((row) => (
        <div key={row.label} className={styles.infoRow}>
          <span className={styles.key}>{row.keys}</span>
          <span>{row.label}</span>
        </div>
      ))}
      <div className={styles.infoGoal}>{GAME_COPY.infoGoal}</div>
    </div>
  );
}
