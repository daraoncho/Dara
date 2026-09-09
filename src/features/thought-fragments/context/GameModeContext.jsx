import { createContext, useCallback, useMemo, useState } from "react";

export const GameModeContext = createContext(null);

export function GameModeProvider({ children }) {
  const [isActive, setIsActive] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [restartKey, setRestartKey] = useState(0);

  const toggle = useCallback(() => {
    setIsActive((prev) => {
      const next = !prev;
      if (next) {
        setRestartKey((key) => key + 1);
      } else {
        setShowInfo(false);
      }
      return next;
    });
  }, []);

  const restart = useCallback(() => {
    setRestartKey((key) => key + 1);
  }, []);

  const value = useMemo(
    () => ({
      isActive,
      showInfo,
      restartKey,
      setShowInfo,
      toggle,
      restart,
    }),
    [isActive, showInfo, restartKey, toggle, restart],
  );

  return (
    <GameModeContext.Provider value={value}>{children}</GameModeContext.Provider>
  );
}
