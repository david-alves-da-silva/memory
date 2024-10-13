import {
  SAVE_RECORD_REQUEST,
  SAVE_RECORD_SUCCESS,
  SAVE_RECORD_FAILURE,
  FETCH_RECORD_REQUEST,
  FETCH_RECORD_SUCCESS,
  FETCH_RECORD_FAILURE,
} from '../actions/gameActions';

const initialState = {
  record: null,
  loading: false,
  error: null,
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_RECORD_REQUEST:
      return { ...state, loading: true, error: null };
    case SAVE_RECORD_SUCCESS:
      return { ...state, loading: false, record: action.payload };
    case SAVE_RECORD_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case FETCH_RECORD_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_RECORD_SUCCESS:
      return { ...state, loading: false, record: action.payload };
    case FETCH_RECORD_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default gameReducer;
