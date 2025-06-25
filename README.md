# Musician Venue Tracker

A comprehensive web application that helps musicians and bands track, manage, and optimize their relationships with venues. This tool streamlines the process of booking gigs, following up with venue contacts, and maintaining a comprehensive history of past performances and interactions.

## Features

### Venue Management
- Contact database with comprehensive venue details
- Categorization and tagging system
- Venue ratings and notes

### Interaction Tracking
- Communication log (calls, emails, meetings)
- Follow-up reminders
- Attachment management for contracts, riders, etc.

### Performance History
- Past gig details and outcomes
- Financial tracking
- Post-gig ratings and notes

### Relationship Analytics
- Venue ROI calculations
- Booking success rates
- Geographic performance insights

### Calendar Integration
- Upcoming performances
- Follow-up reminders
- Availability management

## Technology Stack

### Frontend
- React.js
- Redux for state management
- Material-UI components
- CSS Modules with SASS
- Axios for HTTP requests
- Formik + Yup for form validation
- Jest + React Testing Library for testing

### Backend
- Node.js with Express
- JWT authentication with OAuth 2.0
- Joi for validation
- Sequelize ORM
- Mocha + Chai for testing

### Database
- PostgreSQL
- Redis for caching

### Infrastructure
- AWS (EC2, RDS, S3)
- Docker for containerization
- GitHub Actions for CI/CD
- AWS CloudWatch for monitoring

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL
- Redis (optional for development)
- AWS account (for production deployment)

### Installation

1. Clone the repository
```bash
git clone https://github.com/dxaginfo/musician-venue-tracker.git
cd musician-venue-tracker
```

2. Install dependencies
```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

3. Set up environment variables
```bash
# In the server directory, create a .env file
cp .env.example .env
# Edit the .env file with your database credentials and other configurations
```

4. Set up the database
```bash
# In the server directory
npm run db:create
npm run db:migrate
npm run db:seed # Optional for demo data
```

5. Start the development servers
```bash
# Start the backend server
cd server
npm run dev

# In another terminal, start the frontend server
cd client
npm start
```

6. Access the application
```
Frontend: http://localhost:3000
Backend API: http://localhost:8000
```

## Deployment

### Using Docker Compose (Development)
```bash
docker-compose up -d
```

### Production Deployment to AWS
Refer to the [deployment documentation](docs/deployment.md) for detailed instructions on deploying to AWS.

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments
- [Google Calendar API](https://developers.google.com/calendar) for calendar integration
- [SendGrid](https://sendgrid.com/) for email notifications
- [Google Maps API](https://developers.google.com/maps) for geographic visualizations