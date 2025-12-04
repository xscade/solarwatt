import express from 'express';
import { getDatabase } from '../db/connection.js';

const router = express.Router();

// POST /api/contact - Submit contact form
router.post('/submit', async (req, res) => {
  try {
    const { name, email, phone, bill } = req.body;

    // Validation
    if (!name || !email || !phone || !bill) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email address'
      });
    }

    // Get database
    const db = getDatabase();
    const collection = db.collection('contacts');

    // Create contact document
    const contactData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      bill: parseFloat(bill),
      createdAt: new Date(),
      status: 'new'
    };

    // Insert into MongoDB
    const result = await collection.insertOne(contactData);

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      id: result.insertedId
    });

  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again later.'
    });
  }
});

// GET /api/contact - Get all contacts (optional, for admin use)
router.get('/', async (req, res) => {
  try {
    const db = getDatabase();
    const collection = db.collection('contacts');
    
    const contacts = await collection
      .find({})
      .sort({ createdAt: -1 })
      .limit(100)
      .toArray();

    res.json({
      success: true,
      data: contacts
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching contacts'
    });
  }
});

export default router;

