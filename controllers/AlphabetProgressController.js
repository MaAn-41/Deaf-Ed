const AlphabetsProgress = require("../models/AlphabetsProgress");

exports.getAlphabetsProgress = async (req, res) => {
  const { username } = req.query;

  try {
    const progress = await AlphabetsProgress.findOne({ username });
    if (!progress) {
      return res.status(200).json({ openedLetters: [] });
    }
    res.status(200).json(progress);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching progress", error: err.message });
  }
};

exports.updateAlphabetsProgress = async (req, res) => {
  const { username, letter } = req.body;

  try {
    let progress = await AlphabetsProgress.findOne({ username });
    if (!progress) {
      progress = new AlphabetsProgress({ username, openedLetters: [letter] });
    } else if (!progress.openedLetters.includes(letter)) {
      progress.openedLetters.push(letter);
    }
    await progress.save();
    res.status(200).json({ message: "Progress updated successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating progress", error: err.message });
  }
};
