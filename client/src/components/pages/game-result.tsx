import React from "react";
import { Container } from "../general/container";
import { PageTitle } from "../general/page-title";
import { RoomPrize } from "../create-room/room-prize";
import { HistoryBlock } from "../game/history-block";

type GameResult = "win" | "lose";

interface PageResultConfigValue {
  emoji: string;
  text: string;
}

const pageResultConfig: Record<GameResult, PageResultConfigValue> = {
  win: {
    emoji: "🎉",
    text: "Congratulations on your victory",
  },
  lose: {
    emoji: "😔",
    text: "Don't worry, you'll be lucky next time",
  },
};

const GameResult = () => {
  const gameResult = "win";

  return (
    <Container className="flex flex-col w-full gap-6 items-center">
      <PageTitle className="flex flex-col items-center w-full gap-6 leading-normal">
        <span className="text-[64px]">
          {pageResultConfig[gameResult].emoji}
        </span>
        <span>{pageResultConfig[gameResult].text}</span>
      </PageTitle>
      {gameResult === "win" && <RoomPrize value="0.01" />}
      <div className="flex flex-col w-full items-center gap-2">
        <div className="flex items-center gap-1 text-gn-500 text-xl w-full px-3">
          <span className="font-bold">#13</span>
          <span>BunnBattle History</span>
        </div>
        <HistoryBlock
          items={[
            { x: 0, y: 0, isHit: false, tx: "d" },
            { x: 1, y: 2, isHit: true, tx: "d" },
            { x: 1, y: 1, isHit: true, tx: "d", winner: "user" },
          ]}
        />
      </div>
    </Container>
  );
};

export { GameResult };
