# Virtual Event Hosting Platform

A comprehensive full-stack platform for hosting virtual events with live streaming, interactive features, analytics, and white-label customization capabilities.

## 🚀 Features

### Core Event Management
- **Event Creation & Management**: Create, edit, and manage virtual events with detailed configurations
- **Session Management**: Organize events into multiple sessions with scheduling
- **User Authentication**: Secure user registration and login with JWT tokens
- **Event Discovery**: Public event listings with search and filtering capabilities

### Live Streaming & Interactive Features
- **AWS IVS Integration**: High-quality live streaming powered by Amazon Interactive Video Service
- **Real-time Polls**: Interactive polling system for audience engagement
- **Q&A System**: Live question and answer sessions during events
- **Session Management**: Multiple concurrent sessions within events

### Analytics & Insights
- **Real-time Analytics**: Track participant engagement and event metrics
- **Custom Metrics**: Publish custom metrics to AWS CloudWatch
- **Event Analytics Dashboard**: Comprehensive analytics with Chart.js visualizations
- **Participant Tracking**: Monitor user interactions and engagement levels

### White-Label Customization
- **Brand Customization**: Custom logos, colors, and CSS styling
- **Custom Fields**: Flexible event metadata and custom form fields
- **Theming**: Complete visual customization for different brands

### Admin Features
- **User Management**: Admin panel for user administration
- **Event Settings**: Advanced event configuration options
- **Analytics Dashboard**: Comprehensive admin analytics view

## 🛠️ Tech Stack

### Backend
- **Node.js** with Express.js framework
- **MongoDB** with Mongoose ODM for data persistence
- **AWS Services**:
  - Amazon IVS for live streaming
  - Amazon S3 for file storage
  - Amazon Cognito for user authentication
  - Amazon DynamoDB for analytics data
  - Amazon CloudWatch for metrics
- **JWT** for authentication
- **bcryptjs** for password hashing
- **CORS** for cross-origin requests

### Frontend
- **React 19** with modern hooks
- **Vite** for fast development and building
- **React Router DOM** for client-side routing
- **Chart.js** with React integration for analytics
- **Axios** for API communication
- **React Icons** for UI icons

### Development Tools
- **ESLint** for code linting
- **Nodemon** for backend development
- **Vite** for frontend development server

## 📁 Project Structure

```
Virtual-Event-Hosting-Platform-1/
├── backend/
│   ├── config/                 # AWS and database configurations
│   ├── controllers/            # Route controllers
│   ├── models/                 # MongoDB data models
│   ├── routes/                 # API route definitions
│   ├── services/               # Business logic services
│   ├── utils/                  # Utility functions and middleware
│   ├── app.js                  # Express app configuration
│   └── server.js               # Server entry point
├── frontend/
│   ├── src/
│   │   ├── components/         # React components
│   │   │   ├── admin/          # Admin-specific components
│   │   │   ├── auth/           # Authentication components
│   │   │   ├── common/         # Shared components
│   │   │   ├── dashboard/      # Dashboard components
│   │   │   └── events/         # Event-related components
│   │   ├── pages/              # Page components
│   │   ├── services/           # API service functions
│   │   └── utils/              # Frontend utilities
│   └── public/                 # Static assets
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- AWS Account with appropriate services enabled
- Git

### Environment Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Virtual-Event-Hosting-Platform-1
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Variables**
   
   Create a `.env` file in the backend directory:
   ```env
   # Database
   MONGODB_URI=mongodb://localhost:27017/virtual-events
   
   # JWT
   JWT_SECRET=your-jwt-secret-key
   
   # AWS Configuration
   AWS_ACCESS_KEY_ID=your-aws-access-key
   AWS_SECRET_ACCESS_KEY=your-aws-secret-key
   AWS_REGION=us-east-1
   
   # AWS Services
   S3_BUCKET_NAME=your-s3-bucket-name
   DYNAMODB_EVENTS_TABLE=virtual-events-analytics
   
   # Cognito
   COGNITO_USER_POOL_ID=your-user-pool-id
   COGNITO_CLIENT_ID=your-client-id
   ```

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd backend
   npm start
   ```
   The backend will run on `http://localhost:3000`

2. **Start the Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - Get user profile

### Event Endpoints
- `GET /api/events` - Get all events
- `POST /api/events` - Create new event
- `GET /api/events/:id` - Get event by ID
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event
- `POST /api/events/:id/upload` - Upload event image

### Session Endpoints
- `GET /api/sessions` - Get all sessions
- `POST /api/sessions` - Create new session
- `GET /api/sessions/:id` - Get session by ID
- `PUT /api/sessions/:id` - Update session
- `DELETE /api/sessions/:id` - Delete session

### Analytics Endpoints
- `GET /api/analytics/events/:id` - Get event analytics
- `POST /api/analytics/log` - Log user interaction
- `GET /api/analytics/metrics` - Get custom metrics

### Streaming Endpoints
- `POST /api/streaming/channel` - Create streaming channel
- `GET /api/streaming/channel/:id` - Get channel details
- `DELETE /api/streaming/channel/:id` - Delete channel

## 🎯 Key Features in Detail

### Live Streaming
- Integrated with AWS Interactive Video Service (IVS)
- Low-latency streaming capabilities
- Automatic channel creation and management
- Stream key generation for broadcasters

### Interactive Features
- **Polls**: Create and manage real-time polls during events
- **Q&A**: Live question and answer sessions
- **Session Management**: Multiple concurrent sessions

### Analytics Dashboard
- Real-time participant tracking
- Engagement metrics visualization
- Custom event analytics
- Export capabilities for reporting

### White-Label Support
- Custom branding and theming
- Configurable color schemes
- Custom CSS injection
- Brand-specific logos and styling

## 🔧 Development

### Backend Development
```bash
cd backend
npm run dev  # Uses nodemon for auto-restart
```

### Frontend Development
```bash
cd frontend
npm run dev  # Vite development server
```

### Building for Production
```bash
# Backend
cd backend
npm start

# Frontend
cd frontend
npm run build
```

## 🧪 Testing

Currently, the project doesn't include automated tests. To add testing:

1. **Backend Testing**: Add Jest and Supertest for API testing
2. **Frontend Testing**: Add React Testing Library and Jest for component testing

## 🚀 Deployment

### Backend Deployment
1. Set up MongoDB Atlas or AWS DocumentDB
2. Configure AWS services (S3, IVS, Cognito, DynamoDB, CloudWatch)
3. Deploy to AWS EC2, ECS, or Lambda
4. Set environment variables in production

### Frontend Deployment
1. Build the production bundle: `npm run build`
2. Deploy to AWS S3 + CloudFront, Vercel, or Netlify
3. Configure API endpoints for production

## 📝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License - see the package.json files for details.

## 🤝 Support

For support and questions:
- Create an issue in the repository
- Contact the development team

## 🔮 Future Enhancements

- [ ] Mobile app development
- [ ] Advanced analytics and reporting
- [ ] Integration with popular video conferencing platforms
- [ ] Multi-language support
- [ ] Advanced white-label customization options
- [ ] Automated testing suite
- [ ] CI/CD pipeline setup
- [ ] Performance monitoring and optimization

---

**Built with ❤️ for the future of virtual events**