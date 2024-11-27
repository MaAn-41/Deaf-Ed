const Student = require('../models/User'); // Assuming Student is your model

// Controller to retrieve student data based on email
exports.retrieveEducatortData = async (req, res) => {
  try {
    const { email } = req.params; // Get email from request params
    const student = await Student.findOne({ email }); // Query the database using email

    if (!student) {
      return res.status(404).json({ message: 'Educator not found' });
    }

    // Send back the student data
    return res.status(200).json({
      name: student.username,
      email: student.email,
      age: student.age, // or any other fields you want to retrieve
      // Add other fields you want to send back
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
