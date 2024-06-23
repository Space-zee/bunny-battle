import { PageTitle } from "../general/page-title";
import { GameHeader } from "../game/game-header";
import { Container } from "../general/container";
import { PrepareRabits } from "../game/prepare-rabits";
import TurnInfo from "../game/turn-info";
import { useEffect, useMemo } from "react";
import { $doGameState } from "@/core/models/game";
import { GameStarted } from "../game/game-started";
import { io } from "socket.io-client";
import { apiBaseUrl } from "@/constants/api.constant.ts";
import { useLocation, useSearchParams } from "react-router-dom";
import { IJoinRoomRes, IRabbitsSetReq } from "@/interfaces/ws.ts";
import { useAtom, useSetAtom } from "jotai/index";
import { LogoIcon } from "@/assets/logo.icon";
import * as coreModels from "@/core/models";

const Game = () => {
  const { pathname } = useLocation();
  const [, , roomId] = pathname.split("/");
  const [searchParams] = useSearchParams();

  const [gameState, setGameState] = useAtom($doGameState);
  const [WebApp] = useAtom(coreModels.$webApp);
  const [TgButtons] = useAtom(coreModels.$tgButtons);
  const $doLoadWebApp = useSetAtom(coreModels.$doLoadWebApp);

  const socket = io(apiBaseUrl, { autoConnect: false });

  useEffect(() => {
    $doLoadWebApp();
    if (TgButtons) {
      TgButtons.showMainButton(handleRabbitSetSubmission, {
        color: "#E478FA",
        text: "Confirm",
        text_color: "#000000",
        is_active: !!gameState.enemyUsername && gameState.userRabbitsPositions?.length === 2,
        is_visible: true
      });
    }
  }, [WebApp]);

  useEffect(() => {
    TgButtons?.showMainButton(handleRabbitSetSubmission, {
      color: "#E478FA",
      text: "Confirm",
      text_color: "#000000",
      is_active: !!gameState.enemyUsername && gameState.userRabbitsPositions?.length === 2,
      is_visible: true
    });
  }, [gameState.enemyUsername, gameState.userRabbitsPositions]);


  useEffect(() => {
    socket.connect();
    socket.on("disconnect", () => { // fire when socked is disconnected
      console.log("Socket disconnected");
    });
    socket.on(`readyForBattle:${roomId}`, (body: IJoinRoomRes) => { // fire when socked is disconnected
      const prizePool = Number(body.bet) + Number(body.bet) * 0.99;
      const enemyUsername = WebApp?.initDataUnsafe.user?.username === body.username ? body.opponentName : body.username;
      setGameState({ ...gameState, enemyUsername, prizePool });
    });

    socket.on(`serverRabbitSet:${roomId}:${WebApp?.initDataUnsafe.user?.id}`, (body: {contractRoomId: number}) => {
      console.log('body', body)
      //TODO: Toast.  Rabbits set transaction confirmed
      setGameState({ ...gameState, gameId: body.contractRoomId });
    });

    socket.on(`serverUserMove:${roomId}`, (body: any) => {
      console.log('body', body)
      //TODO: Toast.  Move transaction confirmed
      //setGameState({ ...gameState, gameId: body.contractRoomId });
    });

    socket.on(`gameStarted:${roomId}`, (body: {contractRoomId: number}) => {
      setGameState({ ...gameState, gameId: body.contractRoomId });
    });
    // remove all event listeners
    return () => {
      socket.off("disconnect");
      socket.off("connect");
      socket.off(`readyForBattle:${roomId}`);
      socket.off(`serverRabbitSet:${roomId}`);
    };
  }, []);

  const renderBoard = useMemo(() => {
    if (gameState.stage === "setRabits") {
      return <PrepareRabits  />;
    }
    if (gameState.stage === "gameStarted") {
      return <GameStarted />;
    }
  }, [gameState.stage]);

  const pageTitle = useMemo(() => {
    if (gameState.stage === "setRabits") {
      return "Start Battle";
    }

    return (
      <>
        <LogoIcon />
        <span className="text-fuchsia-400">#{gameState.gameId}</span>
      </>
    );
  }, [gameState.gameId, gameState.stage]);

  const handleRabbitSetSubmission = () => {
    const req: IRabbitsSetReq = {
      roomId,
      rabbits: gameState.userRabbitsPositions as [],
      telegramUserId: WebApp.initDataUnsafe.user!.id as number
    };
    socket.connect();
    socket.emit("clientRabbitsSet", req);
  };

  return (
    <Container className="flex flex-col items-center">
      <PageTitle>{pageTitle}</PageTitle>
      <GameHeader prizePool={gameState.prizePool.toString()} name={WebApp?.initDataUnsafe.user?.username}
                  opponentName={gameState.enemyUsername ? gameState.enemyUsername : "Opponent"} />
      <div className="w-full flex flex-col items-center justify-cente mt-5 gap-2">
        <TurnInfo />
        {renderBoard}
      </div>
    </Container>
  );
};

export { Game };
