import { atom } from "jotai";
import { GameState } from "./game.types";

export const initialGameState: GameState = {
  prizePool: 0,
  winner: null,
  isUserTurn: true,
  // isUserTurn: false,
  isUserRoom: false,
  enemyUsername: null,
  stage: "setRabits",
  // stage: "gameStarted",
  // userRabbitsPositions: null,
  userRabbitsPositions: [
    // { x: 1, y: 2 },
    // { x: 0, y: 1 },
  ],
  userMove: null,
  enemyMoves: [],
  userMoves: [
    // { coordinates: { x: 1, y: 0 }, isHit: false, moveId: 0 },
    // { coordinates: { x: 2, y: 0 }, isHit: true, moveId: 0 },
  ],
};

export const $doGameState = atom<GameState>(initialGameState);
