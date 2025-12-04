import express from 'express';
import { connectToDatabase } from '../db.js';

const router = express.Router();

router.post('/submit', async (req, res) => {
  try {
    const { name, email, phone, bill } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !bill) {
      return res.status(400).json({ 
        success: false, 
        error: 'All fields are required' 
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid email format' 
      });
    }

    // Connect to database
    const { db } = await connectToDatabase();
    const collection = db.collection('contact_submissions');

    // Create submission document
    const submission = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      bill: parseFloat(bill),
      submittedAt: new Date(),
      status: 'new'
    };

    // Insert into database
    const result = await collection.insertOne(submission);

    res.status(201).json({
      success: true,
      message: 'Form submitted successfully',
      id: result.insertedId
    });

  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to submit form. Please try again later.'
    });
  }
});

export default router;

