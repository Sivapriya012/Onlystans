const Post = require('../models/Post');

// GET all posts in a fan club
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({ fanClub: req.params.fanClubId })
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET single post
const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('createdBy', 'name email');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST create post
const createPost = async (req, res) => {
  try {
    const { title, content, fanClub } = req.body;
    const post = await Post.create({
      title, content, fanClub,
      createdBy: req.user._id
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT update post
const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (post.createdBy.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Not authorized' });

    const updated = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE post
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (post.createdBy.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Not authorized' });

    await post.deleteOne();
    res.json({ message: 'Post deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getPosts, getPost, createPost, updatePost, deletePost };
