import React, { useState, useEffect } from 'react';
import { Layout, Card, Avatar, Typography, Divider, Row, Col, Statistic, Button, Modal, Form, Input, message,Tag,Tabs
} from 'antd';
import { UserOutlined, EditOutlined, MailOutlined, PhoneOutlined, HeartOutlined, BookOutlined,InstagramOutlined
} from '@ant-design/icons';
import NavSuperior from '../../ComponentsUI/Nav/NavSuperior';
import { updateUser } from '../../services/userService';
import { getRecipes } from '../../services/recipeService';
import NavInferior from '../../ComponentsUI/Nav/NavInferior';

// Predefined user avatars
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

const { Content } = Layout;
const { Title } = Typography;

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    id: '',
    name: 'Usuario',
    email: '',
    phone: '',
    avatar: 'https://i.pravatar.cc/150?img=5',
    stats: {
      recipes: 0,
      likes: 0
    },
    socialMedia: {
      instagram: 'No disponible'
    }
  });
  const [recipes, setRecipes] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAvatarModalVisible, setIsAvatarModalVisible] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserData((prev) => ({
          ...prev,
          id: parsedUser.id,
          name: parsedUser.name,
          email: parsedUser.email,
          phone: parsedUser.phone,
          avatar: parsedUser.avatar,
        }));
  
        // Llama a fetchRecipes con el ID del usuario
        fetchRecipes(parsedUser.id);
      } catch (error) {
        console.error('Error al cargar el usuario:', error);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const fetchRecipes = async (userId) => {
    try {
      setLoading(true);
      const data = await getRecipes(userId);
      setRecipes(data);
    } catch (error) {
      console.error('Error al obtener las recetas:', error);
      message.error('No se pudieron cargar las recetas.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditProfile = () => {
    setIsModalVisible(true);
    form.setFieldsValue({
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
    });
    setSelectedAvatar(userData.avatar);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSaveProfile = async () => {
    try {
      const updatedData = await form.validateFields();
      const updatedUser = {
        ...updatedData,
        avatar: selectedAvatar,
      };
  
      if (!updatedUser.name || !updatedUser.email || !updatedUser.phone || !updatedUser.avatar) {
        message.error('Por favor completa todos los campos.');
        return;
      }
  
      // Actualizar los datos en el servidor
      await updateUser(userData.id, updatedUser);
  
      // Actualizar el estado local
      const newUserData = { ...userData, ...updatedUser };
      setUserData(newUserData);
  
      // Actualizar el localStorage
      localStorage.setItem('user', JSON.stringify(newUserData));
  
      message.success('Perfil actualizado correctamente');
      setIsModalVisible(false);
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
      message.error('Hubo un error al guardar el perfil.');
    }
  };

  const handleAvatarSelect = (avatar) => {
    setSelectedAvatar(avatar);
    setIsAvatarModalVisible(false);
  };

  return (
    <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <NavSuperior />
      <Content style={{ padding: '0 50px', marginTop: 20 }}>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={8}>
            <Card 
              loading={loading} 
              variant="plain" // Reemplaza bordered={false} con variant="plain"
              style={{ borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.09)' }}
            >
              <div style={{ textAlign: 'center', marginBottom: 20 }}>
                <Avatar 
                  size={120} 
                  src={userData.avatar} 
                  icon={<UserOutlined />} 
                  style={{ border: '4px solid #52c41a' }}
                />
                <Title level={3} style={{ marginTop: 16, marginBottom: 4 }}>{userData.name}</Title>
                <div style={{ marginTop: 16 }}>
                  <Button 
                    type="primary" 
                    icon={<EditOutlined />} 
                    onClick={handleEditProfile}
                  >
                    Editar Perfil
                  </Button>
                </div>
              </div>
              <Divider />
              <div>
                <p><MailOutlined style={{ marginRight: 8 }} /> {userData.email}</p>
                <p><PhoneOutlined style={{ marginRight: 8 }} /> {userData.phone || 'No proporcionado'}</p>
              </div>
              <Divider />
            </Card>
          </Col>
          <Col xs={24} md={16}>
            <Card 
              loading={loading} 
              variant="plain" // Reemplaza bordered={false} con variant="plain"
              style={{ borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.09)' }}
            >
              <Tabs defaultActiveKey="gallery" items={[
                {
                  label: "Galería",
                  key: "gallery",
                  children: (
                    <Row gutter={[16, 16]}>
                      {loading ? (
                        <Col span={24}>
                          <Title level={4}>Cargando recetas...</Title>
                        </Col>
                      ) : recipes.length === 0 ? (
                        <Col span={24}>
                          <Title level={4}>No hay recetas disponibles</Title>
                        </Col>
                      ) : (
                        recipes.map((recipe) => (
                          <Col xs={24} sm={12} md={8} key={recipe.id}>
                            <Card
                              hoverable
                              cover={
                                <img
                                  alt={recipe.title}
                                  src={recipe.image || 'https://via.placeholder.com/300'}
                                  style={{
                                    width: '100%',
                                    height: '150px', 
                                    objectFit: 'cover',
                                    borderRadius: '8px 8px 0 0', 
                                  }}
                                />
                              }
                              style={{
                                borderRadius: '8px',
                                height: '200px', 
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                              }}
                            >
                              <Card.Meta
                                title={recipe.title}
                                description={
                                  <div>
                                    <div style={{ marginBottom: 8 }}>
                                      {recipe.tags &&
                                        recipe.tags.map((tag, index) => (
                                          <Tag color="green" key={index}>
                                            {tag}
                                          </Tag>
                                        ))}
                                    </div>
                                  </div>
                                }
                              />
                            </Card>
                          </Col>
                        ))
                      )}
                    </Row>
                  )
                },
                {
                  label: "Contacto",
                  key: "contact",
                  children: (
                    <Row gutter={[24, 24]}>
                      <Col xs={24}>
                        <Card 
                          variant="plain" // Reemplaza bordered={false} con variant="plain"
                          style={{ borderRadius: '8px' }}
                        >
                          <Title level={4}>Información de contacto</Title>
                          <div style={{ marginTop: 16 }}>
                            <p style={{ fontSize: '16px' }}><MailOutlined style={{ marginRight: 8, color: '#52c41a' }} /> {userData.email}</p>
                            <p style={{ fontSize: '16px' }}><PhoneOutlined style={{ marginRight: 8, color: '#52c41a' }} /> {userData.phone}</p>
                          </div>
                        </Card>
                      </Col>
                    </Row>
                  )
                }
              ]} />
            </Card>
          </Col>
        </Row>
      </Content>

      {/* Modal para editar perfil */}
      <Modal
        title="Editar Perfil"
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={handleSaveProfile}
        okText="Guardar"
        cancelText="Cancelar"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Nombre"
            name="name"
            rules={[{ required: true, message: 'Por favor ingresa tu nombre' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Correo Electrónico"
            name="email"
            rules={[{ required: true, type: 'email', message: 'Por favor ingresa un correo válido' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Teléfono"
            name="phone"
            rules={[{ required: true, message: 'Por favor ingresa tu teléfono' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Avatar">
            <Avatar 
              src={selectedAvatar} 
              size={64} 
              onClick={() => setIsAvatarModalVisible(true)} 
              style={{ cursor: 'pointer', border: '2px solid #52c41a' }}
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal para seleccionar avatar */}
      <Modal
        title="Selecciona tu Avatar"
        open={isAvatarModalVisible}
        onCancel={() => setIsAvatarModalVisible(false)}
        footer={null}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
          {userAvatars.map((avatar, index) => (
            <Avatar 
              key={index} 
              src={avatar} 
              size={64} 
              onClick={() => handleAvatarSelect(avatar)} 
              style={{ cursor: 'pointer', border: selectedAvatar === avatar ? '2px solid #4a00e0' : 'none' }}
            />
          ))}
        </div>
      </Modal>
      <NavInferior />
    </Layout>
  );

};

export default Profile;