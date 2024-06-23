import { PageTitle } from "../general/page-title";
import { GameHeader } from "../game/game-header";
import { Container } from "../general/container";
import { PrepareRabits } from "../game/prepare-rabits";
import TurnInfo from "../game/turn-info";
import { useEffect, useMemo, useState } from "react";
import { useAtom, useAtomValue } from "jotai";
import { $doGameState } from "@/core/models/game";
import { GameStarted } from "../game/game-started";
import { io } from "socket.io-client";
import { apiBaseUrl } from "@/constants/api.constant.ts";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { IJoinRoomRes, IUserMoveRes, IWinnerRes } from "@/interfaces/ws.ts";
import { useSetAtom } from "jotai/index";
import { LogoIcon } from "@/assets/logo.icon";
import WebApp from "@twa-dev/sdk";
import { Coordinates } from "@/core/models/game.types";

const Game = () => {
  const [gameState, setGameState] = useAtom($doGameState);

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [, , roomId] = pathname.split("/");
  const [searchParams] = useSearchParams();

  const socket = io(apiBaseUrl, { autoConnect: false });
  useEffect(() => {
    // connect to socket
    socket.connect();
    socket.on("disconnect", () => {
      // fire when socked is disconnected
      console.log("Socket disconnected");
    });
    socket.on(`readyForBattle:${roomId}`, (body: IJoinRoomRes) => {
      // fire when socked is disconnected
      setGameState({ ...gameState });
    });

    socket.on(
      `serverUserMove:${roomId}`,
      ({ lastMove, telegramUserId }: IUserMoveRes) => {
        const currentUserTelegramId = WebApp.initDataUnsafe.user?.id;

        if (currentUserTelegramId === undefined) {
          return;
        }

        // if user made this move
        if (currentUserTelegramId === telegramUserId) {
          // then we swap turns and set "current" move as user last move
          const lastUserMove = { ...gameState.userMove } as Coordinates;
          const userMoves = [...gameState.userMoves];

          if (lastUserMove) {
            userMoves.push({ coordinates: lastUserMove, isHit: false });
          }

          setGameState({
            ...gameState,
            isUserTurn: false,
            userMove: null,
            userMoves,
          });
        } else {
          // if opponent make their move that means opponent verified our last move, ie if we hit him in our last move
          const userMoves = [...gameState.userMoves];

          // if it's first move - skip
          if (userMoves.length === 0 || lastMove === null) {
            return;
          } else {
            const lastUserMove = {
              ...userMoves[gameState.userMoves.length - 1],
            };
            lastUserMove.isHit = lastMove;
            userMoves[gameState.userMoves.length - 1] = lastUserMove;
            // save move result
            setGameState({ ...gameState, userMoves });
          }
        }
      }
    );

    socket.on(`winner:${roomId}`, ({ address }: IWinnerRes) => {
      setGameState({ ...gameState, winner: address });
      navigate(`/game-result/${roomId}`);
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

  return (
    <Container className="flex flex-col items-center">
      <PageTitle>{pageTitle}</PageTitle>
      <GameHeader />
      <div className="w-full flex flex-col items-center justify-cente mt-5 gap-2">
        <TurnInfo />
        {renderBoard}
      </div>
    </Container>
  );
};

export { Game };
