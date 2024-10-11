import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL; // Atualize para a URL da sua API

const apiService = {
  login: async (username, password) => {
    try {
      return await axios.post(`${API_URL}/auth/login`, { username, password });
    } catch (error) {
      throw new Error('Login failed: ' + error.message);
    }
  },

  verifyCode: async (username, verificationCode) => {
    try {
      return await axios.post(`${API_URL}/auth/verify`, {
        username,
        verificationCode,
      });
    } catch (error) {
      throw new Error('Verification failed: ' + error.message);
    }
  },

  register: async (username, password, phone, email) => {
    try {
      return await axios.post(`${API_URL}/auth/register`, {
        username,
        password,
        phone,
        email,
      });
    } catch (error) {
      throw new Error('Registration failed: ' + error.message);
    }
  },

  deleteAccount: async () => {
    try {
      const token = localStorage.getItem('token');
      return await axios.delete(`${API_URL}/auth/exclude`, {
        headers: {
          Authorization: token, // Inclui o token de autenticação
        },
      });
    } catch (error) {
      throw new Error('Account deletion failed: ' + error.message);
    }
  },

  // Adicione outros métodos conforme necessário
};

export default apiService;
