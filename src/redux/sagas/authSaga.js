import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL; // Atualize para a URL da sua API

// Função geradora para o login
function* login(action) {
  try {
    // Chamada à API para login
    const response = yield call(
      axios.post,
      `${API_URL}/auth/login`,
      action.payload,
    );

    // Armazena o token e o username no localStorage
    yield call(
      [localStorage, 'setItem'],
      'token',
      `Bearer ${response.data.token}`,
    );
    yield call(
      [localStorage, 'setItem'],
      'username',
      response.data.username, // Armazena o username
    );

    // Despacha a ação de sucesso com os dados do usuário
    yield put({
      type: 'LOGIN_SUCCESS',
      payload: {
        message: 'Login bem-sucedido!',
        token: response.data.token,
        username: response.data.username,
      },
    });

    // Aqui você pode adicionar a lógica para enviar o código de verificação
    // Por exemplo: yield call(sendVerificationCode, response.data.user.email);
  } catch (error) {
    // Despacha a ação de falha em caso de erro
    yield put({
      type: 'LOGIN_FAILURE',
      payload: error.response ? error.response.data : error.message,
    });
  }
}

// Função geradora para o logout
function* logout() {
  localStorage.removeItem('token'); // Remove o token do armazenamento local
  localStorage.removeItem('username'); // Remove o nome do armazenamento local
  yield put({ type: 'LOGOUT_SUCCESS' }); // Ação de sucesso
}

// Função principal da saga de autenticação
export function* authSaga() {
  yield takeEvery('LOGIN_REQUEST', login); // Escuta ações de login
  yield takeEvery('LOGOUT', logout); // Escuta ações de logout
}
