import styles from "../styles/GameContentDim.module.css";

/** Dims portfolio content so game ledges stand out (content column only). */
export default function GameContentDim() {
  return <div className={styles.dim} aria-hidden="true" />;
}
