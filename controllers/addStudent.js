const EducatorStudent = require('../models/Educator_Student');
const User = require('../models/User'); 

const addStudent = async (req, res) => {
  const { studentUsername, educatorUsername, section } = req.body;
  try {
    const studentExists = await User.findOne({ username: studentUsername });
    if (!studentExists) {
      return res.status(404).json({ message: 'Student username does not exist.' });
    }

    const existingEntry = await EducatorStudent.findOne({ studentUsername, educatorUsername });
    if (existingEntry) {
      return res.status(400).json({ message: 'Student is already added to this educator.' });
    }

    const newEntry = new EducatorStudent({ studentUsername, educatorUsername, section });
    await newEntry.save();

    res.status(201).json({ message: 'Student added successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
};

module.exports = { addStudent };
