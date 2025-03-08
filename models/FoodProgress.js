const mongoose = require("mongoose");

const FoodProgressSchema = new mongoose.Schema({
  username: { type: String, required: true },
  openedWords: { type: [String], default: [] },
});

module.exports = mongoose.model("FoodProgress", FoodProgressSchema);
