const Student = require("../models/User");
const EducatorStudent = require("../models/Educator_Student");
const AlphabetsProgress = require("../models/AlphabetsProgress");
const CountingProgress = require("../models/CountingProgress");

exports.retrieveStudentData = async (req, res) => {
  try {
    const { email } = req.params;
    const student = await Student.findOne({ email });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    return res.status(200).json({
      name: student.username,
      email: student.email,
      age: student.age,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

exports.deleteStudent = async (req, res) => {
  const { studentName } = req.params;

  try {
    const userDeletion = await Student.findOneAndDelete({
      username: studentName,
    });

    if (!userDeletion) {
      return res
        .status(404)
        .json({ message: "Student not found in User schema" });
    }

    const educatorStudentDeletion = await EducatorStudent.findOneAndDelete({
      studentUsername: studentName,
    });

    await AlphabetsProgress.deleteMany({ username: studentName });
    await CountingProgress.deleteMany({ username: studentName });

    if (educatorStudentDeletion) {
      return res.status(200).json({
        message: `Student deleted from User, Educator_Student, AlphabetsProgress, and CountingProgress schemas.`,
      });
    }

    return res.status(200).json({
      message: `Student deleted from User and AlphabetsProgress, CountingProgress schemas.`,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while deleting student" });
  }
};
