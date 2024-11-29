const EducatorStudent = require('../models/Educator_Student');

// Fetch sections for a specific educator
exports.getSections = async (req, res) => {
  try {
    const { educatorUsername } = req.query;
    const sections = await EducatorStudent.find({ educatorUsername: educatorUsername }).distinct(
      'Section'
    );
    console.log(educatorUsername);
    res.status(200).json({ sections });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch sections' });
  }
};

// Fetch students in a specific section for an educator
exports.getStudents = async (req, res) => {
  try {
    const { educatorUsername, section } = req.query;
    const students = await EducatorStudent.find({ EducatorUsername: educatorUsername, Section: section }).select(
      'StudentUserName -_id'
    );
    res.status(200).json({ students: students.map((s) => s.StudentUserName) });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch students' });
  }
};

// Remove a student from a section
exports.removeStudent = async (req, res) => {
  try {
    const { educatorUsername, section, student } = req.body;
    const result = await EducatorStudent.deleteOne({
      EducatorUsername: educatorUsername,
      Section: section,
      StudentUserName: student,
    });

    if (result.deletedCount > 0) {
      res.status(200).json({ message: 'Student removed successfully' });
    } else {
      res.status(404).json({ error: 'Student not found in the specified section' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove student' });
  }
};
