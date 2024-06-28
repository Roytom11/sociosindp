import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ApiService } from '../services/ApiService'; 
import Title from './Title';
import { Box } from '@mui/material';
function Bonos() {
  const [bonos, setBonos] = useState([]);

  useEffect(() => {
    const getBonos = async () => {
      try {
        
        const response = await ApiService.getBonos();
        setBonos(response.data); 
      } catch (error) {
        console.error('Error al obtener los bonos:', error);
     
      }
    };

    getBonos();
  }, []); 
  return (
    
    <Box>
      
      <>
      <Title text={'Bonos'}/>
      </>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Socio</TableCell>
            <TableCell align="right">Sector</TableCell>
            <TableCell align="right">Fecha </TableCell>
            <TableCell align="right">Precio</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bonos.map((bono) => (
            <TableRow key={bono.id}>
              <TableCell component="th" scope="row">
                {bono.socio}
              </TableCell>
              <TableCell align="right">{bono.sector}</TableCell>
              <TableCell align="right">{bono.fecha}</TableCell>
              <TableCell align="right">{bono.precio}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  );
}

export default Bonos;