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
import { Layout, Input, Menu, Button, Drawer, Badge, Avatar, Tooltip } from "antd";
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
  const menuItems = [
    {
      key: "/home",
      icon: <HomeOutlined />,
      label: <Link to="/home">Inicio</Link>,
    },
    {
      key: "/Perfil",
      icon: <UserOutlined />,
      label: <Link to="/Perfil">Perfil</Link>,
    },
    {
      key: "/favorites",
      icon: <HeartOutlined />,
      label: (
        <Link to="/favorites">
          <Badge count={5} size="small">Favoritos</Badge>
        </Link>
      ),
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

        <div className="search-container">
          <Search
            placeholder="Buscar una receta..."
            allowClear
            enterButton={<SearchOutlined />}
            size="large"
            className="search-input"
          />
        </div>
        <Menu
          className="desktop-menu"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }) => {
          }}
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
          <Link to="/logout" className="logout-button">
            <LogoutOutlined className="logout-icon" />
          </Link>
        </Tooltip>
      </Header>
    </Layout>
  );
};

export default Nav;
