const User = require("../models/User");
const EducatorStudent = require("../models/Educator_Student");

// Fetch all students in a section
exports.getStudentsBySection = async (req, res) => {
  try {
    const { section, educatorEmail } = req.query;

    const students = await EducatorStudent.find({ section, educatorEmail });

    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch students" });
  }
};

exports.addStudent = async (req, res) => {
  try {
    const { section, educatorUsername, educatorEmail, studentUsername } =
      req.body;

    const studentExists = await User.findOne({ username: studentUsername });
    if (!studentExists) {
      return res.status(400).json({ error: "Student does not exist" });
    }

    const existingStudent = await EducatorStudent.findOne({
      educatorEmail,
      studentUsername,
    });

    if (existingStudent) {
      return res.status(400).json({
        error: "Student already exists in this section or another section",
      });
    }

    const newStudent = new EducatorStudent({
      section,
      educatorUsername,
      educatorEmail,
      studentUsername,
    });

    await newStudent.save();

    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ error: "Failed to add student" });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedStudent = await EducatorStudent.findByIdAndDelete(id);

    if (!deletedStudent) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete student" });
  }
};
