// loginAction.js
export const loginUser = (username, password) => ({
  type: 'LOGIN_REQUEST', // Ação que será escutada pela saga
  payload: { username, password }, // Passa os dados do login
});
