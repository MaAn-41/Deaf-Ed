const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const cors = require('cors');
require('dotenv').config();

// App Configurations
const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  userType: { type: String, required: true },
  age: { type: Number, required: false },
  verified: { type: Boolean, default: false },
});

const User = mongoose.model('User', userSchema);

// Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// In-memory OTP storage
const otpStore = {}; 

// Generate OTP Route
app.post('/generate-otp', async (req, res) => {
  const { email } = req.body;

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Generate OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    console.log("myotp", otp);
    
    // Store OTP with expiration time (10 minutes)
    otpStore[email] = {
      otp,
      expiration: Date.now() + 10 * 60 * 1000,
    };

    // Send OTP via email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verify Your Email',
      text: `Your OTP is ${otp}. It will expire in 10 minutes.`,
    });

    res.status(200).json({ message: 'OTP sent to your email' });
  } catch (err) {
    res.status(500).json({ message: 'Error during OTP generation', error: err.message });
  }
});

// Verify OTP Route
app.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;

  try {
    // Check if OTP exists for the provided email
    if (!otpStore[email]) {
      return res.status(400).json({ message: 'OTP not generated or expired' });
    }

    const storedOtp = otpStore[email];

    // Check if OTP has expired
    if (Date.now() > storedOtp.expiration) {
      delete otpStore[email];
      return res.status(400).json({ message: 'OTP has expired' });
    }

    // Validate OTP
    console.log(otp);
    if (otp !== storedOtp.otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // OTP is valid, remove it from the store
    delete otpStore[email];

    res.status(200).json({ message: 'OTP verified successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error during OTP verification', error: err.message });
  }
});

// Signup Route
app.post('/signup', async (req, res) => {
  const { username, email, password, userType, age } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Save user 
    const newUser = new User({
      username,
      email,
      password,
      userType,
      age,
      verified: true,
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully. You can now login.' });
  } catch (err) {
    res.status(500).json({ message: 'Error during signup', error: err.message });
  }
});

// Login Route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Login successful', user });
  } catch (err) {
    res.status(500).json({ message: 'Error during login', error: err.message });
  }
});

// Forgot Password Route
app.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the email exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Email not found' });
    }

    // Generate OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // Store OTP with expiration time
    otpStore[email] = {
      otp,
      expiration: Date.now() + 10 * 60 * 1000,
    };

    // Send OTP via email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset OTP',
      text: `Your OTP is ${otp}. It will expire in 10 minutes.`,
    });

    res.status(200).json({ message: 'OTP sent to your email' });
  } catch (err) {
    res.status(500).json({ message: 'Error during OTP generation', error: err.message });
  }
});

// Verify Reset OTP Route
app.post('/verify-reset-otp', async (req, res) => {
  const { email, otp } = req.body;

  try {
    // Check if OTP exists for the provided email
    if (!otpStore[email]) {
      return res.status(400).json({ message: 'OTP not generated or expired' });
    }

    const storedOtp = otpStore[email];

    // Check if OTP has expired
    if (Date.now() > storedOtp.expiration) {
      delete otpStore[email];
      return res.status(400).json({ message: 'OTP has expired' });
    }

    // Validate OTP
    if (otp !== storedOtp.otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // OTP is valid, remove it from the store
    delete otpStore[email];

    res.status(200).json({ message: 'OTP verified successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error during OTP verification', error: err.message });
  }
});

// Reset Password Route
app.post('/reset-password', async (req, res) => {
  const { email, newPassword, confirmPassword } = req.body;

  try {
    // Check if both newPassword and confirmPassword match
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Find the user and update their password
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Email not found' });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (err) {
    res.status(500).json({ message: 'Error during password reset', error: err.message });
  }
});

// Start Server
app.listen(process.env.PORT, process.env.HOST, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});



// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// require('dotenv').config();

// const { generateOtp, verifyOtp } = require('./controllers/authController');
// const { signup, login } = require('./controllers/userController');
// const { forgotPassword, resetPassword } = require('./controllers/otpController');

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// // MongoDB Connection
// mongoose
//   .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('Connected to MongoDB'))
//   .catch((err) => console.error('MongoDB connection error:', err));

// // Routes
// app.post('/generate-otp', generateOtp);
// app.post('/verify-otp', verifyOtp);
// app.post('/signup', signup);
// app.post('/login', login);
// app.post('/forgot-password', forgotPassword);
// app.post('/reset-password', resetPassword);

// // Start Server
// app.listen(process.env.PORT, () => {
//   console.log(`Server running on port ${process.env.PORT}`);
// });
