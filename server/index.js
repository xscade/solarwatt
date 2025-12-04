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
if (isProduction) {
  // Production: Serve built files from dist
  const distPath = join(__dirname, '../dist');
  app.use(express.static(distPath));
  
  // Serve index.html for all non-API routes (for client-side routing)
  // Express 5 requires a different syntax for catch-all routes
  app.use((req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }
    res.sendFile(join(distPath, 'index.html'));
  });
} else {
  // Development: Serve source files and built files
  const rootPath = join(__dirname, '..');
  
  // Serve built JS files from dist
  app.use('/dist', express.static(join(rootPath, 'dist')));
  
  // Serve static assets (CSS, images, etc.)
  app.use(express.static(rootPath));
  
  // Serve index.html for all non-API routes
  app.use((req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }
    res.sendFile(join(rootPath, 'index.html'));
  });
}

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
