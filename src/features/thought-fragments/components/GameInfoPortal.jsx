import { createPortal } from "react-dom";
import { useGameModeContext } from "../context/useGameModeContext";
import GameInfoPanel from "./GameInfoPanel";
import styles from "../styles/GameInfoPortal.module.css";

/**
 * Renders instructions via portal so they sit above the dim layer and canvas.
 * (Sidebar panel was trapped inside navbar z-index: 50.)
 */
export default function GameInfoPortal() {
  const { isActive, showInfo, setShowInfo } = useGameModeContext();

  if (!isActive || !showInfo) return null;

  return createPortal(
    <GameInfoPanel
      className={styles.panel}
      onClose={() => setShowInfo(false)}
    />,
    document.body,
  );
}
