const UrduResult = require("../models/urduResultModel");

const saveUrduTestResult = async (req, res) => {
  try {
    const { username, letter, recognized, status, accuracy, timestamp } =
      req.body;
    console.log(1);
    if (
      !username ||
      !letter ||
      !recognized ||
      accuracy === undefined ||
      !status
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newResult = new UrduResult({
      username,
      letter,
      recognized,
      status,
      accuracy,
      timestamp,
    });
    await newResult.save();

    res.status(201).json({
      message: "Urdu test result saved successfully",
      data: newResult,
    });
  } catch (error) {
    console.error("Error saving Urdu test result:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getUrduResults = async (req, res) => {
  try {
    const { username } = req.query;
    if (!username) {
      return res.status(400).json({ error: "Username is required" });
    }

    const results = await UrduResult.find({ username });
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch English results" });
  }
};

module.exports = { saveUrduTestResult, getUrduResults };
