const Sermon = require('../models/Sermon');

// Get all sermons
const getSermons = async (req, res) => {
  try {
    const sermons = await Sermon.find().sort({ date: -1 }); // Newest first
    res.json(sermons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create sermon
const createSermon = async (req, res) => {
  const { title, preacher, date, videoUrl, description } = req.body;
  try {
    const sermon = new Sermon({ title, preacher, date, videoUrl, description });
    const createdSermon = await sermon.save();
    res.status(201).json(createdSermon);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete sermon
const deleteSermon = async (req, res) => {
  try {
    const sermon = await Sermon.findById(req.params.id);
    if (sermon) {
      await sermon.deleteOne();
      res.json({ message: 'Sermon removed' });
    } else {
      res.status(404).json({ message: 'Sermon not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getSermons, createSermon, deleteSermon };