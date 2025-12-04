import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectToMongoDB } from '../server/db/connection.js';
import contactRoutes from '../server/routes/contact.js';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

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

// Initialize database connection (warm up)
getDatabaseConnection().catch(console.error);

// Export as Vercel serverless function
export default async function handler(req, res) {
  // Ensure database is connected
  try {
    await getDatabaseConnection();
  } catch (error) {
    console.error('Database connection error in handler:', error);
    // Don't fail the request, but log the error
  }
  
  return app(req, res);
}
