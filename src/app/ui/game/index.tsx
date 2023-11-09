"use client";
import { GameContext } from "@/app/stores/game-controller";
import Image from "next/image";
import { useCallback, useContext, useState } from "react";
import AddPlayerForm from "./add-player-form";
import Board from "./board";
import Players from "./players";

const Game = () => {
  const { players, currentOrder, movePlayer } = useContext(GameContext);

  return (
    <div className="flex justify-between">
      {/* player details section */}
      <section className="flex flex-col mt-10 ml-10 gap-5">
        <Players />
      </section>
      <section className="mt-10">
        <Board />
      </section>
      <section className="mr-10 mt-10">
        <AddPlayerForm />
      </section>
    </div>
  );
};

export default Game;
