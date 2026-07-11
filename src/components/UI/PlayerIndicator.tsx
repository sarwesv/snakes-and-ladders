import React from 'react';
import { useGameStore } from '../../game/store';

export const PlayerIndicator: React.FC = () => {
  const players = useGameStore((state) => state.players);
  const currentPlayerIndex = useGameStore((state) => state.currentPlayerIndex);
  const playerPositions = useGameStore((state) => state.playerPositions);
  const gamePhase = useGameStore((state) => state.gamePhase);
  const diceResult = useGameStore((state) => state.diceResult);

  if (players.length === 0) return null;

  const currentPlayer = players[currentPlayerIndex];
  const position = playerPositions.get(currentPlayer.id) || 0;

  return (
    <div className="bg-vintage-cream border-4 border-vintage-darkBrown rounded-lg p-4 shadow-lg">
      <div className="flex items-center gap-3 mb-2">
        <div
          className="w-4 h-4 rounded-full border-2 border-vintage-darkBrown"
          style={{ backgroundColor: currentPlayer.color }}
        />
        <h2 className="text-xl font-bold font-serif text-vintage-darkBrown">
          {currentPlayer.name}'s Turn
        </h2>
      </div>
      <div className="text-lg text-vintage-darkBrown font-mono">
        Position: Square {position}
      </div>
      {diceResult && (
        <div className="text-lg font-bold text-vintage-rustOrange mt-2">
          Rolled: {diceResult}
        </div>
      )}
      <div className="text-sm text-vintage-brown mt-2">
        Phase: {gamePhase}
      </div>
    </div>
  );
};
