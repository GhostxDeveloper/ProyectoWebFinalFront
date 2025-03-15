import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { green, teal } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// Estilo del botón de expandir
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
}));

const RecipeCard = ({ recipe, onEdit, onDelete }) => {
  const [expanded, setExpanded] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card sx={{ maxWidth: 345, borderRadius: 12, boxShadow: 8, backgroundColor: '#f9f9f9' }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: teal[500] }} aria-label="recipe">
            {recipe.title.charAt(0)}
          </Avatar>
        }
        action={
          <>
            <IconButton aria-label="settings" onClick={handleMenuClick}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={() => { onEdit(recipe); handleMenuClose(); }}>
                <EditIcon /> Editar
              </MenuItem>
              <MenuItem onClick={() => { onDelete(recipe.id); handleMenuClose(); }}>
                <DeleteIcon /> Eliminar
              </MenuItem>
            </Menu>
          </>
        }
        title={recipe.title}
        subheader={recipe.date}
        sx={{ color: teal[600], fontWeight: 'bold' }}
      />
      <CardMedia
        component="img"
        height="194"
        image={recipe.image}
        alt={recipe.title}
        sx={{ borderRadius: 8, objectFit: 'cover' }}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
          {recipe.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" sx={{ color: green[500] }}>
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share" sx={{ color: green[500] }}>
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Ingredientes:</Typography>
          <Typography paragraph>{recipe.ingredients}</Typography>
          <Typography paragraph>Tiempo de Preparación: {recipe.preparationTime}</Typography>
          <Typography paragraph>Macros:</Typography>
          <Typography paragraph>Proteínas: {recipe.macros?.proteinas || 0}g</Typography>
          <Typography paragraph>Grasas: {recipe.macros?.grasas || 0}g</Typography>
          <Typography paragraph>Carbohidratos: {recipe.macros?.carbohidratos || 0}g</Typography>
          
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default RecipeCard;
