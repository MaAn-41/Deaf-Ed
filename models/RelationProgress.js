const mongoose = require("mongoose");

const RelationProgressSchema = new mongoose.Schema({
  username: { type: String, required: true },
  openedWords: { type: [String], default: [] },
});

module.exports = mongoose.model("RelationProgress", RelationProgressSchema);
