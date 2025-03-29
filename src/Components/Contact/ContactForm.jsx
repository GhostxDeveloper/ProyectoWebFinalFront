import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, Typography, Divider, Space, Spin, notification } from 'antd';
import {
  UserOutlined,
  MailOutlined,
  FacebookFilled,
  InstagramFilled,
  PhoneFilled,
  WhatsAppOutlined,
} from '@ant-design/icons';
import NavInferior from '../../ComponentsUI/Nav/NavInferior';
import { sendEmail } from '../../services/emailService';

const { Title, Paragraph } = Typography;

const ContactForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [user, setUser] = useState(null);

  // Obtener datos del usuario de localStorage
  useEffect(() => {
    setLoading(true);
    const storedUser = localStorage.getItem('user');
    if (storedUser && storedUser !== 'undefined') {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error al parsear los datos del usuario:', error);
      }
    }
    setLoading(false);
  }, []);

  const handleSubmit = async (formData) => {
    setSending(true);
    try {
      await sendEmail(formData);
      notification.success({
        message: 'Correo enviado',
        description: 'Tu mensaje ha sido enviado exitosamente, nos pondremos en contacto contigo.',
      });
      form.resetFields(); // Limpia los campos del formulario
    } catch (error) {
      notification.error({
        message: 'Error al enviar correo',
        description: 'Hubo un problema al enviar tu mensaje. Inténtalo más tarde.',
      });
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Card
          style={{
            width: '100%',
            maxWidth: '700px',
            borderRadius: '13px',
            overflow: 'hidden',
            boxShadow: '0 10px 30px rgb(214, 158, 158)',
          }}
          bordered={false}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ textAlign: 'center', padding: '10px 0 20px' }}>
              <Title
                level={2}
                style={{
                  marginBottom: '10px',
                  color: '#52c41a',
                  fontSize: '32px',
                  fontWeight: 'bold',
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
                }}
              >
                Contáctanos
              </Title>
              <Paragraph
                type="secondary"
                style={{ fontSize: '16px', color: '#1890ff', fontWeight: 'bold' }}
              >
                Estamos aquí para ayudarte. Envíanos tu mensaje y nos pondremos en contacto contigo en
                breve.
              </Paragraph>
              <Divider style={{ margin: '10px 0' }} />
            </div>

            <Form
              form={form}
              name="contactForm"
              onFinish={handleSubmit}
              layout="vertical"
              initialValues={{
                name: user?.name || user?.username || '',
                email: user?.email || '',
                message: '',
              }}
            >
              <Form.Item
                name="name"
                rules={[{ required: true, message: 'Por favor ingrese su nombre' }]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Nombre"
                  size="large"
                  style={{ borderRadius: '8px' }}
                  readOnly
                />
              </Form.Item>

              <Form.Item
                name="email"
                rules={[
                  { required: true, message: 'Por favor ingrese su correo electrónico' },
                  { type: 'email', message: 'Ingrese un correo electrónico válido' },
                ]}
              >
                <Input
                  prefix={<MailOutlined />}
                  placeholder="Correo electrónico"
                  size="large"
                  style={{ borderRadius: '8px' }}
                  readOnly
                />
              </Form.Item>

              <Form.Item
                name="message"
                rules={[{ required: true, message: 'Por favor ingrese su mensaje' }]}
              >
                <Input.TextArea
                  placeholder="Descripción del problema o sugerencia"
                  size="large"
                  style={{ borderRadius: '8px' }}
                  autoSize={{ minRows: 4, maxRows: 6 }}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  style={{
                    width: '100%',
                    borderRadius: '8px',
                    background: '#4CAF50',
                    borderColor: '#4CAF50',
                  }}
                  disabled={sending}
                >
                  {sending ? <Spin /> : 'Enviar mensaje'}
                </Button>
              </Form.Item>
            </Form>

            {/* Contact Information and Social Media */}
            <div
              style={{
                flex: '1 1 300px',
                backgroundColor: '#f0f5ff',
                padding: '20px',
                borderRadius: '10px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <Title level={4}>Información de contacto</Title>
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <PhoneFilled style={{ fontSize: '18px', color: '#1890ff' }} />
                    <span>+52 (446) 126-7196</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <MailOutlined style={{ fontSize: '18px', color: '#1890ff' }} />
                    <span>Cookwithlove@gmail.com</span>
                  </div>
                </Space>
              </div>

              <div>
                <Divider plain>Síguenos en redes sociales</Divider>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    padding: '10px 0',
                    marginTop: '20px',
                  }}
                >
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
            </div>
          </div>
        </Card>
      </div>
      <NavInferior />
    </div>
  );
};

export default ContactForm;
