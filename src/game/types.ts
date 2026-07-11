export interface Player {
  id: string;
  name: string;
  color: string;
  position: number;
}

export interface Move {
  playerId: string;
  from: number;
  diceResult: number;
  to: number;
  snakeFrom?: number;
  snakeTo?: number;
  ladderFrom?: number;
  ladderTo?: number;
  timestamp: Date;
}

export interface SnakeOrLadder {
  start: number;
  end: number;
}

export type GamePhase = 'setup' | 'rolling' | 'moving' | 'waiting' | 'won';

export interface GameState {
  players: Player[];
  currentPlayerIndex: number;
  gamePhase: GamePhase;
  diceResult: number | null;
  playerPositions: Map<string, number>;
  moveHistory: Move[];
  turnCount: number;
  winner: Player | null;
  volume: number;
  isMuted: boolean;
}
