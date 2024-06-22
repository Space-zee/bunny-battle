import { BoardCell } from "./board-cell";

const boardCellsArr = Array(9).fill(null);

const Board = () => {
  return (
    <div className="w-full flex flex-col items-center bg-gn-900 rounded-2xl p-2 gap-2">
      <div className="flex items-center justify-center font-bold text-xs">
        <span className="text-gn-500">@DeinerisTArgarian</span>
        <span className="text-gn-700">’s board</span>
      </div>
      <div className="w-full grid grid-cols-3 grid-rows-[repeat(3,65px)] gap-2">
        {boardCellsArr.map((_, index) => (
          <BoardCell key={index} index={index} />
        ))}
      </div>
    </div>
  );
};

export { Board };
