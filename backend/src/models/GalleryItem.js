const mongoose = require('mongoose');

const GalleryItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  category: { type: String, default: 'General' }, // e.g., Worship, Youth
  section: { 
    type: String, 
    enum: ['General', 'Hero', 'Video'], 
    default: 'General' 
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('GalleryItem', GalleryItemSchema);