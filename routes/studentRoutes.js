const express = require('express');
const { registerStudent, loginUser } = require('../controllers/studentController');
const router = express.Router();

// Route for student registration
router.post('/login', loginUser);
router.post('/register', registerStudent);

module.exports = router;
