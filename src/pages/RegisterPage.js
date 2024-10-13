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
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [codeSent, setCodeSent] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log('Tentando registrar...');
    if (!username || !password || !phone || !email) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await apiService.register(
        username,
        password,
        phone,
        email,
      );
      setSuccess(response.data.message);
      setCodeSent(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao cadastrar usuário.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    console.log('Tentando verificar código...');
    if (!verificationCode) {
      setError('Por favor, insira o código de verificação.');
      return;
    }

    try {
      const response = await apiService.verifyCode(username, verificationCode);
      localStorage.setItem('token', response.data.token);
      dispatch(loginSuccess({ username, token: response.data.token }));
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao verificar o código.');
    }
  };

  return (
    <div className="container">
      <h1>Cadastrar</h1>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
      {!codeSent ? (
        <form className="button-container" onSubmit={handleRegister}>
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
      ) : (
        <form className="button-container" onSubmit={handleVerifyCode}>
          <div className="input-group">
            <label htmlFor="verificationCode">Código de Verificação</label>
            <input
              type="text"
              id="verificationCode"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              required
            />
          </div>
          <button type="submit">Verificar Código</button>
        </form>
      )}
      <div className="button-container">
        <p>
          Já tem uma conta?{' '}
          <button onClick={() => navigate('/login')}>Login</button>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
