import { $doGameState } from "@/core/models/game";
import { RoomParticipant } from "../create-room/participant";
import { RoomPrize } from "../create-room/room-prize";

import { useAtomValue } from "jotai";

const GameHeader = ({ opponentName, name, prizePool }: { name: string | null, opponentName: string | null, prizePool: string }) => {
  const gameState = useAtomValue($doGameState);

  return (
    <div className="gap-4 flex w-full flex-col items-center mt-6">
      <div className="flex w-full justify-between items-center gap-5">
        <RoomParticipant isActive={gameState.isUserTurn} name={`@${name}`} />
        <span className="text-[32px]">🤔</span>
        <RoomParticipant isActive={!gameState.isUserTurn} name={`@${opponentName}`} />
      </div>
      <RoomPrize value={prizePool} />
    </div>
  );
};

export { GameHeader };
