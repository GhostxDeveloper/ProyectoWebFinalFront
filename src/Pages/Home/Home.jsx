import React, { useContext, useEffect, useState } from 'react';
import CarouselComponent from '../../ComponentsUI/Carrusel/CarouselComponent';
import NavInferior from '../../ComponentsUI/Nav/NavInferior';
import NavSuperior from '../../ComponentsUI/Nav/NavSuperior';
import './Home.css';





function Home() {
  const [user, setUser] = useState(null);



  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    console.log('Usuario almacenado:', storedUser);
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
    <div>
      <div className="home-container">
        <NavSuperior />
        <CarouselComponent />
      </div>
      <div className="content-title">
        <h2 className="title-content">
          <strong>¿Qué quieres cocinar hoy?</strong>
        </h2>
      </div>
    </div>
  );
}

export default Home;
