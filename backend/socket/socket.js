import { Server } from "socket.io";
import { socketAuthMiddleware } from "../middlewares/socket.auth.middleware.js";
import User from "../models/user.model.js";
import {
  addUserSocket,
  removeUserSocket,
  getUserSockets,
  getOnlineUsers,
} from "./socket.manager.js";

import { registerSocketEvents } from "./socket.events.js";
import { SOCKET_EVENTS } from "../constants/socket.events.js";

let io;

const disconnectTimers = new Map(); // userId -> Timeout
const DISCONNECT_DEBOUNCE_MS = 3000;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: [process.env.CLIENT_URL],
      credentials: true,
    },
  });

  io.use(socketAuthMiddleware);

  io.on(SOCKET_EVENTS.CONNECTION, (socket) => {
    const userId = socket.user._id.toString();

    console.log("Connected:", socket.user.fullName);

    const existingTimer = disconnectTimers.get(userId);
    if (existingTimer) {
      clearTimeout(existingTimer);
      disconnectTimers.delete(userId);
    }

    addUserSocket(userId, socket.id);

    User.findByIdAndUpdate(
      userId,
      { $set: { isOnline: true, lastSeen: null } },
      { new: false },
    ).catch((err) => {
      console.error("Failed to update presence (connect):", err?.message || err);
    });

    // 🔥 Send online users
    io.emit(SOCKET_EVENTS.ONLINE_USERS, getOnlineUsers());

    // 🔥 Register feature events
    registerSocketEvents(io, socket);

    socket.on(SOCKET_EVENTS.DISCONNECT, () => {
      console.log("Disconnected:", socket.user.fullName);

      removeUserSocket(userId, socket.id);

      const timer = setTimeout(async () => {
        disconnectTimers.delete(userId);

        // If user reconnected quickly, they still have sockets.
        if (getUserSockets(userId).length > 0) return;

        try {
          await User.findByIdAndUpdate(userId, {
            $set: { isOnline: false, lastSeen: new Date() },
          });
        } catch (err) {
          console.error(
            "Failed to update presence (disconnect):",
            err?.message || err,
          );
        }

        io.emit(SOCKET_EVENTS.ONLINE_USERS, getOnlineUsers());
      }, DISCONNECT_DEBOUNCE_MS);

      disconnectTimers.set(userId, timer);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};
