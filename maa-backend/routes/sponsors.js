const express = require('express');
const router = express.Router();
const { SponsorNeed } = require('../models');
const { requireAuth } = require('../middleware/authMiddleware');

// GET /api/sponsors — public
router.get('/', async (req, res, next) => {
  try {
    const needs = await SponsorNeed.findAll({ order: [['display_order', 'ASC'], ['id', 'DESC']] });
    res.json(needs);
  } catch (err) {
    next(err);
  }
});

// POST /api/sponsors — protected
router.post('/', requireAuth, async (req, res, next) => {
  try {
    const { name, cost, status, description, display_order } = req.body;
    if (!name || !cost) {
      return res.status(400).json({ error: 'Name and cost are required' });
    }

    const need = await SponsorNeed.create({
      name: name.trim(),
      cost: cost.trim(),
      status: status || 'Needed',
      description: description?.trim() || null,
      display_order: parseInt(display_order) || 0,
    });
    res.status(201).json(need);
  } catch (err) {
    next(err);
  }
});

// PUT /api/sponsors/:id — protected
router.put('/:id', requireAuth, async (req, res, next) => {
  try {
    const need = await SponsorNeed.findByPk(req.params.id);
    if (!need) return res.status(404).json({ error: 'Sponsor need not found' });

    const { name, cost, status, description, display_order } = req.body;

    if (name) need.name = name.trim();
    if (cost) need.cost = cost.trim();
    if (status) need.status = status;
    if (description !== undefined) need.description = description?.trim() || null;
    if (display_order !== undefined) need.display_order = parseInt(display_order) || 0;

    await need.save();
    res.json(need);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/sponsors/:id — protected
router.delete('/:id', requireAuth, async (req, res, next) => {
  try {
    const need = await SponsorNeed.findByPk(req.params.id);
    if (!need) return res.status(404).json({ error: 'Sponsor need not found' });

    await need.destroy();
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
