import { PageTitle } from "../general/page-title";
import { GameHeader } from "../game/game-header";
import { Container } from "../general/container";
import { PrepareRabits } from "../game/prepare-rabits";
import TurnInfo from "../game/turn-info";
import { useMemo } from "react";
import { useAtomValue } from "jotai";
import { $doGameState } from "@/core/models/game";
import { GameStarted } from "../game/game-started";

const Game = () => {
  const gameState = useAtomValue($doGameState);

  const renderBoard = useMemo(() => {
    if (gameState.stage === "setRabits") {
      return <PrepareRabits />;
    }
    if (gameState.stage === "gameStarted") {
      return <GameStarted />;
    }
  }, [gameState.stage]);

  return (
    <Container className="flex flex-col items-center">
      <PageTitle>Start Battle</PageTitle>
      <GameHeader />
      <div className="w-full flex flex-col items-center justify-cente mt-5 gap-2">
        <TurnInfo />
        {renderBoard}
      </div>
    </Container>
  );
};

export { Game };
