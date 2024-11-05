const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// Admin registration and login
router.post('/register', adminController.registerAdmin);
router.post('/login', adminController.loginAdmin);

// Admin view all complaints (protected and role-based route)
router.get('/complaints', authMiddleware.verifyToken, roleMiddleware.verifyRole('admin'), adminController.getAllComplaints);

module.exports = router;
