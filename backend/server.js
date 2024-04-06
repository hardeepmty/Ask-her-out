const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(bodyParser.json());


mongoose.connect('mongodb://localhost:27017/dateplanner', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

const DatePlan = mongoose.model('DatePlan', {
  userName: String,
  date: Date,
  location: String,
  message: String
});


app.post('/dateplans', async (req, res) => {
  try {
    const { userName, date, location, message } = req.body;
    const datePlan = new DatePlan({ userName, date, location, message });
    await datePlan.save();
    res.status(201).json({ success: true, message: 'Date plan saved successfully' });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
