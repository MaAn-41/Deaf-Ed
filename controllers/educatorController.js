const Student = require("../models/User");
const EducatorStudent = require("../models/Educator_Student");
const AlphabetsProgress = require("../models/AlphabetsProgress");
const CountingProgress = require("../models/CountingProgress");

exports.retrieveEducatortData = async (req, res) => {
  try {
    const { email } = req.params;
    const student = await Student.findOne({ email });

    if (!student) {
      return res.status(404).json({ message: "Educator not found" });
    }

    return res.status(200).json({
      name: student.username,
      email: student.email,
      fullname: student.fullname,
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
    const userDeletion = await Student.findOneAndDelete({
      username: educatorName,
    });

    if (!userDeletion) {
      return res
        .status(404)
        .json({ message: "Educator not found in User schema" });
    }

    const educatorStudentDeletion = await EducatorStudent.findOneAndDelete({
      educatorUsername: educatorName,
    });

    await AlphabetsProgress.deleteMany({ username: educatorName });
    await CountingProgress.deleteMany({ username: educatorName });

    if (educatorStudentDeletion) {
      return res.status(200).json({
        message: `Educator deleted from User, Educator_Student, AlphabetsProgress, and CountingProgress schemas.`,
      });
    }

    return res.status(200).json({
      message: `Educator deleted from User and AlphabetsProgress, CountingProgress schemas.`,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while deleting educator" });
  }
};
