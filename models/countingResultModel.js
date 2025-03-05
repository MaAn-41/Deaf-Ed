const mongoose = require("mongoose");

const countingResultSchema = new mongoose.Schema({
  username: { type: String, required: true },
  number: { type: Number, required: true },
  recognized: { type: Number, required: true },
  status: { type: String, enum: ["Correct", "Incorrect"], required: true },
  accuracy: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

const CountingResult = mongoose.model("CountingResult", countingResultSchema);

module.exports = CountingResult;
