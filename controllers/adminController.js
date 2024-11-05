const Admin = require('../models/Admin');
const Complaint = require('../models/Complaint');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register Admin
exports.registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const admin = new Admin({ name, email, password: hashedPassword });

  await admin.save();
  res.status(201).json({ message: 'Admin registered successfully' });
};

// Login Admin
exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });

  if (!admin || !await bcrypt.compare(password, admin.password)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET);
  res.json({ token });
};

// Get All Complaints
exports.getAllComplaints = async (req, res) => {
  const complaints = await Complaint.find().populate('studentId').populate('staffId');
  res.json(complaints);
};
