const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// Staff registration and login
router.post('/register', staffController.registerStaff);
router.post('/login', staffController.loginStaff);

// Staff update complaint status (protected and role-based route)
router.patch('/complaints/:id/status', authMiddleware.verifyToken, roleMiddleware.verifyRole('staff'), staffController.updateComplaintStatus);

module.exports = router;
