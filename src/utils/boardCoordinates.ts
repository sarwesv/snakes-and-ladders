import { BOARD_COLS, SQUARE_SIZE } from './constants';

export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

export function getSquareWorldPosition(squareNumber: number): Vec3 {
  const squareIndex = squareNumber - 1;
  const row = Math.floor(squareIndex / BOARD_COLS);
  const isReversedRow = row % 2 === 1;
  const col = isReversedRow ? BOARD_COLS - 1 - (squareIndex % BOARD_COLS) : squareIndex % BOARD_COLS;

  return {
    x: col * SQUARE_SIZE,
    y: 0,
    z: row * SQUARE_SIZE,
  };
}

export function getCameraPosition(squareNumber: number): Vec3 {
  const pos = getSquareWorldPosition(squareNumber);
  return {
    x: pos.x + SQUARE_SIZE / 2,
    y: 1.5,
    z: pos.z - 0.8,
  };
}

export function getCameraLookAt(squareNumber: number): Vec3 {
  const pos = getSquareWorldPosition(squareNumber);
  return {
    x: pos.x + SQUARE_SIZE / 2,
    y: 1.5,
    z: pos.z + 0.8,
  };
}
