# Fix for "Unexpected token 'T', "The page c"... is not valid JSON" Error

## Problem
This error occurs when the API endpoint returns HTML (an error page) instead of JSON, typically because:
1. The API route isn't being found (404)
2. MongoDB connection fails and returns an error page
3. The route path doesn't match

## Solution Applied

### 1. Created Vercel Serverless Function
- Moved API from Express server to Vercel serverless function
- Location: `api/contact/submit.js`
- This is the format Vercel expects for serverless functions

### 2. Updated Configuration
- Added `vercel.json` with proper routing
- Set Node.js 20.x runtime for API functions
- Configured CORS headers in the API function

### 3. Improved Error Handling
- Added better error messages in the frontend
- Added content-type checking before parsing JSON
- Added CORS headers to prevent cross-origin issues

## Deployment Checklist

### Before Deploying:

1. **Set Environment Variable in Vercel:**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add: `MONGODB_URI` = your MongoDB connection string
   - Apply to: Production, Preview, and Development

2. **Verify File Structure:**
   ```
   solarwatt/
   ├── api/
   │   └── contact/
   │       └── submit.js  ← Must exist
   ├── vercel.json         ← Must exist
   └── package.json
   ```

3. **Check Build Settings in Vercel:**
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### After Deploying:

1. **Test the API endpoint:**
   ```
   POST https://your-domain.vercel.app/api/contact/submit
   ```

2. **Check Vercel Function Logs:**
   - Go to Vercel Dashboard → Your Project → Functions
   - Click on the function to see logs
   - Look for any MongoDB connection errors

3. **Verify Environment Variable:**
   - In Vercel Dashboard → Settings → Environment Variables
   - Make sure `MONGODB_URI` is set correctly

## Common Issues

### Issue: Still getting JSON parse error
**Solution:** 
- Check Vercel function logs
- Verify `MONGODB_URI` is set in environment variables
- Make sure the API route exists at `api/contact/submit.js`

### Issue: 404 Not Found
**Solution:**
- Verify the file path is exactly `api/contact/submit.js`
- Check that `vercel.json` routes are correct
- Redeploy after making changes

### Issue: MongoDB Connection Error
**Solution:**
- Verify `MONGODB_URI` is correct
- Check MongoDB network access (IP whitelist)
- Ensure MongoDB connection string includes authentication

## Testing Locally

To test the serverless function locally:

```bash
# Install Vercel CLI
npm i -g vercel

# Run locally (this mimics Vercel's environment)
vercel dev
```

Then test at: `http://localhost:3000/api/contact/submit`

## Files Changed

1. ✅ Created `api/contact/submit.js` - Vercel serverless function
2. ✅ Created `vercel.json` - Vercel configuration
3. ✅ Updated `pages/Contact.tsx` - Better error handling
4. ✅ Created `VERCEL_DEPLOYMENT.md` - Deployment guide

## Next Steps

1. Commit and push these changes
2. Set `MONGODB_URI` in Vercel environment variables
3. Redeploy on Vercel
4. Test the contact form

