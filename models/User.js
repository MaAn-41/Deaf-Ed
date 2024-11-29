const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true }, 
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  userType: { type: String, required: true },
  age: { type: Number, required: false },
  verified: { type: Boolean, default: false },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
