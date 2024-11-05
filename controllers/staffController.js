const Staff = require('../models/Staff');
const Complaint = require('../models/Complaint');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register Staff
exports.registerStaff = async (req, res) => {
  const { name, email, password, department } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const staff = new Staff({ name, email, password: hashedPassword, department });

  await staff.save();
  res.status(201).json({ message: 'Staff registered successfully' });
};

// Login Staff
exports.loginStaff = async (req, res) => {
  const { email, password } = req.body;
  const staff = await Staff.findOne({ email });

  if (!staff || !await bcrypt.compare(password, staff.password)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: staff._id, role: staff.role }, process.env.JWT_SECRET);
  res.json({ token });
};

// Update Complaint Status
exports.updateComplaintStatus = async (req, res) => {
  const { status } = req.body;
  const complaint = await Complaint.findOneAndUpdate(
    { _id: req.params.id, staffId: req.user.id },
    { status, updatedAt: Date.now() },
    { new: true }
  );

  if (!complaint) return res.status(404).json({ message: 'Complaint not found' });
  res.json({ message: 'Complaint status updated', complaint });
};
