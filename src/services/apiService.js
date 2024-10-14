import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL; // URL da sua API

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
      if (!token)
        throw new Error('Token não encontrado. Faça login novamente.');
      return await axios.delete(`${API_URL}/auth/exclude`, {
        headers: { Authorization: token },
      });
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          'Erro ao excluir a conta. Tente novamente.',
      );
    }
  },

  saveRecord: async (username, time) => {
    try {
      return await axios.post(`${API_URL}/game/record`, { username, time });
    } catch (error) {
      throw new Error('Erro ao salvar o recorde: ' + error.message);
    }
  },

  fetchRecord: async () => {
    try {
      const response = await axios.get(`${API_URL}/game/record`);
      return response.data.record;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error('Nenhum recorde encontrado.');
      }
      throw new Error('Erro ao buscar o recorde: ' + error.message);
    }
  },
};

export default apiService;
