// backend/src/routes/liveRoutes.js
const express = require('express');
const router = express.Router();

// IMPORT FROM THE CORRECT FILE NAME
const { getLiveStream, updateLiveStream } = require('../controllers/liveController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getLiveStream);
router.post('/', protect, updateLiveStream);

module.exports = router;