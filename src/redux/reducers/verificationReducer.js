const initialState = {
  loading: false,
  token: null,
  error: null,
};

const verificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'VERIFY_CODE_REQUEST':
      return { ...state, loading: true, error: null };
    case 'VERIFICATION_SUCCESS':
      return { ...state, loading: false, token: action.payload, error: null };
    case 'VERIFICATION_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload.response
          ? action.payload.response.data
          : action.payload,
      };
    default:
      return state;
  }
};

export default verificationReducer;
