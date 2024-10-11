import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/style.css'; // Importe seu arquivo de estilo

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
  };

  const handlePlay = () => {
    navigate('/game'); // Redireciona para o GameBoard
  };

  return (
    <div className="home-container">
      <h1>Bem-vindo ao Jogo da Memória!</h1>
      <p className="welcome-message">
        Prepare-se para testar sua memória com desafios emocionantes.
      </p>
      <div className="description">
        <h2>Como Jogar:</h2>
        <p>
          Combine os cartões iguais para ganhar pontos! O objetivo é completar o
          jogo no menor tempo possível.
        </p>
      </div>
      <div className="button-container">
        <button className="play-button" onClick={handlePlay}>
          Jogar
        </button>
        <button className="logout-button" onClick={handleLogout}>
          Sair
        </button>
      </div>
    </div>
  );
};

export default Home;
