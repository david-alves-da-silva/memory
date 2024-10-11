// authAction.js

// Ação para disparar o login
export const loginRequest = (username, password) => ({
  type: 'LOGIN_REQUEST',
  payload: { username, password },
});

// Ação para indicar sucesso no login
export const loginSuccess = (userData) => ({
  type: 'LOGIN_SUCCESS',
  payload: userData,
});

// Ação para indicar falha no login
export const loginFailure = (error) => ({
  type: 'LOGIN_FAILURE',
  payload: error,
});

// Ação para logout
export const logout = () => ({
  type: 'LOGOUT',
});
