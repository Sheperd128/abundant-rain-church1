const mongoose = require('mongoose');

const LiveSchema = new mongoose.Schema({
  platform: { type: String, default: 'YouTube' },
  embedUrl: { type: String, default: '' },
  isActive: { type: Boolean, default: false },
  // ADD THESE TWO LINES:
  youtubeLink: { type: String, default: 'https://youtube.com' },
  facebookLink: { type: String, default: 'https://facebook.com' }
}, { timestamps: true });

module.exports = mongoose.model('Live', LiveSchema);