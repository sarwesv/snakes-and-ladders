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
    console.log('BoardRenderer: useEffect triggered, players:', players.length);
    if (!containerRef.current || players.length === 0) {
      console.log('BoardRenderer: Returning early - container or no players');
      return;
    }

    try {
      console.log('BoardRenderer: Starting scene setup');
      const scene = new SceneSetup(containerRef.current);
      sceneRef.current = scene;

      console.log('BoardRenderer: Adding board');
      const board = new BoardMesh();
      scene.scene.add(board.group);

      console.log('BoardRenderer: Adding player pieces');
      const pieces = new Map<string, PieceMesh>();
      players.forEach((player) => {
        const piece = new PieceMesh(player.id, player.color);
        piece.setPosition(0);
        scene.scene.add(piece.mesh);
        pieces.set(player.id, piece);
      });
      piecesRef.current = pieces;

      console.log('BoardRenderer: Adding snakes');
      SNAKES_AND_LADDERS.snakes.forEach((snake) => {
        const snakeMesh = new SnakeMesh(snake.start, snake.end);
        scene.scene.add(snakeMesh.mesh);
      });

      console.log('BoardRenderer: Adding ladders');
      SNAKES_AND_LADDERS.ladders.forEach((ladder) => {
        const ladderMesh = new LadderMesh(ladder.start, ladder.end);
        scene.scene.add(ladderMesh.mesh);
      });

      console.log('BoardRenderer: Adding dice');
      const diceMesh = new DiceMesh();
      scene.scene.add(diceMesh.mesh);
      diceMeshRef.current = diceMesh;
      onDiceReady(diceMesh);

      console.log('BoardRenderer: Starting animation loop');
      const animate = () => {
        requestAnimationFrame(animate);
        scene.render();
      };
      animate();
      console.log('BoardRenderer: Setup complete');
    } catch (error) {
      console.error('BoardRenderer: Error during setup', error);
    }

    const handleResize = () => {
      if (sceneRef.current) {
        sceneRef.current.renderer.setSize(window.innerWidth, window.innerHeight);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (sceneRef.current) {
        sceneRef.current.dispose();
      }
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
