# Vercel Deployment Guide

This guide explains how to deploy your MERN stack application to Vercel.

## Prerequisites

1. A Vercel account (sign up at https://vercel.com)
2. MongoDB Atlas connection string configured
3. Git repository (GitHub, GitLab, or Bitbucket)

## Deployment Steps

### 1. Environment Variables

In your Vercel project settings, add these environment variables:

- `MONGODB_URI` - Your MongoDB Atlas connection string
- `MONGODB_DB_NAME` - Database name (optional, defaults to 'solarwatt')
- `NODE_ENV` - Set to `production`

### 2. Deploy via Vercel Dashboard

1. Go to https://vercel.com/new
2. Import your Git repository
3. Vercel will automatically detect the configuration from `vercel.json`
4. Add your environment variables in the project settings
5. Click "Deploy"

### 3. Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# For production deployment
vercel --prod
```

## Project Structure for Vercel

```
solarwatt/
├── api/
│   └── index.js          # Serverless function for API routes
├── server/
│   ├── db/
│   │   └── connection.js # MongoDB connection
│   └── routes/
│       └── contact.js     # Contact API routes
├── dist/                  # Built React app (generated)
│   ├── index.html
│   └── index.js
├── vercel.json            # Vercel configuration
└── package.json
```

## How It Works

1. **API Routes**: All `/api/*` requests are handled by the serverless function in `api/index.js`
2. **Static Files**: The built React app in `dist/` is served as static files
3. **Client-Side Routing**: All non-API routes serve `index.html` for React Router

## Build Process

Vercel will automatically:
1. Run `npm install`
2. Run `npm run build` (which builds the React app with esbuild)
3. Deploy the `dist/` folder as static files
4. Deploy `api/index.js` as a serverless function

## Troubleshooting

### MongoDB Connection Issues

- Ensure `MONGODB_URI` is set in Vercel environment variables
- Check MongoDB Atlas Network Access allows Vercel IPs (or use 0.0.0.0/0 for development)
- Verify the connection string format is correct

### API Routes Not Working

- Check that `api/index.js` exists and exports a default function
- Verify routes in `vercel.json` are correct
- Check Vercel function logs in the dashboard

### Static Files Not Loading

- Ensure `dist/` folder is generated during build
- Check `vercel.json` outputDirectory is set to `dist`
- Verify build command runs successfully

### Environment Variables

- All environment variables must be set in Vercel dashboard
- Redeploy after adding new environment variables
- Use `process.env.VARIABLE_NAME` in your code

## Custom Domain

1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## Monitoring

- View function logs in Vercel dashboard
- Check Analytics for traffic and performance
- Monitor MongoDB Atlas for database connections

