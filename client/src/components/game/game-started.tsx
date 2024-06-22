import { Coordinates } from "@/core/models/game.types";
import { Board } from "../board/board";
import { useAtom } from "jotai";
import { $doGameState } from "@/core/models/game";
import { compareCoordinates } from "@/utils/math";

const GameStarted = () => {
  const [gameState, setGameState] = useAtom($doGameState);

  const handleSelectCell = (coordinates: Coordinates) => {
    if (!gameState.isUserTurn) {
      return;
    }

    if (
      (gameState.userMove &&
        compareCoordinates(gameState.userMove, coordinates)) ||
      (gameState.userMoves &&
        gameState.userMoves.find((move) =>
          compareCoordinates(move.coordinates, coordinates)
        ))
    ) {
      return;
    }

    setGameState({ ...gameState, userMove: coordinates });
  };

  return <Board onClick={handleSelectCell} />;
};

export { GameStarted };
