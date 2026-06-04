const express = require('express');
const router = express.Router();
const { GalleryPhoto, GalleryVideo, TeamMember, CSRActivity } = require('../models');
const { requireAuth } = require('../middleware/authMiddleware');

// GET /api/admin/stats — dashboard summary counts
router.get('/stats', requireAuth, async (req, res, next) => {
  try {
    const [photos, videos, team, csr] = await Promise.all([
      GalleryPhoto.count(),
      GalleryVideo.count(),
      TeamMember.count(),
      CSRActivity.count(),
    ]);

    res.json({ photos, videos, team, csr });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
