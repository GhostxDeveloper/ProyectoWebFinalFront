import React, { useState } from 'react';
import './Registro.css';
import userIcon from '../../assets/3d-user-icon-on-transparent-background-free-png.webp';
import { registerUser } from '../../services/userService';

const Register = () => {
  const [formData, setFormData] = useState({
    nombre_usuario: '',
    apellidos: '',
    correo_electronico: '',
    contrasena: '',
    confirmar_contrasena: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { nombre_usuario, apellidos, correo_electronico, contrasena, confirmar_contrasena } = formData;

    if (contrasena !== confirmar_contrasena) {
      alert('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await registerUser({ nombre_usuario, apellidos, correo_electronico, contrasena });
      console.log('Respuesta del servidor:', response);

      if (response.id) {
        alert('Usuario registrado correctamente');
        setFormData({
          nombre_usuario: '',
          apellidos: '',
          correo_electronico: '',
          contrasena: '',
          confirmar_contrasena: '',
        });
      } else {
        alert('Error al registrar usuario');
      }
    } catch (error) {
      console.error(error);
      alert('Error al conectar con el servidor');
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <img
          src={userIcon}
          alt="User Icon"
          className="register-icon"
        />
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <span className="icon">👤</span>
            <input
              type="text"
              name="nombre_usuario"
              placeholder="Nombre de usuario"
              value={formData.nombre_usuario}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <span className="icon">👤</span>
            <input
              type="text"
              name="apellidos"
              placeholder="Apellidos"
              value={formData.apellidos}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <span className="icon">📧</span>
            <input
              type="email"
              name="correo_electronico"
              placeholder="Correo electrónico"
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
          <div className="input-group">
            <span className="icon">🔒</span>
            <input
              type="password"
              name="confirmar_contrasena"
              placeholder="Confirmar Contraseña"
              value={formData.confirmar_contrasena}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="register-button">
            Registrarse
          </button>
        </form>
        <p className="register-text">
          ¿Ya tienes cuenta? <a href="/">Iniciar sesión</a>
        </p>
      </div>
    </div>
  );
};

export default Register;