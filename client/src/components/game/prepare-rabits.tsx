import { useAtom } from "jotai";
import { Board } from "../board/board";
import { $doGameState } from "@/core/models/game";
import { Coordinates } from "@/core/models/game.types";
import { compareCoordinates } from "@/utils/math";

const PrepareRabits = () => {
  const [gameState, setGameState] = useAtom($doGameState);

  const handleSetRabbit = (cooridnates: Coordinates) => {
    if (
      gameState.userRabbitsPositions &&
      gameState.userRabbitsPositions.find((cell) =>
        compareCoordinates(cell, cooridnates)
      )
    ) {
      return;
    }

    if (!gameState.userRabbitsPositions) {
      setGameState({ ...gameState, userRabbitsPositions: [cooridnates] });
    } else if (gameState.userRabbitsPositions.length === 1) {
      const userRabbitsPositions = [
        ...gameState.userRabbitsPositions,
        cooridnates
      ];
      setGameState({ ...gameState, userRabbitsPositions });
    } else {
      const userRabbitsPositions = [...gameState.userRabbitsPositions];
      userRabbitsPositions.shift();
      userRabbitsPositions.push(cooridnates);

      setGameState({ ...gameState, userRabbitsPositions });
    }
  };

  return (
    <div className="flex flex-col w-full gap-2">
      <Board onClick={handleSetRabbit} />
      <div className="w-full flex gap-1 py-2 px-3">
        <div className="w-full flex gap-2">
          <span className="font-bold text-base">🐇</span>
          <span className="text-sm text-gn-500">
            Select 2 cells where you will place your Rabbits
          </span>
        </div>
        <div className="flex items-center font-semibold text-xl">
          <span className="text-fuchsia-300">
            {gameState.userRabbitsPositions?.length ?? 0}
          </span>
          <span className="text-gn-600">/2</span>
        </div>
      </div>
    </div>
  );
};

export { PrepareRabits };
