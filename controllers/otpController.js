const nodemailer = require('nodemailer');
const crypto = require('crypto');
const otpStore = {};

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Generate OTP
const generateOtp = async (req, res, purpose) => {
  const { email } = req.body;

  try {
    // Generate OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // Store OTP with expiration and purpose
    otpStore[email] = {
      otp,
      purpose,
      expiration: Date.now() + 10 * 60 * 1000, // 10 minutes
    };

    // Send OTP via email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Your OTP for ${purpose}`,
      text: `Your OTP is ${otp}. It will expire in 10 minutes.`,
    });

    res.status(200).json({ message: `OTP sent for ${purpose}` });
  } catch (err) {
    res.status(500).json({ message: 'Error sending OTP', error: err.message });
  }
};

// Verify OTP
const verifyOtp = (req, res) => {
  const { email, otp, purpose } = req.body;

  try {
    if (!otpStore[email]) {
      return res.status(400).json({ message: 'OTP not generated or expired' });
    }

    const storedOtp = otpStore[email];

    if (storedOtp.purpose !== purpose) {
      return res.status(400).json({ message: 'OTP purpose mismatch' });
    }

    if (Date.now() > storedOtp.expiration) {
      delete otpStore[email];
      return res.status(400).json({ message: 'OTP has expired' });
    }

    if (otp !== storedOtp.otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    delete otpStore[email];
    res.status(200).json({ message: 'OTP verified successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error verifying OTP', error: err.message });
  }
};

module.exports = { generateOtp, verifyOtp };
