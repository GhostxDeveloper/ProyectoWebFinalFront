export const calculateCalories = (macros) => {
    const proteins = parseFloat(macros.proteinas) || 0;
    const carbs = parseFloat(macros.carbohidratos) || 0;
    const fats = parseFloat(macros.grasas) || 0;
    
    return (proteins * 4 + carbs * 4 + fats * 9).toFixed(0);
  };