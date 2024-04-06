import React from 'react';
import { Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const CuteGif = () => {
  return (
    <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <Typography variant='h3' sx={{mt:"40px"}}>Would You Like to Go On A Date with me?</Typography>
      <img src="/images/bfgf.gif" alt="Cute GIF" style={{ width: '300px', height: '300px', marginBottom: '20px' }} />
      <Link to={'/dateplanner'}>
      <Button variant="contained" color="primary">YES</Button>
      </Link>
      <Typography variant='h3' sx={{mt:"40px"}}>Sorry u cant say NO to me....</Typography>
    </Container>
  );
}

export default CuteGif;
