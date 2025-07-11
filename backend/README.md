
# AgriBusiness Pro Backend

This is the backend API for the AgriBusiness Pro application built with Node.js, Express, and MongoDB.

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone/Download the backend folder**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   - Copy `.env.example` to `.env`
   - Update the following variables in `.env`:
   ```
   MONGODB_URI=mongodb://localhost:27017/agribusiness-pro
   JWT_SECRET=your-super-secret-jwt-key-here
   PORT=5000
   FRONTEND_URL=http://localhost:5173
   ```

4. **Start MongoDB**
   - If using local MongoDB: `mongod`
   - If using MongoDB Atlas: Update MONGODB_URI with your connection string

5. **Run the application**
   ```bash
   # Development mode with auto-restart
   npm run dev
   
   # Production mode
   npm start
   ```

### API Endpoints

#### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user

#### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

#### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics
- `GET /api/dashboard/market-prices` - Get market prices
- `GET /api/dashboard/weather` - Get weather data
- `GET /api/dashboard/activities` - Get recent activities

#### Health Check
- `GET /api/health` - Server health check

### Frontend Integration

Update your frontend to use the backend API by modifying the UserContext to make actual API calls instead of using localStorage.

### Database Schema

The application uses the following main collections:
- `users` - User information and authentication

### Security Features

- JWT authentication
- Password hashing with bcrypt
- Rate limiting
- CORS protection
- Input validation
- Helmet security headers

### Development

- The server runs on port 5000 by default
- MongoDB connection is established on startup
- All routes are prefixed with `/api`
- Error handling middleware catches and logs errors
- Validation is implemented using express-validator

### Production Deployment

1. Set NODE_ENV=production
2. Use a proper MongoDB connection string
3. Set a strong JWT_SECRET
4. Configure proper CORS origins
5. Use PM2 or similar for process management
6. Set up proper logging
7. Use HTTPS in production

### Testing

Test the API endpoints using tools like Postman or curl:

```bash
# Health check
curl http://localhost:5000/api/health

# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"firstName":"John","lastName":"Doe","email":"john@example.com","password":"password123","phone":"+1234567890","organization":"Test Org","userType":"farmer","location":"Test Location"}'
```
