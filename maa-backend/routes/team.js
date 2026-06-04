const express = require('express');
const router = express.Router();
const { TeamMember } = require('../models');
const { requireAuth } = require('../middleware/authMiddleware');
const upload = require('../config/multer');
const fs = require('fs');
const path = require('path');

// GET /api/team — public
router.get('/', async (req, res, next) => {
  try {
    const team = await TeamMember.findAll({ order: [['display_order', 'ASC'], ['id', 'ASC']] });
    res.json(team);
  } catch (err) {
    next(err);
  }
});

// POST /api/team — protected
router.post('/', requireAuth, upload.single('photo'), async (req, res, next) => {
  try {
    const { name, designation, qualification, display_order } = req.body;
    if (!name || !designation) {
      return res.status(400).json({ error: 'Name and designation are required' });
    }

    let photo_path = null;
    if (req.file) {
      photo_path = `/uploads/images/team/${req.file.filename}`;
    }

    const member = await TeamMember.create({
      name: name.trim(),
      designation: designation.trim(),
      qualification: qualification?.trim() || null,
      photo_path,
      display_order: parseInt(display_order) || 0,
    });
    res.status(201).json(member);
  } catch (err) {
    next(err);
  }
});

// PUT /api/team/:id — protected (update details, optionally replace photo)
router.put('/:id', requireAuth, upload.single('photo'), async (req, res, next) => {
  try {
    const member = await TeamMember.findByPk(req.params.id);
    if (!member) return res.status(404).json({ error: 'Team member not found' });

    const { name, designation, qualification, display_order } = req.body;

    if (req.file) {
      // Delete old photo if it exists
      if (member.photo_path) {
        const oldPath = path.join(__dirname, '..', member.photo_path);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      member.photo_path = `/uploads/images/team/${req.file.filename}`;
    }

    if (name) member.name = name.trim();
    if (designation) member.designation = designation.trim();
    if (qualification !== undefined) member.qualification = qualification?.trim() || null;
    if (display_order !== undefined) member.display_order = parseInt(display_order) || 0;

    await member.save();
    res.json(member);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/team/:id — protected
router.delete('/:id', requireAuth, async (req, res, next) => {
  try {
    const member = await TeamMember.findByPk(req.params.id);
    if (!member) return res.status(404).json({ error: 'Team member not found' });

    if (member.photo_path) {
      const fullPath = path.join(__dirname, '..', member.photo_path);
      if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
    }

    await member.destroy();
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
