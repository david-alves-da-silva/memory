import React, { useState } from 'react';
import GameBoard from './components/GameBoard';
import GameOver from './components/GameOver';
import './assets/styles/style.css';

const App = () => {
  const [isGameOver, setIsGameOver] = useState(false);

  const handleGameOver = () => {
    setIsGameOver(true);
  };

  const handleRestart = () => {
    setIsGameOver(false);
  };

  return (
    <div>
      {isGameOver ? (
        <GameOver onRestart={handleRestart} />
      ) : (
        <GameBoard onGameOver={handleGameOver} />
      )}
    </div>
  );
};

export default App;
