const PrayerRequest = require('../models/PrayerRequest');

// @desc    Submit a prayer request (Public)
// @route   POST /api/prayers
const createPrayer = async (req, res) => {
  const { name, contactNumber, request, isAnonymous } = req.body;
  try {
    const prayer = new PrayerRequest({
      name: isAnonymous ? 'Anonymous' : name,
      contactNumber: isAnonymous ? '' : contactNumber,
      request,
      isAnonymous
    });
    await prayer.save();
    res.status(201).json({ message: 'Prayer request received' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all requests (Admin only)
// @route   GET /api/prayers
const getPrayers = async (req, res) => {
  try {
    const prayers = await PrayerRequest.find().sort({ createdAt: -1 });
    res.json(prayers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Mark as answered/handled
// @route   PUT /api/prayers/:id
const updatePrayerStatus = async (req, res) => {
  try {
    const prayer = await PrayerRequest.findById(req.params.id);
    if (prayer) {
      prayer.status = req.body.status || 'Answered';
      await prayer.save();
      res.json(prayer);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createPrayer, getPrayers, updatePrayerStatus };