const EnglishResult = require("../models/EnglishResultModel");

const saveEnglishTestResult = async (req, res) => {
  try {
    const { username, letter, recognized, status, accuracy, timestamp } =
      req.body;
    console.log(username, letter, status, accuracy);
    const newResult = new EnglishResult({
      username,
      letter,
      recognized,
      status,
      accuracy,
      timestamp,
    });

    await newResult.save();
    res
      .status(201)
      .json({ message: "English test result saved successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error saving English test result" });
  }
};
const getEnglishResults = async (req, res) => {
  try {
    const { username } = req.query;
    if (!username) {
      return res.status(400).json({ error: "Username is required" });
    }

    const results = await EnglishResult.find({ username });
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch English results" });
  }
};

module.exports = { saveEnglishTestResult, getEnglishResults };
