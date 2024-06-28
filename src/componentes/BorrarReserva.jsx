import * as React from 'react';
import { useState } from 'react';
import { Box, TextField, Button, Alert } from '@mui/material';
import { ApiService } from '../services/ApiService';

const BorrarReserva = ({ setReservas }) => {
  const [reservaId, setReservaId] = useState('');
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [message, setMessage] = useState('');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const handleChange = (event) => {
    setReservaId(event.target.value);
  };

  const handleDelete = () => {
    if (!reservaId || isNaN(reservaId)) {
      setMessage('El ID de la reserva es inválido.');
      setShowErrorAlert(true);
      setTimeout(() => setShowErrorAlert(false), 3000);
      return;
    }

    ApiService.deleteReserva(reservaId)
      .then((response) => {
        setReservas(); 
        setShowSuccessAlert(true)
        setTimeout(() => {
            setShowSuccessAlert(false); 
          }, 3000); 
      })
      .catch((error) => {
        setMessage(error.response.data.exceptionMessage || 'Error al eliminar la reserva.');
        setShowErrorAlert(true);
        setTimeout(() => setShowErrorAlert(false), 3000);
      });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        mt: 3,
      }}
    >
      <TextField
        label="ID de Reserva"
        value={reservaId}
        onChange={handleChange}
        sx={{ maxWidth: 400 }}
      />
      <Button
        variant="outlined"
        onClick={handleDelete}
        disabled={!reservaId || isNaN(reservaId)}
        sx={{ mt: 2 }}
      >
        Borrar Reserva
      </Button>
      {showSuccessAlert && (
        <Box mt={3}>
          <Alert severity="success">Borrado Exitoso.</Alert>
        </Box>
      )}
      {showErrorAlert && (
        <Box mt={2}>
          <Alert severity="error">{message}</Alert>
        </Box>
      )}
    </Box>
  );
};

export default BorrarReserva;