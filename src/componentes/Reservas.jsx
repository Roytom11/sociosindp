import * as React from 'react';
import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import Title from './Title';
import { ApiService } from '../services/ApiService';
import Button from '@mui/material/Button';
import BorrarReserva from './BorrarReserva';
import TableReservas from './TableReserva';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Alert from '@mui/material/Alert';

export const Reservas = () => {
  const [BonoSelected, setBonoSelected] = useState('');
  const [BonoList, setBonoList] = useState([]);
  const [showErrorAlertReserva, setShowErrorAlertReserva] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [messageReserva, setmessageReserva] = useState(false);
  const [reservas, setReservas] = useState([]);

  //obtengo los bonos para el select
  useEffect(() => {
    const getBonos = async () => {
      
      try {
        const response = await ApiService.getBonos(); //como funciona el apiservice
        setBonoList(response.data);
      } catch (error) {
        console.error('Error al obtener los bonos:', error);      
      }
    };
    getBonos();
  }, []);


  //evento para obtener el value del select
  const handleChange = (event) => {
    setBonoSelected(event.target.value);
  };

  //handle para guardar la reserva
  const handleReserva = () => {
    const reserva = {
      SocioId: localStorage.getItem('idUsuario'),
      BonoId: BonoSelected,
    };

    console.log(reserva)
  //dejo un manejo de peticion ajax sin await, lo resuevo con then 
    ApiService.addReserva(reserva).then((response) => {
        setShowSuccessAlert(true); 
        setTimeout(() => {
          setShowSuccessAlert(false); 
        }, 3000); 
        getReservas();
        
    }).catch((error) => {
        setmessageReserva(error.response.data.message)
        setShowErrorAlertReserva(true); 
        setTimeout(() => {
          setShowErrorAlertReserva(false); 
       
     },3000);
  });
}

const getReservas = async () => {
    try {
      const response = await ApiService.getReservas();
    
      setReservas(response.data);
    } catch (error) {
      console.error('Error al obtener las reservas:', error);
    }
  };
   //obtencion de reservas
useEffect(() => {
    getReservas()
     }, []);

  return (
    <>
     
      <Title text="Solicitar Reservas" />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '120', 
        }}
      >
        <FormControl fullWidth sx={{ maxWidth: 400 }}>
          <InputLabel id="demo-simple-select-label">Fecha</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={BonoSelected}
            label="Bono"
            onChange={handleChange}
          >
            {BonoList.map((bono) => (
              <MenuItem key={bono.id} value={bono.id}>
                {bono.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
     
      <Box  mt={3}>
      <Button variant="outlined" disabled={BonoSelected==''} onClick={handleReserva}>Reservar</Button>
      </Box> 
       {showSuccessAlert && (
        <Box mt={3}>
          <Alert severity="success">Reserva Exitosa.</Alert>
        </Box>
      )}
      {showErrorAlertReserva && (
        <Box mt={3}>
          <Alert severity="error">{messageReserva}</Alert>
        </Box>
      )}

      <Box>
      <Title text="borrar Reserva" />
      <BorrarReserva setReservas={getReservas} />
      </Box>
       <Box mt={4}>
       
       <TableReservas reservas={reservas} />
     </Box>
    </>
  );
};

export default Reservas;