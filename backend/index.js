const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://mohanty4raj:lpuZjUPEGmGlBPFy@cluster0.fiaafld.mongodb.net/Dateapp?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

const DatePlan = mongoose.model('DatePlan', {
  userName: String,
  date: Date,
  location: String,
  message: String
});

// Create a nodemailer transporter using SMTP
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'gugul8337@gmail.com', // Enter your Gmail email address
    pass: 'Gugul1991' // Enter your Gmail password
  }
});

// Define the route to handle sending date plans
app.post('/dateplans', async (req, res) => {
  try {
    const { userName, date, location, message } = req.body;
    const datePlan = new DatePlan({ userName, date, location, message });
    await datePlan.save();

    // Send email to the receiver
    const mailOptions = {
      from: 'gugul8337@gmail.com', // Your email address
      to: 'mohanty4raj@gmail.com', // Receiver's email address
      subject: 'Date Plan Confirmation',
      text: `Your date plan has been saved successfully.\n\nDetails:\nDate: ${date}\nLocation: ${location}\nMessage: ${message}`
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    res.status(201).json({ success: true, message: 'Date plan saved successfully' });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
