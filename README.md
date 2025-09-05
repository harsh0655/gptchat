# YAPPIE - MERN Stack Chatbot

A brainrot chatbot built with the MERN stack (MongoDB, Express.js, React, Node.js) that talks like it's chronically online.

## 🚀 Features

- **Real-time Chat**: Interactive chat interface with AI responses
- **User Authentication**: JWT-based authentication with bcrypt password hashing
- **Conversation Management**: Create, view, and delete chat conversations
- **Responsive Design**: Works on desktop and mobile devices
- **Dark/Light Theme**: Toggle between themes with system preference detection
- **Word Animation**: Smooth word-by-word fade-in for AI responses
- **MongoDB Integration**: Persistent data storage with Mongoose ODM

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing

### Frontend
- **React** - UI library
- **Vite** - Build tool and dev server
- **React Router v6** - Client-side routing
- **Axios** - HTTP client
- **React Markdown** - Markdown rendering
- **Lucide React** - Icons

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd yappie-mern
   ```

2. **Install dependencies**
   ```bash
   npm run install-deps
   ```

3. **Environment Configuration**
   
   **Backend (.env in /backend folder):**
   ```env
   MONGODB_URI=mongodb://localhost:27017/yappie
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   FIREWORKS_API_KEY=your-fireworks-api-key
   PORT=5000
   NODE_ENV=development
   CLIENT_URL=http://localhost:5173
   ```

   **Frontend (.env in /client folder):**
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Start MongoDB**
   - If using local MongoDB: `mongod`
   - If using MongoDB Atlas: Update MONGODB_URI in backend/.env

5. **Run the application**
   ```bash
   # Run both frontend and backend concurrently
   npm run dev
   
   # Or run separately:
   # Backend only
   npm run server
   
   # Frontend only  
   npm run client
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 📁 Project Structure

```
yappie-mern/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── conversationController.js
│   │   └── messageController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Conversation.js
│   │   ├── Message.js
│   │   ├── UserPreference.js
│   │   └── UsageLog.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── conversations.js
│   │   └── messages.js
│   ├── services/
│   │   └── openaiService.js
│   ├── .env
│   ├── package.json
│   └── server.js
├── client/
│   ├── public/
│   │   └── yappie.ico
│   ├── src/
│   │   ├── components/
│   │   │   ├── chat/
│   │   │   ├── input/
│   │   │   ├── layout/
│   │   │   └── ui/
│   │   ├── contexts/
│   │   │   ├── AuthContext.jsx
│   │   │   └── ThemeContext.jsx
│   │   ├── hooks/
│   │   │   ├── useIsMobile.js
│   │   │   └── useWordFadeIn.js
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── ChatPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   └── RegisterPage.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── .gitignore
├── package.json
└── README.md
```

## 🔐 Authentication

The app uses JWT-based authentication with the following endpoints:

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

Tokens are stored in HTTP-only cookies for security.

## 🗄️ Database Models

### User
- `name` - User's display name
- `email` - Unique email address
- `password` - Hashed password
- `image` - Profile image URL
- `emailVerified` - Email verification date

### Conversation
- `userId` - Reference to User
- `title` - Conversation title
- `contextSummary` - AI-generated context summary

### Message
- `conversationId` - Reference to Conversation
- `userId` - Reference to User (null for AI messages)
- `content` - Message content
- `messageType` - 'user' or 'assistant'

## 🤖 AI Integration

The chatbot uses Fireworks AI (DeepSeek v3 model) for generating responses. Configure your API key in the backend environment variables.

## 🎨 Styling

The app features a unique "brainrot" aesthetic with:
- Colorful shadows and borders
- Retro-style cards and buttons
- Responsive design for all screen sizes
- Dark/light theme support
- Custom animations and transitions

## 🚀 Deployment

### Backend Deployment
1. Set up MongoDB Atlas or your preferred MongoDB hosting
2. Update environment variables for production
3. Deploy to platforms like Heroku, Railway, or DigitalOcean

### Frontend Deployment
1. Build the client: `cd client && npm run build`
2. Deploy the `dist` folder to platforms like Netlify, Vercel, or Surge

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## ⚠️ Important Notes

- Change the JWT_SECRET in production
- Set up proper MongoDB security
- Configure CORS for your production domains
- Add rate limiting and input validation as needed
- Consider adding email verification for production use

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check MONGODB_URI in backend/.env

2. **CORS Issues**
   - Verify CLIENT_URL in backend/.env matches your frontend URL
   - Check that withCredentials is set to true in API calls

3. **Authentication Issues**
   - Ensure JWT_SECRET is set in backend/.env
   - Check that cookies are being sent with requests

4. **Build Issues**
   - Clear node_modules and reinstall dependencies
   - Check that all environment variables are set correctly

For more help, check the console logs or create an issue in the repository.