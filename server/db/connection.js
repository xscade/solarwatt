import { MongoClient } from 'mongodb';

let client = null;
let db = null;

export async function connectToMongoDB() {
  try {
    const uri = process.env.MONGODB_URI;
    
    if (!uri) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    // Create a new MongoClient
    client = new MongoClient(uri);

    // Connect to the MongoDB cluster
    await client.connect();
    
    // Get the database name from URI or use default
    const dbName = process.env.MONGODB_DB_NAME || 'solarwatt';
    db = client.db(dbName);

    console.log('✅ Connected to MongoDB Atlas');
    
    return db;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }
}

export function getDatabase() {
  if (!db) {
    throw new Error('Database not connected. Call connectToMongoDB() first.');
  }
  return db;
}

export async function closeConnection() {
  if (client) {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

