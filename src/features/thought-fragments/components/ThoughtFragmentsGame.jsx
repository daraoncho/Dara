import { useCallback, useRef } from "react";
import { useGameModeContext } from "../context/useGameModeContext";
import { useCoarsePointer } from "../hooks/useCoarsePointer";
import { useKeyboardInput } from "../hooks/useKeyboardInput";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useStageScrollLock } from "../hooks/useStageScrollLock";
import { useThoughtFragmentsEngine } from "../hooks/useThoughtFragmentsEngine";
import { useTouchInput } from "../hooks/useTouchInput";
import { COLLECT_QUIPS, GAME_COPY } from "../constants/copy";
import CollectToast from "./CollectToast";
import GameContentDim from "./GameContentDim";
import GameInfoPortal from "./GameInfoPortal";
import FragmentCounter from "./FragmentCounter";
import GameCanvas from "./GameCanvas";
import GameStatusOverlay from "./GameStatusOverlay";
import TouchControls from "./TouchControls";

/**
 * Root game orchestrator — mounts canvas, HUD, and input layers when game mode is active.
 */
export default function ThoughtFragmentsGame() {
  const { isActive, restartKey, restart } = useGameModeContext();
  const jumpLatchRef = useRef(false);
  const dropLatchRef = useRef(false);
  const gameStatusRef = useRef("playing");
  const isCoarse = useCoarsePointer();
  const reducedMotion = useReducedMotion();

  const handleKeyboardRestart = useCallback(
    (event) => {
      if (gameStatusRef.current === "dead") {
        event.preventDefault();
        restart();
        return true;
      }
      return false;
    },
    [restart],
  );

  const keysRef = useKeyboardInput(isActive, handleKeyboardRestart);
  const { setTouch, clearTouch } = useTouchInput(keysRef);

  const engine = useThoughtFragmentsEngine({
    isActive,
    restartKey,
    keysRef,
    jumpLatchRef,
    dropLatchRef,
    reducedMotion,
  });

  gameStatusRef.current = engine.gameStatus;
  useStageScrollLock(isActive, engine.stageBounds);

  const handleRestart = useCallback(() => {
    clearTouch();
    restart();
  }, [clearTouch, restart]);

  if (!isActive) return null;

  return (
    <>
      <GameContentDim />
      <GameInfoPortal />
      <GameCanvas canvasRef={engine.canvasRef} />

      {engine.gameStatus === "playing" && (
        <>
          <FragmentCounter
            collected={engine.fragmentsCollected}
            total={engine.fragmentTotal}
            lastMessage={engine.lastCollectedMessage}
          />
          <CollectToast
            message={engine.lastCollectedMessage}
            isFinish={engine.lastCollectedMessage === COLLECT_QUIPS.finish}
            isHint={engine.lastCollectedMessage === GAME_COPY.doorLocked}
          />
        </>
      )}

      <GameStatusOverlay
        status={engine.gameStatus}
        onRestart={handleRestart}
        reducedMotion={reducedMotion}
      />

      {isCoarse && engine.gameStatus === "playing" && (
        <TouchControls setTouch={setTouch} />
      )}
    </>
  );
}
