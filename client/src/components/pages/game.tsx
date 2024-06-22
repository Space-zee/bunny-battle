import { PageTitle } from "../general/page-title";
import { GameHeader } from "../game/game-header";
import { Container } from "../general/container";
import { PrepareRabits } from "../game/prepare-rabits";
import TurnInfo from "../game/turn-info";
import { useEffect, useMemo, useState } from "react";
import { useAtomValue } from "jotai";
import { $doGameState } from "@/core/models/game";
import { GameStarted } from "../game/game-started";
import { io } from "socket.io-client";
import { apiBaseUrl } from "@/constants/api.constant.ts";
import { useLocation, useSearchParams } from "react-router-dom";
import { IJoinRoomRes } from "@/interfaces/ws.ts";
import { useSetAtom } from "jotai/index";

const Game = () => {
  const [gameState, setGameState] = useSetAtom($doGameState);

  const { pathname } = useLocation();
  const [, , roomId] = pathname.split("/");
  const [searchParams] = useSearchParams();

  const socket = io(apiBaseUrl, { autoConnect: false });
  useEffect(() => {// connect to socket
    socket.connect();
    socket.on("disconnect", () => { // fire when socked is disconnected
      console.log("Socket disconnected");
    });
    socket.on(`readyForBattle:${roomId}`, (body: IJoinRoomRes) => { // fire when socked is disconnected
      setGameState({...gameState, })
    });
    // remove all event listeners
    return () => {
      socket.off("disconnect");
      socket.off("connect");
      socket.off(`readyForBattle:${roomId}`);
    };
  }, []);

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
