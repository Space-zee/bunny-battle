export interface Coordinates {
  x: number;
  y: number;
}

export interface Move {
  moveId: number;
  isHit: boolean;
  coordinates: Coordinates;
}

export type GameStateStage =
  | "setRabits"
  | "waitingForOpponent"
  | "gameStarted"
  | "gameEnded";

export interface GameState {
  stage: GameStateStage;
  isUserTurn: boolean;
  prizePool: number;
  winner: string | null;
  isUserRoom: boolean; // One who create is true
  userRabbitsPositions: Coordinates[] | null;
  action: Coordinates | null;
  userMoves: Move[];
  enemyMoves: Move[];
}
