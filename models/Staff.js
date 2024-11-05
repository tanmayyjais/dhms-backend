const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phonenumber: { type: Number, required: true },
    password: { type: String, required: true },
    role: { type: String, default: 'staff' },
    department: { 
      type: String, 
      enum: ['electricity', 'water', 'furniture', 'cleaning'], 
      required: true 
    },
  }, { timestamps: true });
  
  module.exports = mongoose.model('Staff', staffSchema);
  