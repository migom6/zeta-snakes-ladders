import { GameContext } from "@/app/stores/game-controller";
import { useContext } from "react";

const Players = () => {
  const { players, currentOrder, movePlayer } = useContext(GameContext);

  return (
    <div className="flex flex-col gap-5">
      {players.map((p) => (
        <div
          className="flex flex-col bg-slate-100 p-5 rounded drop-shadow-sm  border-gray-800 border"
          key={p.name}
        >
          <div className="flex gap-2">
            <span>order</span>
            <span>{p.order}</span>
          </div>
          <div className="flex gap-2">
            <span>name</span>
            <span>{p.name}</span>
          </div>
          <div className="flex gap-2">
            <span>color</span>
            <span style={{ color: p.color }}>{p.color}</span>
          </div>
          {currentOrder === p.order && (
            <button
              onClick={() => {
                movePlayer!(p.name);
              }}
              className="bg-indigo-600 p-2 rounded-lg text-slate-50 mt-5"
            >
              Roll dice
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Players;
