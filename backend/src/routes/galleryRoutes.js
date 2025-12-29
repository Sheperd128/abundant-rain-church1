const express = require('express');
const router = express.Router();
const { getGallery, addPhoto, deletePhoto } = require('../controllers/galleryController');
const { protect } = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');

// --- MULTER CONFIGURATION ---
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

// CHECK FILE TYPE (UPDATED TO ALLOW VIDEOS)
function checkFileType(file, cb) {
  // Allow Images AND Videos
  const filetypes = /jpg|jpeg|png|webp|gif|mp4|mov|avi|mkv/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Mimetype check is looser to allow various video formats
  const mimetype = /image|video/.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Error: Images or Videos only!'));
  }
}

const upload = multer({
  storage,
  limits: { fileSize: 500 * 1024 * 1024 }, // INCREASED LIMIT TO 500MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

// --- ROUTES ---
router.get('/', getGallery);
router.post('/', protect, upload.single('image'), addPhoto);
router.delete('/:id', protect, deletePhoto);

module.exports = router;