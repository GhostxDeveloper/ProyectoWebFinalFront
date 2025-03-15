import api from './api'; // Reutilizando la instancia de Axios configurada

export const sendEmail = async (emailData) => {
  try {
    const response = await api.post('contact/send-email', emailData);
    return response.data; // Devolver la respuesta procesada
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    throw error;
  }
};
