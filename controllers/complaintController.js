const Complaint = require('../models/Complaint');

// Get Complaint (Student View)
exports.getComplaint = async (req, res) => {
  const complaint = await Complaint.findOne({ _id: req.params.id, studentId: req.user.id });
  if (!complaint) return res.status(404).json({ message: 'Complaint not found' });
  res.json(complaint);
};
