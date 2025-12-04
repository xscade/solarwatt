# Troubleshooting Contact Form Submission Error

## Error: "Failed to submit form. Please try again later."

This error typically occurs due to one of the following issues:

### 1. MongoDB URI Not Set (Most Common)

**Symptom:** Form submission fails with generic error message

**Solution:**
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Verify that `MONGODB_URI` is set
3. Check that it's applied to **Production**, **Preview**, and **Development** environments
4. Make sure the value is correct (no extra spaces, quotes, etc.)

**To verify:**
- Visit: `https://your-domain.vercel.app/api/health`
- Check the `hasMongoUri` field - it should be `true`

### 2. MongoDB Connection String Format

**Common issues:**
- Missing authentication credentials
- Incorrect database name in connection string
- Network/IP whitelist restrictions

**Format should be:**
```
mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
```

### 3. API Endpoint Not Found (404)

**Symptom:** Error mentions "API endpoint not found"

**Solution:**
- Verify the file exists at: `api/contact/submit.js`
- Check Vercel function logs in the dashboard
- Ensure the route is correctly configured in `vercel.json`

### 4. Network/CORS Issues

**Symptom:** Network errors or CORS errors in browser console

**Solution:**
- Check browser console for CORS errors
- Verify CORS headers are set in the API function
- Check if the API endpoint is accessible

## Debugging Steps

### Step 1: Check API Health
Visit: `https://your-domain.vercel.app/api/health`

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2024-...",
  "environment": {
    "hasMongoUri": true,
    "mongoUriLength": 100
  }
}
```

If `hasMongoUri` is `false`, the environment variable is not set.

### Step 2: Check Vercel Function Logs
1. Go to Vercel Dashboard → Your Project → Functions
2. Click on `api/contact/submit`
3. Check the logs for error messages
4. Look for MongoDB connection errors

### Step 3: Test API Directly
Use curl or Postman to test the endpoint:

```bash
curl -X POST https://your-domain.vercel.app/api/contact/submit \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+91 1234567890",
    "bill": "3000"
  }'
```

### Step 4: Check Browser Console
1. Open browser DevTools (F12)
2. Go to Network tab
3. Submit the form
4. Check the request to `/api/contact/submit`
5. Look at the response status and body

## Common Error Messages

| Error Message | Cause | Solution |
|--------------|-------|----------|
| "Database configuration error" | MONGODB_URI not set | Set environment variable in Vercel |
| "Unable to connect to database" | MongoDB connection failed | Check connection string and network access |
| "API endpoint not found" | Route not found | Verify file exists at `api/contact/submit.js` |
| "Network error" | Request failed | Check internet connection and API availability |

## Quick Fix Checklist

- [ ] `MONGODB_URI` is set in Vercel environment variables
- [ ] Environment variable is applied to all environments (Production, Preview, Development)
- [ ] MongoDB connection string is correct
- [ ] MongoDB cluster allows connections from Vercel (IP whitelist)
- [ ] File exists at `api/contact/submit.js`
- [ ] Vercel deployment completed successfully
- [ ] No errors in Vercel function logs

## Still Having Issues?

1. Check Vercel function logs for detailed error messages
2. Verify MongoDB connection string works outside of Vercel
3. Test the health endpoint: `/api/health`
4. Check browser console for additional error details

