const express = require('express');
const router = express.Router();
const { 
  getAllUpdates, 
  getMinistryUpdates, 
  createMinistryUpdate, 
  deleteMinistryUpdate 
} = require('../controllers/ministryController');
const { protect } = require('../middleware/authMiddleware');

// 1. GET ALL UPDATES (This is what the News page uses)
router.get('/', getAllUpdates); 

// 2. Get updates by specific category (e.g., /api/ministries/Men)
router.get('/:category', getMinistryUpdates);

// 3. Create and Delete (Protected)
router.post('/', protect, createMinistryUpdate);
router.delete('/:id', protect, deleteMinistryUpdate);

module.exports = router;