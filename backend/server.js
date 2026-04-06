import "./config/env.js";
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";

import protectRoute from "./middlewares/auth.middleware.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { globalLimiter } from "./middlewares/rateLimiter.middleware.js";

import userRoutes from "./routes/user.routers.js";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";

import connectToMongoDB from "./config/db.js";
console.log("CLIENT_URL:", process.env.CLIENT_URL);

// Default 5050: macOS uses 5000 for AirPlay Receiver (Control Center), which breaks local API.
const PORT = process.env.PORT || 5050;
const app = express();

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

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is running on port ${PORT}`);
});
