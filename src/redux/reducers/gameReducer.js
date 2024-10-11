import {
  SAVE_RECORD_REQUEST,
  SAVE_RECORD_SUCCESS,
  SAVE_RECORD_FAILURE,
  FETCH_RECORD_REQUEST,
  FETCH_RECORD_SUCCESS,
  FETCH_RECORD_FAILURE,
} from '../actions/gameActions';

const initialState = {
  record: 500,
  loading: false,
  error: null,
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    // Para salvar o recorde
    case SAVE_RECORD_REQUEST:
      return { ...state, loading: true, error: null };
    case SAVE_RECORD_SUCCESS:
      return { ...state, loading: false, record: action.payload }; // Aqui você pode atualizar o recorde
    case SAVE_RECORD_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // Para buscar o recorde
    case FETCH_RECORD_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_RECORD_SUCCESS:
      return { ...state, loading: false, record: action.payload }; // Atualiza o recorde buscado
    case FETCH_RECORD_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default gameReducer;
