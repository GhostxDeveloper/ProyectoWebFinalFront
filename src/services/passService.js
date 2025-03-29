import api from './api';


export const requestPasswordReset = async (userData) => {
    const response = await api.post('/pass/request-reset', userData);
    return response.data;
  };
  
  export const verifyResetCode = async (userData) => {
    const response = await api.post('/pass/verify-code', userData);
    return response.data;
  };
  
  export const resetPassword = async (userData) => {
    const response = await api.post('/pass/reset-password', userData);
    return response.data;
  };
  
  export const logFailedAttempt = async (logData) => {
    const response = await api.post('/pass/log-failed-attempt', logData);
    return response.data;
  };
  