const mongoose = require('mongoose');

const VolunteerSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String },
  ageGroup: { type: String, required: true },
  
  // Church Connection
  attendanceDuration: { type: String },
  isMember: { type: String }, // "Yes" or "No"
  
  // Interests & Skills
  ministries: [{ type: String }], // Array of selected ministries
  skills: { type: String },
  availability: { type: String },
  
  status: { type: String, default: 'New' }, // New, Contacted, Assigned
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Volunteer', VolunteerSchema);