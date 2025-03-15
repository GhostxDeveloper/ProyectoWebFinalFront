// src/context/SessionContext.jsx
import React, { createContext, useState, useEffect } from 'react';

// Crear el contexto
const SessionContext = createContext();

// Proveedor del contexto
export const SessionProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Cargar el usuario desde localStorage al montar el componente
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser && storedUser !== 'undefined') {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error al parsear los datos del usuario:', error);
      }
    }
  }, []);

  return (
    <SessionContext.Provider value={{ user, setUser }}>
      {children}
    </SessionContext.Provider>
  );
};

// Exportar el contexto para poder consumirlo
export default SessionContext;
