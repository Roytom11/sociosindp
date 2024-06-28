import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { red } from '@mui/material/colors';

const Navbar = () => {
  return (
    <AppBar position='static' sx={{  }}>
      <Toolbar>
        <Typography ml={16} variant='h5' component='div' sx={{ flexGrow:5  }} >
        Independiente
        </Typography>
        <Button color='inherit' component={Link} to='/bonos'>
          Reservado
        </Button>
        <Button color='inherit' component={Link} to='/bonos/reservas'>
          Reservar
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;