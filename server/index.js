import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { connectToMongoDB } from './db/connection.js';
import contactRoutes from './routes/contact.js';

// Load environment variables
dotenv.config({ path: '.env.local' });
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const isProduction = process.env.NODE_ENV === 'production';
const PORT = process.env.PORT || 3000;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes (must be before static file serving)
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

app.use('/api/contact', contactRoutes);

// Serve static files
const distPath = join(__dirname, '../dist');
const rootPath = join(__dirname, '..');

// Always serve static files from dist (for both dev and production)
// This ensures index.js is available at /index.js
app.use(express.static(distPath));

// Serve index.html for all non-API routes (for client-side routing)
// Express 5 requires a different syntax for catch-all routes
app.use((req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  // Serve index.html from dist in production, or from root in development
  const htmlPath = isProduction 
    ? join(distPath, 'index.html')
    : join(rootPath, 'index.html');
  res.sendFile(htmlPath);
});

// Connect to MongoDB and start server
connectToMongoDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📊 MongoDB connected successfully`);
      if (!isProduction) {
        console.log(`💡 Development mode - run 'npm run build:watch' in another terminal for live reload`);
      }
    });
  })
  .catch((error) => {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  });
