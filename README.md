# DeshiMart - Multi-Vendor E-Commerce Platform

<div align="center">

![DeshiMart Banner](https://img.shields.io/badge/E--Commerce-Platform-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.2.0-61dafb?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646cff?style=for-the-badge&logo=vite)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb)

*A modern, full-featured e-commerce platform built with React, Vite, and Node.js/Express backend, supporting multiple user roles (Admin, Seller, Buyer) with comprehensive shopping, payment integration (SSLCommerz), real-time messaging, and analytics capabilities.*

</div>

---

## 📸 Project Screenshots



> **Note**: Replace placeholder images with actual screenshots by adding your images to a `/screenshots` folder and updating the paths above.

---

### 🔐 Authentication & Authorization
- Email/Password authentication
- Google OAuth integration via Firebase
- Private route protection for authenticated pages
- Role-based access control (Admin, Seller, Buyer)

### 👥 Multi-Role Dashboard System

#### Admin Dashboard
- Analytics dashboard with insights
- User management (view all users)
- Product moderation and management
- Pending approval workflow for sellers/products
- Platform-wide oversight

#### Seller Dashboard
- Product upload and management
- Order fulfillment tracking
- Customer management
- Sales analytics and performance metrics
- Become a seller application flow

#### Buyer Dashboard
- Order history and tracking
- Profile management
- Payment history
- Settings customization
- Favorite products

### 🛒 Complete Shopping Experience
- Product browsing with categories
- Shopping cart functionality
- Favorites/wishlist system
- Product details view with dynamic routing
- Hot deals section
- Collection pages
- Local stores integration

### 💳 Payment & Checkout System
- Secure payment processing with SSLCommerz
- Payment initiation and gateway integration
- Payment success/failure/cancellation handling
- Transaction tracking and management
- Payment history tracking

### 💬 Real-Time Communication
- Integrated messenger system (Socket.io)
- Real-time chat functionality
- Room-based chat architecture
- Notification system
- Real-time updates

### 📝 Blog Platform
- Blog listing and navigation
- Single blog post view
- Dynamic blog content loading
- Blog categorization

### 🎨 UI/UX Features
- Responsive design with Tailwind CSS
- Modern interface with Lucide React icons
- Interactive charts with Chart.js and Recharts
- Form handling with React Hook Form
- Toast notifications with SweetAlert2
- Intersection Observer for infinite scroll

## 🚀 Technologies Used

### Frontend
#### Core Framework & Build Tools
- **React** 19.2.0
- **Vite** 7.2.4
- **@vitejs/plugin-react** 5.1.1

#### Styling & UI
- **Tailwind CSS** 4.1.18
- **@tailwindcss/vite** 4.1.18
- **Lucide React** 0.564.0
- **React Icons** 5.5.0

#### State Management & Data Fetching
- **TanStack Query (React Query)** 5.90.19
- **Axios** 1.13.2
- **React Router** 7.12.0

#### Forms & Validation
- **React Hook Form** 7.71.1

#### Visualization & Charts
- **Chart.js** 4.5.1
- **React Chartjs 2** 5.3.1
- **Recharts** 3.7.0

#### Utilities
- **date-fns** 4.1.0
- **SweetAlert2** 11.26.17
- **React Intersection Observer** 10.0.3
- **Heroicons React** 2.2.0

### Backend
#### Runtime & Framework
- **Node.js**
- **Express.js** 5.2.1

#### Database
- **MongoDB** 7.0.0
- **MongoDB Native Driver**

#### Payment Gateway
- **SSLCommerz-LTS** 1.2.0

#### Real-Time Communication
- **Socket.io** 4.8.3

#### Middleware & Utilities
- **CORS** 2.8.6
- **dotenv** 17.2.3

### Authentication & Hosting
- **Firebase** 12.8.0 (Authentication & Hosting)

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn
- MongoDB (for backend)
- Firebase account (for authentication & hosting)
- SSLCommerz store credentials (for payment gateway)

### Frontend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/mehedi67719/DESHIMART.git
   cd DESHIMART
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory and add your Firebase configuration:
   ```env
   VITE_FIREBASE_apiKey=your_api_key
   VITE_FIREBASE_authDomain=your_auth_domain
   VITE_FIREBASE_projectId=your_project_id
   VITE_FIREBASE_storageBucket=your_storage_bucket
   VITE_FIREBASE_messagingSenderId=your_messaging_sender_id
   VITE_FIREBASE_appId=your_app_id
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

6. **Preview production build**
   ```bash
   npm run preview
   ```

7. **Deploy to Firebase Hosting**
   ```bash
   npm install -g firebase-tools
   firebase login
   firebase init hosting
   npm run build
   firebase deploy
   ```

### Backend Setup

1. **Clone the backend repository**
   ```bash
   git clone https://github.com/mehedi67719/DESHIMART-Server.git
   cd DESHIMART-Server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the backend root directory:
   ```env
   MONGO_URI=your_mongodb_connection_string
   STORE_ID=your_sslcommerz_store_id
   STORE_PASSWD=your_sslcommerz_store_password
   ```

4. **Start the server**
   ```bash
   node index.js
   ```
   
   Server will start on port 3000

### Backend API Endpoints

#### Products API (`/products`)
- `GET /top-categories` - Get top selling categories
- `GET /search` - Search products by name, description, category, brand, tags
- Full CRUD operations for products
- Product filtering and sorting

#### User API (`/user`)
- `GET /all-users` - Get all users
- `GET /all-users-summary` - Get monthly user summary
- `POST /` - Create new user
- `PATCH /update-role` - Update user role
- `GET /pending-user` - Get pending seller requests
- `GET /?email=` - Get user by email

#### Payment API (`/payment`)
- `POST /init` - Initialize SSLCommerz payment
- `POST /payment-success/:tran_id` - Handle payment success
- `POST /payment-fail/:tran_id` - Handle payment failure
- `POST /payment-cancel/:tran_id` - Handle payment cancellation

#### Cart API (`/cart`)
- Full cart management operations

#### Favorite API (`/favorite`)
- Wishlist/favorites management

#### Chat API (`/chat`)
- Real-time messaging with Socket.io
- Room-based chat functionality

#### Blog API (`/blog`)
- Blog post CRUD operations

#### Other APIs
- `/categorys` - Category management
- `/brands` - Brand management
- `/Stores` - Local stores management
- `/notification` - User notifications
- `/admin-notification` - Admin notifications
- `/all-total` - Analytics and statistics

### Database Collections
- `products` - Product catalog
- `localstores` - Local store listings
- `cart` - Shopping carts
- `favorite` - Favorites/wishlists
- `payment` - Payment transactions
- `user` - User accounts
- `chat` - Chat messages
- `notifications` - User notifications
- `adminNotification` - Admin notifications
- `blog` - Blog posts

## 🌐 Live Links

- **Frontend**: [Deploy on Firebase](https://deshimart-1451e.web.app) (configure your Firebase project URL)
- **Backend API**: [https://deshimart-server.vercel.app](https://deshimart-server.vercel.app)
- **Frontend Repository**: [https://github.com/mehedi67719/DESHIMART](https://github.com/mehedi67719/DESHIMART)
- **Backend Repository**: [https://github.com/mehedi67719/DESHIMART-Server](https://github.com/mehedi67719/DESHIMART-Server)

## 📁 Project Structure

```
DeshiMart (Frontend)/
├── src/
│   ├── Component/          # Reusable components
│   │   ├── AdminDashboardHome/
│   │   ├── BuyerDashboardHome/
│   │   ├── SellerDashboardHome/
│   │   ├── Homecomponent/
│   │   ├── blog/
│   │   └── ...
│   ├── Pages/              # Page components
│   │   ├── Authentication/
│   │   ├── Dashboard/
│   │   ├── DynamicPage/
│   │   ├── Navpage/
│   │   └── Payment/
│   ├── assets/             # Static assets
│   ├── App.jsx             # Main App component
│   ├── Router.jsx          # Route configuration
│   └── main.jsx            # Entry point
├── public/                 # Public assets
├── .env                    # Environment variables
├── firebase.json           # Firebase configuration
├── package.json            # Dependencies
└── vite.config.js          # Vite configuration

DESHIMART-Server (Backend)/
├── routes/                 # API route handlers
│   ├── Products.js         # Product endpoints
│   ├── user.js             # User endpoints
│   ├── payment.js          # Payment endpoints
│   ├── cart.js             # Cart endpoints
│   ├── favorite.js         # Favorites endpoints
│   ├── chat.js             # Chat endpoints
│   ├── blog.js             # Blog endpoints
│   ├── category.js         # Category endpoints
│   ├── brands.js           # Brand endpoints
│   ├── Stores.js           # Stores endpoints
│   ├── Notifications.js    # Notification endpoints
│   ├── adminnotification.js# Admin notification endpoints
│   └── altotal.js          # Analytics endpoints
├── .env                    # Environment variables
├── index.js                # Express server entry point
├── package.json            # Dependencies
└── .gitignore
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Mehedi Hassan**

GitHub: [@mehedi67719](https://github.com/mehedi67719)

---

Built with ❤️ using React + Vite
