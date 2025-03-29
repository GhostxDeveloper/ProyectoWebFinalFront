import React, { useState } from 'react';
import { 
  Form, 
  Input, 
  Button, 
  Card, 
  Typography, 
  message, 
  Avatar, 
  Space,
  Steps,
  Result,
  Modal,
  Checkbox
} from 'antd';
import { 
  UserOutlined, 
  MailOutlined, 
  LockOutlined, 
  QrcodeOutlined,
  CheckCircleOutlined,
  SafetyOutlined,
  LoginOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  PictureOutlined

} from '@ant-design/icons';
import { QRCodeSVG } from 'qrcode.react';
import { registerUser } from '../../services/userService';

// Predefined user avatars (replace with your actual avatar image paths)
const userAvatars = [
  'https://randomuser.me/api/portraits/men/1.jpg',
  'https://randomuser.me/api/portraits/women/2.jpg',
  'https://randomuser.me/api/portraits/men/3.jpg',
  'https://randomuser.me/api/portraits/women/4.jpg',
  'https://randomuser.me/api/portraits/men/5.jpg',
  'https://randomuser.me/api/portraits/women/6.jpg',
  'https://randomuser.me/api/portraits/men/7.jpg',
  'https://randomuser.me/api/portraits/women/8.jpg',
  'https://randomuser.me/api/portraits/men/9.jpg',
  'https://randomuser.me/api/portraits/women/10.jpg',
  'https://randomuser.me/api/portraits/men/11.jpg',
  'https://randomuser.me/api/portraits/women/12.jpg',
  'https://randomuser.me/api/portraits/men/13.jpg',
  'https://randomuser.me/api/portraits/women/14.jpg',
  'https://randomuser.me/api/portraits/men/15.jpg',
  'https://randomuser.me/api/portraits/women/16.jpg',
  'https://randomuser.me/api/portraits/men/17.jpg',
  'https://randomuser.me/api/portraits/women/18.jpg',
  'https://randomuser.me/api/portraits/men/19.jpg',
  'https://randomuser.me/api/portraits/women/20.jpg',
  'https://randomuser.me/api/portraits/men/21.jpg',
  'https://randomuser.me/api/portraits/women/22.jpg',
  'https://randomuser.me/api/portraits/men/23.jpg',
  'https://randomuser.me/api/portraits/women/24.jpg',
  'https://randomuser.me/api/portraits/men/25.jpg',
  'https://randomuser.me/api/portraits/women/26.jpg',
  'https://randomuser.me/api/portraits/men/27.jpg',
  'https://randomuser.me/api/portraits/women/28.jpg',
  'https://randomuser.me/api/portraits/men/29.jpg',
  'https://randomuser.me/api/portraits/women/30.jpg' 
];

const { Title, Text, Link } = Typography;
const { Step } = Steps;

