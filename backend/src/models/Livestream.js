// backend/src/models/Livestream.js
const mongoose = require('mongoose');

const LivestreamSchema = new mongoose.Schema({
  platform: { type: String, enum: ['Facebook', 'YouTube'], required: true },
  embedUrl: { type: String, required: true },
  isActive: { type: Boolean, default: false },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Livestream', LivestreamSchema);