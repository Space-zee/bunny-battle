import { useEffect, useMemo } from "react";
import { useAtom } from "jotai";
import { $doGameState } from "@/core/models/game";
import { useCountdown } from "usehooks-ts";
import { formatTime } from "@/utils/math";
import { useLocation } from "react-router-dom";
import { apiBaseUrl } from "@/constants/api.constant";
import { io } from "socket.io-client";

const TurnInfo = () => {
  const [gameState] = useAtom($doGameState);
  const [count, { startCountdown, resetCountdown }] = useCountdown({
    countStart: 60,
    intervalMs: 1000,
  });
  const { pathname } = useLocation();
  const [, , roomId] = pathname.split("/");
  const socket = io(apiBaseUrl);

  useEffect(() => {
    // TODO add event listener when game started to start cuntdoun
    socket.on(`serverUserMove:${roomId}`, () => {
      resetCountdown();
      startCountdown();
    });
  }, [resetCountdown, roomId, socket, startCountdown]);

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
      <div className="w-[72px] flex justify-center items-center text-fuchisia-300 font-semibold text-xl bg-gn-900 rounded-[45px] py-2">
        {formatTime(count)}
      </div>
    </div>
  );
};

export default TurnInfo;
