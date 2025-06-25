# Musician Venue Tracker

A comprehensive web application for musicians to track venue relationships, performances, and interactions.

## Features

- **Venue Management**: Keep track of venues where you've performed or want to perform
- **Performance Tracking**: Record all performances with details like audience size, payment, etc.
- **Interaction History**: Log all communications with venue contacts
- **Dashboard**: View your upcoming performances and recent interactions
- **Mobile Responsive**: Access your data on any device

## Technology Stack

### Backend

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Sequelize ORM
- JWT Authentication

### Frontend

- React
- Redux Toolkit
- TypeScript
- Tailwind CSS
- React Router v6
- Formik & Yup

## Getting Started

### Prerequisites

- Node.js (v14+)
- PostgreSQL
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone https://github.com/dxaginfo/musician-venue-tracker.git
   cd musician-venue-tracker
   ```

2. Install backend dependencies
   ```
   cd server
   npm install
   ```

3. Install frontend dependencies
   ```
   cd ../client
   npm install
   ```

4. Create a PostgreSQL database

5. Configure environment variables
   - Copy `.env.example` to `.env` in the server directory
   - Update with your database credentials and JWT secret

6. Run database migrations
   ```
   cd ../server
   npx sequelize-cli db:migrate
   ```

### Running the Application

#### Development Mode

1. Start the backend server
   ```
   cd server
   npm run dev
   ```

2. Start the frontend development server
   ```
   cd client
   npm start
   ```

3. Open your browser to `http://localhost:3000`

#### Production Mode

1. Build the frontend
   ```
   cd client
   npm run build
   ```

2. Build the backend
   ```
   cd ../server
   npm run build
   ```

3. Start the server
   ```
   npm start
   ```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password/:token` - Reset password

### Users

- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `PUT /api/users/change-password` - Change password

### Venues

- `GET /api/venues` - Get all venues
- `GET /api/venues/:id` - Get venue by ID
- `POST /api/venues` - Create a new venue
- `PUT /api/venues/:id` - Update a venue
- `DELETE /api/venues/:id` - Delete a venue

### Performances

- `GET /api/performances` - Get all performances
- `GET /api/performances/upcoming` - Get upcoming performances
- `GET /api/performances/past` - Get past performances
- `GET /api/performances/:id` - Get performance by ID
- `POST /api/performances` - Create a new performance
- `PUT /api/performances/:id` - Update a performance
- `DELETE /api/performances/:id` - Delete a performance

### Interactions

- `GET /api/interactions` - Get all interactions
- `GET /api/interactions/recent` - Get recent interactions
- `GET /api/interactions/:id` - Get interaction by ID
- `POST /api/interactions` - Create a new interaction
- `PUT /api/interactions/:id` - Update an interaction
- `DELETE /api/interactions/:id` - Delete an interaction

## License

This project is licensed under the MIT License
