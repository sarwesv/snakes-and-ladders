import { BOARD_SIZE, SNAKES_AND_LADDERS } from '../utils/constants';

export class BoardLogic {
  static isValidMove(currentPosition: number, diceResult: number): boolean {
    const targetPosition = currentPosition + diceResult;
    return targetPosition <= BOARD_SIZE;
  }

  static calculateTargetSquare(currentPosition: number, diceResult: number): number {
    const targetPosition = currentPosition + diceResult;
    if (targetPosition > BOARD_SIZE) {
      return currentPosition;
    }
    return targetPosition;
  }

  static checkForSnakeOrLadder(square: number): number {
    for (const snake of SNAKES_AND_LADDERS.snakes) {
      if (snake.start === square) {
        return snake.end;
      }
    }

    for (const ladder of SNAKES_AND_LADDERS.ladders) {
      if (ladder.start === square) {
        return ladder.end;
      }
    }

    return square;
  }

  static getSnakeInfo(square: number): { start: number; end: number } | null {
    for (const snake of SNAKES_AND_LADDERS.snakes) {
      if (snake.start === square) {
        return snake;
      }
    }
    return null;
  }

  static getLadderInfo(square: number): { start: number; end: number } | null {
    for (const ladder of SNAKES_AND_LADDERS.ladders) {
      if (ladder.start === square) {
        return ladder;
      }
    }
    return null;
  }

  static isWinningSquare(square: number): boolean {
    return square === BOARD_SIZE;
  }
}
