import { create } from 'zustand';
import { GameState, Player, Move } from './types';
import { BoardLogic } from './BoardLogic';

interface GameStore extends GameState {
  setPlayers: (players: Player[]) => void;
  rollDice: () => number;
  movePlayer: (targetSquare: number) => void;
  applySnakeOrLadder: (square: number) => number;
  nextTurn: () => void;
  resetGame: () => void;
  setCurrentPhase: (phase: GameState['gamePhase']) => void;
  setVolume: (volume: number) => void;
  setMuted: (muted: boolean) => void;
  addMove: (move: Move) => void;
}

export const useGameStore = create<GameStore>((set) => {
  const initialState: GameState = {
    players: [],
    currentPlayerIndex: 0,
    gamePhase: 'setup',
    diceResult: null,
    playerPositions: new Map(),
    moveHistory: [],
    turnCount: 0,
    winner: null,
    volume: 0.7,
    isMuted: false,
  };

  return {
    ...initialState,

    setPlayers: (players: Player[]) => {
      const positions = new Map<string, number>();
      players.forEach((p) => positions.set(p.id, 0));

      set({
        players,
        playerPositions: positions,
        currentPlayerIndex: 0,
        gamePhase: 'rolling',
      });
    },

    rollDice: () => {
      const result = Math.floor(Math.random() * 6) + 1;
      set({ diceResult: result });
      return result;
    },

    movePlayer: (targetSquare: number) => {
      set((state) => {
        const newPositions = new Map(state.playerPositions);
        const currentPlayer = state.players[state.currentPlayerIndex];
        newPositions.set(currentPlayer.id, targetSquare);
        return { playerPositions: newPositions };
      });
    },

    applySnakeOrLadder: (square: number) => {
      const finalSquare = BoardLogic.checkForSnakeOrLadder(square);
      set((state) => {
        const newPositions = new Map(state.playerPositions);
        const currentPlayer = state.players[state.currentPlayerIndex];
        newPositions.set(currentPlayer.id, finalSquare);
        return { playerPositions: newPositions };
      });
      return finalSquare;
    },

    nextTurn: () => {
      set((state) => {
        let nextIndex = (state.currentPlayerIndex + 1) % state.players.length;
        return {
          currentPlayerIndex: nextIndex,
          diceResult: null,
          gamePhase: 'rolling',
          turnCount: state.turnCount + 1,
        };
      });
    },

    setCurrentPhase: (phase: GameState['gamePhase']) => {
      set({ gamePhase: phase });
    },

    setVolume: (volume: number) => {
      set({ volume: Math.max(0, Math.min(1, volume)) });
    },

    setMuted: (muted: boolean) => {
      set({ isMuted: muted });
    },

    addMove: (move: Move) => {
      set((state) => ({
        moveHistory: [...state.moveHistory, move],
      }));
    },

    resetGame: () => {
      set({
        ...initialState,
        players: initialState.players,
      });
    },
  };
});
