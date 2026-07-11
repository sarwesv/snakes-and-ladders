import React, { useState } from 'react';
import { useGameStore } from '../../game/store';
import { PLAYER_COLORS, COLOR_NAMES } from '../../utils/constants';

interface GameSetupProps {
  onGameStart: () => void;
}

export const GameSetup: React.FC<GameSetupProps> = ({ onGameStart }) => {
  const [playerCount, setPlayerCount] = useState(2);
  const [playerNames, setPlayerNames] = useState(['Player 1', 'Player 2']);
  const setPlayers = useGameStore((state) => state.setPlayers);

  const handlePlayerCountChange = (count: number) => {
    setPlayerCount(count);
    setPlayerNames(Array.from({ length: count }, (_, i) => `Player ${i + 1}`));
  };

  const handleNameChange = (index: number, name: string) => {
    const newNames = [...playerNames];
    newNames[index] = name || `Player ${index + 1}`;
    setPlayerNames(newNames);
  };

  const handleStartGame = () => {
    const players = playerNames.map((name, index) => ({
      id: `player-${index}`,
      name: name || `Player ${index + 1}`,
      color: PLAYER_COLORS[index],
      position: 0,
    }));

    setPlayers(players);
    onGameStart();
  };

  return (
    <div className="fixed inset-0 bg-vintage-cream flex items-center justify-center">
      <div className="bg-vintage-cream border-8 border-vintage-darkBrown rounded-xl p-8 shadow-2xl max-w-md w-full">
        <h1 className="text-4xl font-bold font-serif text-vintage-rustOrange mb-6 text-center">
          🐍 Snakes & Ladders 🪜
        </h1>

        <div className="mb-6">
          <label className="block text-lg font-bold text-vintage-darkBrown mb-3">
            Number of Players
          </label>
          <div className="flex gap-2">
            {[2, 3, 4].map((num) => (
              <button
                key={num}
                onClick={() => handlePlayerCountChange(num)}
                className={`flex-1 py-2 rounded-lg font-bold transition-all ${
                  playerCount === num
                    ? 'bg-vintage-rustOrange text-white'
                    : 'bg-vintage-brown text-white hover:opacity-90'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6 space-y-3">
          {playerNames.map((name, index) => (
            <div key={index}>
              <label className="block text-sm font-bold text-vintage-darkBrown mb-1">
                {COLOR_NAMES[index]} Player
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => handleNameChange(index, e.target.value)}
                className="w-full px-3 py-2 border-2 border-vintage-darkBrown rounded-lg font-serif"
                placeholder={`Player ${index + 1}`}
              />
            </div>
          ))}
        </div>

        <button
          onClick={handleStartGame}
          className="w-full px-6 py-3 bg-vintage-sageGreen text-white font-bold text-lg rounded-lg hover:opacity-90 transition-all shadow-lg"
        >
          Start Game
        </button>
      </div>
    </div>
  );
};
