import { useEffect, useRef } from "react";

const GAME_KEYS = new Set([
  "Space",
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "KeyW",
  "KeyA",
  "KeyS",
  "KeyD",
]);

/**
 * Tracks pressed keys while game mode is active.
 * Returns a stable ref whose `.current` is a Set of event.code strings.
 */
export function useKeyboardInput(isActive, onRestart) {
  const keysRef = useRef(new Set());

  useEffect(() => {
    if (!isActive) {
      keysRef.current.clear();
      return undefined;
    }

    const onKeyDown = (event) => {
      if (event.code === "Space" && typeof onRestart === "function") {
        const handled = onRestart(event);
        if (handled) return;
      }

      keysRef.current.add(event.code);
      if (GAME_KEYS.has(event.code)) {
        event.preventDefault();
      }
    };

    const onKeyUp = (event) => {
      keysRef.current.delete(event.code);
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      keysRef.current = new Set();
    };
  }, [isActive, onRestart]);

  return keysRef;
}
