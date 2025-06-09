# Groway Backend API

A Node.js/Express backend API for the Groway career assessment platform.

## Features

- **Authentication & Authorization**: JWT-based auth with role-based access control
- **User Management**: User registration, login, profile management
- **Career Assessment Tests**: Dynamic test generation and result tracking
- **Data Persistence**: MongoDB with Mongoose ODM
- **Security**: Helmet, CORS, rate limiting, input validation
- **Error Handling**: Centralized error handling with custom error classes

## Project Structure

```
backend/
├── config/
│   └── database.js          # Database connection configuration
├── controllers/
│   ├── authController.js    # Authentication logic
│   ├── testController.js    # Test management logic
│   └── userController.js    # User management logic
├── middleware/
│   ├── auth.js             # Authentication middleware
│   ├── adminAuth.js        # Admin authorization middleware
│   ├── errorHandler.js     # Global error handling
│   └── validate.js         # Input validation middleware
├── models/
│   ├── User.js             # User data model
│   └── TestResult.js       # Test result data model
├── routes/
│   ├── auth.js             # Authentication routes
│   ├── tests.js            # Test-related routes
│   └── users.js            # User management routes
├── utils/
│   ├── AppError.js         # Custom error class
│   └── asyncHandler.js     # Async error wrapper
├── .env.example            # Environment variables template
├── .gitignore              # Git ignore rules
├── package.json            # Dependencies and scripts
├── README.md               # This file
└── server.js               # Application entry point
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env
   ```

4. Update the `.env` file with your configuration:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/groway
   JWT_SECRET=your_super_secret_jwt_key_here
   JWT_EXPIRE=7d
   FRONTEND_URL=http://localhost:5173
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile
- `PUT /api/auth/change-password` - Change password

### Tests
- `GET /api/tests/categories` - Get all test categories
- `GET /api/tests/questions/:category` - Get questions for category
- `POST /api/tests/submit` - Submit test results
- `GET /api/tests/results` - Get user's test results
- `GET /api/tests/results/:id` - Get specific test result
- `DELETE /api/tests/results/:id` - Delete test result

### Users (Admin)
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/stats` - Get user statistics (admin only)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Health Check
- `GET /api/health` - API health status

## Database Models

### User Model
- Email, password, name fields
- Role-based access (user/admin)
- Subscription management
- Test history tracking
- User preferences

### TestResult Model
- User reference
- Test category and questions
- Scoring and recommendations
- Completion timestamps

## Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for password security
- **Rate Limiting**: Prevents API abuse
- **Input Validation**: express-validator for request validation
- **CORS**: Configured for frontend integration
- **Helmet**: Security headers
- **Error Handling**: Prevents information leakage

## Development

### Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests (when implemented)

### Environment Variables

See `.env.example` for all available configuration options.

## Contributing

1. Follow the existing code structure
2. Add proper error handling
3. Include input validation
4. Write descriptive commit messages
5. Test your changes thoroughly

## License

MIT License