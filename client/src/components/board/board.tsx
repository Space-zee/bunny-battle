import { gridIndexToCoordinates } from "@/utils/math";
import { BoardCell } from "./board-cell";
import { Coordinates } from "@/core/models/game.types";
import { useMemo } from "react";
import { useAtomValue } from "jotai";
import { $doGameState } from "@/core/models/game";

const boardCellsArr = Array(9).fill(null);

interface BoardProps {
  onClick?: (args: Coordinates) => void | Promise<void>;
}

const Board = ({ onClick }: BoardProps) => {
  const gameState = useAtomValue($doGameState);

  const boardText = useMemo(() => {
    if (gameState.stage !== "gameStarted") {
      return;
    }

    if (!gameState.enemyUsername) {
      return;
    }

    if (!gameState.isUserTurn) {
      return (
        <div className="flex items-center justify-center font-bold text-xs">
          <span className="text-gn-500">{gameState.enemyUsername}</span>
          <span className="text-gn-700">’s board</span>
        </div>
      );
    }

    return (
      <div className="flex items-center justify-center font-bold text-xs">
        <span className="text-gn-500">Your</span>
        <span className="text-gn-700">board</span>
      </div>
    );
  }, [gameState.enemyUsername, gameState.isUserTurn, gameState.stage]);

  return (
    <div className="w-full flex flex-col items-center bg-gn-900 rounded-2xl p-2 gap-2">
      {boardText}
      <div className="w-full grid grid-cols-3 grid-rows-[repeat(3,65px)] gap-2">
        {boardCellsArr.map((_, index) => (
          <BoardCell
            key={index}
            index={index}
            onClick={() => onClick?.(gridIndexToCoordinates(index))}
          />
        ))}
      </div>
    </div>
  );
};

export { Board };
