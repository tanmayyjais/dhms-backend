const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  department: { type: String, required: true, enum: ['electrical', 'water', 'furniture', 'cleaning'] },
  description: { type: String, required: true },
  student: {
    name: { type: String, required: true },
    roomNumber: String,
    block: String,
    phoneNumber: Number,
    email: String,
  },
  status: { type: String, default: 'pending', enum: ['pending', 'in-progress', 'completed'] },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Complaint', complaintSchema);
