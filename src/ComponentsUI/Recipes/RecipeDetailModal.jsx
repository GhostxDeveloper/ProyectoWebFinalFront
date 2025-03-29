import React from 'react';
import { Modal, Button, Typography, Collapse, Row, Col, Card, Avatar, Tag } from 'antd';
import { ClockCircleOutlined, InfoCircleOutlined, FireOutlined } from '@ant-design/icons';
import Statistic from './Statistic';

const { Title, Paragraph } = Typography;

const RecipeDetailModal = ({ 
  recipe, 
  visible, 
  onClose, 
  calculateCalories 
}) => {
  if (!recipe) return null;

  // Define los paneles como un array de objetos
  const collapseItems = [
    {
      key: '1',
      label: (
        <Title level={5}>
          <InfoCircleOutlined /> Información nutricional
        </Title>
      ),
      children: (
        <div className="nutrition-info">
          <Row gutter={16}>
            <Col span={12}>
              <Card variant="plain" className="nutrition-card protein">
                <Statistic
                  title="Proteínas"
                  value={`${recipe.macros.proteinas}g`}
                  prefix={<Avatar size="small" className="protein-icon">P</Avatar>}
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card variant="plain" className="nutrition-card carbs">
                <Statistic
                  title="Carbohidratos"
                  value={`${recipe.macros.carbohidratos}g`}
                  prefix={<Avatar size="small" className="carb-icon">C</Avatar>}
                />
              </Card>
            </Col>
          </Row>
          <Row gutter={16} style={{ marginTop: 16 }}>
            <Col span={12}>
              <Card variant="plain" className="nutrition-card fats">
                <Statistic
                  title="Grasas"
                  value={`${recipe.macros.grasas}g`}
                  prefix={<Avatar size="small" className="fat-icon">G</Avatar>}
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card variant="plain" className="nutrition-card calories">
                <Statistic
                  title="Calorías"
                  value={calculateCalories(recipe.macros)}
                  suffix="kcal"
                  prefix={<FireOutlined />}
                />
              </Card>
            </Col>
          </Row>
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <Title level={5}>
          <FireOutlined /> Ingredientes
        </Title>
      ),
      children: (
        <div className="ingredients-list">
          {recipe.ingredients.split(/[,\n]/).map((ingredient, index) => (
            ingredient.trim() && (
              <Tag key={index} className="ingredient-tag">
                {ingredient.trim()}
              </Tag>
            )
          ))}
        </div>
      ),
    },
    {
      key: '3',
      label: (
        <Title level={5}>
          <ClockCircleOutlined /> Pasos de preparación
        </Title>
      ),
      children: (
        <div className="preparation-steps">
          {recipe.steps?.split(/[.\n]/).map((step, index) => (
            step.trim() && (
              <Paragraph key={index}>
                <strong>Paso {index + 1}:</strong> {step.trim()}
              </Paragraph>
            )
          ))}
        </div>
      ),
    },
  ];

  return (
    <Modal
      title={recipe.title}
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          Cerrar
        </Button>,
      ]}
      width={800}
      centered
    >
      <div className="recipe-detail-content">
        <div className="recipe-detail-image">
          <img src={recipe.image} alt={recipe.title} />
        </div>
        
        <Paragraph className="recipe-detail-description">
          {recipe.description}
        </Paragraph>
        
        <div className="recipe-detail-preparation">
          <Title level={5}>
            <ClockCircleOutlined /> Tiempo de preparación
          </Title>
          <Paragraph>{recipe.preparationTime}</Paragraph>
        </div>
        
        {/* Usa la propiedad items en Collapse */}
        <Collapse defaultActiveKey={['1']} ghost items={collapseItems} />
      </div>
    </Modal>
  );
};

export default RecipeDetailModal;