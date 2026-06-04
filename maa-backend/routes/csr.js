const express = require('express');
const router = express.Router();
const { CSRActivity } = require('../models');
const { requireAuth } = require('../middleware/authMiddleware');
const upload = require('../config/multer');
const fs = require('fs');
const path = require('path');

// GET /api/csr — public
router.get('/', async (req, res, next) => {
  try {
    const activities = await CSRActivity.findAll({ order: [['date', 'DESC'], ['id', 'DESC']] });
    res.json(activities);
  } catch (err) {
    next(err);
  }
});

// GET /api/csr/:id — public, single activity
router.get('/:id', async (req, res, next) => {
  try {
    const activity = await CSRActivity.findByPk(req.params.id);
    if (!activity) return res.status(404).json({ error: 'Activity not found' });
    res.json(activity);
  } catch (err) {
    next(err);
  }
});

// POST /api/csr — protected
router.post('/', requireAuth, upload.array('images', 5), async (req, res, next) => {
  try {
    const { title, description, date } = req.body;
    if (!title) return res.status(400).json({ error: 'Title is required' });

    let imagePaths = [];
    if (req.files && req.files.length > 0) {
      imagePaths = req.files.map(f => `/uploads/images/csr/${f.filename}`);
    }

    const activity = await CSRActivity.create({
      title: title.trim(),
      description: description?.trim() || null,
      date: date || null,
      images: imagePaths, // Sequelize JSON type handles serialization
    });
    res.status(201).json(activity);
  } catch (err) {
    next(err);
  }
});

// PUT /api/csr/:id — protected
router.put('/:id', requireAuth, upload.array('images', 5), async (req, res, next) => {
  try {
    const activity = await CSRActivity.findByPk(req.params.id);
    if (!activity) return res.status(404).json({ error: 'Activity not found' });

    const { title, description, date } = req.body;

    if (title) activity.title = title.trim();
    if (description !== undefined) activity.description = description?.trim() || null;
    if (date !== undefined) activity.date = date || null;

    // If new images uploaded, append to existing
    if (req.files && req.files.length > 0) {
      const newPaths = req.files.map(f => `/uploads/images/csr/${f.filename}`);
      const existingImages = Array.isArray(activity.images) ? activity.images : [];
      activity.images = [...existingImages, ...newPaths];
    }

    await activity.save();
    res.json(activity);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/csr/:id — protected
router.delete('/:id', requireAuth, async (req, res, next) => {
  try {
    const activity = await CSRActivity.findByPk(req.params.id);
    if (!activity) return res.status(404).json({ error: 'Activity not found' });

    // Clean up images from disk
    if (Array.isArray(activity.images)) {
      activity.images.forEach(imgPath => {
        const fullPath = path.join(__dirname, '..', imgPath);
        if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
      });
    }

    await activity.destroy();
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
