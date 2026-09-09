import styles from "../styles/CollectToast.module.css";

/** Brief message shown when a spark or the finish door is reached. */
export default function CollectToast({ message, isFinish = false, isHint = false }) {
  if (!message) return null;

  return (
    <div
      className={`${styles.toast} ${isFinish ? styles.toastFinish : ""} ${isHint ? styles.toastHint : ""}`}
      role="status"
      aria-live="assertive"
    >
      <span className={styles.pip} aria-hidden="true" />
      <span>{message}</span>
    </div>
  );
}
