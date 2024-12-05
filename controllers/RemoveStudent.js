const EducatorStudent = require("../models/Educator_Student");

exports.getSections = async (req, res) => {
  try {
    const { educatorUsername } = req.query;
    console.log(educatorUsername);
    const sections = await EducatorStudent.find({
      educatorUsername: educatorUsername,
    }).distinct("section");
    console.log(sections);
    res.status(200).json({ sections });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch sections" });
  }
};

exports.getStudents = async (req, res) => {
  try {
    const { educatorUsername, section } = req.query;
    const students = await EducatorStudent.find({
      educatorUsername: educatorUsername,
      section: section,
    }).select("studentUsername");
    res.status(200).json({ students: students.map((s) => s.studentUsername) });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch students" });
  }
};

exports.removeStudent = async (req, res) => {
  try {
    const { educatorUsername, section, student } = req.body;
    const result = await EducatorStudent.deleteOne({
      educatorUsername: educatorUsername,
      section: section,
      studentUsername: student,
    });

    if (result.deletedCount > 0) {
      res.status(200).json({ message: "Student removed successfully" });
    } else {
      res
        .status(404)
        .json({ error: "Student not found in the specified section" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to remove student" });
  }
};
