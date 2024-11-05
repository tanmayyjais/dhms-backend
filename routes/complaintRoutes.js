const express = require('express');
const router = express.Router();
const complaintController = require('../controllers/complaintController');
const authMiddleware = require('../middlewares/authMiddleware');

// View specific complaint (students can check their own complaints)
router.get('/:id', authMiddleware.verifyToken, complaintController.getComplaint);

module.exports = router;
