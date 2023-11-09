"use client";
import { ReactNode, FC, createContext, useState, useCallback } from "react";

const initState: {
  currentOrder: number;
  board: { from: number; to: number; type: "ladder" | "snake" }[];
  players: { name: string; position: number; color: string; order: number }[];
  getPlayer?: (
    playerName: string
  ) => (typeof initState)["players"][0] | undefined;
  movePlayer?: (playerName: string) => number;
  resetGame?: () => void;
  addPlayer?: (playerName: string, color: string) => boolean;
} = {
  currentOrder: 0,
  board: [
    { from: 2, to: 38, type: "ladder" },
    { from: 7, to: 14, type: "ladder" },
    { from: 16, to: 6, type: "snake" },
  ],
  players: [
    { name: "player 1", color: "red", position: 1, order: 0 },
    { name: "player 2", color: "green", position: 1, order: 1 },
    { name: "player 3", color: "yellow", position: 1, order: 2 },
    { name: "player 4", color: "blue", position: 1, order: 3 },
  ],
};

export type GameState = typeof initState;

export const GameContext = createContext<GameState>(initState);

const GameProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<GameState>(initState);

  const getPlayer = useCallback(
    (playerName: string) => {
      return state.players.find((player) => player.name === playerName);
    },
    [state.players]
  );

  const _getValidPosition = useCallback(
    (position: number, diceValue: number): number => {
      const positionAfterDice = position + diceValue;

      const cellInfo = state.board.find(
        (cell) => cell.from === positionAfterDice
      );
      if (!cellInfo) {
        return positionAfterDice;
      } else {
        return cellInfo.to;
      }
    },
    [state]
  );

  const movePlayer = useCallback(
    (playerName: string) => {
      const diceValue = 1; // generate random number between 1- 6
      const player = getPlayer(playerName);
      if (!player) throw new Error(`player not found with name ${playerName}`);
      setState((state) => {
        const newPosition = _getValidPosition(player.position, diceValue);
        const updatePlayers = [
          ...state.players.filter((p) => p.name !== playerName),
          { ...player, position: newPosition },
        ].sort((a, b) => a.order - b.order);
        return {
          ...state,
          currentOrder: (state.currentOrder + 1) % state.players.length,
          players: updatePlayers,
        };
      });
      return diceValue + player.position;
    },
    [getPlayer, _getValidPosition]
  );

  const resetGame = useCallback(() => {
    setState(initState);
  }, []);

  const addPlayer = useCallback(
    (playerName: string, color: string): boolean => {
      if (state.players.find((p) => p.name === playerName)) return false;
      setState((state) => {
        return {
          ...state,
          players: [
            ...state.players,
            {
              name: playerName,
              position: 0,
              color,
              order: state.players.length + 1,
            },
          ],
        };
      });
      return true;
    },
    [state.players]
  );

  return (
    <GameContext.Provider
      value={{ ...state, getPlayer, movePlayer, resetGame, addPlayer }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
