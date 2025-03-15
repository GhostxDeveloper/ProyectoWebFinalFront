// filepath: /frontend/src/services/api.js

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token de autenticación a cada solicitud
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});


// Interceptor para manejar respuestas y errores
api.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response.status === 401) {
    // Manejar errores de autenticación
    localStorage.removeItem('token');
    window.location.href = '/';
  }
  return Promise.reject(error);
});

export default api;