// --- START OF FILE authController.js (Corrected) ---

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 🔐 Secret admin portal password
const ADMIN_PORTAL_PASSWORD = "Portal145@";

exports.register = async (req, res) => {
  // ... (register code is fine, but could also benefit from try/catch)
  try {
    const { email, password, confirmPassword, portalPassword } = req.body;

    // 1. Check if portal password matches
    if (portalPassword !== ADMIN_PORTAL_PASSWORD) {
      return res.status(403).json({ message: "Invalid admin portal password" });
    }

    // 2. Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // 3. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 4. Hash password
    const hashed = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashed });
    await newUser.save();

    res.json({ message: "✅ Registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  // ✅ WRAP THE ENTIRE FUNCTION LOGIC IN A try...catch BLOCK
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // This line will no longer crash the server, but will be caught
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' });

    res.json({ token, user: { email: user.email } });
  } catch (err) {
    // This will now catch the error from jwt.sign and send a proper response
    console.error(err.message);
    res.status(500).json({ error: 'Server error during login' });
  }
};