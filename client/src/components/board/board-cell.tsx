// @ts-nocheck

import { QuestionMarkIcon } from "@/assets/question-mark.icon";
import { cn } from "@/lib/utils";
import { useAtomValue } from "jotai";
import { useMemo } from "react";
import { compareCoordinates, gridIndexToCoordinates } from "@/utils/math";
import { $doGameState } from "@/core/models/game";

type BoardCellState =
  | "default"
  | "setRabbit"
  | "killedRabbit"
  | "enemyDefault"
  | "move"
  | "miss";

interface BoardCellProps {
  index: number;
  onClick?: () => void;
}

const cellInnerConfig: Partial<Record<BoardCellState, string | JSX.Element>> = {
  setRabbit: "🐇",
  killedRabbit: "❌🐇",
  enemyDefault: <QuestionMarkIcon />,
  move: <QuestionMarkIcon />,
  miss: "⭕",
};

const BoardCell = ({ index, onClick }: BoardCellProps) => {
  const gameState = useAtomValue($doGameState);

  const cellState: BoardCellState = useMemo(() => {
    const cellCoordinates = gridIndexToCoordinates(index);

    // User board

    if (
      gameState.stage === "setRabits" &&
      gameState.userRabbitsPositions &&
      gameState.userRabbitsPositions.find((item) =>
        compareCoordinates(item, cellCoordinates)
      )
    ) {
      return "setRabbit";
    }

    // if ()

    // Enemy board

    // if (gameState.isUserTurn)

    return "default";
  }, [gameState.stage, gameState.userRabbitsPositions, index]);

  return (
    <div
      className={cn(
        "w-full h-full relative rounded-lg flex justify-center items-center text-2xl",
        {
          "bg-gn-950": cellState === "default" || cellState === "miss",
          "bg-gn-900 border-teal-400 border-2": cellState === "setRabbit",
          "bg-gn-950 border-error-800 border-2": cellState === "killedRabbit",
          "bg-gn-800 border-gn-700 border-2": cellState === "enemyDefault",
          "bg-gn-800 border-teal-400 border-2": cellState === "move",
        }
      )}
      onClick={onClick}
    >
      {cellInnerConfig[cellState]}
      <span className="absolute bottom-2 left-2 text-gn-700 text-base">
        {index + 1}
      </span>
    </div>
  );
};

export { BoardCell };
