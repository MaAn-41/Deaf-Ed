const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true }, // Made username unique
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  userType: { type: String, required: true },
  age: { type: Number, required: false },
  verified: { type: Boolean, default: false },
});

// Export the User model
const User = mongoose.model('User', userSchema);
module.exports = User;
