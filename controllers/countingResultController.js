const CountingResult = require("../models/countingResultModel");

const saveCountingTestResult = async (req, res) => {
  try {
    const { username, number, recognized, accuracy, status, timestamp } =
      req.body;

    if (
      !username ||
      number === undefined ||
      recognized === undefined ||
      accuracy === undefined ||
      !status
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newResult = new CountingResult({
      username,
      number,
      recognized,
      accuracy,
      status,
      timestamp,
    });
    await newResult.save();

    res.status(201).json({
      message: "Counting test result saved successfully",
      data: newResult,
    });
  } catch (error) {
    console.error("Error saving Counting test result:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const getCountingResults = async (req, res) => {
  try {
    const { username } = req.query;
    if (!username) {
      return res.status(400).json({ error: "Username is required" });
    }

    const results = await CountingResult.find({ username });
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch English results" });
  }
};

module.exports = { saveCountingTestResult, getCountingResults };
