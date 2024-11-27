const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const {
  generateOtp,
  verifyOtp,
  signup,
} = require('./controllers/signupController');

const {
  login,
  forgotPassword,
  verifyResetOtp,
  resetPassword,
} = require('./controllers/loginController');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Signup Routes
app.post('/generate-otp', generateOtp);
app.post('/verify-otp', verifyOtp);
app.post('/signup', signup);

// Login Routes
app.post('/login', login);
app.post('/forgot-password', forgotPassword);
app.post('/verify-reset-otp', verifyResetOtp);
app.post('/reset-password', resetPassword);

// Start Server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
