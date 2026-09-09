import { useContext } from "react";
import { GameModeContext } from "./GameModeContext";

export function useGameModeContext() {
  const context = useContext(GameModeContext);
  if (!context) {
    throw new Error("useGameModeContext must be used within GameModeProvider");
  }
  return context;
}
