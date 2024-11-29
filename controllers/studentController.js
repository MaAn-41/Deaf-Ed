const Student = require('../models/User'); 

exports.retrieveStudentData = async (req, res) => {
  try {
    const { email } = req.params; 
    const student = await Student.findOne({ email }); 

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    return res.status(200).json({
      name: student.username,
      email: student.email,
      age: student.age, 
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
