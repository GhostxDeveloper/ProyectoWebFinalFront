import React from 'react';
import { Card, Button, Typography, Tag, Badge } from 'antd';
import { EditOutlined, DeleteOutlined, ExpandAltOutlined, ClockCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const RecipeCard = ({ recipe, onEdit, onDelete, onViewDetails, calculateCalories, favorites }) => {
  const isFavorite = favorites[recipe.id];
  const calories = calculateCalories(recipe.macros);
  
  return (
    <Badge.Ribbon text={`${calories} cal`} color="volcano">
      <Card
        hoverable
        className="recipe-card-modern"
        cover={
          <div className="recipe-image-modern" onClick={() => onViewDetails(recipe)}>
            <img alt={recipe.title} src={recipe.image} />
            <div className="recipe-image-overlay">
              <Button type="text" icon={<ExpandAltOutlined />} className="view-details-btn" />
            </div>
          </div>
        }
        actions={[
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            onClick={() => onEdit(recipe)} 
          />,
          <Button 
            type="text" 
            danger 
            icon={<DeleteOutlined />} 
            onClick={() => onDelete(recipe.id)} 
          />
        ]}
      >
        <div className="recipe-card-content">
          <Title level={4} className="recipe-title" onClick={() => onViewDetails(recipe)}>
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

export default RecipeCard;