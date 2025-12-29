const GalleryItem = require('../models/GalleryItem');

// Get all photos
const getGallery = async (req, res) => {
  try {
    const photos = await GalleryItem.find().sort({ createdAt: -1 });
    res.json(photos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a photo
// ... inside addPhoto function ...
const addPhoto = async (req, res) => {
  try {
    const { title, category, section } = req.body; // <--- ADD section HERE
    
    let imageUrl = '';
    
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    } else if (req.body.imageUrl) {
      imageUrl = req.body.imageUrl;
    } else {
      return res.status(400).json({ message: 'Please upload an image or video URL' });
    }

    // Include section in the new item
    const photo = new GalleryItem({ title, imageUrl, category, section }); 
    await photo.save();
    res.status(201).json(photo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const deletePhoto = async (req, res) => {
  try {
    const photo = await GalleryItem.findById(req.params.id);
    if (photo) {
      await photo.deleteOne();
      res.json({ message: 'Photo removed' });
    } else {
      res.status(404).json({ message: 'Photo not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getGallery, addPhoto, deletePhoto };