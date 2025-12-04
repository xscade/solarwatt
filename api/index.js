import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';
import { connectToMongoDB } from '../server/db/connection.js';
import contactRoutes from '../server/routes/contact.js';
import authRoutes, { initializeAdmin } from '../server/routes/auth.js';

// Load environment variables
dotenv.config();

const app = express();

// Session configuration (for Vercel serverless, use memory store)
app.use(session({
  secret: process.env.SESSION_SECRET || 'solarwatt-secret-key-change-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true, // HTTPS only
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Middleware
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);

// Connect to MongoDB (cache connection for serverless)
let dbConnection = null;

async function getDatabaseConnection() {
  if (!dbConnection) {
    try {
      dbConnection = await connectToMongoDB();
      console.log('✅ MongoDB connected (serverless)');
    } catch (error) {
      console.error('❌ MongoDB connection error:', error);
      throw error;
    }
  }
  return dbConnection;
}

// Initialize database connection and admin (warm up)
getDatabaseConnection()
  .then(async () => {
    await initializeAdmin();
  })
  .catch(console.error);

// Export as Vercel serverless function
export default async function handler(req, res) {
  // Ensure database is connected
  try {
    await getDatabaseConnection();
    // Initialize admin if not exists (idempotent)
    await initializeAdmin();
  } catch (error) {
    console.error('Database connection error in handler:', error);
    // Don't fail the request, but log the error
  }
  
  return app(req, res);
}
