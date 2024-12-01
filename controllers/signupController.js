const User = require('../models/User');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const otpStore = {};

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.generateOtp = async (req, res) => {
  const { email,username } = req.body;
  try {
    const isuserNameExists= await User.findOne({username});

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    if (isuserNameExists) {
      return res.status(400).json({ message: 'Username Already Exist' });
    }


    const otp = crypto.randomInt(100000, 999999).toString();
    otpStore[email] = {
      otp,
      expiration: Date.now() + 10 * 60 * 1000,
    };

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
};

exports.verifyOtp = (req, res) => {
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

exports.signup = async (req, res) => {
  const { username, email, password, userType, age, fullname } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'Email already registered' });
  }

  const existingUsername = await User.findOne({ username });
  if (existingUsername) {
    return res.status(400).json({ message: 'Username already registered' });
  }




  if (userType === 'Student' && (age < 4 || age > 14 || isNaN(age))) {
    return res.status(400).json({ message: 'For Students, age must be between 4 and 14' });
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      message:
        'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one special character, and one number.',
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      userType,
      age,
      fullname,
      verified: true,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully. You can now log in.' });
  } catch (err) {
    res.status(500).json({ message: 'Error during signup', error: err.message });
  }
};