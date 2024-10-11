const initialState = {
  user: null,
  error: null,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_LOGIN_SUCCESS': // Renomeado para evitar conflitos
      return { ...state, user: action.payload, error: null };
    case 'USER_LOGIN_FAILURE': // Renomeado para evitar conflitos
      return {
        ...state,
        error: action.payload.response
          ? action.payload.response.data
          : action.payload,
      };
    default:
      return state;
  }
};

export default loginReducer;
