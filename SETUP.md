# MongoDB Integration Setup

This project now includes a backend server that stores contact form submissions in MongoDB.

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

This will install:
- Express (backend server)
- MongoDB (database driver)
- CORS (cross-origin resource sharing)
- dotenv (environment variables)
- concurrently (run frontend and backend together)

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
# MongoDB Connection
MONGODB_URI=your_mongodb_connection_string_here

# Server Configuration (optional)
PORT=3001
FRONTEND_URL=http://localhost:3000
```

Replace `your_mongodb_connection_string_here` with your actual MongoDB connection string.

**Example MongoDB URI format:**
```
mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
```

or for local MongoDB:
```
mongodb://localhost:27017/solarwatt
```

### 3. Run the Application

#### Option 1: Run Frontend and Backend Together (Recommended)
```bash
npm run dev:all
```

This will start:
- Frontend on `http://localhost:3000`
- Backend API on `http://localhost:3001`

#### Option 2: Run Separately

Terminal 1 (Frontend):
```bash
npm run dev
```

Terminal 2 (Backend):
```bash
npm run dev:server
```

### 4. Test the Integration

1. Navigate to `http://localhost:3000/contact`
2. Fill out the contact form
3. Submit the form
4. Check your MongoDB database - submissions will be stored in the `contact_submissions` collection in the `solarwatt` database

## Database Structure

Submissions are stored with the following schema:

```javascript
{
  name: String,
  email: String,
  phone: String,
  bill: Number,
  submittedAt: Date,
  status: String (default: 'new')
}
```

## API Endpoints

### POST `/api/contact/submit`
Submits a contact form entry to MongoDB.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 98765 43210",
  "bill": "3000"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Form submitted successfully",
  "id": "mongodb_document_id"
}
```

## Troubleshooting

1. **Connection Error**: Make sure your `MONGODB_URI` is correct and your MongoDB instance is accessible
2. **CORS Error**: Check that `FRONTEND_URL` in `.env` matches your frontend URL
3. **Port Already in Use**: Change the `PORT` in `.env` if 3001 is already in use

