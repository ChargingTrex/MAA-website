const express = require('express');
const router = express.Router();
const { PageContent } = require('../models');
const { requireAuth } = require('../middleware/authMiddleware');

// GET /api/content/:page — public (returns all blocks for a page)
router.get('/:page', async (req, res, next) => {
  try {
    const contents = await PageContent.findAll({
      where: { page_key: req.params.page },
      order: [['id', 'ASC']],
    });
    res.json(contents);
  } catch (err) {
    next(err);
  }
});

// GET /api/content — public (returns all content blocks grouped by page)
router.get('/', async (req, res, next) => {
  try {
    const all = await PageContent.findAll({ order: [['page_key', 'ASC'], ['id', 'ASC']] });
    // Group by page_key
    const grouped = all.reduce((acc, block) => {
      if (!acc[block.page_key]) acc[block.page_key] = [];
      acc[block.page_key].push(block);
      return acc;
    }, {});
    res.json(grouped);
  } catch (err) {
    next(err);
  }
});

// PUT /api/content/:page — protected (upsert a single block)
router.put('/:page', requireAuth, async (req, res, next) => {
  try {
    const { block_key, content_en, content_te, content_hi, content_ta } = req.body;
    if (!block_key) return res.status(400).json({ error: 'block_key is required' });

    const [block, created] = await PageContent.findOrCreate({
      where: { page_key: req.params.page, block_key },
      defaults: { content_en, content_te, content_hi, content_ta },
    });

    if (!created) {
      if (content_en !== undefined) block.content_en = content_en;
      if (content_te !== undefined) block.content_te = content_te;
      if (content_hi !== undefined) block.content_hi = content_hi;
      if (content_ta !== undefined) block.content_ta = content_ta;
      await block.save();
    }

    res.json(block);
  } catch (err) {
    next(err);
  }
});

// PUT /api/content/:page/batch — protected (update multiple blocks at once)
router.put('/:page/batch', requireAuth, async (req, res, next) => {
  try {
    const { blocks } = req.body;
    if (!Array.isArray(blocks) || blocks.length === 0) {
      return res.status(400).json({ error: 'blocks array is required' });
    }

    const results = await Promise.all(blocks.map(async ({ block_key, content_en, content_te, content_hi, content_ta }) => {
      const [block, created] = await PageContent.findOrCreate({
        where: { page_key: req.params.page, block_key },
        defaults: { content_en, content_te, content_hi, content_ta },
      });
      if (!created) {
        if (content_en !== undefined) block.content_en = content_en;
        if (content_te !== undefined) block.content_te = content_te;
        if (content_hi !== undefined) block.content_hi = content_hi;
        if (content_ta !== undefined) block.content_ta = content_ta;
        await block.save();
      }
      return block;
    }));

    res.json(results);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
