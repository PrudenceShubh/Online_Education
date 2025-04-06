const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Test route
router.get('/test', (req, res) => {
  res.json({ message: 'Auth route is working' });
});

// Status route
router.get('/status', (req, res) => {
  res.json({ status: 'Authentication server is running' });
});

// Signup route
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log('Signup request received:', { name, email });

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login route
// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('🔹 Login request received:', { email, password });

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      console.log('❌ User not found in database');
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    console.log('✅ User found:', user);

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('🔍 Password Match:', isMatch);

    if (!isMatch) {
      console.log('❌ Password incorrect');
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1h' }
    );

    console.log('✅ Token generated:', token);
    res.json({ token });

  } catch (err) {
    console.error('❌ Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;