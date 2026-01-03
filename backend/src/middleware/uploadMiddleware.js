const multer = require('multer');
const path = require('path');

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // We save images into the FRONTEND public folder so they are accessible immediately
    // Adjust this path if your folder structure is different
    cb(null, '../frontend/public/uploads/'); 
  },
  filename: (req, file, cb) => {
    // Rename file to be unique (timestamp + original name)
    cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`);
  },
});

// File filter (Images only)
const fileFilter = (req, file, cb) => {
  const filetypes = /jpg|jpeg|png|webp/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Images only!'));
  }
};

const upload = multer({ 
  storage,
  limits: { fileSize: 5000000 }, // 5MB limit
  fileFilter 
});

module.exports = upload;