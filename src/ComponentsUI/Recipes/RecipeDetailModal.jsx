//Modal que se muestra cuando se hace click en el centro de la imagen


import React from 'react';
import { Modal, Button, Typography, Collapse, Row, Col, Card, Avatar } from 'antd';
import { ClockCircleOutlined, InfoCircleOutlined, FireOutlined } from '@ant-design/icons';
import Statistic from './Statistic';
import { Tag } from 'antd';

const { Title, Paragraph } = Typography;
const { Panel } = Collapse;

const RecipeDetailModal = ({ 
  recipe, 
  visible, 
  onClose, 
  onEdit, 
  calculateCalories 
}) => {
  if (!recipe) return null;
  
  return (
    <Modal
      title={recipe.title}
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          Cerrar
        </Button>,
        <Button 
          key="edit" 
          type="primary" 
          onClick={() => {
            onClose();
            onEdit(recipe);
          }}
        >
          Editar
        </Button>
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
        
        
        <Collapse defaultActiveKey={['1']} ghost>
          <Panel header={<Title level={5}><InfoCircleOutlined /> Información nutricional</Title>} key="1">
            <div className="nutrition-info">
              <Row gutter={16}>
                <Col span={12}>
                  <Card bordered={false} className="nutrition-card protein">
                    <Statistic
                      title="Proteínas"
                      value={`${recipe.macros.proteinas}g`}
                      prefix={<Avatar size="small" className="protein-icon">P</Avatar>}
                    />
                  </Card>
                </Col>
                <Col span={12}>
                  <Card bordered={false} className="nutrition-card carbs">
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
                  <Card bordered={false} className="nutrition-card fats">
                    <Statistic
                      title="Grasas"
                      value={`${recipe.macros.grasas}g`}
                      prefix={<Avatar size="small" className="fat-icon">G</Avatar>}
                    />
                  </Card>
                </Col>
                <Col span={12}>
                  <Card bordered={false} className="nutrition-card calories">
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
          </Panel>
          
          <Panel header={<Title level={5}><FireOutlined /> Ingredientes</Title>} key="2">
            <div className="ingredients-list">
              {recipe.ingredients.split(/[,\n]/).map((ingredient, index) => (
                ingredient.trim() && (
                  <Tag key={index} className="ingredient-tag">
                    {ingredient.trim()}
                  </Tag>
                )
              ))}
            </div>
          </Panel>
          <Panel header={<Title level={5}><ClockCircleOutlined /> Pasos de preparación</Title>} key="3">
            <div className="preparation-steps">
            {recipe.steps?.split(/[.\n]/).map((step, index) => (
           step.trim() && (
          <Paragraph key={index}>
          <strong>Paso {index + 1}:</strong> {step.trim()}
        </Paragraph>
            )
          ))}
        </div>
      </Panel>
          
        </Collapse>
      </div>
    </Modal>
  );
};

export default RecipeDetailModal;