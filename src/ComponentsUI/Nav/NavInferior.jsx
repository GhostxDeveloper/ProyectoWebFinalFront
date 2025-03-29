import React, { useState } from 'react';
import { Layout, Button, Modal, Typography } from 'antd';
import { 
  FacebookFilled, 
  WhatsAppOutlined, 
  InstagramFilled,
  FileProtectOutlined,
  ContactsOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';

const { Footer } = Layout;
const { Title } = Typography;

const NavInferior = () => {
  const [politicasModalVisible, setPoliticasModalVisible] = useState(false);
  const [privacidadModalVisible, setPrivacidadModalVisible] = useState(false);
  const [contactoModalVisible, setContactoModalVisible] = useState(false);

  const handleOpenModal = (setModalVisible) => {
    setModalVisible(true);
  };

  const handleCloseModal = (setModalVisible) => {
    setModalVisible(false);
  };

  // Styling for modal content sections
  const sectionStyle = {
    background: 'white',
    borderLeft: '4px solid #4CAF50',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    marginBottom: '15px'
  };

  const listItemStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '8px'
  };

  const checkmarkStyle = {
    marginRight: '10px',
    color: '#4CAF50',
    fontSize: '20px'
  };

  return (
    <Footer 
      style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '10px 20px',
        background: 'linear-gradient(to bottom, #A3CADB, #D1E9E2)'
      }}
    >
      {/* Sección Izquierda - Redes Sociales */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h3 style={{ marginRight: '15px', fontWeight: 'bold' }}>Cooking With Love</h3>
        <div>
          <Button
            type="text"
            shape="circle"
            icon={<FacebookFilled style={{ fontSize: '24px', color: 'blue' }} />}
            size="large"
            onClick={() => window.open('https://www.facebook.com/share/1B8rBiSGqL/', '_blank')}
          />
          <Button
            type="text"
            shape="circle"
            icon={<WhatsAppOutlined style={{ fontSize: '24px', color: 'green' }} />}
            size="large"
            onClick={() => window.open('https://whatsapp.com/channel/0029VbA8WLBJpe8fBasnpo11', '_blank')}
          />
          <Button
            type="text"
            shape="circle"
            icon={<InstagramFilled style={{ fontSize: '24px', color: '#E1306C' }} />}
            size="large"
            onClick={() => window.open('https://www.instagram.com/crx_xzx?igsh=MXQwMW53MDFna2psZg==', '_blank')}
          />
        </div>
      </div>

      {/* Sección Derecha - Información Legal */}
      <div style={{ display: 'flex', gap: '15px' }}>
        <Button 
          type="link" 
          icon={<FileProtectOutlined />}
          onClick={() => handleOpenModal(setPoliticasModalVisible)}
        >
          Políticas de Uso
        </Button>
        <Button 
          type="link" 
          icon={<InfoCircleOutlined />}
          onClick={() => handleOpenModal(setPrivacidadModalVisible)}
        >
          Aviso de Privacidad
        </Button>
        <Button 
          type="link" 
          icon={<ContactsOutlined />}
          onClick={() => handleOpenModal(setContactoModalVisible)}
        >
          Contacto
        </Button>
      </div>

      {/* Modal de Políticas de Uso */}
      <Modal
        title="Políticas de Uso de Cooking With Love"
        open={politicasModalVisible}
        onCancel={() => handleCloseModal(setPoliticasModalVisible)}
        footer={null}
        width={600}
      >
        <div style={{
          background: 'linear-gradient(to bottom right, #f5f7fa, #e9ecef)',
          borderRadius: '12px',
          padding: '20px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <Title level={4} style={{ 
            color: '#2c3e50', 
            borderBottom: '2px solid #4CAF50', 
            paddingBottom: '10px',
            marginBottom: '20px'
          }}>
            Términos y Condiciones
          </Title>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '15px'
          }}>
            <div style={sectionStyle}>
              <Title level={5} style={{ 
                marginBottom: '10px', 
                color: '#2c3e50' 
              }}>
                1. Uso de la Aplicación
              </Title>
              <ul style={{
                listStyleType: 'none',
                padding: 0,
                margin: 0
              }}>
                <li style={listItemStyle}>
                  <span style={checkmarkStyle}>✓</span>
                  La aplicación está destinada a mayores de 13 años.
                </li>
                <li style={listItemStyle}>
                  <span style={checkmarkStyle}>✓</span>
                  Te comprometes a usar la aplicación de manera ética y legal.
                </li>
                <li style={listItemStyle}>
                  <span style={checkmarkStyle}>✓</span>
                  Solo puedes compartir recetas de tu autoría o con los créditos correspondientes.
                </li>
              </ul>
            </div>

            <div style={sectionStyle}>
              <Title level={5} style={{ 
                marginBottom: '10px', 
                color: '#2c3e50' 
              }}>
                2. Contenido de Usuario
              </Title>
              <ul style={{
                listStyleType: 'none',
                padding: 0,
                margin: 0
              }}>
                <li style={listItemStyle}>
                  <span style={checkmarkStyle}>✓</span>
                  Al subir recetas, nos otorgas una licencia no exclusiva para mostrar, modificar y promocionar tu contenido.
                </li>
                <li style={listItemStyle}>
                  <span style={checkmarkStyle}>✓</span>
                  Eres responsable de la originalidad de tus recetas.
                </li>
                <li style={listItemStyle}>
                  <span style={checkmarkStyle}>✓</span>
                  Nos reservamos el derecho de eliminar contenido inapropiado.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Modal>

      {/* Modal de Aviso de Privacidad */}
      <Modal
        title="Aviso de Privacidad de Cooking With Love"
        open={privacidadModalVisible}
        onCancel={() => handleCloseModal(setPrivacidadModalVisible)}
        footer={null}
        width={600}
      >
        <div style={{
          background: 'linear-gradient(to bottom right, #f5f7fa, #e9ecef)',
          borderRadius: '12px',
          padding: '20px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <Title level={4} style={{ 
            color: '#2c3e50', 
            borderBottom: '2px solid #4CAF50', 
            paddingBottom: '10px',
            marginBottom: '20px'
          }}>
            Protección de Datos Personales
          </Title>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '15px'
          }}>
            <div style={sectionStyle}>
              <Title level={5} style={{ 
                marginBottom: '10px', 
                color: '#2c3e50' 
              }}>
                1. Recopilación de Datos
              </Title>
              <ul style={{
                listStyleType: 'none',
                padding: 0,
                margin: 0
              }}>
                <li style={listItemStyle}>
                  <span style={checkmarkStyle}>✓</span>
                  Recopilamos información de registro como nombre, correo electrónico y preferencias culinarias.
                </li>
                <li style={listItemStyle}>
                  <span style={checkmarkStyle}>✓</span>
                  Utilizamos cookies para mejorar tu experiencia de usuario.
                </li>
              </ul>
            </div>

            <div style={sectionStyle}>
              <Title level={5} style={{ 
                marginBottom: '10px', 
                color: '#2c3e50' 
              }}>
                2. Uso de Información
              </Title>
              <ul style={{
                listStyleType: 'none',
                padding: 0,
                margin: 0
              }}>
                <li style={listItemStyle}>
                  <span style={checkmarkStyle}>✓</span>
                  Tus datos se utilizan para personalizar tu experiencia en la app.
                </li>
                <li style={listItemStyle}>
                  <span style={checkmarkStyle}>✓</span>
                  No vendemos ni compartimos información con terceros sin tu consentimiento.
                </li>
                <li style={listItemStyle}>
                  <span style={checkmarkStyle}>✓</span>
                  Puedes solicitar la eliminación de tus datos en cualquier momento.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Modal>

      {/* Modal de Contacto */}
      <Modal
  title="Contacto - Cooking With Love"
  open={contactoModalVisible}
  onCancel={() => handleCloseModal(setContactoModalVisible)}
  footer={null}
  width={600} // Asegúrate de que el ancho sea consistente
>
  <div style={{
    background: 'linear-gradient(to bottom right, #f5f7fa, #e9ecef)',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  }}>
    <Title level={4} style={{ 
      color: '#2c3e50', 
      borderBottom: '2px solid #4CAF50', 
      paddingBottom: '10px',
      marginBottom: '20px'
    }}>
      Contáctanos
    </Title>
    
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
      textAlign: 'center'
    }}>
      <p>
        <strong>Teléfono:</strong> +52 (446) 126-7196
      </p>
      <p>
        <strong>Correo:</strong> Cookwithlove@gmail.com
      </p>
      <p style={{ color: '#666' }}>
        Estamos aquí para ayudarte. No dudes en contactarnos.
      </p>
    </div>
  </div>
</Modal>
    </Footer>
  );
};

export default NavInferior;