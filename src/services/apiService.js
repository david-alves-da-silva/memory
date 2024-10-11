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

  saveRecord: async (username, time) => {
    try {
      console.log('Chamando a API para salvar record:', { username, time });
      const response = await axios.post(`${API_URL}/game/record`, {
        username,
        time,
      });
      console.log('Resposta da API no serviço:', response.data);
      return response;
    } catch (error) {
      console.error('Erro ao salvar recorde:', error.message);
      throw new Error('Erro ao salvar o recorde: ' + error.message);
    }
  },

  fetchRecord: async (username) => {
    try {
      console.log('Buscando recorde para o usuário:', username);
      const response = await axios.get(`${API_URL}/game/record`, {
        params: { username }, // Passando o username como query parameter
      });
      console.log('Resposta da API ao buscar recorde:', response.data);
      return response;
    } catch (error) {
      console.error('Erro ao buscar recorde:', error.message);
      throw new Error('Erro ao buscar o recorde: ' + error.message);
    }
  },

  // Adicione outros métodos conforme necessário
};

export default apiService;
