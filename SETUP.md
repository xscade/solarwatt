# MongoDB Atlas Setup Guide

This guide will help you connect your SolarWatt Energy application to MongoDB Atlas.

## Prerequisites

- A MongoDB Atlas account (free tier available at https://www.mongodb.com/cloud/atlas)
- Node.js installed on your machine

## Step 1: Create MongoDB Atlas Cluster

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sign up/login
2. Create a new cluster (Free tier M0 is sufficient for development)
3. Wait for the cluster to be created (takes a few minutes)

## Step 2: Configure Database Access

1. Go to **Database Access** in the left sidebar
2. Click **Add New Database User**
3. Choose **Password** authentication
4. Create a username and password (save these securely!)
5. Set user privileges to **Read and write to any database**
6. Click **Add User**

## Step 3: Configure Network Access

1. Go to **Network Access** in the left sidebar
2. Click **Add IP Address**
3. For development, click **Allow Access from Anywhere** (0.0.0.0/0)
   - ⚠️ For production, restrict to specific IPs
4. Click **Confirm**

## Step 4: Get Your Connection String

1. Go to **Database** in the left sidebar
2. Click **Connect** on your cluster
3. Choose **Connect your application**
4. Select **Node.js** as the driver
5. Copy the connection string (looks like: `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`)

## Step 5: Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and replace the placeholder with your actual connection string:
   ```env
   MONGODB_URI=mongodb+srv://yourusername:yourpassword@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   MONGODB_DB_NAME=solarwatt
   PORT=3001
   VITE_API_URL=http://localhost:3001
   ```

   **Important:** Replace `<username>` and `<password>` in the connection string with your actual database user credentials.

## Step 6: Run the Application

Express serves both the React app and API routes in a single server:

```bash
npm run dev
```

This starts the Express server on `http://localhost:3000` which serves:
- Your React application (with Vite dev mode in development)
- All API routes (`/api/*`)

## Step 7: Test the Connection

1. Open your browser to `http://localhost:3000`
2. Navigate to the Contact page
3. Fill out and submit the contact form
4. Check your terminal - you should see a success message
5. Check MongoDB Atlas - go to **Database** > **Browse Collections** to see your submitted data

## Troubleshooting

### Connection Error: "MONGODB_URI is not defined"
- Make sure you've created a `.env` file (not just `.env.example`)
- Verify the `.env` file is in the root directory
- Restart your server after creating/updating `.env`

### Connection Error: "Authentication failed"
- Double-check your username and password in the connection string
- Make sure you've created a database user in MongoDB Atlas
- Verify the password doesn't contain special characters that need URL encoding

### Connection Error: "IP not whitelisted"
- Go to MongoDB Atlas > Network Access
- Add your current IP address or use 0.0.0.0/0 for development

### CORS Error in Browser
- Since Express serves everything, CORS should not be an issue
- If you see CORS errors, verify CORS is enabled in `server/index.js`

## Production Deployment

For production:
1. Use environment variables provided by your hosting platform (Vercel, Heroku, etc.)
2. Restrict MongoDB Network Access to your server's IP only
3. Use a strong database password
4. Consider using MongoDB connection pooling for better performance

## Database Collections

The application will automatically create a `contacts` collection in your database to store contact form submissions.

