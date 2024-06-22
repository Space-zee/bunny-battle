import { useMemo } from "react";
import { useAtom } from "jotai";
import { $doGameState } from "@/core/models/game";

const TurnInfo = () => {
  const [gameState] = useAtom($doGameState);

  const infoText = useMemo(() => {
    if (gameState.stage === "setRabits") {
      if (gameState.userRabbitsPositions?.length === 2) {
        return "Submit your ETH";
      } else {
        return "Position your two rabbits";
      }
    }

    if (gameState.isUserTurn) {
      return "You turn";
    } else {
      return "🤞 Opponent’s turn";
    }

    // if (winner !) // if other user won
    // "You've lost"
    // else
  }, [
    gameState.isUserTurn,
    gameState.stage,
    gameState.userRabbitsPositions?.length,
  ]);

  return (
    <div className="w-full flex justify-between items-center px-3">
      <span className="text-gn-500 text-base">{infoText}</span>
      <div className="w-[72px] flex justify-center items-center text-teal-300 font-semibold text-xl bg-gn-900 rounded-[45px] py-2">
        0:44
      </div>
    </div>
  );
};

export default TurnInfo;
