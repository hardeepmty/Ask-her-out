import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const CuteGif = () => {
  const [showNameForm, setShowNameForm] = useState(false);
  const [showDatePlanForm, setShowDatePlanForm] = useState(false);
  const [userName, setUserName] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
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
        message,
      });
      console.log(response.data);
      // Send emails when the date plan is successfully submitted
      sendEmails();
      alert("Your date is registered!");
      navigate('/seeu');
    } catch (error) {
      console.log("Error submitting the date plan", error);
    }
  };

  // Function to send emails
  const sendEmails = async () => {
    try {
      await axios.post("http://localhost:5000/sendemails", {
        userName,
        date,
        location,
        message,
      });
      console.log("Emails sent successfully");
    } catch (error) {
      console.log("Error sending emails", error);
    }
  };

  return (
    <Container maxWidth="sm" style={{ backgroundImage: `url(/images/night.png)`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      {!showNameForm && !showDatePlanForm && (
        <>
          <Typography sx={{ color: "white", fontSize: "30px", fontWeight: "800" }} gutterBottom>
            Let's Plan a Date
          </Typography>
          <img src="/images/bfgf.gif" alt="Cute GIF" style={{ width: '300px', height: '300px', marginBottom: '20px', borderRadius: "150px" }} />
          <Button onClick={handleYesClick} variant="contained" color="primary">YES</Button>
          <Typography sx={{ color: "wheat", fontSize: "30px", fontWeight: "800" }}>Can't say NO</Typography>
        </>
      )}
      {showNameForm && (
        <form onSubmit={handleNameSubmit} style={{ marginTop: "200px" }}>
          <Typography>What's ur name?</Typography>
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
          <Typography variant='h4'>Let's plan our date</Typography>
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
