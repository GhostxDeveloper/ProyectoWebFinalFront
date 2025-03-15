import api from './api';

export const getRecipes = async (userId) => {
  const response = await api.get('/recipes', { params: { userId } });
  return response.data;
};

export const createRecipe = async (recipeData) => {
  const response = await api.post('/recipes/agregar', recipeData);
  return response.data;
};

export const updateRecipe = async (id, recipeData) => {
  const response = await api.put(`/recipes/actualizar/${id}`, recipeData);
  return response.data;
};


export const deleteRecipe = async (id) => {
  const response = await api.delete(`/recipes/eliminar/${id}`);
  return response.data;
};