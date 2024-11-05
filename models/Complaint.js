const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, enum: ['electricity', 'water', 'furniture', 'cleaning'], required: true },
    status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' },
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    staffId: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
  });
  
  module.exports = mongoose.model('Complaint', complaintSchema);
  