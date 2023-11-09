import Game from "@/app/ui/game";
import GameProvider from "./stores/game-controller";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <GameProvider>
        <Game />
      </GameProvider>
    </main>
  );
}
