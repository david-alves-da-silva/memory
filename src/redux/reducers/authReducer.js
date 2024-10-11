const initialState = {
  token: null,
  username: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      // Verifica se o payload contém o token e o username
      return {
        ...state,
        token: action.payload.token || state.token, // Mantém o token atual se não estiver presente
        username: action.payload.username || state.username, // Mantém o username atual se não estiver presente
        error: null,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        token: null,
        username: null, // Limpa o nome de usuário no logout
      };
    default:
      return state;
  }
};

export default authReducer;
