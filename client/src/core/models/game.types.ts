export interface Coordinates {
  x: number;
  y: number;
}

export interface Move {
  isHit: boolean;
  coordinates: Coordinates;
}

export type GameStateStage =
  | "setRabits"
  | "waitingForOpponent"
  | "gameStarted"
  | "gameEnded";

export interface GameState {
  gameId: number | null;
  stage: GameStateStage;
  isUserTurn: boolean;
  prizePool: number;
  winner: string | null;
  enemyUsername: string | null;
  // isUserRoom: boolean; // One who create is true
  userRabbitsPositions: Coordinates[] | null;
  userMove: Coordinates | null;
  userMoves: Move[];
  enemyMoves: Move[];
}
