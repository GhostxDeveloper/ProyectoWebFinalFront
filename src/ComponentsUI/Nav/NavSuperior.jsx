import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  HomeOutlined, 
  UserOutlined, 
  HeartOutlined, 
  BookOutlined, 
  PhoneOutlined, 
  MenuOutlined, 
  LogoutOutlined 
} from "@ant-design/icons";
import { Layout, Input, Menu, Button, Drawer, Badge, Tooltip, Modal } from "antd";
import { WiDaySunny, WiCloud, WiRain, WiSnow } from "react-icons/wi"; // Importar íconos del clima
import axios from "axios";
import "./Nav.css";
import logo from "../../assets/image.png";

const { Header } = Layout;
const { Search } = Input;

const Nav = ({ onSearchChange }) => {
  const [visible, setVisible] = useState(false);
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [time, setTime] = useState(""); // Estado para la hora
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false); // Estado para el modal de confirmación
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          "https://api.openweathermap.org/data/2.5/weather",
          {
            params: {
              lat: import.meta.env.VITE_WEATHER_LAT, 
              lon: import.meta.env.VITE_WEATHER_LON, 
              appid: import.meta.env.VITE_WEATHER_API_KEY,
              units: "metric",
              lang: "es",
            },
          }
        );
        setWeather(response.data);
      } catch (err) {
        console.error('Error completo:', err.response ? err.response.data : err.message);
        setError(`Error al obtener el clima: ${err.message}`);
      }
    };
  
    fetchWeather();
  }, []);

  useEffect(() => {
    // Actualizar la hora cada segundo
    const interval = setInterval(() => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString("es-MX", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setTime(formattedTime);
    }, 1000);

    return () => clearInterval(interval); // Limpiar el intervalo al desmontar
  }, []);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const showLogoutModal = () => {
    setIsLogoutModalVisible(true);
  };

  const handleLogout = () => {
    // Eliminar datos de la sesión
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLogoutModalVisible(false);
    navigate('/'); // Redirigir al usuario
  };

  const handleCancelLogout = () => {
    setIsLogoutModalVisible(false);
  };

  // Función para obtener el ícono del clima
  const getWeatherIcon = (description) => {
    if (description.includes("clear")) return <WiDaySunny className="weather-icon sunny" />;
    if (description.includes("cloud")) return <WiCloud className="weather-icon cloudy" />;
    if (description.includes("rain")) return <WiRain className="weather-icon rainy" />;
    if (description.includes("snow")) return <WiSnow className="weather-icon snowy" />;
    return <WiCloud className="weather-icon default" />;
  };

  const menuItems = [
    {
      key: "/home",
      icon: <HomeOutlined />,
      label: <Link to="/home">Inicio</Link>,
      style: { marginLeft: "auto" },
    },
    {
      key: "/Perfil",
      icon: <UserOutlined />,
      label: <Link to="/Perfil">Perfil</Link>,
    },
    {
      key: "/favorites",
      icon: <HeartOutlined />,
      label:<Link to="/favoritos"> Favoritos</Link>
    },
    
    {
      key: "/Recetas",
      icon: <BookOutlined />,
      label: <Link to="/Recetas">Recetas</Link>,
    },
    {
      key: "/contact",
      icon: <PhoneOutlined />,
      label: <Link to="/Contact">Contacto</Link>,
    },
  ];

  return (
    <Layout className="layout">
      <Header className="header">
        <div className="logo-container">
          <Link to="/">
            <img src={logo} alt="logo" className="logo" />
            <span className="title-logo">Cook With Love</span>
          </Link>
        </div>

        {/* Mostrar clima y hora */}
        <div className="weather-info">
          {error ? (
            <p>{error}</p>
          ) : weather ? (
            <div className="weather-display">
              {getWeatherIcon(weather.weather[0].description)}
              <p>{weather.main.temp}°C</p>
            </div>
          ) : (
            <p>Cargando clima...</p>
          )}
          <div className="time-display">
            <p>{time}</p>
          </div>
        </div>

        {location.pathname === "/home" && (
          <div className="search-container">
            <Search
              placeholder="Buscar una receta..."
              allowClear
              size="large"
              className="search-input"
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        )}

        <Menu
          className="desktop-menu"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={menuItems}
        />

        <Button
          className="menu-button"
          type="text"
          icon={<MenuOutlined />}
          onClick={showDrawer}
        />
        <Drawer
          title={
            <div className="drawer-title">
              <img src={logo} alt="logo" className="drawer-logo" />
              <span>Cook With Love</span>
            </div>
          }
          placement="right"
          onClose={onClose}
          open={visible}
          className="mobile-drawer"
        >
          <Menu
            mode="vertical"
            selectedKeys={[location.pathname]}
            items={menuItems}
            onClick={({ key }) => {
              setVisible(false);
            }}
          />
        </Drawer>

        <Tooltip title="Cerrar sesión">
          <Button
            className="logout-button"
            type="text"
            icon={<LogoutOutlined className="logout-icon" />}
            onClick={showLogoutModal}
          />
        </Tooltip>
      </Header>

      {/* Modal de confirmación para cerrar sesión */}
      <Modal
        title="Confirmar cierre de sesión"
        visible={isLogoutModalVisible}
        onOk={handleLogout}
        onCancel={handleCancelLogout}
        okText="Sí, cerrar sesión"
        cancelText="Cancelar"
      >
        <p>¿Estás seguro de que deseas cerrar sesión?</p>
      </Modal>
    </Layout>
  );
};

export default Nav;