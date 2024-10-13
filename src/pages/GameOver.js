import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/style.css';

const GameOver = () => {
  const navigate = useNavigate();

  const handleRestart = () => {
    navigate('/game'); // Redireciona para a página /game
  };

  return (
    <div className="container">
      <h1 className="game-over-title">Parabéns!</h1>
      <p className="game-over-message">Você completou o jogo com sucesso!</p>
      <button
        className="common-button"
        onClick={handleRestart}
        aria-label="Jogar Novamente"
      >
        Jogar Novamente 👍
      </button>
      <div className="button-container">
        <button className="common-button" onClick={() => navigate('/home')}>
          Voltar para Home
        </button>
      </div>
    </div>
  );
};

export default GameOver;
