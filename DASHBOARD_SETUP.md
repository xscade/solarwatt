# Dashboard Setup Guide

## Overview

The dashboard allows administrators to view all contact form submissions in a table format. It includes authentication with email and password stored in MongoDB.

## Features

- **Login Page**: Secure authentication with email and password
- **Dashboard**: Table view of all contact form submissions
- **Session Management**: Uses express-session for authentication
- **Protected Routes**: Dashboard requires authentication
- **MongoDB Storage**: Admin credentials and submissions stored in MongoDB

## Default Admin Credentials

When the server starts for the first time, default admin credentials are automatically created:

- **Email**: `admin@solarwatt.com`
- **Password**: `admin123`

These credentials are stored in the `admin` collection in MongoDB.

## Accessing the Dashboard

1. Navigate to `/login` in your browser
2. Enter the admin email and password
3. After successful login, you'll be redirected to `/dashboard`

## Dashboard Features

- **View All Submissions**: See all contact form submissions in a table
- **Sort by Date**: Submissions are sorted by newest first
- **Contact Information**: Click on email or phone to contact the submitter
- **Refresh**: Manually refresh the submissions list
- **Logout**: Secure logout functionality

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login with email and password
- `POST /api/auth/logout` - Logout
- `GET /api/auth/check` - Check authentication status

### Submissions
- `GET /api/contact` - Get all submissions (requires authentication)
- `POST /api/contact/submit` - Submit contact form (public)

## Database Collections

### `admin` Collection
Stores admin credentials:
```json
{
  "type": "admin",
  "email": "admin@solarwatt.com",
  "password": "admin123",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

### `contacts` Collection
Stores contact form submissions:
```json
{
  "_id": "...",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 98765 43210",
  "bill": 3000,
  "status": "new",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

## Security Notes

⚠️ **Important**: The current implementation stores passwords in plain text. For production use, consider:
- Hashing passwords with bcrypt
- Using environment variables for sensitive data
- Implementing rate limiting
- Adding CSRF protection
- Using HTTPS only

## Changing Admin Credentials

To change the admin credentials, you can:

1. **Via MongoDB directly**: Update the `admin` collection in MongoDB
2. **Via code**: Modify the `initializeAdmin()` function in `server/routes/auth.js`

## Troubleshooting

### Can't access dashboard
- Check if you're logged in (session might have expired)
- Verify MongoDB connection is working
- Check browser console for errors

### No submissions showing
- Verify contact form submissions are being saved
- Check MongoDB `contacts` collection
- Ensure authentication is working

### Session not persisting
- Check if cookies are enabled in browser
- Verify `credentials: 'include'` is set in fetch requests
- Check CORS configuration allows credentials

## Development

To test locally:
1. Start the server: `npm run dev`
2. Navigate to `http://localhost:3000/login`
3. Use default credentials to login
4. View dashboard at `http://localhost:3000/dashboard`

