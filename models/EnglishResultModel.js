const mongoose = require("mongoose");

const EnglishResultSchema = new mongoose.Schema({
  username: { type: String, required: true },
  letter: { type: String, required: true },
  recognized: { type: String, required: true },
  status: { type: String, enum: ["Correct", "Incorrect"], required: true },
  accuracy: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("EnglishResult", EnglishResultSchema);
