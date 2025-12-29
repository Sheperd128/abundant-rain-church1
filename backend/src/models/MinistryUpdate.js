const mongoose = require('mongoose');

const MinistryUpdateSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  // Remove 'enum' to allow 'General' or any new ministry names in the future
  ministry: { 
    type: String, 
    required: true,
    default: 'General'
  }, 
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MinistryUpdate', MinistryUpdateSchema);