const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const studentController = require("./controllers/studentController");
const EducatorController = require("./controllers/educatorController");
const addStudent = require("./controllers/addStudent");
const remStudent = require("./controllers/RemoveStudent");

require("dotenv").config();

const {
  generateOtp,
  verifyOtp,
  signup,
} = require("./controllers/signupController");

const {
  login,
  forgotPassword,
  verifyResetOtp,
  resetPassword,
} = require("./controllers/loginController");

const {
  getAlphabetsProgress,
  updateAlphabetsProgress,
} = require("./controllers/AlphabetProgressController");
const app = express();
app.use(cors());
app.use(bodyParser.json());

const {
  getCountingProgress,
  updateCountingProgress,
} = require("./controllers/CountingProgressController");

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Signup Routes
app.post("/generate-otp", generateOtp);
app.post("/verify-otp", verifyOtp);
app.post("/signup", signup);

// Login Routes
app.post("/login", login);
app.post("/forgot-password", forgotPassword);
app.post("/verify-reset-otp", verifyResetOtp);
app.post("/reset-password", resetPassword);

//retriving student data
app.get("/students/:email", studentController.retrieveStudentData);

//retriving educator data
app.get("/educators/:email", EducatorController.retrieveEducatortData);

//teacher student db
app.post("/add-student", addStudent.addStudent);

app.get("/sections", remStudent.getSections);
app.get("/students", remStudent.getStudents);
app.post("/remove-student", remStudent.removeStudent);

//delete profiles
app.delete("/delete-educator/:educatorName", EducatorController.deleteEducator);

//delete profiles
app.delete("/delete-student/:studentName", studentController.deleteStudent);

// Alphabet Progress Routes
app.get("/alphabetsProgress", getAlphabetsProgress);
app.post("/alphabetsProgress", updateAlphabetsProgress);

app.get("/countingProgress", getCountingProgress);
app.post("/countingProgress", updateCountingProgress);

//updating studentprofile
app.put("/students", studentController.updateStudentProfile);

// Start Server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
