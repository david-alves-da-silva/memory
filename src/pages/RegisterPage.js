import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/apiService';
import { loginSuccess } from '../redux/actions/authActions';
import '../assets/styles/style.css';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validação básica para campos obrigatórios
    if (!username || !password || !phone || !email) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true); // Inicia o carregamento
    setError(''); // Limpa erros anteriores
    setSuccess(''); // Limpa mensagens de sucesso anteriores

    try {
      const response = await apiService.register(
        username,
        password,
        phone,
        email,
      );
      setSuccess(response.data.message);

      // A lógica de login pode ser ajustada dependendo de como você quer gerenciar a autenticação
      // Se a resposta não incluir o token, você pode removê-lo daqui
      localStorage.setItem('token', response.data.token);
      dispatch(loginSuccess({ username, token: response.data.token }));
      navigate('/home');
    } catch (err) {
      // Manipulação de erros
      setError(err.response?.data?.message || 'Erro ao cadastrar usuário.');
    } finally {
      setLoading(false); // Finaliza o carregamento
    }
  };

  return (
    <div className="register-container">
      <h1>Cadastrar</h1>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
      <form onSubmit={handleRegister}>
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
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
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
            autoComplete="new-password"
          />
        </div>
        <div className="input-group">
          <label htmlFor="phone">Telefone</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            autoComplete="tel"
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </form>
      <div className="login-link">
        <p>
          Já tem uma conta?{' '}
          <button onClick={() => navigate('/login')}>Login</button>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
