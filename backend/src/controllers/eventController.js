// backend/src/controllers/eventController.js
const Event = require('../models/Event');

// @desc    Get all events
// @route   GET /api/events
// @access  Public
const getEvents = async (req, res) => {
  try {
    // Sort by date (soonest first)
    const events = await Event.find().sort({ startDate: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new event
// @route   POST /api/events
// @access  Private (Admin only)
const createEvent = async (req, res) => {
  // If user is SuperAdmin, they can choose the ministry.
  // If user is a Leader, we FORCE the ministry to be their own.
  let ministryToSave = req.body.ministry;
  
  if (req.user.role !== 'superadmin') {
    ministryToSave = req.user.ministry; // e.g., "Youth"
  }

  const { title, description, startDate, location } = req.body;

  try {
    const event = new Event({
      title,
      description,
      startDate,
      location,
      ministry: ministryToSave, // <--- This ensures Youth leader only posts Youth events
      createdBy: req.user._id
    });

    const createdEvent = await event.save();
    res.status(201).json(createdEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete an event
// @route   DELETE /api/events/:id
// @access  Private (Admin only)
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (event) {
      await event.deleteOne();
      res.json({ message: 'Event removed' });
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getEvents, createEvent, deleteEvent };