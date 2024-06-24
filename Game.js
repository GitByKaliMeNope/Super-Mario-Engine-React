import React, { useState, useEffect } from 'react';
import Mario from './Mario';
import Ground from './Ground';
import './Super-Mario.css';

const Game = () => {
  const [marioPosition, setMarioPosition] = useState({ left: 50, bottom: 50 });
  const [isJumping, setIsJumping] = useState(false);
  const [direction, setDirection] = useState(null);
  const [isGrounded, setIsGrounded] = useState(true);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      setDirection('right');
    } else if (e.key === 'ArrowLeft') {
      setDirection('left');
    } else if (e.key === ' ' && isGrounded && !isJumping) {
      setIsJumping(true);
      setIsGrounded(false);
      setMarioPosition((prev) => ({ ...prev, bottom: prev.bottom + 100 }));
      setTimeout(() => {
        setIsJumping(false);
      }, 500);
    }
  };

  const handleKeyUp = (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      setDirection(null);
    }
  };

  const handleButtonPress = (dir) => {
    if (dir === 'jump' && isGrounded && !isJumping) {
      setIsJumping(true);
      setIsGrounded(false);
      setMarioPosition((prev) => ({ ...prev, bottom: prev.bottom + 100 }));
      setTimeout(() => {
        setIsJumping(false);
      }, 500);
    } else {
      setDirection(dir);
    }
  };

  const handleButtonRelease = () => {
    setDirection(null);
  };

  useEffect(() => {
    const applyGravity = () => {
      setMarioPosition((prev) => {
        if (prev.bottom > 50 && !isJumping) {
          return { ...prev, bottom: prev.bottom - 5 };
        }
        if (prev.bottom <= 50 && !isGrounded) {
          setIsGrounded(true);
        }
        return prev;
      });
    };

    const moveMario = () => {
      if (direction === 'right') {
        setMarioPosition((prev) => ({ ...prev, left: prev.left + 5 }));
      } else if (direction === 'left') {
        setMarioPosition((prev) => ({ ...prev, left: prev.left - 5 }));
      }
    };

    const gravityIntervalId = setInterval(applyGravity, 50);
    const moveIntervalId = setInterval(moveMario, 50);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      clearInterval(gravityIntervalId);
      clearInterval(moveIntervalId);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isJumping, direction, isGrounded]);

  return (
    <div className="game">
      <Mario position={marioPosition} />
      <Ground />
      <div className="controls">
        <button
          className="control-btn"
          onTouchStart={() => handleButtonPress('left')}
          onTouchEnd={handleButtonRelease}
          onMouseDown={() => handleButtonPress('left')}
          onMouseUp={handleButtonRelease}
        >
          ⬅️
        </button>
        <button
          className="control-btn"
          onTouchStart={() => handleButtonPress('jump')}
          onTouchEnd={handleButtonRelease}
          onMouseDown={() => handleButtonPress('jump')}
          onMouseUp={handleButtonRelease}
        >
          ⬆️
        </button>
        <button
          className="control-btn"
          onTouchStart={() => handleButtonPress('right')}
          onTouchEnd={handleButtonRelease}
          onMouseDown={() => handleButtonPress('right')}
          onMouseUp={handleButtonRelease}
        >
          ➡️
        </button>
      </div>
    </div>
  );
};

export default Game;
