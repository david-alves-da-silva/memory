import React from 'react';
import '../assets/styles/style.css';

const GameOver = ({ onRestart }) => (
  <div id="gameOver" style={{ display: 'flex' }}>
    <div id="text">Congratulations!</div>
    <button id="restart" onClick={onRestart}>
      Play Again 👍
    </button>
  </div>
);

export default GameOver;
