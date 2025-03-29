import React , { useEffect } from 'react';
import { useRoutes , useLocation} from 'react-router-dom';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Login/Login';
import Registro from '../Pages/Registro/Registro';
import Profile from '../Pages/Profile/Profile';
import ProtectedRoute from '../ComponentsUI/ProtectedRoutes/ProtectedRoutes';
import Recetas from '../Pages/Recipies/Recipies';
import Contact from '../Pages/Contact/Contact';
import PasswordRecoveryPage from '../Pages/PasswordRecoveryPage/PasswordRecoveryPage';
import Favorites from '../Pages/Favorites/Favorites';
import { Logout } from '@mui/icons-material';


const AppRoutes = () => {

  const location = useLocation();

  useEffect(() => {
    if (
      location.pathname === '/' || 
      location.pathname === '/Registro' || 
      location.pathname === '/recuperar-contrasena'
    ) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }, [location]);

  const isTokenValid = !!localStorage.getItem('token');



  let routes = useRoutes([
    { path: '/', element: <Login /> },
    { path: '/Registro', element: <Registro />},
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
    },
    {
      path: '/favoritos',
      element: (
        <ProtectedRoute>
          <Favorites />
        </ProtectedRoute>
      ),
    },
    
    {
      path: '/recuperar-contrasena',
      element: (
          <PasswordRecoveryPage />
      ),
    },

    {
      path: '/logout', // Nueva ruta para cerrar sesión
      element: <Logout />,
    },

    
  ]);

  return routes;
};

export default AppRoutes;