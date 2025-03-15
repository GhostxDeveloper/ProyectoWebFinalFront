import React, { useEffect, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import { App as AntdApp } from 'antd';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const { message } = AntdApp.useApp();
  const hasShownMessage = useRef(false); // Usamos un ref para rastrear si el mensaje ya se mostró

  useEffect(() => {
    if (!token && !hasShownMessage.current) {
      message.error('Debes iniciar sesión para acceder a esta ruta');
      hasShownMessage.current = true; // Marcamos que el mensaje ya fue mostrado
    }
  }, [token, message]);

  if (!token) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
