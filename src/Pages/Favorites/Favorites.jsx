import React, { useEffect, useState } from 'react';
import { Card, Typography, Badge, Row, Col, Empty, Spin, message, Button } from 'antd';
import { ExpandAltOutlined, HeartFilled } from '@ant-design/icons';
import { getUserFavorites, removeFavoriteRecipe } from '../../services/favService';
import { getAllRecipes } from '../../services/recipeService';
import RecipeDetailModal from '../../ComponentsUI/Recipes/RecipeDetailModal';
import { calculateCalories } from '../../ComponentsUI/Recipes/utils';
import '../Home/Home.css';
import NavSuperior from '../../ComponentsUI/Nav/NavSuperior';
import NavInferior from '../../ComponentsUI/Nav/NavInferior';

const { Title, Paragraph } = Typography;

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser && storedUser !== 'undefined') {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        if (parsedUser.id) {
          fetchUserFavorites(parsedUser.id);
        }
      } catch (error) {
        message.error('Error al cargar los datos del usuario');
        console.error('Error al parsear los datos del usuario:', error);
      }
    }
  }, []);

  const fetchUserFavorites = async (userId) => {
    setLoading(true);
    try {
      const userFavorites = await getUserFavorites(userId);
      const recipeIds = userFavorites.map((favorite) => favorite.recipeId);
      const allRecipes = await getAllRecipes();
      const favoriteRecipes = allRecipes.filter((recipe) => recipeIds.includes(recipe.id));
      setFavorites(favoriteRecipes);
      message.success('Favoritos cargados correctamente');
    } catch (error) {
      message.error('Error al cargar favoritos');
      console.error('Error fetching user favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const showRecipeDetail = (recipe) => {
    setSelectedRecipe(recipe);
    setDetailModalVisible(true);
  };

  const closeRecipeDetail = () => {
    setDetailModalVisible(false);
  };

  const handleRemoveFavorite = async (recipeId) => {
    if (!user || !user.id) return;

    try {
      await removeFavoriteRecipe(user.id, recipeId);
      setFavorites((prev) => prev.filter((recipe) => recipe.id !== recipeId));
      message.success('Receta eliminada de favoritos');
    } catch (error) {
      message.error('Error al eliminar de favoritos');
      console.error('Error removing favorite:', error);
    }
  };

  const renderFavoriteCards = () => {
    if (loading) {
      return (
        <div className="loading-container">
          <Spin size="large" tip="Cargando favoritos...">
            <div style={{ height: '200px' }} /> {/* Contenedor para el spinner */}
          </Spin>
        </div>
      );
    }
  
    if (favorites.length === 0) {
      return (
        <Empty
          description="No tienes recetas favoritas"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      );
    }
  
    return (
      <Row gutter={[24, 24]} className="favorites-grid">
        {favorites.map((recipe) => (
          <Col xs={24} sm={12} md={8} lg={6} key={recipe.id}>
            <FavoriteCard recipe={recipe} />
          </Col>
        ))}
      </Row>
    );
  };

  const FavoriteCard = ({ recipe }) => {
    const calories = calculateCalories(recipe.macros);

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
              icon={<HeartFilled style={{ color: '#ff4d4f' }} />}
              onClick={() => handleRemoveFavorite(recipe.id)}
              className="remove-favorite-btn"
            >
              Quitar
            </Button>,
          ]}
        >
          <div className="recipe-card-content">
            <Title level={4} className="recipe-title" onClick={() => showRecipeDetail(recipe)}>
              {recipe.title}
            </Title>
            <Paragraph ellipsis={{ rows: 2 }} className="recipe-description">
              {recipe.description}
            </Paragraph>
          </div>
        </Card>
      </Badge.Ribbon>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div style={{ flexGrow: 1 }}>
        <NavSuperior />
        <h2 className="title-content">
          <strong>Mis Recetas Favoritas</strong>
        </h2>
        <div className="favorites-content">{renderFavoriteCards()}</div>
        <RecipeDetailModal
          recipe={selectedRecipe}
          visible={detailModalVisible}
          onClose={closeRecipeDetail}
          calculateCalories={calculateCalories}
        />
      </div>
      <NavInferior /> {/* Asegura que NavInferior esté al final de la pantalla */}
    </div>
  );
}

export default Favorites;