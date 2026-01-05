const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const User = require('../models/User');

// Returns current user data
router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user.id).select('-passwordHash');
  res.json(user);
});

module.exports = router;
