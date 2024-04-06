import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

const CuteGif = () => {
  const [showNameForm, setShowNameForm] = useState(false);
  const [showDatePlanForm, setShowDatePlanForm] = useState(false);
  const [userName, setUserName] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');
  
  const navigate = useNavigate();

  const handleYesClick = () => {
    setShowNameForm(true);
  };

  const handleNameSubmit = (event) => {
    event.preventDefault();
    setShowNameForm(false);
    setShowDatePlanForm(true);
  };

  const handleDatePlanSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/dateplans", {
        userName,
        date,
        location,
        message
      });
      console.log(response.data);
      alert("Your date is registered!");
      navigate('/seeu');
    } catch (error) {
      console.log("Error submitting the date plan", error);
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '50px' }}>
      {!showNameForm && !showDatePlanForm && (
        <>
          <Typography variant="h4" gutterBottom>
            Plan a Date
          </Typography>
          <img src="/images/bfgf.gif" alt="Cute GIF" style={{ width: '300px', height: '300px', marginBottom: '20px' }} />
          <Button onClick={handleYesClick} variant="contained" color="primary">YES</Button>
        </>
      )}
      {showNameForm && (
        <form onSubmit={handleNameSubmit} style={{marginTop:"200px"}}>
          <Typography>Whats ur name?</Typography>
          <TextField
            label="Your Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary">Submit</Button>
        </form>
      )}
      {showDatePlanForm && (
        <form onSubmit={handleDatePlanSubmit}>
          <Typography variant='h4'>Lets plan our date</Typography>
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
          <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>Submit</Button>
        </form>
      )}
    </Container>
  );
}

export default CuteGif;
