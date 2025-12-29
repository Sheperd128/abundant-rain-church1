const Volunteer = require('../models/Volunteer');

// @desc    Submit application
// @route   POST /api/volunteers
const createVolunteer = async (req, res) => {
  try {
    const volunteer = new Volunteer(req.body);
    await volunteer.save();
    res.status(201).json({ message: 'Application received' });
  } catch (error) {
    res.status(400).json({ message: 'Error submitting application' });
  }
};

// @desc    Get all applications (Admin)
// @route   GET /api/volunteers
const getVolunteers = async (req, res) => {
  try {
    const volunteers = await Volunteer.find().sort({ createdAt: -1 });
    res.json(volunteers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update status (e.g. Mark as Contacted)
// @route   PUT /api/volunteers/:id
const updateVolunteerStatus = async (req, res) => {
  try {
    const volunteer = await Volunteer.findById(req.params.id);
    if(volunteer) {
      volunteer.status = req.body.status || volunteer.status;
      await volunteer.save();
      res.json(volunteer);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createVolunteer, getVolunteers, updateVolunteerStatus };