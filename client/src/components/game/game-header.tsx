import { RoomParticipant } from "../create-room/participant";
import { RoomPrize } from "../create-room/room-prize";

import { useAtomValue } from "jotai";
import { $doGameState } from "../game/models/game-state";

const GameHeader = () => {
  const gameState = useAtomValue($doGameState);

  return (
    <div className="gap-4 flex w-full flex-col items-center mt-6">
      <div className="flex w-full justify-between items-center gap-5">
        <RoomParticipant isActive={gameState.isUserTurn} name="@random" />
        <span className="text-[32px]">🤔</span>
        <RoomParticipant isActive={!gameState.isUserTurn} name="@random" />
      </div>
      <RoomPrize value="0.0019" />
    </div>
  );
};

export { GameHeader };
