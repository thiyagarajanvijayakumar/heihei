const express = require('express');
const router = express.Router();
const Monitor = require('../models/Monitor');
const auth = require('../middleware/auth');

// @route   GET api/monitors
// @desc    Get all monitors for user
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const { search } = req.query;
        let query = { createdBy: req.user.id };

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { url: { $regex: search, $options: 'i' } }
            ];
        }

        const monitors = await Monitor.find(query).sort({ createdAt: -1 });
        res.json(monitors);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/monitors
// @desc    Create a new monitor
// @access  Private
router.post('/', auth, async (req, res) => {
    const { name, url, type, method } = req.body;

    try {
        const newMonitor = new Monitor({
            name,
            url,
            type,
            method,
            createdBy: req.user.id
        });

        const monitor = await newMonitor.save();
        res.json(monitor);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
