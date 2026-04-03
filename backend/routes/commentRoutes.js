const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getComments,
  createComment,
  updateComment,
  deleteComment
} = require('../controllers/commentController');

router.get('/post/:postId', protect, getComments);
router.post('/', protect, createComment);
router.put('/:id', protect, updateComment);
router.delete('/:id', protect, deleteComment);

module.exports = router;
