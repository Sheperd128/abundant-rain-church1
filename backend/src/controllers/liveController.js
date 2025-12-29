// backend/src/controllers/liveController.js
const Livestream = require('../models/Livestream');

// @desc    Get the current active stream
// @route   GET /api/live
const getLiveStream = async (req, res) => {
  try {
    // We only need one document. If none exists, return null.
    const stream = await Livestream.findOne();
    res.json(stream || {});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update the stream link
// @route   POST /api/live
const updateLiveStream = async (req, res) => {
  const { platform, embedUrl, isActive } = req.body;

  try {
    // Update existing or create new
    const stream = await Livestream.findOneAndUpdate(
      {}, // filter (empty means find the first one)
      { platform, embedUrl, isActive, updatedAt: Date.now() },
      { new: true, upsert: true } // options
    );
    res.json(stream);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getLiveStream, updateLiveStream };