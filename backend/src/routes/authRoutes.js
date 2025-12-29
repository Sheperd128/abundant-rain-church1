const express = require('express');
const router = express.Router();
const { loginUser, getProfile, getUsers, registerUser, deleteUser } = require('../controllers/authController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/login', loginUser);
router.get('/profile', protect, getProfile);

// NEW ADMIN ROUTES
router.route('/users')
  .get(protect, admin, getUsers)
  .post(protect, admin, registerUser);

router.route('/users/:id')
  .delete(protect, admin, deleteUser);

module.exports = router;