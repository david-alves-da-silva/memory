import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

function* verifyCode(action) {
  try {
    const response = yield call(axios.post, `${API_URL}/auth/verify`, {
      username: action.username,
      verificationCode: action.verificationCode,
    });

    if (response.data.token) {
      yield put({ type: 'VERIFICATION_SUCCESS', payload: response.data.token });
    } else {
      yield put({
        type: 'VERIFICATION_FAILURE',
        payload: 'Token not received',
      });
    }
  } catch (error) {
    console.error('Verification error:', error);
    yield put({ type: 'VERIFICATION_FAILURE', payload: error.message });
  }
}

export function* verificationSaga() {
  yield takeLatest('VERIFY_CODE_REQUEST', verifyCode);
}
