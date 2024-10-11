import { all } from 'redux-saga/effects';
import { authSaga } from './authSaga'; // Importe sua authSaga
import { verificationSaga } from './verificationSaga'; // Importe sua verificationSaga
import { watchGameSagas } from './gameSagas';

export default function* rootSaga() {
  yield all([
    authSaga(), // Inicia a authSaga
    verificationSaga(), // Inicia a verificationSaga
    watchGameSagas(),
  ]);
}
