import React, { useRef, useEffect } from 'react';
import { useGameStore } from '../../game/store';
import { AnimationManager } from '../../game/AnimationManager';
import { AudioManager } from '../../audio/AudioManager';
import { DiceMesh } from '../../three/DiceMesh';

interface DiceRollerProps {
  diceMesh: DiceMesh | null;
  onRoll: (result: number) => void;
}

export const DiceRoller: React.FC<DiceRollerProps> = ({ diceMesh, onRoll }) => {
  const gamePhase = useGameStore((state) => state.gamePhase);
  const diceResult = useGameStore((state) => state.diceResult);
  const audioManager = useRef<AudioManager | null>(null);
  const animationManager = useRef<AnimationManager>(new AnimationManager());

  useEffect(() => {
    audioManager.current = new AudioManager();
  }, []);

  const handleRoll = () => {
    if (gamePhase !== 'rolling' || !diceMesh || !audioManager.current) return;

    const result = Math.floor(Math.random() * 6) + 1;
    audioManager.current.playSound('dice');

    animationManager.current.animateDiceRoll(diceMesh.mesh);
    diceMesh.setDiceNumber(result);

    setTimeout(() => {
      onRoll(result);
    }, 2000);
  };

  const isDisabled = gamePhase !== 'rolling';

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={handleRoll}
        disabled={isDisabled}
        className={`px-6 py-3 rounded-lg font-serif text-xl font-bold transition-all ${
          isDisabled
            ? 'bg-gray-400 cursor-not-allowed opacity-50'
            : 'bg-vintage-rustOrange hover:bg-opacity-90 text-white shadow-lg hover:shadow-xl'
        }`}
      >
        Roll Dice
      </button>
      {diceResult && (
        <div className="text-2xl font-bold text-vintage-darkBrown font-mono">
          Result: {diceResult}
        </div>
      )}
    </div>
  );
};
