// backend/src/models/PrayerRequest.js
const mongoose = require('mongoose');

const PrayerRequestSchema = new mongoose.Schema({
  name: { type: String }, // Optional (if anonymous, this is empty)
  contactNumber: { type: String },
  request: { type: String, required: true },
  isAnonymous: { type: Boolean, default: false },
  status: { 
    type: String, 
    enum: ['New', 'Prayed For', 'Answered'], 
    default: 'New' 
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('PrayerRequest', PrayerRequestSchema);