const express = require('express');
const router = express.Router();
const { createVolunteer, getVolunteers, updateVolunteerStatus } = require('../controllers/volunteerController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', createVolunteer); // Public
router.get('/', protect, getVolunteers); // Admin only
router.put('/:id', protect, updateVolunteerStatus); // Admin update

module.exports = router;