import React from 'react';
import { useRoutes } from 'react-router-dom';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Login/Login';
import Registro from '../Pages/Registro/Registro';
import Profile from '../Pages/Profile/Profile';
import ProtectedRoute from '../ComponentsUI/ProtectedRoutes/ProtectedRoutes';
import Recetas from '../Pages/Recipies/Recipies';
import Contact from '../Pages/Contact/Contact';

const AppRoutes = () => {
  let routes = useRoutes([
    { path: '/', element: <Login /> },
    { path: '/Registro', element: <Registro /> },
    {
      path: '/Home',
      element: (
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      ),
    },

    {
      path: '/Perfil',
      element: (
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      ),
    },
    {
      path: '/Recetas',
      element: (
        <ProtectedRoute>
          <Recetas />
        </ProtectedRoute>
      ),
    },

    {
      path: '/Contact',
      element: (
        <ProtectedRoute>
          <Contact />
        </ProtectedRoute>
      ),
    }
  ]);

  return routes;
};

export default AppRoutes;