import { Coordinates } from "@/core/models/game.types";

const GRID_WIDTH = 3;

export const gridIndexToCoordinates = (index: number) => {
  const width = GRID_WIDTH;
  const x = index % width;
  const y = Math.floor(index / width);
  return { x, y };
};

export const coordinatesToIndex = (coordinates: Coordinates) => {
  return coordinates.y * GRID_WIDTH + coordinates.x;
};

export const compareCoordinates = (
  coordinates1: Coordinates,
  coordinates2: Coordinates
) => {
  return coordinates1.x === coordinates2.x && coordinates1.y === coordinates2.y;
};

export const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const paddedMinutes = minutes.toString().padStart(1, "0");
  const paddedSeconds = remainingSeconds.toString().padStart(2, "0");

  return `${paddedMinutes}:${paddedSeconds}`;
};
