import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import '../assets/styles/style.css';

const GameOver = () => {
  const navigate = useNavigate(); // Cria uma instância de navigate

  const handleRestart = () => {
    navigate('/game'); // Redireciona para a página /game
  };

  return (
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
      <button id="restart" onClick={handleRestart} aria-label="Play Again">
        Play Again 👍
      </button>
    </div>
  );
};

export default GameOver;
