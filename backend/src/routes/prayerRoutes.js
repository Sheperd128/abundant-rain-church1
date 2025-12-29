const express = require('express');
const router = express.Router();
const { createPrayer, getPrayers, updatePrayerStatus } = require('../controllers/prayerController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', createPrayer); // Public: Anyone can submit
router.get('/', protect, getPrayers); // Private: Only leaders see
router.put('/:id', protect, updatePrayerStatus); // Private: Mark as answered

module.exports = router;