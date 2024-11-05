const Student = require('../models/Student');
const Complaint = require('../models/Complaint');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register Student
exports.registerStudent = async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const student = new Student({ name, email, password: hashedPassword });

  await student.save();
  res.status(201).json({ message: 'Student registered successfully' });
};

// Login Student
exports.loginStudent = async (req, res) => {
  const { email, password } = req.body;
  const student = await Student.findOne({ email });
  
  if (!student || !await bcrypt.compare(password, student.password)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: student._id, role: student.role }, process.env.JWT_SECRET);
  res.json({ token });
};

// File Complaint
exports.fileComplaint = async (req, res) => {
  const { title, description, category } = req.body;
  const complaint = new Complaint({ title, description, category, studentId: req.user.id });
  
  await complaint.save();
  res.status(201).json({ message: 'Complaint filed successfully', complaint });
};
