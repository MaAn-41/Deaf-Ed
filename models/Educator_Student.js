const mongoose = require('mongoose');

const educatorStudentSchema = new mongoose.Schema({
  studentUsername: {
    type: String,
    required: true,
  },
  educatorUsername: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
    match: /^[A-Z]{1}$/, 
  },
});

module.exports = mongoose.model('Educator_Student', educatorStudentSchema);
