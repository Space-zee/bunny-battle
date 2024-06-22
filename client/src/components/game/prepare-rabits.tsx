import { useAtom } from "jotai";
import { Board } from "../board/board";
import { $doGameState } from "@/core/models/game";
import { Coordinates } from "@/core/models/game.types";
const PrepareRabits = () => {
  const [gameState, setGameState] = useAtom($doGameState);

  const handleSetRabbit = (cooridnates: Coordinates) => {
    if (!gameState.userRabbitsPositions) {
      setGameState({ ...gameState, userRabbitsPositions: [cooridnates] });
    } else if (gameState.userRabbitsPositions.length === 1) {
      const userRabbitsPositions = [
        ...gameState.userRabbitsPositions,
        cooridnates,
      ];
      setGameState({ ...gameState, userRabbitsPositions });
    } else {
      const userRabbitsPositions = [...gameState.userRabbitsPositions];
      userRabbitsPositions.shift();
      userRabbitsPositions.push(cooridnates);

      setGameState({ ...gameState, userRabbitsPositions });
    }
  };

  return <Board onClick={handleSetRabbit} />;
};

export { PrepareRabits };
