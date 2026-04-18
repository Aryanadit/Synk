# Synk

<p align="center">
  <img src="frontend/public/assets/logo-dark.png" alt="Synk logo" height="72" />
</p>

<p align="center">
  A minimal, real-time chat application designed for calm, distraction-free communication.
</p>

<p align="center">
  <a href="https://synk-frontend-five.vercel.app/">Live Demo</a>
  ·
  <a href="https://github.com/Aryanadit/Synk">GitHub</a>
</p>

![React](https://img.shields.io/badge/React-19-149ECA?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-Realtime-010101?style=for-the-badge&logo=socket.io&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)

## 🧠 Why Synk?

Most chat applications prioritize features over experience — resulting in noisy, cluttered interfaces.

Synk takes a different approach:

- Calm, distraction-free UI (inspired by Notion & Linear)
- Minimal interaction, maximum clarity
- Real-time communication without visual overload

> The goal: make messaging feel like reading, not reacting.

## ✨ Features

- **Authentication**: signup, login, logout (JWT in **httpOnly cookies**)
- **Protected routes**: chat is only accessible after login
- **Real-time messaging**: Socket.IO message events + online users
- **Media sharing**: optional image attachment per message (Cloudinary)
- **Email**: welcome email via Resend
- **Security**: CORS with credentials + rate limiting (global + auth)

## 📸 Screenshots

### Landing / Main Screen

![Landing / Main](images/MainPage.png)

### Login

![Login Screen](images/login.png)

### Sign Up

![Signup Screen](images/signup.png)

### Chat Area

![Chat Area](images/ChatArea.png)

### Flow Summary

- Client authenticates → receives JWT (cookie)
- REST APIs handle auth, users, messages
- Socket.IO handles real-time messaging + online users
- Media uploads: Multer → Cloudinary

## 🚀 Tech Stack

### Frontend (`frontend/`)

- React + Vite
- Zustand (state)
- Tailwind CSS + DaisyUI
- Socket.IO Client
- Axios

### Backend (`backend/`)

- Node.js + Express
- MongoDB + Mongoose
- JWT auth (cookie-based)
- Socket.IO (WebSockets)
- Cloudinary uploads (memory upload via `multer`)
- Resend (email)

## 📁 Folder Structure

```text
Synk/
  README.md
  .gitignore
  design_guidelines.txt
  roadmap.md
  images/
    ChatArea.png
    MainPage.png
    login.png
    signup.png

  backend/
    package.json
    package-lock.json
    server.js
    config/
      cloudinary.js
      db.js
      env.js
      resend.js
    constants/
      socket.events.js
    controllers/
      auth.controller.js
      message.controller.js
      user.controller.js
    middlewares/
      auth.middleware.js
      errorHandler.js
      multer.middleware.js
      rateLimiter.middleware.js
      socket.auth.middleware.js
    models/
      message.model.js
      user.model.js
    routes/
      auth.routes.js
      message.routes.js
      user.routers.js
    services/
      email.service.js
      media.service.js
    socket/
      socket.events.js
      socket.js
      socket.manager.js
    utils/
      ApiError.js
      ApiResponse.js
      asyncHandler.js
      emailTemplates.js
      generateToken.js
      index.js

  frontend/
    package.json
    package-lock.json
    eslint.config.js
    vite.config.js
    public/
      avatar.png
      assets/
        LogoDark.png
        LogoLight.png
        logo-dark.png
        logo-light.png
        react.svg
      sounds/
        keystroke1.mp3
        keystroke2.mp3
        keystroke3.mp3
        keystroke4.mp3
        mouse-click.mp3
        notification.mp3
    src/
      App.jsx
      main.jsx
      index.css
      components/
        ActiveTabSwitch.jsx
        AppContainer.jsx
        AppHeader.jsx
        ChatContainer.jsx
        ChatHeader.jsx
        ChatList.jsx
        ContactList.jsx
        MessageInput.jsx
        MessagesLoadingSkeleton.jsx
        NoChatHistoryPlaceholder.jsx
        NoChatsFound.jsx
        NoConversationPlaceholder.jsx
        PageLoader.jsx
        ProfileHeader.jsx
        ProtectedRoute.jsx
        PublicRoute.jsx
        ThemeToggle.jsx
        UsersLoadingSkeleton.jsx
      lib/
        axios.js
        theme.js
      pages/
        ChatPage.jsx
        LoginPage.jsx
        SignUpPage.jsx
      store/
        useAuthStore.js
        useChatStore.js
        useSocketStore.js
        useThemeStore.js
```

## 🔧 Environment Variables

### Backend (`backend/.env`)

- **`PORT`** (recommended `5050` to match the Vite dev proxy)
- **`NODE_ENV`** (`development` / `production`)
- **`CLIENT_URL`** (frontend origin; used for CORS + Socket.IO CORS)
- **`MONGODB_URI`**
- **`JWT_SECRET_KEY`**
- **`CLOUDINARY_CLOUD_NAME`**
- **`CLOUDINARY_API_KEY`**
- **`CLOUDINARY_API_SECRET`**
- **`RESEND_API_KEY`**
- **`EMAIL_FROM`**
- **`EMAIL_FROM_NAME`**

### Frontend (`frontend/.env`)

- **`VITE_API_URL`** (must include `/api`)
  - Local: `http://localhost:5050/api`
  - Prod: `https://your-backend-domain.com/api`

## 🛠️ Local Setup

### 1) Backend

```bash
cd backend
npm install

# Create backend/.env with the variables above
npm run dev
```

### 2) Frontend

```bash
cd frontend
npm install

# Create frontend/.env
# VITE_API_URL=http://localhost:5050/api
npm run dev
```

Open `http://localhost:5173`.

## 🧩 API Routes (Quick Reference)

Base path is **`/api`**.

### Auth

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/check` (protected)
- `PATCH /api/auth/update-profile` (protected, multipart: `profilePic`)

### Messages (protected)

- `GET /api/messages/contacts`
- `GET /api/messages/partners`
- `GET /api/messages/user/:id`
- `POST /api/messages/send/:id` (multipart: `file`, body: `text`)

### Users

- `GET /api/users` (protected)

## 📄 License

ISC (as declared in `backend/package.json`).
