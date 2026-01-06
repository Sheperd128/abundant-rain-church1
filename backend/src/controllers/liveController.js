// CHANGE THIS LINE: It must match the file name you just renamed
const Livestream = require('../models/Live'); 

// @desc    Get the current active stream
// @route   GET /api/live
const getLiveStream = async (req, res) => {
  try {
    const stream = await Livestream.findOne();
    res.json(stream || { 
      platform: 'YouTube', 
      embedUrl: '', 
      isActive: false, 
      youtubeLink: 'https://youtube.com', 
      facebookLink: 'https://facebook.com' 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update the stream link & social links
// @route   POST /api/live
const updateLiveStream = async (req, res) => {
  const { platform, embedUrl, isActive, youtubeLink, facebookLink } = req.body;

  try {
    const stream = await Livestream.findOneAndUpdate(
      {}, // Filter (find the first document)
      { 
        platform, 
        embedUrl, 
        isActive, 
        youtubeLink, 
        facebookLink, 
        updatedAt: Date.now() 
      },
      { new: true, upsert: true } // Create if doesn't exist
    );
    res.json(stream);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getLiveStream, updateLiveStream };