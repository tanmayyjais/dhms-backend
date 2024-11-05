const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const authMiddleware = require('../middlewares/authMiddleware');

// Student registration and login
router.post('/register', studentController.registerStudent);
router.post('/login', studentController.loginStudent);

// Students file complaints (protected route)
router.post('/complaints', authMiddleware.verifyToken, studentController.fileComplaint);

module.exports = router;
