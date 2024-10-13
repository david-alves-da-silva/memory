import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/apiService';
import '../assets/styles/style.css';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handlePlay = () => {
    navigate('/game');
  };

  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        'Tem certeza de que deseja excluir sua conta? Esta ação não pode ser desfeita.',
      )
    ) {
      try {
        await apiService.deleteAccount();
        alert('Conta excluída com sucesso!');
        handleLogout();
      } catch (err) {
        alert(err.response?.data?.message || 'Erro ao excluir a conta.');
      }
    }
  };

  return (
    <div className="container">
      <h1>Bem-vindo ao Jogo da Memória!</h1>
      <div className="button-container">
        <button className="common-button" onClick={handlePlay}>
          JOGAR👍
        </button>
        <button className="common-button" onClick={handleLogout}>
          Desconectar
        </button>
        <button
          className="common-button atention"
          onClick={handleDeleteAccount}
        >
          Excluir Conta
        </button>
      </div>
    </div>
  );
};

export default Home;
