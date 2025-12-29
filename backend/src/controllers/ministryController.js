const MinistryUpdate = require('../models/MinistryUpdate');

// 1. Get ALL updates (For the Main News Page)
const getAllUpdates = async (req, res) => {
  try {
    const updates = await MinistryUpdate.find().sort({ createdAt: -1 });
    res.json(updates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2. Get updates by specific category (e.g. "Men", "Women")
const getMinistryUpdates = async (req, res) => {
  try {
    const updates = await MinistryUpdate.find({ ministry: req.params.category })
      .sort({ createdAt: -1 });
    res.json(updates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3. Create a New Update
const createMinistryUpdate = async (req, res) => {
  const { title, content, ministry } = req.body;
  
  // Default to what was sent in the form
  let targetMinistry = ministry;
  
  // LOGIC CHECK: 
  // If user is NOT Superadmin AND NOT Admin, force them to their assigned ministry.
  // This allows 'superadmin' and 'admin' (helpers) to post to 'General' or any group.
  if (req.user.role !== 'superadmin' && req.user.role !== 'admin') {
    if (req.user.ministry && req.user.ministry !== 'General') {
      targetMinistry = req.user.ministry; 
    }
  }

  try {
    const update = new MinistryUpdate({
      title,
      content,
      ministry: targetMinistry,
      author: req.user._id
    });
    const createdUpdate = await update.save();
    res.status(201).json(createdUpdate);
  } catch (error) {
    console.error("Backend Error:", error); // Helps debug in terminal
    res.status(400).json({ message: error.message });
  }
};

// 4. Delete an Update
const deleteMinistryUpdate = async (req, res) => {
  try {
    const update = await MinistryUpdate.findById(req.params.id);
    
    if (update) {
      await update.deleteOne();
      res.json({ message: 'Update removed' });
    } else {
      res.status(404).json({ message: 'Update not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- EXPORTS (CRITICAL) ---
module.exports = { 
  getAllUpdates, 
  getMinistryUpdates, 
  createMinistryUpdate, 
  deleteMinistryUpdate 
};