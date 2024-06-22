import { PageTitle } from "../general/page-title";
import { GameHeader } from "../game/game-header";
import { Container } from "../general/container";
import { PrepareRabits } from "../game/prepare-rabits";
import TurnInfo from "../game/turn-info";

const Game = () => {
  return (
    <Container className="flex flex-col items-center">
      <PageTitle>Start Battle</PageTitle>
      <GameHeader />
      <div className="w-full flex flex-col items-center justify-cente mt-5 gap-2">
        <TurnInfo />
        <PrepareRabits />
      </div>
    </Container>
  );
};

export { Game };
