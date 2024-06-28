import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import users from '../User'; 

const Login = ({handleLogin}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState({ errorText: '', error: false });
  const [passError, setPassError] = useState({ errorText: '', error: false });

  const emailRegex = new RegExp(
    '^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@' +
      '[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$'
  );

  const isFieldValid = email === '' || password === '';

  const handleSignIn = () => {
    setEmailError({ errorText: '', error: false });
    setPassError({ errorText: '', error: false });

    // Validar formato de email
    if (!emailRegex.test(email)) {
      setEmailError({
        errorText: 'Formato de email incorrecto',
        error: true,
      });
      return;
    }

    // Buscar usuario en la lista hardcodeada
    const user = users.find((user) => user.nombreUsuario === email && user.contraseña === password);

    if (user) {
        localStorage.setItem('idUsuario', user.id);
        handleLogin()

    } else {
      setPassError({
        errorText: 'Email o contraseña incorrectos',
        error: true,
      });
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', 
      }}
    >
      <Card sx={{ padding: 1, minWidth: 310, boxShadow: 5 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color='primary' variant='h6'>
            INICIAR SESIÓN
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <TextField
              error={emailError.error}
              helperText={emailError.errorText}
              type='email'
              sx={{ marginTop: 1.5 }}
              id='email'
              label='Email'
              variant='standard'
              value={email}
              required
              onChange={({ target }) => setEmail(target.value)}
            />
            <TextField
              error={passError.error}
              helperText={passError.errorText}
              type='password'
              sx={{ marginTop: 1.5 }}
              id='pass'
              label='Contraseña'
              variant='standard'
              value={password}
              required
              onChange={({ target }) => setPassword(target.value)}
            />
          </Box>
        </CardContent>
        <CardActions
          sx={{ marginTop: 5, display: 'flex', justifyContent: 'flex-end' }}
        >
          <Button
            variant='contained'
            color='secondary'
            disabled={isFieldValid}
            onClick={handleSignIn}
          >
            Entrar
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default Login;