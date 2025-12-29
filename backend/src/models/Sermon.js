// backend/src/models/Sermon.js
const mongoose = require('mongoose');

const SermonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  preacher: { type: String, required: true },
  date: { type: Date, required: true },
  videoUrl: { type: String }, // YouTube/Facebook Embed Link
  audioUrl: { type: String }, // Link to MP3
  description: { type: String },
  series: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Sermon', SermonSchema);