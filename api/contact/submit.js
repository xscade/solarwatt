import { MongoClient } from 'mongodb';

// MongoDB connection caching for serverless
let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const uri = process.env.MONGODB_URI;
  
  if (!uri) {
    throw new Error('Please define the MONGODB_URI environment variable');
  }

  try {
    const client = new MongoClient(uri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    await client.connect();
    const db = client.db('solarwatt');
    
    cachedClient = client;
    cachedDb = db;
    
    return { client, db };
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed'
    });
  }

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

    return res.status(201).json({
      success: true,
      message: 'Form submitted successfully',
      id: result.insertedId.toString()
    });

  } catch (error) {
    console.error('Error submitting contact form:', error);
    
    // Provide more specific error messages
    let errorMessage = 'Failed to submit form. Please try again later.';
    
    if (error.message.includes('MONGODB_URI')) {
      errorMessage = 'Database configuration error. Please contact support.';
    } else if (error.message.includes('connect')) {
      errorMessage = 'Unable to connect to database. Please try again later.';
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    return res.status(500).json({
      success: false,
      error: errorMessage
    });
  }
}

