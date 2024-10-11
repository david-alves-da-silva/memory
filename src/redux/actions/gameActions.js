// src/redux/actions/gameActions.js

// Tipos de ações
export const SAVE_RECORD_REQUEST = 'SAVE_RECORD_REQUEST';
export const SAVE_RECORD_SUCCESS = 'SAVE_RECORD_SUCCESS';
export const SAVE_RECORD_FAILURE = 'SAVE_RECORD_FAILURE';
export const FETCH_RECORD_REQUEST = 'FETCH_RECORD_REQUEST';
export const FETCH_RECORD_SUCCESS = 'FETCH_RECORD_SUCCESS';
export const FETCH_RECORD_FAILURE = 'FETCH_RECORD_FAILURE';

// Ação para solicitar a gravação do recorde
export const saveRecordRequest = (username, time) => ({
  type: SAVE_RECORD_REQUEST,
  payload: { username, time }, // Envia o username e o tempo como payload
});

// Ação para indicar que o recorde foi salvo com sucesso
export const saveRecordSuccess = (record) => ({
  type: SAVE_RECORD_SUCCESS,
  payload: record, // Envia o recorde salvo como payload
});

// Ação para indicar que houve um erro ao salvar o recorde
export const saveRecordFailure = (error) => ({
  type: SAVE_RECORD_FAILURE,
  payload: error, // Envia a mensagem de erro como payload
});

// Ação para buscar o recorde
export const fetchRecord = (username) => ({
  type: FETCH_RECORD_REQUEST, // Tipo da ação
  payload: { username },
});

// Ação para indicar que o recorde foi buscado com sucesso
export const fetchRecordSuccess = (record) => ({
  type: FETCH_RECORD_SUCCESS,
  payload: record, // Envia o recorde buscado como payload
});

// Ação para indicar que houve um erro ao buscar o recorde
export const fetchRecordFailure = (error) => ({
  type: FETCH_RECORD_FAILURE,
  payload: error, // Envia a mensagem de erro como payload
});
