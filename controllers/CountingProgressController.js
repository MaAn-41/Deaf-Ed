const CountingProgress = require("../models/CountingProgress");

// Fetch progress
exports.getCountingProgress = async (req, res) => {
  const { username } = req.query;

  try {
    const progress = await CountingProgress.findOne({ username });
    if (!progress) {
      return res.status(200).json({ openedNumbers: [] });
    }
    res.status(200).json(progress);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching progress", error: err.message });
  }
};

// Update progress
exports.updateCountingProgress = async (req, res) => {
  const { username, number } = req.body;

  try {
    let progress = await CountingProgress.findOne({ username });
    if (!progress) {
      progress = new CountingProgress({ username, openedNumbers: [number] });
    } else if (!progress.openedNumbers.includes(number)) {
      progress.openedNumbers.push(number);
    }
    await progress.save();
    res.status(200).json({ message: "Progress updated successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating progress", error: err.message });
  }
};
