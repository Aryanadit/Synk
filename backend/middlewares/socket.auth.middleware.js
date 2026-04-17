import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { ApiError } from "../utils/index.js";

export const socketAuthMiddleware = async (socket, next) => {
  try {
    const cookieHeader = socket.handshake.headers.cookie;

    if (!cookieHeader) {
      return next(new ApiError(401, "No cookies found"));
    }

    const token = cookieHeader
      .split("; ")
      .find((row) => row.startsWith("jwt="))
      ?.split("=")[1];

    if (!token) {
      return next(new ApiError(401, "Unauthorized: No token"));
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (err) {
      return next(new ApiError(401, "Invalid token"));
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return next(new ApiError(401, "User not found"));
    }

    socket.user = user;

    next();
  } catch (error) {
    console.error("Socket auth error:", error);
    next(new ApiError(500, "Socket authentication failed"));
  }
};
