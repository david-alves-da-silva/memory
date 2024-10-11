import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/apiService'; // Importar o serviço para fazer a requisição de exclusão
import '../assets/styles/style.css'; // Importe seu arquivo de estilo

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handlePlay = () => {
    navigate('/game'); // Redireciona para o GameBoard
  };

  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        'Tem certeza de que deseja excluir sua conta? Esta ação não pode ser desfeita.',
      )
    ) {
      try {
        await apiService.deleteAccount(); // Chamada ao serviço para excluir a conta
        alert('Conta excluída com sucesso!');
        handleLogout(); // Sair após a exclusão da conta
      } catch (err) {
        alert(err.response?.data?.message || 'Erro ao excluir a conta.');
      }
    }
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
        <button className="common-button" onClick={handlePlay}>
          Jogar
        </button>
        <button className="common-button" onClick={handleLogout}>
          Sair
        </button>
        <button className="common-button" onClick={handleDeleteAccount}>
          Excluir Conta
        </button>
      </div>
    </div>
  );
};

export default Home;
