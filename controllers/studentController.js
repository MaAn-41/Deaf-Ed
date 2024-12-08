const Student = require("../models/User");
const AlphabetsProgress = require("../models/AlphabetsProgress");
const CountingProgress = require("../models/CountingProgress");
const Educator_Student = require("../models/Educator_Student");
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
      dob: student.dob,
      fullname: student.fullname,
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
    await Educator_Student.deleteMany({ studentUsername: studentName });

    await AlphabetsProgress.deleteMany({ username: studentName });
    await CountingProgress.deleteMany({ username: studentName });

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
exports.updateStudentProfile = async (req, res) => {
  try {
    const { email, fullname, dob } = req.body;

    if (!email || !fullname || !dob) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(fullname)) {
      return res.status(400).json({
        message:
          "Full name must contain alphabets only (no numbers or special characters).",
      });
    }

    const currentDate = new Date();
    const birthDate = new Date(dob);

    if (isNaN(birthDate.getTime())) {
      return res.status(400).json({ message: "Invalid date of birth format." });
    }

    const age = currentDate.getFullYear() - birthDate.getFullYear();
    const monthDiff = currentDate.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    if (age < 4 || age > 14) {
      return res.status(400).json({
        message:
          "Age must be between 4 and 14 years based on the date of birth.",
      });
    }

    const updatedStudent = await Student.findOneAndUpdate(
      { email },
      { fullname, dob },
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found." });
    }

    res.status(200).json({
      message: "Profile updated successfully.",
      student: updatedStudent,
    });
  } catch (error) {
    console.error("Error updating student profile:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};
