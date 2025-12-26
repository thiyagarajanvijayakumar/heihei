
const router = require("express").Router();

router.post("/login", (req, res) => {
  // Mock login
  if (req.body.email && req.body.password) {
    res.json({ token: "demo-jwt-token", user: { email: req.body.email } });
  } else {
    res.status(400).json({ message: "Invalid credentials" });
  }
});

router.post("/forgot-password", (req, res) => {
  // Mock send email
  const { email } = req.body;
  console.log(`[Mock] Sending password reset email to ${email}`);
  // Simulate success
  res.json({ message: "Password reset email sent" });
});

router.post("/reset-password", (req, res) => {
  // Mock reset password
  console.log(`[Mock] Resetting password for user`);
  res.json({ message: "Password successfully updated" });
});

module.exports = router;
