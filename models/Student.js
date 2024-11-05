const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phonenumber: { type: Number, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'student' },
  hostelDetails: {
    roomNumber: String,
    block: String,
  },
  idnumber: { type: Number, required: true },
  enrollmentnumber: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
