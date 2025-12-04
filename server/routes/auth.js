import express from 'express';
import { getDatabase } from '../db/connection.js';

const router = express.Router();

// Initialize admin credentials if they don't exist
export async function initializeAdmin() {
  try {
    const db = getDatabase();
    const collection = db.collection('admin');
    
    // Check if admin exists
    const admin = await collection.findOne({ type: 'admin' });
    
    if (!admin) {
      // Create default admin credentials (store email in lowercase for consistency)
      await collection.insertOne({
        type: 'admin',
        email: 'admin@solarwatt.com'.toLowerCase(),
        password: 'admin123',
        createdAt: new Date()
      });
      console.log('✅ Default admin credentials created');
      console.log('   Email: admin@solarwatt.com');
      console.log('   Password: admin123');
    } else {
      console.log('✅ Admin credentials already exist');
      console.log(`   Email: ${admin.email}`);
    }
  } catch (error) {
    console.error('❌ Error initializing admin:', error);
  }
}

// POST /api/auth/login - Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    const db = getDatabase();
    const collection = db.collection('admin');
    
    // Find admin by email and password (case-insensitive email)
    const admin = await collection.findOne({ 
      type: 'admin',
      email: email.trim().toLowerCase(),
      password: password.trim()
    });
    
    console.log('Login attempt:', { 
      email: email.trim().toLowerCase(), 
      passwordProvided: !!password 
    });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Set session
    req.session.isAuthenticated = true;
    req.session.adminEmail = admin.email;

    res.json({
      success: true,
      message: 'Login successful'
    });

  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// POST /api/auth/logout - Logout
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Error logging out'
      });
    }
    res.json({
      success: true,
      message: 'Logged out successfully'
    });
  });
});

// GET /api/auth/check - Check authentication status
router.get('/check', (req, res) => {
  if (req.session && req.session.isAuthenticated) {
    res.json({
      success: true,
      authenticated: true
    });
  } else {
    res.json({
      success: true,
      authenticated: false
    });
  }
});

// POST /api/auth/init - Manually initialize admin (for debugging)
router.post('/init', async (req, res) => {
  try {
    await initializeAdmin();
    res.json({
      success: true,
      message: 'Admin credentials initialized'
    });
  } catch (error) {
    console.error('Error initializing admin:', error);
    res.status(500).json({
      success: false,
      message: 'Error initializing admin',
      error: error.message
    });
  }
});

export default router;

