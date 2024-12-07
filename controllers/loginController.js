const User = require("../models/User");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const otpStore = {};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.login = async (req, res) => {
  const { email, password, userType } = req.body;
  const lowerCaseEmail = email.toLowerCase();

  try {
    const user = await User.findOne({ email: lowerCaseEmail });

    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }

    if (!user.verified) {
      return res.status(400).json({ message: "You are blocked by the admin." });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    if (userType !== user.userType) {
      return res
        .status(400)
        .json({ message: `Error: Your role is ${user.userType}` });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ message: "Error during login", error: err.message });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const lowerCaseEmail = email.toLowerCase();

  try {
    const user = await User.findOne({ email: lowerCaseEmail });
    if (!user) {
      return res.status(400).json({ message: "Email not found" });
    }

    const otp = crypto.randomInt(100000, 999999).toString();
    otpStore[lowerCaseEmail] = {
      otp,
      expiration: Date.now() + 10 * 60 * 1000,
    };

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: lowerCaseEmail,
      subject: "Password Reset OTP",
      text: `Your OTP is ${otp}. It will expire in 10 minutes.`,
    });

    res.status(200).json({ message: "OTP sent to your email" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error during OTP generation", error: err.message });
  }
};

exports.verifyResetOtp = (req, res) => {
  const { email, otp } = req.body;
  const lowerCaseEmail = email.toLowerCase();

  if (!otpStore[lowerCaseEmail]) {
    return res.status(400).json({ message: "OTP not generated or expired" });
  }

  const storedOtp = otpStore[lowerCaseEmail];
  if (Date.now() > storedOtp.expiration) {
    delete otpStore[lowerCaseEmail];
    return res.status(400).json({ message: "OTP has expired" });
  }

  if (otp !== storedOtp.otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  delete otpStore[lowerCaseEmail];
  res.status(200).json({ message: "OTP verified successfully" });
};

exports.resetPassword = async (req, res) => {
  const { email, newPassword, confirmPassword } = req.body;
  const lowerCaseEmail = email.toLowerCase();

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(newPassword)) {
    return res.status(400).json({
      message:
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one special character, and one number.",
    });
  }

  try {
    const user = await User.findOne({ email: lowerCaseEmail });
    if (!user) {
      return res.status(400).json({ message: "Email not found" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error during password reset", error: err.message });
  }
};
