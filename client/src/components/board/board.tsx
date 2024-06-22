import { gridIndexToCoordinates } from "@/utils/math";
import { BoardCell } from "./board-cell";
import { Coordinates } from "../game/models/game-state.types";

const boardCellsArr = Array(9).fill(null);

interface BoardProps {
  onClick?: (args: Coordinates) => void | Promise<void>;
}

const Board = ({ onClick }: BoardProps) => {
  return (
    <div className="w-full flex flex-col items-center bg-gn-900 rounded-2xl p-2 gap-2">
      <div className="flex items-center justify-center font-bold text-xs">
        <span className="text-gn-500">@DeinerisTArgarian</span>
        <span className="text-gn-700">’s board</span>
      </div>
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
