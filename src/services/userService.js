// filepath: /frontend/src/services/userService.js
import api from './api';

export const registerUser = async (userData) => {
  const response = await api.post('/users/register', userData);
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await api.post('/users/login', userData);
  return response.data;
};

export const verifyOTP = async (verifyData) => {
  const response = await api.post('/users/verify-otp', verifyData);
  return response.data;
};

export const verifySetup = async (setupData) => {
  const response = await api.post('/users/verify-setup', setupData);
  return response.data;
};

export const updateUser = async (userId, userData) => {
  const response = await api.put(`/users/update/${userId}`, userData);
  return response.data;
};

