import "./config/env.js";
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import http from "http"; // ✅ IMPORTANT

import protectRoute from "./middlewares/auth.middleware.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { globalLimiter } from "./middlewares/rateLimiter.middleware.js";

import userRoutes from "./routes/user.routers.js";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";

import connectToMongoDB from "./config/db.js";
import { initSocket } from "./socket/socket.js"; // ✅ ADD THIS

console.log("CLIENT_URL:", process.env.CLIENT_URL);

const PORT = process.env.PORT || 5050;

const app = express();

// 🔥 CREATE HTTP SERVER
const server = http.createServer(app);

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);

app.use(globalLimiter);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", protectRoute, messageRoutes);
app.use("/api/users", userRoutes);

app.use(errorHandler);

// 🔥 INITIALIZE SOCKET HERE
initSocket(server);

// ❌ REMOVE app.listen
// app.listen(PORT, () => {})

// ✅ USE server.listen INSTEAD
server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is running on port ${PORT}`);
});
