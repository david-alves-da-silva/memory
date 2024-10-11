import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { verifyCodeRequest } from '../redux/actions/verificationActions';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/style.css';
import apiService from '../services/apiService';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerificationStep, setIsVerificationStep] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { token, error: verificationError } = useSelector(
    (state) => state.verification,
  );

  useEffect(() => {
    if (token) {
      navigate('/home');
    }

    if (verificationError && verificationError !== error) {
      setError(verificationError);
    }
  }, [token, verificationError, error, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await apiService.login(username, password);
      setSuccess(response.data.message);
      setTimeout(() => setSuccess(''), 5000);
      setIsVerificationStep(true);
      setVerificationCode('');
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          'Erro ao fazer login. Verifique suas credenciais.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerification = (e) => {
    e.preventDefault();
    dispatch(verifyCodeRequest(username, verificationCode));
  };

  return (
    <div className="login-container">
      <h1>{isVerificationStep ? 'Verifique seu Código' : 'Login'}</h1>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
      <form onSubmit={isVerificationStep ? handleVerification : handleLogin}>
        <div className="input-group">
          <label htmlFor="username">Usuário</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        {isVerificationStep ? (
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
        ) : (
          <div className="input-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        )}
        <button type="submit" disabled={isLoading}>
          {isLoading
            ? 'Carregando...'
            : isVerificationStep
            ? 'Verificar Código'
            : 'Entrar'}
        </button>
        {isVerificationStep && (
          <button type="button" onClick={() => setIsVerificationStep(false)}>
            Voltar ao Login
          </button>
        )}
      </form>
      <div className="register-container">
        <p>
          Não tem uma conta?{' '}
          <button onClick={() => navigate('/register')}>Cadastrar</button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
