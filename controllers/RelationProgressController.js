const RelationProgress = require("../models/RelationProgress");

exports.getRelationProgress = async (req, res) => {
  const { username } = req.query;

  try {
    const progress = await RelationProgress.findOne({ username });
    if (!progress) {
      return res.status(200).json({ openedWords: [] });
    }
    res.status(200).json(progress);
  } catch (err) {
    res.status(500).json({
      message: "Error fetching relation progress",
      error: err.message,
    });
  }
};

exports.updateRelationProgress = async (req, res) => {
  const { username, word } = req.body;

  try {
    let progress = await RelationProgress.findOne({ username });
    if (!progress) {
      progress = new RelationProgress({
        username,
        openedWords: [word],
      });
    } else if (!progress.openedWords.includes(word)) {
      progress.openedWords.push(word);
    }
    await progress.save();
    res.status(200).json({ message: "Relation progress updated successfully" });
  } catch (err) {
    res.status(500).json({
      message: "Error updating relation progress",
      error: err.message,
    });
  }
};
