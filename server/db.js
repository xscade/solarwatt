import { MongoClient } from 'mongodb';

let client = null;
let db = null;

export async function connectToDatabase() {
  if (client && db) {
    return { client, db };
  }

  const uri = process.env.MONGODB_URI;
  
  if (!uri) {
    throw new Error('Please define the MONGODB_URI environment variable');
  }

  try {
    client = new MongoClient(uri);
    await client.connect();
    db = client.db('solarwatt');
    console.log('Connected to MongoDB');
    return { client, db };
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

export async function closeDatabase() {
  if (client) {
    await client.close();
    client = null;
    db = null;
    console.log('Disconnected from MongoDB');
  }
}

