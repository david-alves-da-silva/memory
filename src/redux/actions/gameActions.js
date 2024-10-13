export const SAVE_RECORD_REQUEST = 'SAVE_RECORD_REQUEST';
export const SAVE_RECORD_SUCCESS = 'SAVE_RECORD_SUCCESS';
export const SAVE_RECORD_FAILURE = 'SAVE_RECORD_FAILURE';
export const FETCH_RECORD_REQUEST = 'FETCH_RECORD_REQUEST';
export const FETCH_RECORD_SUCCESS = 'FETCH_RECORD_SUCCESS';
export const FETCH_RECORD_FAILURE = 'FETCH_RECORD_FAILURE';

// Ação para solicitar a gravação do recorde
export const saveRecordRequest = (username, time) => ({
  type: SAVE_RECORD_REQUEST,
  payload: { username, time },
});

// Ação para indicar que o recorde foi salvo com sucesso
export const saveRecordSuccess = (record) => ({
  type: SAVE_RECORD_SUCCESS,
  payload: record,
});

// Ação para indicar erro ao salvar o recorde
export const saveRecordFailure = (error) => ({
  type: SAVE_RECORD_FAILURE,
  payload: error,
});

// Ação para buscar o recorde global
export const fetchRecordRequest = () => ({
  type: FETCH_RECORD_REQUEST,
});

// Ação para indicar sucesso na busca do recorde
export const fetchRecordSuccess = (record) => ({
  type: FETCH_RECORD_SUCCESS,
  payload: record,
});

// Ação para indicar erro ao buscar o recorde
export const fetchRecordFailure = (error) => ({
  type: FETCH_RECORD_FAILURE,
  payload: error,
});
