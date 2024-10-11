// Ação para disparar a verificação do código
export const VERIFY_CODE_REQUEST = 'VERIFY_CODE_REQUEST'; // Exportando o tipo de ação para evitar erros de digitação

export const verifyCodeRequest = (username, verificationCode) => ({
  type: VERIFY_CODE_REQUEST, // Usando a constante para o tipo de ação
  username,
  verificationCode,
});
