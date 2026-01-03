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

// 3. Create a New Update (With Image Support)
const createMinistryUpdate = async (req, res) => {
  const { title, content, ministry } = req.body;
  
  // Handle Image Upload - Check if a file was sent
  // We save the path starting with /uploads/ because that matches the frontend public folder structure
  const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

  let targetMinistry = ministry;
  
  // LOGIC CHECK: 
  // If user is NOT Superadmin AND NOT Admin, force them to their assigned ministry.
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
      image: imagePath, // <--- Save the image path to database
      author: req.user._id
    });
    const createdUpdate = await update.save();
    res.status(201).json(createdUpdate);
  } catch (error) {
    console.error("Backend Error:", error); 
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

// --- EXPORTS ---
module.exports = { 
  getAllUpdates, 
  getMinistryUpdates, 
  createMinistryUpdate, 
  deleteMinistryUpdate 
};