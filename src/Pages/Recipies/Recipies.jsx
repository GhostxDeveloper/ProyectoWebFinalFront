import React, { useState, useEffect } from 'react';
import { Button, Form, Typography, Row, Col, message, Empty, Spin, Tooltip, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import './Recetas.css';
import { getRecipes, createRecipe, updateRecipe, deleteRecipe } from '../../services/recipeService';
import NavSuperior from '../../ComponentsUI/Nav/NavSuperior';
import RecipeCard from '../../ComponentsUI/Recipes/RecipeCard';
import RecipeDetailModal from '../../ComponentsUI/Recipes/RecipeDetailModal';
import RecipeFormModal from '../../ComponentsUI/Recipes/RecipeFormModal';
import { calculateCalories } from '../../ComponentsUI/Recipes/utils';

const { Title, Text } = Typography;

const Recipies = () => {
  const [recipes, setRecipes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();
  const [user, setUser] = useState(null);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState({});
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser && storedUser !== 'undefined') {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        message.error('Error al cargar los datos del usuario');
        console.error('Error al parsear los datos del usuario:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchRecipes(user.id);
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchRecipes = async (userId) => {
    setLoading(true);
    try {
      const data = await getRecipes(userId);
      setRecipes(data);
      const initialFavorites = {};
      data.forEach(recipe => {
        initialFavorites[recipe.id] = false;
      });
      setFavorites(initialFavorites);
      
      message.success('Recetas cargadas correctamente');
    } catch (error) {
      message.error('Error al cargar las recetas');
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setFileList([]);
    setEditingRecipe(null);
  };

  const handleSubmit = async (values) => {
    try {
      if (!user) {
        message.error("Usuario no encontrado");
        return;
      }

      const imageFile = fileList[0]?.originFileObj;
      if (!imageFile && editingRecipe) {
        const recipeData = { ...values, image: editingRecipe.image, userId: user.id };
        await updateRecipe(editingRecipe.id, recipeData);
        message.success('Receta actualizada correctamente');
        fetchRecipes(user.id);
        setIsModalOpen(false);
        form.resetFields();
        setFileList([]);
        setEditingRecipe(null);
        return;
      }
      
      if (!imageFile) {
        message.error("Debe seleccionar una imagen");
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onload = async () => {
        const base64Image = reader.result;
        const recipeData = { ...values, image: base64Image, userId: user.id };

        if (editingRecipe) {
          await updateRecipe(editingRecipe.id, recipeData);
          message.success('Receta actualizada correctamente');
        } else {
          await createRecipe(recipeData);
          message.success('Receta creada correctamente');
        }

        fetchRecipes(user.id);
        setIsModalOpen(false);
        form.resetFields();
        setFileList([]);
        setEditingRecipe(null);
      };
    } catch (error) {
      message.error("Error al guardar la receta");
      console.error("Error submitting recipe:", error);
    }
  };

  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const handleEdit = (recipe) => {
    setEditingRecipe(recipe);
    
    // Configurar los valores del formulario
    form.setFieldsValue({
      title: recipe.title,
      description: recipe.description,
      macros: recipe.macros,
      preparationTime: recipe.preparationTime,
      ingredients: recipe.ingredients,
      steps: recipe.steps,  // Cambié 'preparationSteps' a 'steps'
    });
    
    setFileList([
      {
        uid: '-1',
        name: 'imagen-receta.png',
        status: 'done',
        url: recipe.image,
      },
    ]);
    
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    Modal.confirm({
      title: '¿Estás seguro de eliminar esta receta?',
      content: 'Esta acción no se puede deshacer',
      okText: 'Sí, eliminar',
      okType: 'danger',
      cancelText: 'Cancelar',
      onOk: async () => {
        try {
          await deleteRecipe(id);
          message.success('Receta eliminada correctamente');
          fetchRecipes(user.id);
        } catch (error) {
          message.error('Error al eliminar la receta');
          console.error("Error deleting recipe:", error);
        }
      }
    });
  };
  
  const showRecipeDetail = (recipe) => {
    setSelectedRecipe(recipe);
    setDetailModalVisible(true);
  };
  
  const closeRecipeDetail = () => {
    setDetailModalVisible(false);
  };

  // Función para renderizar las tarjetas de recetas
  const renderRecipeCards = () => {
    if (loading) {
      return (
        <div className="loading-container">
          <Spin size="large" tip="Cargando recetas..." />
        </div>
      );
    }

    if (recipes.length === 0) {
      return (
        <Empty
          description="No hay recetas disponibles"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        >
          <Button type="primary" onClick={showModal}>
            Crear mi primera receta
          </Button>
        </Empty>
      );
    }

    return (
      <Row gutter={[24, 24]}>
        {recipes.map((recipe) => (
          <Col xs={24} sm={12} md={8} key={recipe.id}>
            <RecipeCard 
              recipe={recipe}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onViewDetails={showRecipeDetail}
              calculateCalories={calculateCalories}
              favorites={favorites}
            />
          </Col>
        ))}
      </Row>
    );
  };

  return (
    <>
      <NavSuperior />
      <div className="recipes-container">
        <div className="recipes-header">
          <Title level={2}>Mis Recetas</Title>
          <Text type="secondary">Explora tus creaciones culinarias</Text>
        </div>
        
        <div className="recipes-content">
          {renderRecipeCards()}
        </div>
        
        <Tooltip title="Agregar nueva receta">
          <Button
            type="primary"
            shape="circle"
            icon={<PlusOutlined />}
            size="large"
            className="floating-button"
            onClick={showModal}
          />
        </Tooltip>
        
        {/* Modales de componentes extraídos */}
        <RecipeDetailModal 
          recipe={selectedRecipe}
          visible={detailModalVisible}
          onClose={closeRecipeDetail}
          onEdit={handleEdit}
          calculateCalories={calculateCalories}
        />
        
        <RecipeFormModal 
          visible={isModalOpen}
          onCancel={handleCancel}
          onSubmit={handleSubmit}
          form={form}
          editingRecipe={editingRecipe}
          fileList={fileList}
          onUploadChange={handleUploadChange}
        />
      </div>
    </>
  );
};

export default Recipies;
