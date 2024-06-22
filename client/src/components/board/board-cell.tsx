import { QuestionMarkIcon } from "@/assets/question-mark.icon";
import { cn } from "@/lib/utils";

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
  const state: BoardCellState = "default";

  return (
    <div
      className={cn(
        "w-full h-full relative rounded-lg flex justify-center items-center text-2xl",
        {
          "bg-gn-950": state === "default" || state === "miss",
          "bg-gn-900 border-teal-400 border-2": state === "setRabbit",
          "bg-gn-950 border-error-800 border-2": state === "killedRabbit",
          "bg-gn-800 border-gn-700 border-2": state === "enemyDefault",
          "bg-gn-800 border-teal-400 border-2": state === "move",
        }
      )}
      onClick={onClick}
    >
      {cellInnerConfig[state]}
      <span className="absolute bottom-2 left-2 text-gn-700 text-base">
        {index + 1}
      </span>
    </div>
  );
};

export { BoardCell };
