import { GAME_COPY } from "../constants/copy";
import { useGameModeContext } from "../context/useGameModeContext";
import styles from "../styles/GameToggle.module.css";

/**
 * Game mode toggle — sidebar variant (desktop) or floating variant (mobile).
 */
export default function GameToggle({ variant = "sidebar" }) {
  const { isActive, showInfo, setShowInfo, toggle } = useGameModeContext();

  const wrapperClass =
    variant === "floating" ? styles.floatingWrapper : styles.sidebarWrapper;

  const handleInfoToggle = () => {
    setShowInfo((open) => !open);
  };

  return (
    <div className={wrapperClass}>
      <div className={styles.row}>
        <button
          type="button"
          className={`${styles.toggleBtn} ${isActive ? styles.toggleOn : ""}`}
          onClick={toggle}
          title={isActive ? GAME_COPY.toggleOnTitle : GAME_COPY.toggleOffTitle}
          aria-pressed={isActive}
        >
          <span className={styles.dot} aria-hidden="true" />
          {GAME_COPY.toggleLabel}
        </button>

        {isActive && (
          <button
            type="button"
            className={`${styles.infoBtn} ${showInfo ? styles.infoBtnActive : ""}`}
            onClick={handleInfoToggle}
            aria-label="How to play"
            aria-expanded={showInfo}
          >
            i
          </button>
        )}
      </div>

    </div>
  );
}
