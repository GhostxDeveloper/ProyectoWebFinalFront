import React, { useState, useEffect } from 'react';
import { 
  Layout, 
  Card, 
  Avatar, 
  Typography, 
  Divider, 
  Row, 
  Col, 
  Tabs, 
  Statistic, 
  Button, 
  List, 
  Tag,
  Badge
} from 'antd';
import { 
  UserOutlined, 
  EditOutlined, 
  MailOutlined, 
  PhoneOutlined,
  HeartOutlined,
  InstagramOutlined,
  BookOutlined
} from '@ant-design/icons';
import NavSuperior from '../../ComponentsUI/Nav/NavSuperior';
import { getRecipes } from '../../services/recipeService';

const { Content } = Layout;
const { Title, Text } = Typography;

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    name: 'Lucía Martínez',
    role: 'Chef de Cocina Saludable',
    avatar: 'https://i.pravatar.cc/150?img=5',
    email: 'lucia@cocinaconvida.com',
    phone: '+34 612 345 678',
    stats: {
      recipes: 148,
      likes: 238450
    },
    socialMedia: {
      instagram: '@luciacocinasaludable',
    }
  });
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    console.log('Usuario almacenado:', storedUser);
    if (storedUser && storedUser !== 'undefined') {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserData((prevData) => ({
          ...prevData,
          name: parsedUser.name || prevData.name,
          email: parsedUser.email || prevData.email,
          phone: parsedUser.phone || prevData.phone,
        }));
        fetchRecipes(parsedUser.id);
      } catch (error) {
        console.error('Error al parsear los datos del usuario:', error);
      }
    } else {
      setLoading(false); // Detener el loading si no hay usuario
    }
  }, []);

  const fetchRecipes = async (userId) => {
    try {
      setLoading(true);
      const data = await getRecipes(userId);
      setRecipes(data);
    } catch (error) {
      console.error('Error al obtener las recetas:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <NavSuperior />
      <Content style={{ padding: '0 50px', marginTop: 20 }}>
        <Row gutter={[24, 24]}>
          {/* Columna izquierda - Información principal */}
          <Col xs={24} md={8}>
            <Card loading={loading} bordered={false} style={{ borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.09)' }}>
              <div style={{ textAlign: 'center', marginBottom: 20 }}>
                <Badge count={<Tag color="green">PRO</Tag>} offset={[-5, 5]}>
                  <Avatar 
                    size={120} 
                    src={userData.avatar} 
                    icon={<UserOutlined />} 
                    style={{ border: '4px solid #52c41a' }}
                  />
                </Badge>
                <Title level={3} style={{ marginTop: 16, marginBottom: 4 }}>{userData.name}</Title>
                <Text type="secondary">{userData.role}</Text>
                <div style={{ marginTop: 16 }}>
                  <Button type="primary" icon={<EditOutlined />} style={{ marginRight: 8, backgroundColor: '#52c41a', borderColor: '#52c41a' }}>Editar Perfil</Button>
                </div>
              </div>
              
              <Divider />
              
              <div>
                <p><MailOutlined style={{ marginRight: 8 }} /> {userData.email}</p>
                <p><PhoneOutlined style={{ marginRight: 8 }} /> {userData.phone}</p>
                <p><InstagramOutlined style={{ marginRight: 8 }} /> {userData.socialMedia.instagram}</p>
              </div>
              
              <Divider />
              
              <Title level={4}>Estadísticas</Title>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Statistic title="Recetas" value={userData.stats.recipes} prefix={<BookOutlined style={{ color: '#52c41a' }} />} />
                </Col>
                <Col span={12}>
                  <Statistic title="Likes" value={userData.stats.likes} prefix={<HeartOutlined style={{ color: '#52c41a' }} />} />
                </Col>
              </Row>
            </Card>
          </Col>
          
          {/* Columna derecha - Pestañas con información adicional */}
          <Col xs={24} md={16}>
            <Card loading={loading} bordered={false} style={{ borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.09)' }}>
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
                              cover={<img alt={recipe.title} src={recipe.image || 'https://via.placeholder.com/300'} />}
                              style={{ borderRadius: '8px' }}
                            >
                              <Card.Meta
                                title={recipe.title}
                                description={
                                  <div>
                                    <div style={{ marginBottom: 8 }}>
                                      {recipe.tags && recipe.tags.map((tag, index) => (
                                        <Tag color="green" key={index}>{tag}</Tag>
                                      ))}
                                    </div>
                                    <div>
                                      <HeartOutlined style={{ color: '#f5222d', marginRight: 4 }} />
                                      {recipe.likes || 0}
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
                        <Card bordered={false} style={{ borderRadius: '8px' }}>
                          <Title level={4}>Información de contacto</Title>
                          <div style={{ marginTop: 16 }}>
                            <p style={{ fontSize: '16px' }}><MailOutlined style={{ marginRight: 8, color: '#52c41a' }} /> {userData.email}</p>
                            <p style={{ fontSize: '16px' }}><PhoneOutlined style={{ marginRight: 8, color: '#52c41a' }} /> {userData.phone}</p>
                          </div>
                          
                          <Title level={4} style={{ marginTop: 24 }}>Redes sociales</Title>
                          <div style={{ marginTop: 16 }}>
                            <p style={{ fontSize: '16px' }}>
                              <InstagramOutlined style={{ marginRight: 8, color: '#e1306c' }} /> 
                              {userData.socialMedia.instagram}
                            </p>
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
    </Layout>
  );
};

export default Profile;
