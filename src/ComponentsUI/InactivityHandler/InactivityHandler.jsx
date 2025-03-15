import React, { useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const InactivityHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    alert('Sesión cerrada por inactividad');
    navigate('/');
  }, [navigate]);

  useEffect(() => {
    let timeout;

    const resetTimeout = () => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(logout, 600000); // 1 minuto de inactividad
    };

    const checkTokenExpiration = () => {
      const tokenExpiration = localStorage.getItem('tokenExpiration');
      if (tokenExpiration && new Date(tokenExpiration) <= new Date()) {
        logout();
      }
    };

    const events = ['load', 'mousemove', 'mousedown', 'click', 'scroll', 'keypress'];

    if (location.pathname !== '/' && location.pathname !== '/Registro') {
      events.forEach(event => {
        window.addEventListener(event, resetTimeout);
      });

      resetTimeout(); // Inicializa el timeout

      const interval = setInterval(checkTokenExpiration, 1000); // Verificar cada segundo

      return () => {
        if (timeout) clearTimeout(timeout);
        clearInterval(interval);
        events.forEach(event => {
          window.removeEventListener(event, resetTimeout);
        });
      };
    }
  }, [logout, location.pathname]);

  return null;
};

export default InactivityHandler;