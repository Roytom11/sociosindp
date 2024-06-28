import React from 'react';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

const Title = ({ text }) => {
  return (
    <div style={{  textAlign: 'center', margin: '20px 0' }}>
      <Typography mt={6} variant="h4" component="h1" gutterBottom>
        {text}
      </Typography>
      <Divider />
    </div>
  );
};

export default Title;