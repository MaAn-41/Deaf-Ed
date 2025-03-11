const Educator = require("../models/User");
const AlphabetsProgress = require("../models/AlphabetsProgress");
const CountingProgress = require("../models/CountingProgress");
const Educator_Student = require("../models/Educator_Student");
const section = require("../models/Section");

const UrduAlphabetsProgress = require("../models/UrduAlphabetsProgress");
const FoodProgress = require("../models/FoodProgress");
const RelationProgress = require("../models/RelationProgress");
exports.retrieveEducatortData = async (req, res) => {
  try {
    const { email } = req.params;
    const educator = await Educator.findOne({ email });

    if (!educator) {
      return res.status(404).json({ message: "Educator not found" });
    }

    return res.status(200).json({
      name: educator.username,
      email: educator.email,
      fullname: educator.fullname,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

exports.deleteEducator = async (req, res) => {
  const { educatorName } = req.params;

  try {
    const userDeletion = await Educator.findOneAndDelete({
      username: educatorName,
    });

    if (!userDeletion) {
      return res
        .status(404)
        .json({ message: "Educator not found in User schema" });
    }

    await Educator_Student.deleteMany({ educatorUsername: educatorName });

    await section.deleteMany({ educatorUsername: educatorName });

    await AlphabetsProgress.deleteMany({ username: educatorName });
    await CountingProgress.deleteMany({ username: educatorName });

    await UrduAlphabetsProgress.deleteMany({ username: educatorName });
    await FoodProgress.deleteMany({ username: educatorName });
    await RelationProgress.deleteMany({ username: educatorName });

    return res.status(200).json({
      message: `Educator and related data deleted successfully from User, Educator_Student, Section, AlphabetsProgress, and CountingProgress schemas.`,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while deleting educator" });
  }
};

exports.updateEducatorFullName = async (req, res) => {
  const { email, fullname } = req.body;
  const fullnameRegex = /^[A-Za-z\s]+$/;

  if (!fullnameRegex.test(fullname)) {
    return res.status(400).json({
      message: "Full name must contain only alphabets and spaces",
    });
  }

  try {
    const educator = await Educator.findOne({ email: email });

    if (!educator) {
      return res.status(404).json({ message: "Educator not found" });
    }

    educator.fullname = fullname;

    await educator.save();

    return res.status(200).json({ message: "Full name updated successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while updating the full name" });
  }
};
