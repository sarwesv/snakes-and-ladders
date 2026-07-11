import React, { useEffect, useRef } from 'react';
import { SceneSetup } from '../../three/SceneSetup';
import { BoardMesh } from '../../three/BoardMesh';
import { PieceMesh } from '../../three/PieceMesh';
import { SnakeMesh } from '../../three/SnakeMesh';
import { LadderMesh } from '../../three/LadderMesh';
import { DiceMesh } from '../../three/DiceMesh';
import { SNAKES_AND_LADDERS } from '../../utils/constants';
import { useGameStore } from '../../game/store';

interface BoardRendererProps {
  onDiceReady: (diceMesh: DiceMesh) => void;
}

export const BoardRenderer: React.FC<BoardRendererProps> = ({ onDiceReady }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<SceneSetup | null>(null);
  const piecesRef = useRef<Map<string, PieceMesh>>(new Map());
  const diceMeshRef = useRef<DiceMesh | null>(null);
  const players = useGameStore((state) => state.players);
  const playerPositions = useGameStore((state) => state.playerPositions);

  useEffect(() => {
    if (!containerRef.current || players.length === 0) return;

    const scene = new SceneSetup(containerRef.current);
    sceneRef.current = scene;

    const board = new BoardMesh();
    scene.scene.add(board.group);

    const pieces = new Map<string, PieceMesh>();
    players.forEach((player) => {
      const piece = new PieceMesh(player.id, player.color);
      piece.setPosition(0);
      scene.scene.add(piece.mesh);
      pieces.set(player.id, piece);
    });
    piecesRef.current = pieces;

    SNAKES_AND_LADDERS.snakes.forEach((snake) => {
      const snakeMesh = new SnakeMesh(snake.start, snake.end);
      scene.scene.add(snakeMesh.mesh);
    });

    SNAKES_AND_LADDERS.ladders.forEach((ladder) => {
      const ladderMesh = new LadderMesh(ladder.start, ladder.end);
      scene.scene.add(ladderMesh.mesh);
    });

    const diceMesh = new DiceMesh();
    scene.scene.add(diceMesh.mesh);
    diceMeshRef.current = diceMesh;
    onDiceReady(diceMesh);

    const animate = () => {
      requestAnimationFrame(animate);
      scene.render();
    };
    animate();

    const handleResize = () => {
      if (sceneRef.current) {
        sceneRef.current.renderer.setSize(window.innerWidth, window.innerHeight);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      scene.dispose();
    };
  }, [players, onDiceReady]);

  useEffect(() => {
    playerPositions.forEach((position, playerId) => {
      const piece = piecesRef.current.get(playerId);
      if (piece) {
        piece.setPosition(position);
      }
    });
  }, [playerPositions]);

  return <div ref={containerRef} className="w-full h-screen" />;
};
