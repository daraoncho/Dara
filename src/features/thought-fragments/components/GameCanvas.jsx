import styles from "../styles/GameCanvas.module.css";

/** Fixed full-viewport canvas; gameplay is clipped to the content play area in the engine. */
export default function GameCanvas({ canvasRef }) {
  return (
    <canvas
      ref={canvasRef}
      className={styles.canvas}
      aria-hidden="true"
    />
  );
}
