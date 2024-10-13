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

// Saga para buscar o recorde global
function* fetchRecordSaga() {
  try {
    const record = yield call(apiService.fetchRecord);
    yield put(fetchRecordSuccess(record || 'Ainda não há recorde disponível.'));
  } catch (error) {
    yield put(fetchRecordFailure(error.message || 'Erro ao buscar o recorde.'));
  }
}

// Saga para salvar um novo recorde global
function* saveRecordSaga(action) {
  try {
    const { username, time } = action.payload;
    const response = yield call(apiService.saveRecord, username, time);
    yield put(saveRecordSuccess(response.data.record));
  } catch (error) {
    yield put(saveRecordFailure(error.message));
  }
}

// Watcher para observar as ações de fetch e save
export function* watchGameSagas() {
  yield takeLatest(FETCH_RECORD_REQUEST, fetchRecordSaga);
  yield takeLatest(SAVE_RECORD_REQUEST, saveRecordSaga);
}
