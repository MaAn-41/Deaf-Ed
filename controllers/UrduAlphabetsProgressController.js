const UrduAlphabetsProgress = require("../models/UrduAlphabetsProgress");

exports.getUrduAlphabetsProgress = async (req, res) => {
  const { username } = req.query;

  try {
    const progress = await UrduAlphabetsProgress.findOne({ username });
    if (!progress) {
      return res.status(200).json({ openedLetters: [] });
    }
    res.status(200).json(progress);
  } catch (err) {
    res
      .status(500)
      .json({
        message: "Error fetching Urdu alphabet progress",
        error: err.message,
      });
  }
};

exports.updateUrduAlphabetsProgress = async (req, res) => {
  const { username, letter } = req.body;

  try {
    let progress = await UrduAlphabetsProgress.findOne({ username });
    if (!progress) {
      progress = new UrduAlphabetsProgress({
        username,
        openedLetters: [letter],
      });
    } else if (!progress.openedLetters.includes(letter)) {
      progress.openedLetters.push(letter);
    }
    await progress.save();
    res
      .status(200)
      .json({ message: "Urdu alphabet progress updated successfully" });
  } catch (err) {
    res
      .status(500)
      .json({
        message: "Error updating Urdu alphabet progress",
        error: err.message,
      });
  }
};
