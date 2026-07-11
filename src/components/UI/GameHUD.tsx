import React from 'react';
import { PlayerIndicator } from './PlayerIndicator';
import { AudioControls } from './AudioControls';
import { DiceRoller } from './DiceRoller';
import { DiceMesh } from '../../three/DiceMesh';
import { useGameStore } from '../../game/store';

interface GameHUDProps {
  diceMesh: DiceMesh | null;
  onRoll: (result: number) => void;
}

export const GameHUD: React.FC<GameHUDProps> = ({ diceMesh, onRoll }) => {
  const winner = useGameStore((state) => state.winner);

  return (
    <div className="fixed inset-0 pointer-events-none flex flex-col justify-between p-6">
      {/* Top Left - Player Indicator */}
      <div className="pointer-events-auto w-80">
        <PlayerIndicator />
      </div>

      {/* Top Right - Audio Controls */}
      <div className="pointer-events-auto ml-auto">
        <AudioControls />
      </div>

      {/* Bottom Center - Dice Roller */}
      <div className="pointer-events-auto self-center">
        <DiceRoller diceMesh={diceMesh} onRoll={onRoll} />
      </div>

      {/* Win Overlay */}
      {winner && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center pointer-events-auto">
          <div className="bg-vintage-cream border-8 border-vintage-darkBrown rounded-xl p-8 text-center shadow-2xl">
            <h1 className="text-5xl font-bold font-serif text-vintage-rustOrange mb-4">
              🎉 {winner.name} Wins! 🎉
            </h1>
            <p className="text-xl text-vintage-darkBrown font-serif mb-6">
              They reached square 100!
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-vintage-rustOrange text-white font-bold rounded-lg hover:opacity-90 transition-all"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
