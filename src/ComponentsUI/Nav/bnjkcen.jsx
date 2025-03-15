import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  HomeOutlined, 
  UserOutlined, 
  HeartOutlined, 
  BookOutlined, 
  PhoneOutlined, 
  SearchOutlined,
  MenuOutlined,
  LogoutOutlined
} from "@ant-design/icons";
import { Layout, Input, Menu, Button, Drawer, Badge, Tooltip } from "antd";
import "./Nav.css";
import logo from "../../assets/image.png";

const { Header } = Layout;
const { Search } = Input;

const Nav = () => {
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <Layout className="layout">
      <Header className="header">
        <div className="logo-container">
          <Link to="/">
            <img src={logo} alt="logo" className="logo" />
            <span className="title-logo">Cook With Love</span>
          </Link>
        </div>

        <div className="search-container">
          <Search
            placeholder="Buscar una receta..."
            allowClear
            enterButton={<SearchOutlined />}
            size="large"
            className="search-input"
          />
        </div>

        {/* Menú para pantallas grandes - con Link original para mantener funcionalidad */}
        <div className="nav-links desktop-menu">
          <Link to="/home">
            <HomeOutlined className="icon" />
            Inicio
          </Link>
          <Link to="/Perfil">
            <UserOutlined className="icon" />
            Perfil
          </Link>
          <Link to="/favorites">
            <HeartOutlined className="icon" />
            <Badge count={5} size="small" offset={[5, -3]}>
              Favoritos
            </Badge>
          </Link>
          <Link to="/Recetas">
            <BookOutlined className="icon" />
            Recetas
          </Link>
          <Link to="/contact">
            <PhoneOutlined className="icon" />
            Contacto
          </Link>
        </div>

        {/* Botón para mostrar menú en dispositivos móviles */}
        <Button
          className="menu-button"
          type="text"
          icon={<MenuOutlined />}
          onClick={showDrawer}
        />

        {/* Menú desplegable para móviles */}
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
          <div className="mobile-nav-links">
            <Link to="/home" onClick={onClose}>
              <HomeOutlined className="icon" />
              Inicio
            </Link>
            <Link to="/Perfil" onClick={onClose}>
              <UserOutlined className="icon" />
              Perfil
            </Link>
            <Link to="/favorites" onClick={onClose}>
              <HeartOutlined className="icon" />
              <Badge count={5} size="small">
                Favoritos
              </Badge>
            </Link>
            <Link to="/Recetas" onClick={onClose}>
              <BookOutlined className="icon" />
              Recetas
            </Link>
            <Link to="/contact" onClick={onClose}>
              <PhoneOutlined className="icon" />
              Contacto
            </Link>
          </div>
        </Drawer>

        {/* Icono de cerrar sesión con tooltip (reemplazando el Avatar) */}
        <Tooltip title="Cerrar sesión">
          <Link to="/logout" className="logout-button">
            <LogoutOutlined className="logout-icon" />
          </Link>
        </Tooltip>
      </Header>
    </Layout>
  );
};

export default Nav;