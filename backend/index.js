const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

const DatePlan = mongoose.model('DatePlan', {
  userName: String,
  date: Date,
  location: String,
  message: String
});

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_SERVER,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD
  }
});

app.post('/dateplans', async (req, res) => {
  try {
    const { userName, date, location, message, receiverEmail } = req.body;
    const datePlan = new DatePlan({ userName, date, location, message });
    await datePlan.save();

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: receiverEmail,
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
