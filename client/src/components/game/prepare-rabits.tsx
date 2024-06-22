import { useAtom } from "jotai";
import { Board } from "../board/board";
import { Coordinates } from "./models/game-state.types";
import { $doGameState } from "./models/game-state";

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
