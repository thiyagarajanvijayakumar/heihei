const express = require('express');
const router = express.Router();
const Monitor = require('../models/Monitor');

// GET all monitors
router.get('/', async (req, res) => {
  try {
    const monitors = await Monitor.find().sort({ createdAt: -1 });
    res.json(monitors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create a monitor
router.post('/', async (req, res) => {
  const { name, url, type, method, location, frequency, emails } = req.body;
  const monitor = new Monitor({
    name, url, type, method, location, frequency, emails
  });
  try {
    const newMonitor = await monitor.save();
    res.status(201).json(newMonitor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a monitor
router.delete('/:id', async (req, res) => {
  try {
    await Monitor.findByIdAndDelete(req.params.id);
    res.json({ message: 'Monitor deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
