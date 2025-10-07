# Flying Chicken - Food Delivery App

A complete production-ready full-stack food delivery application built with modern technologies, featuring a beautiful UI, real-time chat support, and comprehensive order management.

## 🚀 Features

### Core Features

- **User Authentication**: JWT-based authentication with role-based access control
- **Multi-Role System**: Customers, Vendors, and Admins with different permissions
- **Restaurant Management**: Vendors can register, manage menus, and handle orders
- **Order Management**: Complete order lifecycle from placement to delivery
- **Subscription Tiers**: Premium, Mid, and Free plans for vendors
- **AI Chatbot**: OpenAI-powered customer support assistant
- **Responsive Design**: Modern UI with Tailwind CSS

### Customer Features

- Browse restaurants and menus
- Search and filter restaurants
- Add items to cart with variants and addons
- Place orders with delivery tracking
- Order history and ratings
- Real-time chat support

### Vendor Features

- Restaurant registration and profile management
- Menu item CRUD operations
- Order management and status updates
- Subscription plan management
- Analytics dashboard

### Admin Features

- Vendor approval and management
- Order oversight
- System analytics
- User management

## 🛠️ Tech Stack

### Frontend

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **React Hot Toast** - Toast notifications
- **Lucide React** - Beautiful icons

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **OpenAI API** - AI chatbot integration

## 📁 Project Structure

```
flying-chicken/
├── backend/
│   ├── config/
│   │   └── seed.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Vendor.js
│   │   ├── MenuItem.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── vendors.js
│   │   ├── menus.js
│   │   ├── orders.js
│   │   └── chat.js
│   ├── server.js
│   ├── package.json
│   └── env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── Chatbot/
│   │   │       ├── ChatbotButton.jsx
│   │   │       ├── ChatWindow.jsx
│   │   │       └── ChatMessage.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── CartContext.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── VendorList.jsx
│   │   │   ├── VendorDetail.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── Orders.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── VendorDashboard.jsx
│   │   │   └── AdminDashboard.jsx
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── env.example
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd flying-chicken
   ```

2. **Backend Setup**

   ```bash
   cd backend
   npm install

   # Copy environment variables
   cp env.example .env

   # Edit .env file with your configuration
   nano .env
   ```

3. **Frontend Setup**

   ```bash
   cd ../frontend
   npm install

   # Copy environment variables
   cp env.example .env

   # Edit .env file
   nano .env
   ```

4. **Database Setup**

   ```bash
   # Start MongoDB (if running locally)
   mongod

   # Seed the database with sample data
   cd ../backend
   npm run seed
   ```

5. **Start the Application**

   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev

   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

6. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 🔧 Configuration

### Backend Environment Variables (.env)

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/flying-chicken
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
OPENAI_API_KEY=your-openai-api-key-here
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads
```

### Frontend Environment Variables (.env)

```env
VITE_API_URL=http://localhost:5000/api
```

## 👥 Demo Accounts

The seed script creates the following demo accounts:

### Admin Account

- **Email**: admin@flyingchicken.com
- **Password**: admin123
- **Role**: Admin

### Vendor Account

- **Email**: rajesh@spicepalace.com
- **Password**: vendor123
- **Role**: Vendor
- **Restaurant**: Spice Palace (Premium subscription)

### Customer Account

- **Email**: priya@example.com
- **Password**: customer123
- **Role**: Customer

## 🎨 UI/UX Design

### Color Palette

- **Primary Orange**: #F7941D
- **Secondary Purple**: #7A1E74
- **Accent Yellow**: #FFD166

### Design Features

- Responsive design for all devices
- Modern gradient backgrounds
- Smooth animations and transitions
- Intuitive navigation
- Clean typography with Inter font
- Consistent spacing and shadows

## 🤖 AI Chatbot

The application includes an AI-powered chatbot for customer support:

- **Technology**: OpenAI GPT-3.5-turbo
- **Features**:
  - Contextual responses about the app
  - Order support and help
  - Vendor onboarding assistance
  - Friendly conversational interface
- **Fallback**: Mock responses when OpenAI API is not configured

## 📊 API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update profile
- `PUT /api/auth/change-password` - Change password

### Vendors

- `GET /api/vendors` - Get all vendors
- `GET /api/vendors/:id` - Get vendor by ID
- `POST /api/vendors` - Create vendor profile
- `PUT /api/vendors/:id` - Update vendor profile
- `PUT /api/vendors/:id/subscription` - Update subscription

### Menu Items

- `GET /api/menus/vendor/:vendorId` - Get vendor menu
- `GET /api/menus/:id` - Get menu item
- `POST /api/menus` - Create menu item
- `PUT /api/menus/:id` - Update menu item
- `DELETE /api/menus/:id` - Delete menu item

### Orders

- `POST /api/orders` - Create order
- `GET /api/orders/customer` - Get customer orders
- `GET /api/orders/vendor` - Get vendor orders
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id/status` - Update order status

### Chat

- `POST /api/chat` - Send message to chatbot
- `GET /api/chat/health` - Chat service health check

## 🚀 Deployment

### Backend Deployment (Render)

1. Connect your GitHub repository to Render
2. Create a new Web Service
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add environment variables
6. Deploy

### Frontend Deployment (Vercel)

1. Connect your GitHub repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Add environment variables
5. Deploy

### Database (MongoDB Atlas)

1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get connection string
4. Update MONGODB_URI in production environment

## 🧪 Testing

### Manual Testing

1. **Authentication Flow**

   - Register new users
   - Login with demo accounts
   - Test role-based access

2. **Vendor Features**

   - Create vendor profile
   - Add menu items
   - Manage orders

3. **Customer Features**

   - Browse restaurants
   - Add items to cart
   - Place orders

4. **Chatbot**
   - Test AI responses
   - Verify fallback responses

## 🔒 Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- Input validation and sanitization
- CORS configuration
- Environment variable protection
- Role-based access control

## 📈 Performance Optimizations

- MongoDB indexing for faster queries
- React lazy loading
- Image optimization
- API response caching
- Efficient state management

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**

   - Ensure MongoDB is running
   - Check connection string in .env
   - Verify network access

2. **CORS Errors**

   - Check backend CORS configuration
   - Verify frontend API URL

3. **Authentication Issues**

   - Clear browser localStorage
   - Check JWT secret configuration
   - Verify token expiration

4. **OpenAI API Errors**
   - Verify API key configuration
   - Check API quota and limits
   - Review error logs

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- OpenAI for the AI chatbot integration
- Tailwind CSS for the beautiful UI framework
- MongoDB for the database solution
- React team for the amazing frontend framework

## 📞 Support

For support and questions:

- Email: support@flyingchicken.com
- GitHub Issues: Create an issue in the repository
- Documentation: Check this README and code comments

---

**Flying Chicken** - Your favorite food delivery app! 🍗✨

