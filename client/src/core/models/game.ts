import { atom } from "jotai";
import { GameState } from "./game.types";

export const initialGameState: GameState = {
  prizePool: 0,
  winner: null,
  isUserTurn: true,
  isUserRoom: false,
  enemyUsername: null,
  stage: "setRabits",
  userRabbitsPositions: null,
  action: null,
  enemyMoves: [],
  userMoves: [],
};

export const $doGameState = atom<GameState>(initialGameState);
