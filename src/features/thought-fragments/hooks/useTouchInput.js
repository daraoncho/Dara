import { useCallback, useRef } from "react";

/**
 * Merges touch control state into the shared keys ref used by the game loop.
 */
export function useTouchInput(keysRef) {
  const touchRef = useRef({ left: false, right: false, jump: false, down: false });

  const syncKeys = useCallback(() => {
    const touch = touchRef.current;
    const keys = keysRef.current;

    if (touch.left) keys.add("ArrowLeft");
    else keys.delete("ArrowLeft");

    if (touch.right) keys.add("ArrowRight");
    else keys.delete("ArrowRight");

    if (touch.jump) keys.add("Space");
    else keys.delete("Space");

    if (touch.down) keys.add("ArrowDown");
    else keys.delete("ArrowDown");
  }, [keysRef]);

  const setTouch = useCallback(
    (direction, isPressed) => {
      touchRef.current[direction] = isPressed;
      syncKeys();
    },
    [syncKeys],
  );

  const clearTouch = useCallback(() => {
    touchRef.current = { left: false, right: false, jump: false, down: false };
    syncKeys();
  }, [syncKeys]);

  return { setTouch, clearTouch };
}
