const mongoose = require("mongoose");

const UrduAlphabetsProgressSchema = new mongoose.Schema({
  username: { type: String, required: true },
  openedLetters: { type: [String], default: [] },
});

module.exports = mongoose.model(
  "UrduAlphabetsProgress",
  UrduAlphabetsProgressSchema
);
