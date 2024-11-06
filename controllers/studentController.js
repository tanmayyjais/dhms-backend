const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // Import jwt
const Student = require('../models/Student');

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the student exists
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify the password
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create JWT token
    const token = jwt.sign({ id: student._id, role: student.role }, process.env.JWT_SECRET, {
      expiresIn: '1h', // Set token expiry
    });

    res.json({ token, user: { id: student._id, name: student.name, email: student.email, role: student.role } });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error during login. Please try again.' });
  }
};

// Student registration function
exports.registerStudent = async (req, res) => {
  const { name, email, phonenumber, password, hostelDetails, idnumber, enrollmentnumber } = req.body;

  try {
    // Check if any duplicate entries exist
    const existingEmail = await Student.findOne({ email });
    if (existingEmail) return res.status(400).json({ message: 'Email already in use' });

    const existingPhone = await Student.findOne({ phonenumber });
    if (existingPhone) return res.status(400).json({ message: 'Phone number already in use' });

    const existingIdNumber = await Student.findOne({ idnumber });
    if (existingIdNumber) return res.status(400).json({ message: 'ID number already in use' });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new student record
    const newStudent = new Student({
      name,
      email,
      phonenumber,
      password: hashedPassword,
      hostelDetails,
      idnumber,
      enrollmentnumber,
      role: 'student',
    });

    // Save the student to the database
    await newStudent.save();

    res.status(201).json({ message: 'Registration successful! Please log in.' });
  } catch (error) {
    console.error('Error in student registration:', error);
    res.status(500).json({ message: 'Server error during registration. Please try again.' });
  }
};
