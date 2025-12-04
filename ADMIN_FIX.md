# Admin Credentials Fix

## Issues Fixed

1. **Admin credentials not being created**: The `initializeAdmin()` function was being called when the module loaded, but the database wasn't connected yet.

2. **Login failing**: Because no admin credentials existed in MongoDB, login was always failing.

## Changes Made

1. **Exported `initializeAdmin` function** from `server/routes/auth.js` so it can be called after database connection.

2. **Updated `server/index.js`** to call `initializeAdmin()` after MongoDB connection is established.

3. **Updated `api/index.js`** (Vercel serverless) to also initialize admin after database connection.

4. **Added manual initialization endpoint** at `/api/auth/init` for debugging.

5. **Improved logging** to show when admin credentials are created or already exist.

## Default Credentials

- **Email**: `admin@solarwatt.com`
- **Password**: `admin123`

## Testing

1. **Restart the server**:
   ```bash
   npm run dev
   ```

2. **Check server logs** - You should see:
   ```
   ✅ Connected to MongoDB Atlas
   ✅ Default admin credentials created
      Email: admin@solarwatt.com
      Password: admin123
   ```

3. **Test login**:
   - Navigate to: `http://localhost:3000/#/login`
   - Enter credentials: `admin@solarwatt.com` / `admin123`
   - Should redirect to dashboard

4. **Manual initialization** (if needed):
   ```bash
   curl -X POST http://localhost:3000/api/auth/init
   ```

## Verification

To verify admin exists in MongoDB:
- Check MongoDB Atlas dashboard
- Collection: `admin`
- Should have one document with `type: 'admin'`

## Notes

- Admin credentials are stored as **plain text** (as requested)
- Email is stored in lowercase for consistency
- Initialization is idempotent (safe to call multiple times)

