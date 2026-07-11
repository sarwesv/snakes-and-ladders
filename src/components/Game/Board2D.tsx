import React, { useEffect, useRef } from 'react';
import { useGameStore } from '../../game/store';
import { BOARD_COLS, SNAKES_AND_LADDERS } from '../../utils/constants';
import { getSquareWorldPosition } from '../../utils/boardCoordinates';

export const Board2D: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const players = useGameStore((state) => state.players);
  const playerPositions = useGameStore((state) => state.playerPositions);
  const currentPlayerIndex = useGameStore((state) => state.currentPlayerIndex);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const squareSize = canvas.width / BOARD_COLS;
    const padding = 10;

    // Clear canvas
    ctx.fillStyle = '#F5E6D3';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw border
    ctx.strokeStyle = '#3E2723';
    ctx.lineWidth = 3;
    ctx.strokeRect(padding / 2, padding / 2, canvas.width - padding, canvas.height - padding);

    // Draw squares
    for (let i = 1; i <= 100; i++) {
      const pos = getSquareWorldPosition(i);
      const x = pos.x * squareSize + squareSize / 2;
      const y = pos.z * squareSize + squareSize / 2;

      // Draw square background
      const isLight = i % 2 === 0;
      ctx.fillStyle = isLight ? '#F5E6D3' : '#F0DCC8';
      ctx.fillRect(x - squareSize / 2, y - squareSize / 2, squareSize, squareSize);

      // Draw square border
      ctx.strokeStyle = '#3E2723';
      ctx.lineWidth = 1;
      ctx.strokeRect(x - squareSize / 2, y - squareSize / 2, squareSize, squareSize);

      // Draw square number
      ctx.fillStyle = '#3E2723';
      ctx.font = 'bold 10px Georgia';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(i.toString(), x, y);
    }

    // Draw snakes
    SNAKES_AND_LADDERS.snakes.forEach((snake) => {
      const startPos = getSquareWorldPosition(snake.start);
      const endPos = getSquareWorldPosition(snake.end);

      const x1 = startPos.x * squareSize + squareSize / 2;
      const y1 = startPos.z * squareSize + squareSize / 2;
      const x2 = endPos.x * squareSize + squareSize / 2;
      const y2 = endPos.z * squareSize + squareSize / 2;

      ctx.strokeStyle = '#1B5E20';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.quadraticCurveTo((x1 + x2) / 2 + 15, (y1 + y2) / 2, x2, y2);
      ctx.stroke();

      // Draw snake head
      ctx.fillStyle = '#FFD54F';
      ctx.beginPath();
      ctx.arc(x2, y2, 6, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw ladders
    SNAKES_AND_LADDERS.ladders.forEach((ladder) => {
      const startPos = getSquareWorldPosition(ladder.start);
      const endPos = getSquareWorldPosition(ladder.end);

      const x1 = startPos.x * squareSize + squareSize / 2;
      const y1 = startPos.z * squareSize + squareSize / 2;
      const x2 = endPos.x * squareSize + squareSize / 2;
      const y2 = endPos.z * squareSize + squareSize / 2;

      ctx.strokeStyle = '#BF8F00';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      // Draw rungs
      const numRungs = 5;
      for (let i = 1; i < numRungs; i++) {
        const t = i / numRungs;
        const x = x1 + (x2 - x1) * t;
        const y = y1 + (y2 - y1) * t;

        ctx.strokeStyle = '#D4A574';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x - 8, y);
        ctx.lineTo(x + 8, y);
        ctx.stroke();
      }
    });

    // Draw players
    players.forEach((player, index) => {
      const position = playerPositions.get(player.id) || 0;
      const pos = getSquareWorldPosition(position);

      const x = pos.x * squareSize + squareSize / 2;
      const y = pos.z * squareSize + squareSize / 2;

      // Draw player circle
      const radius = squareSize / 3;
      const isCurrentPlayer = index === currentPlayerIndex;
      const ringWidth = isCurrentPlayer ? 3 : 1;

      ctx.fillStyle = player.color;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();

      // Highlight current player
      if (isCurrentPlayer) {
        ctx.strokeStyle = '#FFD54F';
        ctx.lineWidth = ringWidth;
        ctx.beginPath();
        ctx.arc(x, y, radius + ringWidth + 2, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw player number/initial
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 12px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText((index + 1).toString(), x, y);
    });
  }, [players, playerPositions, currentPlayerIndex]);

  return (
    <div className="fixed right-0 top-0 h-full bg-vintage-cream border-l-4 border-vintage-darkBrown shadow-lg flex flex-col p-4 w-80">
      <h2 className="text-2xl font-bold font-serif text-vintage-darkBrown mb-3 text-center">
        Board View
      </h2>

      <canvas
        ref={canvasRef}
        width={300}
        height={300}
        className="bg-vintage-cream border-2 border-vintage-darkBrown rounded-lg shadow-md"
      />

      <div className="mt-4 space-y-2 flex-1 overflow-y-auto">
        <h3 className="font-bold font-serif text-vintage-darkBrown mb-2">Players</h3>
        {players.map((player, index) => {
          const position = playerPositions.get(player.id) || 0;
          const isCurrentPlayer = index === currentPlayerIndex;

          return (
            <div
              key={player.id}
              className={`p-2 rounded border-2 ${
                isCurrentPlayer
                  ? 'border-vintage-rustOrange bg-opacity-20 bg-vintage-rustOrange'
                  : 'border-vintage-brown'
              }`}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-full border border-vintage-darkBrown"
                  style={{ backgroundColor: player.color }}
                />
                <span className="font-bold text-sm text-vintage-darkBrown flex-1">
                  {player.name}
                </span>
                <span className="font-mono text-sm text-vintage-brown">
                  Square {position}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
