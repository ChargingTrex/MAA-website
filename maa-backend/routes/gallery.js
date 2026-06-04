const express = require('express');
const router = express.Router();
const { GalleryPhoto, GalleryVideo } = require('../models');
const { requireAuth } = require('../middleware/authMiddleware');
const upload = require('../config/multer');
const fs = require('fs');
const path = require('path');

// ─── PHOTOS ───────────────────────────────────────────────────────────────────

// GET /api/gallery/photos — public
router.get('/photos', async (req, res, next) => {
  try {
    const where = req.query.category ? { category: req.query.category } : {};
    const photos = await GalleryPhoto.findAll({ where, order: [['id', 'DESC']] });
    res.json(photos);
  } catch (err) {
    next(err);
  }
});

// POST /api/gallery/photos — protected
router.post('/photos', requireAuth, upload.single('image'), async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No image uploaded' });

    const photo = await GalleryPhoto.create({
      filename: req.file.filename,
      filepath: `/uploads/images/gallery/${req.file.filename}`,
      caption: req.body.caption || '',
      category: req.body.category || 'general',
    });
    res.status(201).json(photo);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/gallery/photos/:id — protected
router.delete('/photos/:id', requireAuth, async (req, res, next) => {
  try {
    const photo = await GalleryPhoto.findByPk(req.params.id);
    if (!photo) return res.status(404).json({ error: 'Photo not found' });

    const fullPath = path.join(__dirname, '..', photo.filepath);
    if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);

    await photo.destroy();
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

// ─── VIDEOS ───────────────────────────────────────────────────────────────────

// GET /api/gallery/videos — public
router.get('/videos', async (req, res, next) => {
  try {
    const videos = await GalleryVideo.findAll({ order: [['id', 'DESC']] });
    res.json(videos);
  } catch (err) {
    next(err);
  }
});

// POST /api/gallery/videos — protected (uploads video + optional thumbnail)
router.post('/videos', requireAuth, upload.fields([
  { name: 'video', maxCount: 1 },
  { name: 'thumbnail', maxCount: 1 },
]), async (req, res, next) => {
  try {
    const videoFile = req.files?.video?.[0];
    const thumbnailFile = req.files?.thumbnail?.[0];

    if (!videoFile) return res.status(400).json({ error: 'No video file uploaded' });

    const video = await GalleryVideo.create({
      filename: videoFile.filename,
      filepath: `/uploads/videos/gallery/${videoFile.filename}`,
      thumbnail: thumbnailFile ? `/uploads/images/gallery/${thumbnailFile.filename}` : null,
      title: req.body.title || 'Untitled Video',
    });
    res.status(201).json(video);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/gallery/videos/:id — protected
router.delete('/videos/:id', requireAuth, async (req, res, next) => {
  try {
    const video = await GalleryVideo.findByPk(req.params.id);
    if (!video) return res.status(404).json({ error: 'Video not found' });

    const videoPath = path.join(__dirname, '..', video.filepath);
    if (fs.existsSync(videoPath)) fs.unlinkSync(videoPath);

    if (video.thumbnail) {
      const thumbPath = path.join(__dirname, '..', video.thumbnail);
      if (fs.existsSync(thumbPath)) fs.unlinkSync(thumbPath);
    }

    await video.destroy();
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
