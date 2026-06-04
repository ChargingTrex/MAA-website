const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = 'uploads/images/general';
    if (req.originalUrl.includes('gallery')) {
      folder = file.mimetype.startsWith('video') ? 'uploads/videos/gallery' : 'uploads/images/gallery';
    } else if (req.originalUrl.includes('team')) {
      folder = 'uploads/images/team';
    } else if (req.originalUrl.includes('csr')) {
      folder = 'uploads/images/csr';
    } else if (req.originalUrl.includes('facilities')) {
      folder = 'uploads/images/facilities';
    }
    // Ensure directory exists
    fs.mkdirSync(folder, { recursive: true });
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const uniqueName = `${crypto.randomUUID()}${ext}`;
    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedImages = /jpeg|jpg|png|gif|webp/;
  const allowedVideos = /mp4|webm|mov|avi/;
  const ext = path.extname(file.originalname).toLowerCase().slice(1);
  
  if (file.mimetype.startsWith('image/') && allowedImages.test(ext)) {
    return cb(null, true);
  }
  if (file.mimetype.startsWith('video/') && allowedVideos.test(ext)) {
    return cb(null, true);
  }
  cb(new Error(`Unsupported file type: ${file.originalname}`));
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 200 * 1024 * 1024 } // 200MB max
});

module.exports = upload;
