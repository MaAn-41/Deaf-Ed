const FoodProgress = require("../models/FoodProgress");

exports.getFoodProgress = async (req, res) => {
  const { username } = req.query;

  try {
    const progress = await FoodProgress.findOne({ username });
    if (!progress) {
      return res.status(200).json({ openedWords: [] });
    }
    res.status(200).json(progress);
  } catch (err) {
    res.status(500).json({
      message: "Error fetching food progress",
      error: err.message,
    });
  }
};

exports.updateFoodProgress = async (req, res) => {
  const { username, word } = req.body;

  try {
    let progress = await FoodProgress.findOne({ username });
    if (!progress) {
      progress = new FoodProgress({
        username,
        openedWords: [word],
      });
    } else if (!progress.openedWords.includes(word)) {
      progress.openedWords.push(word);
    }
    await progress.save();
    res.status(200).json({ message: "Food progress updated successfully" });
  } catch (err) {
    res.status(500).json({
      message: "Error updating food progress",
      error: err.message,
    });
  }
};
