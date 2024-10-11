import { call, put, takeLatest } from 'redux-saga/effects';
import apiService from '../../services/apiService';
import {
  FETCH_RECORD_REQUEST,
  SAVE_RECORD_REQUEST,
  fetchRecordSuccess,
  fetchRecordFailure,
  saveRecordSuccess,
  saveRecordFailure,
} from '../actions/gameActions';

// Saga para buscar o recorde
function* fetchRecordSaga(action) {
  try {
    const response = yield call(
      apiService.fetchRecord,
      action.payload.username,
    );
    yield put(fetchRecordSuccess(response.data.record)); // Sucesso ao buscar recorde
  } catch (error) {
    yield put(fetchRecordFailure(error.message)); // Erro ao buscar recorde
  }
}

// Saga para salvar o recorde
function* saveRecordSaga(action) {
  try {
    const { username, time } = action.payload;
    const response = yield call(apiService.saveRecord, username, time);
    yield put(saveRecordSuccess(response.data.record)); // Sucesso ao salvar recorde
  } catch (error) {
    yield put(saveRecordFailure(error.message)); // Erro ao salvar recorde
  }
}

export function* watchGameSagas() {
  yield takeLatest(FETCH_RECORD_REQUEST, fetchRecordSaga);
  yield takeLatest(SAVE_RECORD_REQUEST, saveRecordSaga);
}
