const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getFanClubs,
  getFanClub,
  createFanClub,
  updateFanClub,
  deleteFanClub
} = require('../controllers/fanClubController');

router.get('/', protect, getFanClubs);
router.get('/:id', protect, getFanClub);
router.post('/', protect, createFanClub);
router.put('/:id', protect, updateFanClub);
router.delete('/:id', protect, deleteFanClub);

module.exports = router;