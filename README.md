# 🚀 MERN Task Dashboard

A modern full-stack Task Management Dashboard built using the **MERN Stack**.

The application allows users to create an account, securely log in, and manage their personal tasks. Each user's tasks are stored separately in MongoDB, and the backend uses JWT authentication to protect task operations.

---

## 📌 Features

### 🔐 Authentication

- User Registration
- User Login
- User Logout
- Password hashing using bcrypt
- JWT-based authentication
- Protected task APIs
- User-specific tasks

### 📋 Task Management

- Add new tasks
- View tasks
- Edit tasks
- Mark tasks as completed
- Mark completed tasks as pending
- Delete tasks
- Refresh task list
- Task priority:
  - High
  - Medium
  - Low

### 🎨 User Interface

- Modern responsive dashboard
- Professional login page
- Professional registration page
- Gradient UI
- Task cards
- Hover effects
- Responsive design for smaller screens
- Clean and simple navigation

---

## 🛠️ Tech Stack

### Frontend

- React.js
- Vite
- Axios
- HTML5
- CSS3
- JavaScript

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- CORS
- dotenv

### Database

- MongoDB Atlas

---

## 📂 Project Structure

```text
mern-task-dashboard/
│
├── backend/
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   └── taskController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   │
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── frontend/
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   │
│   │   ├── services/
│   │   │   ├── authApi.js
│   │   │   └── taskApi.js
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
