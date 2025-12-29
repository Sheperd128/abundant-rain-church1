// backend/src/models/Event.js
const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  location: { type: String, default: 'Abundant Rain Church' },
  ministry: { 
    type: String, 
    enum: ['All', 'Men', 'Women', 'Youth', 'Children'], 
    default: 'All' 
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Event', EventSchema);