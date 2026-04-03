const FanClub = require('../models/FanClub');

// GET all fan clubs
const getFanClubs = async (req, res) => {
  try {
    const fanClubs = await FanClub.find().populate('createdBy', 'name email');
    res.json(fanClubs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET single fan club
const getFanClub = async (req, res) => {
  try {
    const fanClub = await FanClub.findById(req.params.id).populate('createdBy', 'name email');
    if (!fanClub) return res.status(404).json({ message: 'Fan club not found' });
    res.json(fanClub);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST create fan club
const createFanClub = async (req, res) => {
  try {
    const { name, artist, genre, description, imageUrl } = req.body;
    const fanClub = await FanClub.create({
      name, artist, genre, description, imageUrl,
      createdBy: req.user._id
    });
    res.status(201).json(fanClub);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT update fan club
const updateFanClub = async (req, res) => {
  try {
    const fanClub = await FanClub.findById(req.params.id);
    if (!fanClub) return res.status(404).json({ message: 'Fan club not found' });
    if (fanClub.createdBy.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Not authorized' });

    const updated = await FanClub.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE fan club
const deleteFanClub = async (req, res) => {
  try {
    const fanClub = await FanClub.findById(req.params.id);
    if (!fanClub) return res.status(404).json({ message: 'Fan club not found' });
    if (fanClub.createdBy.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Not authorized' });

    await fanClub.deleteOne();
    res.json({ message: 'Fan club deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getFanClubs, getFanClub, createFanClub, updateFanClub, deleteFanClub };