import { Server } from "socket.io";
import { socketAuthMiddleware } from "../middlewares/socket.auth.middleware.js";
import {
  addUserSocket,
  removeUserSocket,
  getOnlineUsers,
} from "./socket.manager.js";

import { registerSocketEvents } from "./socket.events.js";
import { SOCKET_EVENTS } from "../constants/socket.events.js";

let io;

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

    addUserSocket(userId, socket.id);

    // 🔥 Send online users
    io.emit(SOCKET_EVENTS.ONLINE_USERS, getOnlineUsers());

    // 🔥 Register feature events
    registerSocketEvents(io, socket);

    socket.on(SOCKET_EVENTS.DISCONNECT, () => {
      console.log("Disconnected:", socket.user.fullName);

      removeUserSocket(userId, socket.id);

      io.emit(SOCKET_EVENTS.ONLINE_USERS, getOnlineUsers());
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
