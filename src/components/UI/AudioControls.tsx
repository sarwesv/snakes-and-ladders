import React, { useEffect, useRef } from 'react';
import { useGameStore } from '../../game/store';
import { AudioManager } from '../../audio/AudioManager';

export const AudioControls: React.FC = () => {
  const volume = useGameStore((state) => state.volume);
  const isMuted = useGameStore((state) => state.isMuted);
  const setVolume = useGameStore((state) => state.setVolume);
  const setMuted = useGameStore((state) => state.setMuted);
  const audioManager = useRef<AudioManager | null>(null);

  useEffect(() => {
    audioManager.current = new AudioManager();
  }, []);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioManager.current) {
      audioManager.current.setVolume(newVolume);
    }
  };

  const handleMute = () => {
    const newMuted = !isMuted;
    setMuted(newMuted);
    if (audioManager.current) {
      audioManager.current.setMuted(newMuted);
    }
  };

  return (
    <div className="bg-vintage-cream border-4 border-vintage-darkBrown rounded-lg p-4 shadow-lg flex items-center gap-4">
      <button
        onClick={handleMute}
        className={`px-4 py-2 rounded-lg font-bold transition-all ${
          isMuted
            ? 'bg-vintage-brown text-white'
            : 'bg-vintage-sageGreen text-white hover:opacity-90'
        }`}
      >
        {isMuted ? '🔇' : '🔊'}
      </button>

      <div className="flex items-center gap-2">
        <label htmlFor="volume" className="text-sm font-bold text-vintage-darkBrown">
          Volume:
        </label>
        <input
          id="volume"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="w-32 h-2 bg-vintage-brown rounded-lg appearance-none cursor-pointer"
        />
        <span className="text-sm font-mono text-vintage-darkBrown w-8">
          {Math.round(volume * 100)}%
        </span>
      </div>
    </div>
  );
};
