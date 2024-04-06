import React, { useState } from 'react'
import { Container, TextField, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';


const DatePlanner = () => {

  const [date,setDate] = useState('') ;
  const [location,setLocation] = useState('') ;
  const [message,setMessage] = useState('') ; 

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can handle the submission, for example, sending the data to a backend server
    console.log('Date:', date);
    console.log('Location:', location);
    console.log('Message:', message);
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '50px' }}>
      <Typography variant="h4" gutterBottom>
        Plan a Date
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Choose a date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Message"
          multiline
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
          Submit
        </Button>
      </form>
    </Container>
  )
}

export default DatePlanner
