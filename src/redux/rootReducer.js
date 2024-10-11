import { combineReducers } from 'redux';
import authReducer from './reducers/authReducer';
import loginReducer from './reducers/loginReducer'; // Importar o seu reducer de login
import verificationReducer from './reducers/verificationReducer'; // Importar o seu reducer de verificação

const rootReducer = combineReducers({
  auth: authReducer,
  login: loginReducer,
  verification: verificationReducer,
});

export default rootReducer;
