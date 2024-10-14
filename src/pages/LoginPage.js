import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/style.css';
import { loginRequest } from '../redux/actions/authActions';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Pegue os dados do estado do Redux
  const {
    token,
    error: loginError,
    message,
  } = useSelector((state) => state.auth);

  useEffect(() => {
    // Limpa o localStorage se o usuário não estiver autenticado
    if (!token) {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
    } else {
      // Redireciona para /home se o token estiver presente
      navigate('/home');
    }

    // Lida com erros de login
    if (loginError && loginError !== error) {
      const errorMessage =
        typeof loginError === 'string'
          ? loginError
          : loginError.message || 'Erro desconhecido';
      setError(errorMessage);
      setIsLoading(false); // Desabilita o loading em caso de erro
    }

    // Lida com a mensagem de sucesso
    if (message) {
      setSuccess(message);
      setTimeout(() => setSuccess(''), 5000); // Limpa a mensagem após 5 segundos
    }
  }, [token, loginError, message, error, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    setIsLoading(true);
    dispatch(loginRequest(username, password));
  };

  return (
    <div className="container">
      <h1>Login</h1>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
      <form className="button-container" onSubmit={handleLogin}>
        <div className="input-group">
          <label htmlFor="username">Usuário</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="username"
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Carregando...' : 'Entrar'}
        </button>
        <div>
          <p>
            Não tem uma conta?{' '}
            <button type="button" onClick={() => navigate('/register')}>
              Cadastrar
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
