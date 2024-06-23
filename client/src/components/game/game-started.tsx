import { Coordinates } from "@/core/models/game.types";
import { Board } from "../board/board";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { $doGameState } from "@/core/models/game";
import { compareCoordinates } from "@/utils/math";
import { useEffect } from "react";
import { TgButtons } from "@/lib/telegram";
import { io } from "socket.io-client";
import { apiBaseUrl } from "@/constants/api.constant";
import { useLocation } from "react-router-dom";
import * as coreModels from "../../core/models";

const GameStarted = () => {
  const [WebApp] = useAtom(coreModels.$webApp);
  const [TgButtons] = useAtom(coreModels.$tgButtons);
  const $doLoadWebApp = useSetAtom(coreModels.$doLoadWebApp);

  const [gameState, setGameState] = useAtom($doGameState);
  const socket = io(apiBaseUrl);
  const { pathname } = useLocation();
  const [, , roomId] = pathname.split("/");

  const handleSelectCell = (coordinates: Coordinates) => {
    if (!gameState.isUserTurn) {
      return;
    }

    if (
      (gameState.userMove &&
        compareCoordinates(gameState.userMove, coordinates)) ||
      (gameState.userMoves &&
        gameState.userMoves.find((move) =>
          compareCoordinates(move.coordinates, coordinates)
        ))
    ) {
      return;
    }

    setGameState(prevState => ({ ...prevState, userMove: coordinates }));
  };

  const handleConfirmMove = () => {
    console.log('handleConfirmMove')
    console.log('gameState', gameState)
    if (!gameState.userMove) {
      return;
    }

    socket.emit("clientUserMove", {
      coordinates: gameState.userMove,
      userRabbits: gameState.userRabbitsPositions,
      telegramUserId: WebApp.initDataUnsafe.user?.id,
      roomId,
    });
  };

  useEffect(() => {
    $doLoadWebApp();
    if (TgButtons && gameState.isUserTurn) {
      TgButtons.hideBackButton();
      TgButtons.showMainButton(handleConfirmMove, {
        color: "#E478FA",
        text: "Shot with Sign",
        text_color: "#000000",
        is_active: true,
        is_visible: true,
      });
    }
  }, [gameState.isUserTurn]);

  return <Board onClick={handleSelectCell} />;
};

export { GameStarted };
