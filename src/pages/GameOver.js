import React from 'react';
import '../assets/styles/style.css';

const GameOver = ({ onRestart }) => (
  <div
    id="gameOver"
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
    }}
  >
    <div id="text" style={{ fontSize: '2rem', marginBottom: '20px' }}>
      Congratulations!
    </div>
    <button id="restart" onClick={onRestart} aria-label="Play Again">
      Play Again 👍
    </button>
  </div>
);

export default GameOver;