const Register = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState('register');
  const [secretUrl, setSecretUrl] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(userAvatars[0]);

  const [isAvatarModalVisible, setIsAvatarModalVisible] = useState(false);
  const [qrScanned, setQrScanned] = useState(false);

  const onFinish = async (values) => {
    const { nombre_usuario, telefono, correo_electronico, contrasena, confirmar_contrasena } = values;
    
    if (contrasena !== confirmar_contrasena) {
      message.error('Las contraseñas no coinciden');
      return;
    }
    
    // This check is now redundant since we set a default avatar, 
    // but kept for potential future modifications
    if (!selectedAvatar) {
      message.error('Por favor selecciona un avatar');
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await registerUser({ 
        nombre_usuario, 
        telefono,
        correo_electronico, 
        contrasena,
        avatar: selectedAvatar
      });
      
      if (response.id && response.secret) {
        setSecretUrl(response.secret);
        setStep('qr');
        message.success('¡Usuario registrado correctamente!');
      } else {
        message.error('Error al registrar usuario');
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data) {
        message.error(error.response.data.error || 'Error al registrar usuario');
      } else {
        message.error('Error al conectar con el servidor');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarSelect = (avatar) => {
    setSelectedAvatar(avatar);
    setIsAvatarModalVisible(false);
  };

  const handleContinue = () => {
    if (!qrScanned) {
      message.error('Por favor, escanea el código QR con Google Authenticator antes de continuar');
      return;
    }

    message.success('Configuración de autenticación de dos factores completada');
    setTimeout(() => {
      window.location.href = '/';
    }, 1500);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      padding: '20px'
    }}>
      <Card 
        style={{ 
          width: '100%', 
          maxWidth: '500px',
          borderRadius: '15px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
          overflow: 'hidden',
        }}
        bodyStyle={{ padding: '30px' }}
      >
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          marginBottom: '20px' 
        }}>
          <Avatar 
            src={selectedAvatar}
            onClick={() => setIsAvatarModalVisible(true)}
            size={100} 
            style={{ 
              border: '4px solid #4a00e0',
              boxShadow: '0 8px 16px rgba(74, 0, 224, 0.3)',
              cursor: 'pointer'
            }} 
          />
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            marginTop: '8px', 
            color: '#4a00e0' 
          }}>
            <PictureOutlined style={{ marginRight: '8px' }} />
            <Text type="secondary">Haz clic para seleccionar un avatar</Text>
          </div>
          <Title level={2} style={{ marginTop: '16px', marginBottom: '4px', color: '#4a00e0' }}>
            {step === 'register' ? 'Crear Cuenta' : 'Configurar 2FA'}
          </Title>
        </div>

        <Modal
          title="Selecciona tu Avatar"
          open={isAvatarModalVisible}
          onCancel={() => setIsAvatarModalVisible(false)}
          footer={null}
        >
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            flexWrap: 'wrap', 
            gap: '16px' 
          }}>
            {userAvatars.map((avatar, index) => (
              <Avatar 
                key={index} 
                src={avatar}
                size={64} 
                onClick={() => handleAvatarSelect(avatar)}
                style={{ 
                  cursor: 'pointer', 
                  border: selectedAvatar === avatar ? '2px solid #4a00e0' : 'none',
                  transform: selectedAvatar === avatar ? 'scale(1.1)' : 'scale(1)',
                  transition: 'transform 0.2s'
                }}
              />
            ))}
          </div>
        </Modal>

        <Steps 
          current={step === 'register' ? 0 : 1} 
          style={{ marginBottom: '24px' }}
          items={[
            {
              title: 'Registro',
              icon: <UserOutlined />
            },
            {
              title: 'Seguridad 2FA',
              icon: <SafetyOutlined />
            }
          ]}
        />

        {step === 'register' && (
          <>
            <Form
              form={form}
              name="register"
              layout="vertical"
              onFinish={onFinish}
              requiredMark={false}
              size="large"
            >
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <Form.Item
                  name="nombre_usuario"
                  rules={[{ required: true, message: 'Por favor ingresa tu nombre de usuario' }]}
                >
                  <Input 
                    prefix={<UserOutlined />} 
                    placeholder="Nombre de usuario" 
                    style={{ borderRadius: '8px' }}
                  />
                </Form.Item>
                
                <Form.Item
                  name="telefono"
                  rules={[
                    { required: true, message: 'Por favor ingresa tu número de teléfono' },
                    { 
                      pattern: /^[0-9]{10}$/, 
                      message: 'Por favor ingresa un número de teléfono válido (10 dígitos)' 
                    }
                  ]}
                >
                  <Input 
                    prefix={<PhoneOutlined />} 
                    placeholder="Número de teléfono" 
                    style={{ borderRadius: '8px' }}
                  />
                </Form.Item>
                
                <Form.Item
                  name="correo_electronico"
                  rules={[
                    { required: true, message: 'Por favor ingresa tu correo electrónico' },
                    { type: 'email', message: 'Correo electrónico inválido' }
                  ]}
                >
                  <Input 
                    prefix={<MailOutlined />} 
                    placeholder="Correo electrónico" 
                    style={{ borderRadius: '8px' }}
                  />
                </Form.Item>
                
                <Form.Item
                  name="contrasena"
                  rules={[
                    { required: true, message: 'Por favor ingresa tu contraseña' },
                    { min: 6, message: 'La contraseña debe tener al menos 6 caracteres' }
                  ]}
                >
                  <Input.Password 
                    prefix={<LockOutlined />} 
                    placeholder="Contraseña" 
                    style={{ borderRadius: '8px' }}
                  />
                </Form.Item>
                
                <Form.Item
                  name="confirmar_contrasena"
                  rules={[
                    { required: true, message: 'Por favor confirma tu contraseña' },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('contrasena') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('Las contraseñas no coinciden'));
                      },
                    }),
                  ]}
                >
                  <Input.Password 
                    prefix={<LockOutlined />} 
                    placeholder="Confirmar Contraseña" 
                    style={{ borderRadius: '8px' }}
                  />
                </Form.Item>
              </Space>

              <Form.Item style={{ marginTop: '24px' }}>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  loading={loading}
                  style={{ 
                    width: '100%', 
                    height: '50px',
                    borderRadius: '8px',
                    background: 'linear-gradient(90deg, #4a00e0 0%, #8e2de2 100%)',
                    border: 'none',
                    boxShadow: '0 8px 16px rgba(74, 0, 224, 0.3)',
                    fontSize: '16px'
                  }}
                  icon={<CheckCircleOutlined />}
                >
                  Registrarse
                </Button>
              </Form.Item>
            </Form>
            
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <Text type="secondary">
                ¿Ya tienes cuenta? <Link href="/" strong>Iniciar sesión</Link>
              </Text>
            </div>
          </>
        )}
        
        {step === 'qr' && (
          <div style={{ textAlign: 'center' }}>
            <Result
              icon={<QrcodeOutlined style={{ color: '#4a00e0' }} />}
              title="Configura la autenticación de dos factores"
              subTitle="Escanea este código QR con Google Authenticator o cualquier app compatible"
              style={{ padding: '0' }}
            />
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              margin: '20px 0',
              background: 'white',
              padding: '16px',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
            }}>
              <QRCodeSVG value={secretUrl} size={200} />
            </div>
            
            <Card 
              style={{ marginBottom: '24px', borderRadius: '8px' }}
              title="Instrucciones"
              headStyle={{ background: '#f0f0f0', borderRadius: '8px 8px 0 0' }}
            >
              <Space direction="vertical" align="start" style={{ width: '100%' }}>
                <Text>1. Descarga Google Authenticator en tu dispositivo móvil</Text>
                <Text>2. Escanea el código QR con la aplicación</Text>
                <Text>3. Guarda esta configuración para usar durante el inicio de sesión</Text>
              </Space>
            </Card>
            
            <div style={{ marginBottom: '20px' }}>
              <Checkbox 
                checked={qrScanned}
                onChange={(e) => setQrScanned(e.target.checked)}
              >
                He escaneado el código QR con Google Authenticator
              </Checkbox>
            </div>
            
            <Button 
              type="primary" 
              onClick={handleContinue}
              style={{ 
                width: '100%', 
                height: '50px',
                borderRadius: '8px',
                background: 'linear-gradient(90deg, #4a00e0 0%, #8e2de2 100%)',
                border: 'none',
                boxShadow: '0 8px 16px rgba(74, 0, 224, 0.3)',
                fontSize: '16px'
              }}
              icon={<LoginOutlined />}
              disabled={!qrScanned}
            >
              Continuar al inicio de sesión
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Register;