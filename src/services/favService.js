import api from './api';


export const addFavoriteRecipe = async (userId, recipeId) => {
    try {
      const response = await api.post('/favorites/add', { userId, recipeId });
      return response.data;
    } catch (error) {
      console.error('Error al añadir receta a favoritos:', error);
      throw error;
    }
  };
  
  // Eliminar una receta de favoritos
  export const removeFavoriteRecipe = async (userId, recipeId) => {
    try {
      const response = await api.delete(`/favorites/remove`, { 
        data: { userId, recipeId } 
      });
      return response.data;
    } catch (error) {
      console.error('Error al eliminar receta de favoritos:', error);
      throw error;
    }
  };
  
  // Obtener todas las recetas favoritas del usuario
  export const getUserFavorites = async (userId) => {
    try {
      const response = await api.get(`/favorites`, { 
        params: { userId } 
      });
      return response.data;
    } catch (error) {
      console.error('Error al obtener favoritos del usuario:', error);
      throw error;
    }
  };