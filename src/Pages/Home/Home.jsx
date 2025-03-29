import React, { useEffect, useState } from 'react';
import CarouselComponent from '../../ComponentsUI/Carrusel/CarouselComponent';
import NavSuperior from '../../ComponentsUI/Nav/NavSuperior';
import { Card, Typography, Tag, Badge, Row, Col, Empty, Spin, message, Button } from 'antd';
import { ExpandAltOutlined, ClockCircleOutlined, HeartOutlined, HeartFilled } from '@ant-design/icons';
import { getAllRecipes } from '../../services/recipeService';
import { addFavoriteRecipe, removeFavoriteRecipe, getUserFavorites } from '../../services/favService';
import './Home.css';
import RecipeDetailModal from '../../ComponentsUI/Recipes/RecipeDetailModal';
import { calculateCalories } from '../../ComponentsUI/Recipes/utils';
import NavInferior from '../../ComponentsUI/Nav/NavInferior';

const { Title, Paragraph } = Typography;

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [favorites, setFavorites] = useState({});
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser && storedUser !== 'undefined') {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
  
        // Cargar recetas y luego favoritos
        fetchAllRecipes().then(() => {
          if (parsedUser.id) {
            fetchUserFavorites(parsedUser.id);
          }
        });
      } catch (error) {
        message.error('Error al cargar los datos del usuario');
      }
    } else {
      fetchAllRecipes();
    }
  }, []);
  

  const fetchAllRecipes = async () => {
    setLoading(true);
    try {
      const data = await getAllRecipes();
      setRecipes(data);
      const initialFavorites = {};
      data.forEach(recipe => {
        initialFavorites[recipe.id] = false;
      });
      setFavorites(initialFavorites);
      message.success('Recetas cargadas correctamente');
    } catch (error) {
      message.error('Error al cargar las recetas');
    } finally {
      setLoading(false);
    }
  };

  const fetchUserFavorites = async (userId) => {
    try {
      const userFavorites = await getUserFavorites(userId);
      const updatedFavorites = userFavorites.reduce((acc, favorite) => {
        acc[favorite.recipeId] = true;
        return acc;
      }, {});
      setFavorites(updatedFavorites);
    } catch (error) { 
      message.error('Error al cargar los favoritos del usuario');
     }
  };
  

  const toggleFavorite = async (recipeId) => {
    if (!user || !user.id) {
      message.warning('Debes iniciar sesión para guardar favoritos');
      return;
    }

    try {
      const isFavorite = favorites[recipeId];
      setFavorites(prev => ({
        ...prev,
        [recipeId]: !isFavorite
      }));
      if (isFavorite) {
        await removeFavoriteRecipe(user.id, recipeId);
        message.success('Receta eliminada de favoritos');
      } else {
        await addFavoriteRecipe(user.id, recipeId);
        message.success('Receta añadida a favoritos');
      }
    } catch (error) {
      setFavorites(prev => ({
        ...prev,
        [recipeId]: !prev[recipeId]
      }));
      message.error('Error al actualizar favoritos');
    }
  };

  const showRecipeDetail = (recipe) => {
    setSelectedRecipe(recipe);
    setDetailModalVisible(true);
  };

  const closeRecipeDetail = () => {
    setDetailModalVisible(false);
  };

  const renderRecipeCards = () => {
    const filteredRecipes = recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
      return (
        <div className="loading-container">
          <Spin size="large" tip="Cargando recetas...">
            <div style={{ height: '200px' }} /> {/* Contenedor para el spinner */}
          </Spin>
        </div>
      );
    }

    if (filteredRecipes.length === 0) {
      return (
        <Empty
          description="No hay recetas disponibles"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      );
    }

    return (
      <Row gutter={[24, 24]} className="recipes-grid">
        {filteredRecipes.map((recipe) => (
          <Col xs={24} sm={12} md={8} lg={6} key={recipe.id}>
            <RecipeCard recipe={recipe} />
          </Col>
        ))}
      </Row>
    );
  };

  const RecipeCard = ({ recipe }) => {
    const calories = calculateCalories(recipe.macros);
    const isFavorite = favorites[recipe.id];

    return (
      <Badge.Ribbon text={`${calories} cal`} color="volcano">
        <Card
          hoverable
          className="favorite-card-modern"
          cover={
            <div className="recipe-image-modern" onClick={() => showRecipeDetail(recipe)}>
              <img alt={recipe.title} src={recipe.image} />
              <div className="recipe-image-overlay">
                <ExpandAltOutlined className="view-details-btn" />
              </div>
            </div>
          }
          actions={[
            <Button
              type="text"
              icon={isFavorite ? <HeartFilled style={{ color: '#ff4d4f' }} /> : <HeartOutlined />}
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(recipe.id);
              }}
              className="favorite-btn"
            >
              {isFavorite ? 'Favorito' : 'Añadir a favoritos'}
            </Button>
          ]}
        >
          <div className="recipe-card-content">
            <Title level={4} className="recipe-title" onClick={() => showRecipeDetail(recipe)}>
              {recipe.title}
            </Title>
            <Paragraph ellipsis={{ rows: 2 }} className="recipe-description">
              {recipe.description}
            </Paragraph>
            <div className="recipe-time">
              <ClockCircleOutlined /> {recipe.preparationTime}
            </div>
            <div className="recipe-macro-preview">
              <Tag color="cyan">P: {recipe.macros.proteinas}g</Tag>
              <Tag color="green">C: {recipe.macros.carbohidratos}g</Tag>
              <Tag color="orange">G: {recipe.macros.grasas}g</Tag>
            </div>
          </div>
        </Card>
      </Badge.Ribbon>
    );
  };

  return (
    <div>
      <div className="favorites-container">
        <NavSuperior onSearchChange={setSearchTerm} />
        <CarouselComponent />
      </div>
      <div className="content-title">
        <h2 className="title-content">
          <strong>¿Qué quieres cocinar hoy?</strong>
        </h2>
      </div>
      <div className="favorites-content">
        {renderRecipeCards()}
      </div>
      <RecipeDetailModal
        recipe={selectedRecipe}
        visible={detailModalVisible}
        onClose={closeRecipeDetail}
        calculateCalories={calculateCalories}
      />
      <NavInferior />
    </div>
  );
}

export default Home;