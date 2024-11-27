const User = require('../models/User');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

// In-memory OTP storage
const otpStore = {};

// Email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Login
exports.login= async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Login successful', user });
  } catch (err) {
    res.status(500).json({ message: 'Error during login', error: err.message });
  }
};

// Forgot Password
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Email not found' });
    }

    const otp = crypto.randomInt(100000, 999999).toString();
    otpStore[email] = {
      otp,
      expiration: Date.now() + 10 * 60 * 1000,
    };

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
};

// Verify Reset OTP
exports.verifyResetOtp = (req, res) => {
  const { email, otp } = req.body;

  if (!otpStore[email]) {
    return res.status(400).json({ message: 'OTP not generated or expired' });
  }

  const storedOtp = otpStore[email];
  if (Date.now() > storedOtp.expiration) {
    delete otpStore[email];
    return res.status(400).json({ message: 'OTP has expired' });
  }

  if (otp !== storedOtp.otp) {
    return res.status(400).json({ message: 'Invalid OTP' });
  }

  delete otpStore[email];
  res.status(200).json({ message: 'OTP verified successfully' });
};

// Reset Password
exports.resetPassword = async (req, res) => {
  const { email, newPassword, confirmPassword } = req.body;

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Email not found' });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (err) {
    res.status(500).json({ message: 'Error during password reset', error: err.message });
  }
};
