const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  userType: { type: String, required: true },
  age: { type: Number },
  verified: { type: Boolean, default: false },
});

module.exports = mongoose.model('User', userSchema);
