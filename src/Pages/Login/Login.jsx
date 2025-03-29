import React, { useState, useEffect } from 'react';
import { 
  Form, 
  Input, 
  Button, 
  Card, 
  Typography, 
  message, 
  Avatar, 
  Space,
  Divider,
  Result
} from 'antd';
import { 
  UserOutlined, 
  MailOutlined, 
  LockOutlined, 
  LoginOutlined,
  KeyOutlined,
  SafetyOutlined
} from '@ant-design/icons';
import userIcon from '../../assets/3d-user-icon-on-transparent-background-free-png.webp';
import { useNavigate } from 'react-router-dom';
import { loginUser, verifyOTP } from '../../services/userService';

const { Title, Text, Link } = Typography;

const Login = () => {
  const [form] = Form.useForm();
  const [otpForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [step, setStep] = useState('login');
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (token && Object.keys(user).length > 0) {
      navigate('/home');
    }
  }, [navigate]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
        const data = await loginUser(values);
        if (data.requiresMFA) {
            setEmail(data.email);
            setStep('otp');
            message.info(data.message || 'Por favor ingresa el código de autenticación de tu aplicación.');
        } else if (data.token) {
            console.log('Datos del usuario recibidos:', data.user);
            
            // Asegurarse de tener todos los campos
            const completeUserData = {
                id: data.user.id,
                email: data.user.email,
                name: data.user.name || 'Usuario',
                phone: data.user.phone || '',
                avatar: data.user.avatar || 'default_avatar_url'
            };

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(completeUserData));
            
            message.success(data.message || 'Inicio de sesión exitoso.');
            navigate('/home');
        } else {
            message.error('No se encontraron los datos del usuario.');
        }
    } catch (error) {
        if (error.response) {
            const { status, data } = error.response;
            if (status === 401) {
                message.error(data.error || 'Credenciales incorrectas. Por favor, verifica tu correo y contraseña.');
            } else if (status === 404) {
                message.error(data.error || 'Usuario no encontrado. Por favor verifica tu correo electrónico.');
            } else if (status === 500) {
                message.error(data.error || 'Error interno del servidor. Por favor intenta más tarde.');
            } else {
                message.error(data.error || `Error inesperado: ${status}`);
            }
        } else {
            message.error('Error de red. Por favor verifica tu conexión.');
        }
    } finally {
        setLoading(false);
    }
};
  
  const onVerifyOTP = async (values) => {
    setVerifyLoading(true);
    try {
      const data = await verifyOTP({
        correo_electronico: email,
        token: values.otp
      });
      if (data.token) {
        // Asegurarse de tener todos los campos
        const completeUserData = {
            id: data.user.id,
            email: data.user.email,
            name: data.user.name || 'Usuario',
            phone: data.user.phone || '',
            avatar: data.user.avatar || 'default_avatar_url'
        };

        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(completeUserData));
        
        message.success(data.message || 'Verificación 2FA exitosa.');
        navigate('/home');
      } else {
        message.error('Error en la verificación OTP.');
      }
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 401) {
          message.error(data.error || 'Código OTP inválido. Por favor verifica e intenta nuevamente.');
        } else if (status === 404) {
          message.error(data.error || 'Usuario no encontrado. Por favor verifica tu correo electrónico.');
        } else if (status === 500) {
          message.error(data.error || 'Error interno del servidor. Por favor intenta más tarde.');
        } else {
          message.error(data.error || `Error inesperado: ${status}`);
        }
      } else {
        message.error('Error de red. Por favor verifica tu conexión.');
      }
    } finally {
      setVerifyLoading(false);
    }
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
          maxWidth: '450px',
          borderRadius: '15px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
          overflow: 'hidden',
          padding: '24px'
        }}
      >
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          marginBottom: '24px' 
        }}>
          <Avatar 
            src={userIcon} 
            size={100} 
            style={{ 
              border: '4px solid #4a00e0',
              boxShadow: '0 8px 16px rgba(74, 0, 224, 0.3)'
            }} 
          />
          <Title level={2} style={{ marginTop: '16px', marginBottom: '4px', color: '#4a00e0' }}>
            {step === 'login' ? 'Iniciar Sesión' : 'Verificación 2FA'}
          </Title>
          <Text type="secondary" style={{ marginBottom: '16px' }}>
            {step === 'login' 
              ? 'Ingresa tus credenciales para acceder' 
              : 'Ingresa el código de tu aplicación de autenticación'}
          </Text>
        </div>

        {step === 'login' && (
          <>
            <Form
              form={form}
              name="login"
              layout="vertical"
              onFinish={onFinish}
              requiredMark={false}
              size="large"
            >
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <Form.Item
                  name="correo_electronico"
                  rules={[
                    { required: true, message: 'Por favor ingresa tu correo electrónico' },
                    { type: 'email', message: 'Formato de correo inválido' }
                  ]}
                >
                  <Input 
                    prefix={<MailOutlined style={{ color: '#4a00e0' }} />} 
                    placeholder="Correo Electrónico" 
                    style={{ borderRadius: '8px' }}
                  />
                </Form.Item>
                
                <Form.Item
                  name="contrasena"
                  rules={[{ required: true, message: 'Por favor ingresa tu contraseña' }]}
                >
                  <Input.Password 
                    prefix={<LockOutlined style={{ color: '#4a00e0' }} />} 
                    placeholder="Contraseña" 
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
                  icon={<LoginOutlined />}
                >
                  Ingresar
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
        
        {step === 'otp' && (
          <>
            <Result
              icon={<SafetyOutlined style={{ color: '#4a00e0' }} />}
              title="Verificación de dos factores"
              subTitle="Ingresa el código de 6 dígitos de tu aplicación autenticadora"
              style={{ padding: '0', marginBottom: '24px' }}
            />
            
            <Form
              form={otpForm}
              name="otpVerification"
              layout="vertical"
              onFinish={onVerifyOTP}
              requiredMark={false}
              size="large"
            >
              <Form.Item
                name="otp"
                rules={[
                  { required: true, message: 'Por favor ingresa el código de autenticación' },
                  { pattern: /^\d{6}$/, message: 'El código debe tener 6 dígitos' }
                ]}
              >
                <Input 
                  prefix={<KeyOutlined style={{ color: '#4a00e0' }} />} 
                  placeholder="Código de autenticación" 
                  style={{ 
                    borderRadius: '8px', 
                    fontSize: '18px', 
                    letterSpacing: '4px', 
                    textAlign: 'center' 
                  }}
                  maxLength={6}
                />
              </Form.Item>

              <Form.Item style={{ marginTop: '24px' }}>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  loading={verifyLoading}
                  style={{ 
                    width: '100%', 
                    height: '50px',
                    borderRadius: '8px',
                    background: 'linear-gradient(90deg, #4a00e0 0%, #8e2de2 100%)',
                    border: 'none',
                    boxShadow: '0 8px 16px rgba(74, 0, 224, 0.3)',
                    fontSize: '16px'
                  }}
                  icon={<SafetyOutlined />}
                >
                  Verificar
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
        
        <Divider style={{ margin: '24px 0 16px' }} />
        
        <div style={{ textAlign: 'center' }}>
          <Space direction="vertical" size="small" style={{ width: '100%' }}>
            <Text type="secondary">
              ¿No tienes cuenta? <Link href="/Registro" strong>Crear Cuenta</Link>
            </Text>
            <Text type="secondary">
              <Link href="/recuperar-contrasena" strong>Recuperar Contraseña</Link>
            </Text>
          </Space>
        </div>
      </Card>
    </div>
  );
};

export default Login;