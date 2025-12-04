# Vercel Deployment Guide

## Setup for Vercel

This project is configured to work with Vercel serverless functions. The API routes are located in the `api/` directory.

## Environment Variables

In your Vercel project settings, add the following environment variable:

- **MONGODB_URI**: Your MongoDB connection string

### How to Add Environment Variables in Vercel:

1. Go to your project in Vercel dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add `MONGODB_URI` with your MongoDB connection string
4. Make sure to add it for **Production**, **Preview**, and **Development** environments

## Deployment Steps

1. **Push your code to GitHub/GitLab/Bitbucket**

2. **Connect your repository to Vercel** (if not already connected)

3. **Configure Build Settings**:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Deploy**

The API routes in `api/` will automatically be deployed as serverless functions.

## API Endpoint

After deployment, your API will be available at:
- `https://your-domain.vercel.app/api/contact/submit`

## Troubleshooting

### "Unexpected token 'T', "The page c"... is not valid JSON"

This error occurs when:
1. The API route returns HTML (error page) instead of JSON
2. The route is not found (404)
3. CORS issues

**Solutions:**
1. Check that `MONGODB_URI` is set in Vercel environment variables
2. Verify the API route exists at `api/contact/submit.js`
3. Check Vercel function logs in the dashboard
4. Ensure the route path matches exactly: `/api/contact/submit`

### Testing Locally

To test the serverless function locally:

```bash
# Install Vercel CLI
npm i -g vercel

# Run locally
vercel dev
```

This will start a local server that mimics Vercel's serverless environment.

## File Structure

```
solarwatt/
├── api/
│   └── contact/
│       └── submit.js    # Serverless function
├── pages/
│   └── Contact.tsx     # Frontend form
└── vercel.json         # Vercel configuration
```

## Notes

- The `server/` directory is for local development only
- In production, Vercel uses the `api/` directory for serverless functions
- MongoDB connection is cached for better performance in serverless environment

