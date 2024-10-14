import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/actions/authActions'; // Ação de logout
import { useNavigate } from 'react-router-dom';
import apiService from '../services/apiService'; // Serviço para requisições de API
import '../assets/styles/style.css';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false); // Controle do estado de carregamento

  // Função de logout
  const handleLogout = () => {
    dispatch(logout()); // Remove token e limpa estado
    navigate('/login'); // Redireciona para login
  };

  // Função para iniciar o jogo
  const handlePlay = () => {
    navigate('/game');
  };

  // Função para excluir a conta
  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      'Tem certeza de que deseja excluir sua conta? Esta ação não pode ser desfeita.',
    );

    if (!confirmed) return;

    try {
      setIsProcessing(true); // Ativa estado de carregamento
      await apiService.deleteAccount(); // Chama a API para excluir a conta
      alert('Conta excluída com sucesso!');
      handleLogout(); // Faz logout após a exclusão
    } catch (err) {
      alert(err.response?.data?.message || 'Erro ao excluir a conta.');
    } finally {
      setIsProcessing(false); // Desativa estado de carregamento
    }
  };

  return (
    <div className="container">
      <h1>Bem-vindo ao Jogo da Memória!</h1>
      <div className="button-container">
        <button className="common-button" onClick={handlePlay}>
          JOGAR 👍
        </button>
        <button className="common-button" onClick={handleLogout}>
          Desconectar
        </button>
        <button
          className="common-button atention"
          onClick={handleDeleteAccount}
          disabled={isProcessing} // Desabilita o botão durante o processamento
        >
          {isProcessing ? 'Processando...' : 'Excluir Conta'}
        </button>
      </div>
    </div>
  );
};

export default Home;
