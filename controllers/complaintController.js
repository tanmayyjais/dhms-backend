const Complaint = require('../models/Complaint');

exports.createComplaint = async (req, res) => {
  try {
    const complaint = new Complaint(req.body);
    await complaint.save();
    res.status(201).json({ message: 'Complaint submitted successfully' });
  } catch (error) {
    console.error('Error in complaint submission:', error);
    res.status(500).json({ message: 'Failed to submit complaint' });
  }
};
