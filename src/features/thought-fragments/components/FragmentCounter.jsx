import { COLLECTIBLE_TOTAL } from "../constants/gameConfig";
import styles from "../styles/FragmentCounter.module.css";

export default function FragmentCounter({
  collected,
  total = COLLECTIBLE_TOTAL,
  lastMessage = null,
}) {
  const statusText = lastMessage
    ? `${lastMessage} ${collected} of ${total} checkpoints.`
    : `${collected} of ${total} checkpoints.`;

  return (
    <div className={styles.counter} role="status" aria-live="polite" aria-atomic="true">
      <span className={styles.pip} aria-hidden="true" />
      <span className={styles.text} aria-hidden="true">
        {collected} / {total}
      </span>
      <span className={styles.srOnly}>{statusText}</span>
    </div>
  );
}
