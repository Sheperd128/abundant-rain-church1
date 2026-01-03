const express = require('express');
const router = express.Router();
const { 
  getAllUpdates, 
  getMinistryUpdates, 
  createMinistryUpdate, 
  deleteMinistryUpdate 
} = require('../controllers/ministryController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware'); // Import the new middleware

router.get('/', getAllUpdates);
router.get('/:category', getMinistryUpdates);

// UPDATE THIS LINE: Add 'upload.single'
router.post('/', protect, upload.single('image'), createMinistryUpdate); 

router.delete('/:id', protect, deleteMinistryUpdate);

module.exports = router;