import { legacy_createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer';
import rootSaga from './sagas/rootSaga'; // Importe o rootSaga

const sagaMiddleware = createSagaMiddleware();

const store = legacy_createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware), // Adicione o middleware dos sagas
);

sagaMiddleware.run(rootSaga); // Inicie o rootSaga

export default store;
