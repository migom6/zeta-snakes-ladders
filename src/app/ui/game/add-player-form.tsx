"use client";

import { GameContext } from "@/app/stores/game-controller";
import { FormEventHandler, useCallback, useContext, useState } from "react";

const AddPlayerForm = () => {
  const { addPlayer } = useContext(GameContext);

  const [name, setName] = useState("");
  const [color, setColor] = useState("");

  const addNewPlayer: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();
      addPlayer!(name, color);
      // reseting values;
      setName("");
      setColor("");
    },
    [name, color, addPlayer]
  );
  return (
    <form className="flex flex-col gap-5" onSubmit={addNewPlayer}>
      <input
        className="border border-gray-700"
        onChange={(e) => setName(e.target.value)}
        value={name}
        placeholder="name"
      />
      <input
        className="border border-gray-700"
        onChange={(e) => setColor(e.target.value)}
        value={color}
        placeholder="color"
      />
      <button className="py-2 px-5 bg-indigo-500 rounded-lg">
        Add new player
      </button>
    </form>
  );
};

export default AddPlayerForm;
