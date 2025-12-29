const express = require('express');
const router = express.Router();
const { getSermons, createSermon, deleteSermon } = require('../controllers/sermonController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getSermons).post(protect, createSermon);
router.route('/:id').delete(protect, deleteSermon);

module.exports = router;