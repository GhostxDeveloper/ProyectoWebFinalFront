// filepath: /d:/Desarrollo Web Profesional/evaluacion1/src/Views/Login.jsx
import React, { useState, useEffect } from 'react';
import './Login.css';
import userIcon from '../../assets/3d-user-icon-on-transparent-background-free-png.webp';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/userService';

const Login = () => {
  const [formData, setFormData] = useState({
    correo_electronico: '',
    contrasena: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/home');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Datos del formulario:', formData);  // Verifica los datos del formulario
    
    try {
      const data = await loginUser(formData);
      console.log('Respuesta del servidor:', data);  // Verifica la respuesta del servidor
      
      if (data.token) {
        console.log('Token recibido:', data.token);  // Verifica que el token está presente
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        alert('Inicio de sesión exitoso');
        navigate('/home');
      } else {
        alert('No se encontraron los datos del usuario');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);  // Muestra el error completo
      if (error.response) {
        console.log('Respuesta del error:', error.response);  // Muestra la respuesta completa del error
        if (error.response.status === 401) {
          alert('Credenciales incorrectas. Por favor, verifica tu correo y contraseña.');
        } else {
          alert(`Error en la conexión: ${error.response.status}`);
        }
      } else {
        console.error('Error de red o conexión:', error);  // Error de red o de configuración de axios
        alert('Error al conectar con el servidor');
      }
    }
  };
  
  

  return (
    <div className="login-container">
      <div className="login-box">
        <img
          src={userIcon}
          alt="User Icon"
          className="user-icon"
        />
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <span className="icon">📧</span>
            <input
              type="email"
              name="correo_electronico"
              placeholder="Correo Electrónico"
              value={formData.correo_electronico}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <span className="icon">🔒</span>
            <input
              type="password"
              name="contrasena"
              placeholder="Contraseña"
              value={formData.contrasena}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Ingresar
          </button>
        </form>
        <p className="register-text">
          ¿No tienes cuenta? <a href="/Registro">Crear Cuenta</a>
        </p>
      </div>
    </div>
  );
};

export default Login;