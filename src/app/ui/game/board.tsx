"use client";

import { GameContext, GameState } from "@/app/stores/game-controller";
import Image from "next/image";
import { FC, useContext } from "react";

const BOARD_HEIGHT = 500;
const BOARD_WIDTH = 500;

const CELL_WIDTH = BOARD_WIDTH / 10;
const CELL_HEIGHT = BOARD_HEIGHT / 10;

const Board = () => {
  const { currentOrder, board, players, addPlayer } = useContext(GameContext);

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-2xl mb-5">Current Chance {currentOrder}</h3>
      <div className="relative">
        <Image
          src="/snakesandladdersboard.jpeg"
          alt="board-image"
          width={BOARD_WIDTH}
          height={BOARD_HEIGHT}
        />
        {players.map((p) => (
          <PlayerCoin key={p.name} {...p} />
        ))}
      </div>
    </div>
  );
};

const PlayerCoin: FC<GameState["players"][0]> = ({
  color,
  position,
  order,
}) => {
  const currentPosition = position - 1;
  let positionXIndex = currentPosition % 10;
  const positionYIndex = Math.floor(currentPosition / 10);
  if (positionYIndex % 2 === 1) {
    positionXIndex = 10 - positionXIndex - 1;
  }

  return (
    <div
      style={{
        background: color,
        left: positionXIndex * CELL_WIDTH + order * 4,
        bottom: positionYIndex * CELL_HEIGHT,
      }}
      className="absolute rounded-full h-5 w-5"
    />
  );
};

export default Board;
