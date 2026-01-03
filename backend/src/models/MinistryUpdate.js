const mongoose = require('mongoose');

const MinistryUpdateSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  ministry: { 
    type: String, 
    required: true,
    default: 'General'
  }, 
  image: { type: String }, // <--- NEW: Stores the link to the image
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MinistryUpdate', MinistryUpdateSchema);