import { Coordinates } from "@/components/game/models/game-state.types";

const GRID_WIDTH = 3;

export const gridIndexToCoordinates = (index: number) => {
  const width = GRID_WIDTH;
  const x = index % width;
  const y = Math.floor(index / width);
  return { x, y };
};

export const compareCoordinates = (
  coordinates1: Coordinates,
  coordinates2: Coordinates
) => {
  return coordinates1.x === coordinates2.x && coordinates1.y === coordinates2.y;
};
