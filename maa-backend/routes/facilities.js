const express = require('express');
const router = express.Router();
const { FacilityItem } = require('../models');
const { requireAuth } = require('../middleware/authMiddleware');
const upload = require('../config/multer');
const fs = require('fs');
const path = require('path');

// GET /api/facilities — public (optionally filter by category)
router.get('/', async (req, res, next) => {
  try {
    const where = req.query.category ? { category: req.query.category } : {};
    const items = await FacilityItem.findAll({
      where,
      order: [['display_order', 'ASC'], ['id', 'ASC']],
    });
    res.json(items);
  } catch (err) {
    next(err);
  }
});

// POST /api/facilities — protected, upload image + save record
router.post('/', requireAuth, upload.single('image'), async (req, res, next) => {
  try {
    const { title, description, category, display_order } = req.body;
    if (!title) return res.status(400).json({ error: 'Title is required' });

    let image_path = null;
    if (req.file) {
      image_path = `/uploads/images/facilities/${req.file.filename}`;
    }

    const item = await FacilityItem.create({
      title: title.trim(),
      description: description?.trim() || null,
      category: category || 'general',
      image_path,
      display_order: parseInt(display_order) || 0,
    });
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
});

// PUT /api/facilities/:id — protected
router.put('/:id', requireAuth, upload.single('image'), async (req, res, next) => {
  try {
    const item = await FacilityItem.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Facility item not found' });

    const { title, description, category, display_order } = req.body;

    if (req.file) {
      // Delete old image
      if (item.image_path) {
        const old = path.join(__dirname, '..', item.image_path);
        if (fs.existsSync(old)) fs.unlinkSync(old);
      }
      item.image_path = `/uploads/images/facilities/${req.file.filename}`;
    }

    if (title) item.title = title.trim();
    if (description !== undefined) item.description = description?.trim() || null;
    if (category) item.category = category;
    if (display_order !== undefined) item.display_order = parseInt(display_order) || 0;

    await item.save();
    res.json(item);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/facilities/:id — protected
router.delete('/:id', requireAuth, async (req, res, next) => {
  try {
    const item = await FacilityItem.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Facility item not found' });

    if (item.image_path) {
      const full = path.join(__dirname, '..', item.image_path);
      if (fs.existsSync(full)) fs.unlinkSync(full);
    }

    await item.destroy();
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
