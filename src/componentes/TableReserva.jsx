import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

import Title from './Title';

const TableReservas= ({ reservas }) => {
  return (
    <>
      <Title text="Reservas" />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">ID Reserva</TableCell>
              <TableCell align="right">Sector</TableCell>
              <TableCell align="right">Precio</TableCell>
              <TableCell align="right">Nombre Socio</TableCell>
              <TableCell align="right">Apellido Socio</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reservas.map((row) => (
              <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="right">{row.id}</TableCell>
                <TableCell align="right">{row.bono.asciento}</TableCell>
                <TableCell align="right">{row.bono.precio}</TableCell>
                <TableCell align="right">{row.socio.nombre}</TableCell>
                <TableCell align="right">{row.socio.apellido}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TableReservas;