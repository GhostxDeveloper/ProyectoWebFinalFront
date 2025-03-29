import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, Stepper, Step, StepLabel } from '@mui/material';
import { Email, Lock, VerifiedUser } from '@mui/icons-material';
import { requestPasswordReset, verifyResetCode, resetPassword } from '../../services/passService';

const PasswordRecoveryPage = () => {
  const [activeStep, setActiveStep] = useState(0); 
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  
  const steps = ['Ingresa tu correo', 'Verifica el código', 'Crea una nueva contraseña'];

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await requestPasswordReset({ correo_electronico: email });
      if (response.success) {
        setSuccess(`Se ha enviado un código de verificación a ${email}`);
        setActiveStep(1);
      } else {
        setError('No se encontró ninguna cuenta con ese correo electrónico');
      }
    } catch (error) {
      // Check if the error response contains a specific error message
      const errorMessage = error.response?.data?.error || 
                           'Ocurrió un error al enviar el código de verificación';
      setError(errorMessage);
      console.error('Error details:', error.response || error.message);  
    }
  };
  

  const handleCodeVerification = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await verifyResetCode({ 
        correo_electronico: email, 
        codigo: verificationCode 
      });
      if (response.success) {
        setSuccess('Código verificado correctamente');
        setActiveStep(2);
      } else {
        setError('El código ingresado es incorrecto');
      }
    } catch (error) {
      setError('Ocurrió un error al verificar el código');
      console.error(error);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setError('');
    
    if (newPassword.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    
    try {
      const response = await resetPassword({
        correo_electronico: email,
        codigo: verificationCode,
        nueva_contrasena: newPassword
      });
      
      if (response.success) {
        setSuccess('Tu contraseña ha sido restablecida con éxito');
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } else {
        setError('No se pudo restablecer la contraseña');
      }
    } catch (error) {
      setError('Ocurrió un error al restablecer la contraseña');
      console.error(error);
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box component="form" onSubmit={handleEmailSubmit}>
            <Typography variant="body1" marginBottom={3}>
              Ingresa tu correo electrónico y te enviaremos un código de verificación para restablecer tu contraseña.
            </Typography>
            <TextField
              fullWidth
              label="Correo Electrónico"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              margin="normal"
              InputProps={{
                startAdornment: (
                  <Email sx={{ color: 'action.active', mr: 1 }} />
                ),
              }}
            />
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              sx={{ marginTop: 3, padding: '10px' }}
            >
              Enviar Código
            </Button>
          </Box>
        );
      case 1:
        return (
          <Box component="form" onSubmit={handleCodeVerification}>
            <Typography variant="body1" marginBottom={3}>
              Hemos enviado un código de verificación a tu correo electrónico. 
              Por favor, ingresa el código a continuación para continuar.
            </Typography>
            <TextField
              fullWidth
              label="Código de Verificación"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              required
              margin="normal"
              InputProps={{
                startAdornment: (
                  <VerifiedUser sx={{ color: 'action.active', mr: 1 }} />
                ),
              }}
            />
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              sx={{ marginTop: 3, padding: '10px' }}
            >
              Verificar Código
            </Button>
            <Button
              fullWidth
              variant="text"
              color="primary"
              sx={{ marginTop: 1 }}
              onClick={handleEmailSubmit}
            >
              Reenviar Código
            </Button>
          </Box>
        );
      case 2:
        return (
          <Box component="form" onSubmit={handlePasswordReset}>
            <Typography variant="body1" marginBottom={3}>
              Crea una nueva contraseña para tu cuenta.
            </Typography>
            <TextField
              fullWidth
              label="Nueva Contraseña"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              margin="normal"
              InputProps={{
                startAdornment: (
                  <Lock sx={{ color: 'action.active', mr: 1 }} />
                ),
              }}
            />
            <TextField
              fullWidth
              label="Confirmar Contraseña"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              margin="normal"
              InputProps={{
                startAdornment: (
                  <Lock sx={{ color: 'action.active', mr: 1 }} />
                ),
              }}
            />
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              sx={{ marginTop: 3, padding: '10px' }}
            >
              Restablecer Contraseña
            </Button>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f0f0f0"
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: '500px',
          bgcolor: '#fff',
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" textAlign="center" marginBottom={4}>
          Recuperar Contraseña
        </Typography>
        
        <Stepper activeStep={activeStep} alternativeLabel sx={{ marginBottom: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        
        {error && (
          <Typography color="error" textAlign="center" marginBottom={2}>
            {error}
          </Typography>
        )}
        
        {success && (
          <Typography color="success.main" textAlign="center" marginBottom={2}>
            {success}
          </Typography>
        )}
        
        {renderStepContent(activeStep)}
        
        <Button
          sx={{ marginTop: 2 }}
          onClick={() => navigate('/')}
        >
          Volver a Inicio de Sesión
        </Button>
      </Box>
    </Box>
  );
};

export default PasswordRecoveryPage;