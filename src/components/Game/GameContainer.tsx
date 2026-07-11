import { useRef, useState, useEffect } from 'react';
import { useGameStore } from '../../game/store';
import { BoardRenderer } from './BoardRenderer';
import { GameSetup } from './GameSetup';
import { GameHUD } from '../UI/GameHUD';
import { SplashScreen } from './SplashScreen';
import { AudioManager } from '../../audio/AudioManager';
import { BoardLogic } from '../../game/BoardLogic';
import { DiceMesh } from '../../three/DiceMesh';

export const GameContainer: React.FC = () => {
  const players = useGameStore((state) => state.players);
  const playerPositions = useGameStore((state) => state.playerPositions);
  const currentPlayerIndex = useGameStore((state) => state.currentPlayerIndex);

  const setCurrentPhase = useGameStore((state) => state.setCurrentPhase);
  const movePlayer = useGameStore((state) => state.movePlayer);
  const applySnakeOrLadder = useGameStore((state) => state.applySnakeOrLadder);
  const nextTurn = useGameStore((state) => state.nextTurn);
  const addMove = useGameStore((state) => state.addMove);

  const [showSplash, setShowSplash] = useState(true);
  const [showSetup, setShowSetup] = useState(false);
  const [diceMesh, setDiceMesh] = useState<DiceMesh | null>(null);
  const audioManagerRef = useRef<AudioManager | null>(null);

  useEffect(() => {
    audioManagerRef.current = new AudioManager();
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
    setShowSetup(true);
  };

  const handleGameStart = () => {
    setShowSetup(false);
  };

  const handleDiceRoll = (result: number) => {
    if (!audioManagerRef.current) return;

    setCurrentPhase('moving');
    audioManagerRef.current.playSound('move');

    const currentPlayer = players[currentPlayerIndex];
    const currentPosition = playerPositions.get(currentPlayer.id) || 0;

    if (!BoardLogic.isValidMove(currentPosition, result)) {
      setTimeout(() => {
        setCurrentPhase('waiting');
        setTimeout(() => {
          nextTurn();
        }, 1500);
      }, 500);
      return;
    }

    const targetSquare = BoardLogic.calculateTargetSquare(currentPosition, result);

    setTimeout(() => {
      movePlayer(targetSquare);

      const snakeInfo = BoardLogic.getSnakeInfo(targetSquare);
      const ladderInfo = BoardLogic.getLadderInfo(targetSquare);

      if (snakeInfo) {
        if (audioManagerRef.current) {
          audioManagerRef.current.playSound('snake');
        }
        setTimeout(() => {
          const finalSquare = applySnakeOrLadder(targetSquare);
          addMove({
            playerId: currentPlayer.id,
            from: currentPosition,
            diceResult: result,
            to: targetSquare,
            snakeFrom: snakeInfo.start,
            snakeTo: snakeInfo.end,
            timestamp: new Date(),
          });

          if (BoardLogic.isWinningSquare(finalSquare)) {
            if (audioManagerRef.current) {
              audioManagerRef.current.playSound('win');
            }
            useGameStore.setState({ winner: currentPlayer });
            setCurrentPhase('won');
          } else {
            setCurrentPhase('waiting');
            setTimeout(() => {
              nextTurn();
            }, 1500);
          }
        }, 1200);
      } else if (ladderInfo) {
        if (audioManagerRef.current) {
          audioManagerRef.current.playSound('ladder');
        }
        setTimeout(() => {
          const finalSquare = applySnakeOrLadder(targetSquare);
          addMove({
            playerId: currentPlayer.id,
            from: currentPosition,
            diceResult: result,
            to: targetSquare,
            ladderFrom: ladderInfo.start,
            ladderTo: ladderInfo.end,
            timestamp: new Date(),
          });

          if (BoardLogic.isWinningSquare(finalSquare)) {
            if (audioManagerRef.current) {
              audioManagerRef.current.playSound('win');
            }
            useGameStore.setState({ winner: currentPlayer });
            setCurrentPhase('won');
          } else {
            setCurrentPhase('waiting');
            setTimeout(() => {
              nextTurn();
            }, 1500);
          }
        }, 1200);
      } else {
        addMove({
          playerId: currentPlayer.id,
          from: currentPosition,
          diceResult: result,
          to: targetSquare,
          timestamp: new Date(),
        });

        if (BoardLogic.isWinningSquare(targetSquare)) {
          if (audioManagerRef.current) {
            audioManagerRef.current.playSound('win');
          }
          useGameStore.setState({ winner: currentPlayer });
          setCurrentPhase('won');
        } else {
          setCurrentPhase('waiting');
          setTimeout(() => {
            nextTurn();
          }, 1500);
        }
      }
    }, 1500);
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  if (showSetup) {
    return <GameSetup onGameStart={handleGameStart} />;
  }

  return (
    <div className="w-full h-screen overflow-hidden">
      <BoardRenderer onDiceReady={setDiceMesh} />
      <GameHUD diceMesh={diceMesh} onRoll={handleDiceRoll} />
    </div>
  );
};
